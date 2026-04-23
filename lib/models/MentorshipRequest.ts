// lib/models/MentorshipRequest.ts
import mongoose, { Types } from "mongoose";

export interface IMentorshipRequest {
  _id: string;
  mentorId: Types.ObjectId;
  mentorName: string;
  incubadoId?: Types.ObjectId;
  incubadoName: string;
  incubadoEmail: string;
  status: "Pendente" | "Aprovado" | "Rejeitado";
  mesReferencia: string;
  motivoRejeicao?: string;
  solicitadoEm: Date;
  resolvidoEm?: Date;
}

const MentorshipRequestSchema = new mongoose.Schema(
  {
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor", required: true },
    mentorName: { type: String, required: true },
    incubadoId: { type: mongoose.Schema.Types.ObjectId, ref: "Incubado" },
    incubadoName: { type: String, required: true },
    incubadoEmail: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pendente", "Aprovado", "Rejeitado"],
      default: "Pendente",
    },
    mesReferencia: { type: String, required: true },
    motivoRejeicao: { type: String },
    solicitadoEm: { type: Date, default: Date.now },
    resolvidoEm: { type: Date },
  },
  {
    timestamps: true,
    collection: "mentorship_requests",
  }
);

MentorshipRequestSchema.index(
  { mentorId: 1, incubadoEmail: 1, mesReferencia: 1 },
  { unique: true }
);

// @ts-ignore - Mongoose 9.x has excessively deep type instantiation
const MentorshipRequest =
  mongoose.models.MentorshipRequest ||
  mongoose.model("MentorshipRequest", MentorshipRequestSchema);

export default MentorshipRequest;
