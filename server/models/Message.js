import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  author: { type: String, required: true, trim: true, maxlength: 30 },
  category: {
    type: String,
    required: true,
    enum: ['issue', 'problem', 'new-implementation', 'suggestion'],
  },
  content: { type: String, required: true, trim: true, maxlength: 2000 },
  ip: { type: String, required: true },
  deleted: { type: Boolean, default: false },
}, { timestamps: true });

messageSchema.index({ createdAt: -1 });

export default mongoose.model('Message', messageSchema);
