// lib/models/Mentor.ts
import mongoose from "mongoose";

export interface IMentor {
  _id: string;
  name: string;
  role: string;
  photo: string;
  description: string;
  category: "mercado" | "comercial" | "gestao";
  email: string;
  phone?: string;
  totalSlots: number;
  availableSlots: number;
}

const MentorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    photo: { type: String, default: "/assets/images/avatar.png" },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["mercado", "comercial", "gestao"],
      required: true,
    },
    email: { type: String, required: true },
    phone: { type: String },
    totalSlots: { type: Number, default: 3 },
    availableSlots: { type: Number, default: 3 },
  },
  {
    timestamps: true,
    collection: "mentors",
  }
);

// Evitar recompilação do model durante HMR
// @ts-ignore - Mongoose 9.x has excessively deep type instantiation
const Mentor = mongoose.models.Mentor || mongoose.model("Mentor", MentorSchema);

export default Mentor;
