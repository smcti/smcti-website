// lib/models/AuditLog.ts
// Registro de auditoria para conformidade LGPD (Accountability)
// Armazena quem criou/alterou/excluiu usuários e quando

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAuditLog extends Document {
  action: "CREATE_USER" | "DELETE_USER" | "UPDATE_USER" | "RESET_SLOTS";
  performedBy: string;    // email do admin que realizou a ação
  targetEmail?: string;   // email do usuário afetado (se aplicável)
  targetRole?: string;    // role do usuário afetado (se aplicável)
  details?: string;       // informação adicional opcional
  ip?: string;            // IP da requisição para rastreabilidade
  createdAt: Date;
}

const AuditLogSchema: Schema = new Schema(
  {
    action: {
      type: String,
      required: true,
      enum: ["CREATE_USER", "DELETE_USER", "UPDATE_USER", "RESET_SLOTS"],
    },
    performedBy: {
      type: String,
      required: true,
    },
    targetEmail: {
      type: String,
    },
    targetRole: {
      type: String,
    },
    details: {
      type: String,
    },
    ip: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "audit_logs",
  }
);

export const AuditLog: Model<IAuditLog> =
  mongoose.models.AuditLog || mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);
