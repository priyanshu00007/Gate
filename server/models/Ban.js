import mongoose from 'mongoose';

const banSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  reason: { type: String, default: 'Inappropriate content' },
}, { timestamps: true });

export default mongoose.model('Ban', banSchema);
