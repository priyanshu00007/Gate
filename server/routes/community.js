import { Router } from 'express';
import Message from '../models/Message.js';
import Ban from '../models/Ban.js';

const router = Router();

const ALLOWED_CATEGORIES = ['issue', 'problem', 'new-implementation', 'suggestion'];

const OFF_TOPIC_PATTERNS = [
  /hello|hi\b|hey\b|what'?s\s*up/i,
  /game|gaming|play|fun|entertainment/i,
  /movie|song|music|video|dance/i,
  /dating|relationship|friend|social/i,
  /weather|news|sports|cricket|football/i,
  /buy|sell|price|cost|shop|market/i,
];

function checkOffTopic(content) {
  return OFF_TOPIC_PATTERNS.some((p) => p.test(content));
}

function getClientIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim()
    || req.socket.remoteAddress
    || '0.0.0.0';
}

router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find({ deleted: false })
      .sort({ createdAt: -1 })
      .limit(100)
      .select('-ip -__v');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

router.post('/messages', async (req, res) => {
  try {
    const { author, category, content } = req.body;
    const ip = getClientIP(req);

    if (!author?.trim() || !content?.trim()) {
      return res.status(400).json({ error: 'Author and content are required' });
    }
    if (!ALLOWED_CATEGORIES.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const banned = await Ban.findOne({ ip });
    if (banned) {
      return res.status(403).json({ error: 'Your IP is banned from the community' });
    }

    if (checkOffTopic(content)) {
      await Ban.create({ ip, reason: 'Off-topic content detected' });
      return res.status(403).json({ error: 'Off-topic content is not allowed. Your IP has been banned.' });
    }

    const message = await Message.create({ author: author.trim(), category, content: content.trim(), ip });
    res.status(201).json({ id: message._id, author: message.author, category: message.category, content: message.content, createdAt: message.createdAt });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(403).json({ error: 'Your IP has been banned' });
    }
    res.status(500).json({ error: 'Failed to create message' });
  }
});

router.delete('/messages/:id', async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
    if (!message) return res.status(404).json({ error: 'Message not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

export default router;
