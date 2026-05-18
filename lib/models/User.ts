import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string; // a senha hasheada
  role: string;
  // Campos extras para empresas cadastradas
  nomeEmpresa?: string;
  nomeResponsavel?: string;
  areaAtuacao?: string;
  descricaoAtividades?: string;
  currentSessionId?: string;
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
      enum: ["admin", "gestor_mentorias", "empresario", "empresa", "usuario"],
      default: "usuario",
    },
    // Campos extras opcionais para usuários com role "empresa"
    nomeEmpresa: { type: String },
    nomeResponsavel: { type: String },
    areaAtuacao: { type: String },
    descricaoAtividades: { type: String },
    currentSessionId: { type: String },
  },
  { timestamps: true }
);

// Trata problema de recompilação do Next.js
export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
