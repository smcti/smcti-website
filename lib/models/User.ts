import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string; // a senha hasheada
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// @ts-ignore - Mongoose 9.x has excessively deep type instantiation
const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // Não é explicitamente required pois usuários antigos provindos do OAuth
      // (caso queiramos reaproveitar a tabela) podiam não ter. Mas nos novos vai ter.
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "gestor_mentorias", "empresario", "usuario"],
      default: "usuario",
    },
  },
  { timestamps: true }
);

// Trata problema de recompilação do Next.js
export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
