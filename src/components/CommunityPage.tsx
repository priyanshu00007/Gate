import { useState, useEffect, useRef } from 'react';
import { MessageSquare, AlertTriangle, Lightbulb, Wrench, Trash2, Send, Shield } from 'lucide-react';

interface Message {
  _id: string;
  author: string;
  category: string;
  content: string;
  createdAt: string;
}

const CATEGORIES = [
  { value: 'issue', label: 'ISSUE', icon: AlertTriangle, color: 'text-rose-500' },
  { value: 'problem', label: 'PROBLEM', icon: AlertTriangle, color: 'text-orange-500' },
  { value: 'new-implementation', label: 'NEW IMPLEMENT', icon: Wrench, color: 'text-sky-500' },
  { value: 'suggestion', label: 'SUGGESTION', icon: Lightbulb, color: 'text-emerald-500' },
];

const API = '/api/community';

export default function CommunityPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('suggestion');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [banned, setBanned] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API}/messages`);
      if (res.ok) setMessages(await res.json());
    } catch { /* ignore */ }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (banned) { setError('Your IP is banned from the community.'); return; }

    try {
      const res = await fetch(`${API}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: author || 'Anonymous', category, content }),
      });
      const data = await res.json();
      if (res.status === 403) { setBanned(true); setError(data.error); return; }
      if (!res.ok) { setError(data.error || 'Failed to post'); return; }
      setContent('');
      fetchMessages();
    } catch { setError('Server error. Is the backend running?'); }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API}/messages/${id}`, { method: 'DELETE' });
      fetchMessages();
    } catch { /* ignore */ }
  };

  const getCategoryMeta = (val: string) => CATEGORIES.find((c) => c.value === val) ?? CATEGORIES[0];

  return (
    <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-5xl md:text-7xl font-black text-[#FAFAFA] mb-4 tracking-tight uppercase flex items-center gap-4">
          <MessageSquare className="text-[#DFE104]" /> COMMUNITY
        </h1>
        <p className="text-[#A1A1AA] text-lg font-bold">
          Share issues, problems, new implementations, or suggestions. Off-topic content will result in an IP ban.
        </p>
      </div>

      {banned && (
        <div className="mb-8 p-6 bg-rose-950/30 border-2 border-rose-700 flex items-center gap-4">
          <Shield size={28} className="text-rose-500 shrink-0" />
          <div>
            <p className="font-black text-rose-400 uppercase tracking-tight">You have been banned</p>
            <p className="text-sm text-rose-300">Off-topic or inappropriate content is not allowed in this community.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-12 p-6 bg-[#09090B] border-2 border-[#3F3F46]">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            maxLength={30}
            className="flex-1 bg-[#27272A] border border-[#3F3F46] px-4 py-3 text-[#FAFAFA] text-sm font-bold placeholder:text-[#A1A1AA]/50 focus:outline-none focus:border-[#DFE104]"
          />
          <div className="flex gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setCategory(cat.value)}
                className={`px-3 py-3 text-[10px] font-black border-2 uppercase tracking-wider flex items-center gap-1.5 transition-all ${category === cat.value ? 'bg-[#DFE104] text-black border-black' : 'bg-[#27272A] text-[#A1A1AA] border-[#3F3F46] hover:border-[#DFE104]'}`}
              >
                <cat.icon size={14} /> {cat.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <textarea
            placeholder="Describe the issue, problem, implementation, or suggestion..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={2000}
            rows={3}
            className="flex-1 bg-[#27272A] border border-[#3F3F46] px-4 py-3 text-[#FAFAFA] text-sm font-bold placeholder:text-[#A1A1AA]/50 focus:outline-none focus:border-[#DFE104] resize-none"
          />
          <button
            type="submit"
            disabled={!content.trim()}
            className="bg-[#DFE104] text-black border-2 border-black px-6 py-3 font-black text-sm uppercase flex items-center gap-2 hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100"
          >
            <Send size={16} /> POST
          </button>
        </div>
        {error && <p className="text-rose-500 text-xs font-bold mt-2 uppercase">{error}</p>}
      </form>

      <div className="space-y-4">
        {messages.length === 0 && (
          <p className="text-center text-[#A1A1AA] text-sm font-bold py-12 uppercase tracking-widest">
            No messages yet. Be the first to share!
          </p>
        )}
        {messages.map((msg) => {
          const meta = getCategoryMeta(msg.category);
          const Icon = meta.icon;
          return (
            <div key={msg._id} className="bg-[#09090B] border-2 border-[#3F3F46] p-6 hover:border-[#DFE104] transition-colors group">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-black text-[#FAFAFA] text-sm uppercase tracking-tight">{msg.author}</span>
                  <span className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-wider ${meta.color}`}>
                    <Icon size={12} /> {meta.label}
                  </span>
                  <span className="text-[10px] text-[#A1A1AA] font-bold">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(msg._id)}
                  className="text-[#A1A1AA] hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                  title="Delete message"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-sm text-[#FAFAFA] font-bold leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
