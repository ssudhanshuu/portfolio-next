import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  category: { type: String, required: true },
  skills: [
    {
      name: String,
      proficiency: Number,
      year: Number
    }
  ]
});

export default mongoose.models.Skill || mongoose.model('Skill', skillSchema);
