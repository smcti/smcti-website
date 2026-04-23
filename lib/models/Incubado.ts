// lib/models/Incubado.ts
import mongoose from "mongoose";

export interface IIncubado {
  _id: string;
  name: string;
  email: string;
  logo: string;
}

const IncubadoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    logo: { type: String, default: "/assets/images/avatar.png" },
  },
  {
    timestamps: true,
    collection: "incubados",
  }
);

// @ts-ignore - Mongoose 9.x has excessively deep type instantiation
const Incubado = mongoose.models.Incubado || mongoose.model("Incubado", IncubadoSchema);

export default Incubado;
