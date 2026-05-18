// lib/email.ts
import nodemailer from "nodemailer";

// Cria o transporter do Nodemailer usando variáveis de ambiente
// Configure no .env: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true para 465, false para outras portas
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
});

const FROM_EMAIL = process.env.SMTP_FROM || process.env.SMTP_USER || "itecpb@patobranco.tec.br";
const SENDER_NAME = "Nelito Antônio Zanmaria - ITECPB";

/**
 * Formata uma data para o padrão brasileiro com horário
 */
function formatDateBR(date: Date): string {
  return date.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Envia e-mail de confirmação quando uma mentoria é APROVADA.
 * Envia para:
 *   - `to`: e-mail da empresa solicitante
 *   - `SMTP_FROM`: e-mail do responsável ITEC (cópia institucional)
 */
export async function sendApprovalEmail(
  to: string,
  incubadoName: string,
  mentorName: string,
  month: string,
  approvedAt?: Date
): Promise<void> {
  const dataHora = approvedAt ? formatDateBR(approvedAt) : formatDateBR(new Date());

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1E3560, #3B68BD); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 24px;">Mentoria Aprovada ✅</h1>
      </div>
      <div style="background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 16px 16px;">
        <p style="color: #374151; font-size: 16px;">Olá, <strong>${incubadoName}</strong>!</p>
        <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
          Sua solicitação de mentoria com <strong>${mentorName}</strong> para o mês de referência 
          <strong>${month}</strong> foi <span style="color: #059669; font-weight: bold;">aprovada</span> pela administração do ITECPB.
        </p>
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 16px; margin: 16px 0;">
          <p style="color: #166534; font-size: 13px; margin: 0;">
            📅 <strong>Aprovado em:</strong> ${dataHora}<br/>
            👤 <strong>Mentor:</strong> ${mentorName}<br/>
            🏢 <strong>Empresa:</strong> ${incubadoName}
          </p>
        </div>
        <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
          Entre em contato com o mentor para agendar os encontros. Bons negócios!
        </p>
        <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 20px 0;" />
        <p style="color: #9ca3af; font-size: 12px; text-align: center;">
          Parque Tecnológico de Pato Branco — SMCTI<br/>
          <a href="https://patobranco.tec.br" style="color: #3B68BD;">patobranco.tec.br</a>
        </p>
      </div>
    </div>
  `;

  const subject = `✅ Mentoria Aprovada — ${mentorName} (${month})`;

  // Destinatários: empresa solicitante + responsável ITEC
  const recipients = to === FROM_EMAIL ? [to] : [to, FROM_EMAIL];

  for (const recipient of recipients) {
    try {
      await transporter.sendMail({
        from: `"${SENDER_NAME}" <${FROM_EMAIL}>`,
        to: recipient,
        subject,
        html,
      });
      console.log(`📧 E-mail de aprovação enviado para ${recipient}`);
    } catch (error: any) {
      console.error(`❌ Falha ao enviar e-mail de aprovação para ${recipient}:`, error.message);
    }
  }
}

/**
 * Envia e-mail de notificação quando uma mentoria é REJEITADA.
 * Envia para:
 *   - `to`: e-mail da empresa solicitante
 *   - `SMTP_FROM`: e-mail do responsável ITEC (cópia institucional)
 */
export async function sendRejectionEmail(
  to: string,
  incubadoName: string,
  mentorName: string,
  month: string,
  reason: string
): Promise<void> {
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1E3560, #3B68BD); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 24px;">Solicitação de Mentoria</h1>
      </div>
      <div style="background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 16px 16px;">
        <p style="color: #374151; font-size: 16px;">Olá, <strong>${incubadoName}</strong>.</p>
        <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
          Agradecemos o interesse da sua empresa no programa de mentorias do ITECPB.
        </p>
        <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
          Infelizmente, sua solicitação de mentoria com <strong>${mentorName}</strong> para o mês de referência 
          <strong>${month}</strong> não pôde ser aprovada neste ciclo.
        </p>
        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; margin: 16px 0;">
          <p style="color: #991b1b; font-size: 13px; margin: 0;"><strong>Motivo:</strong> ${reason || "Não informado."}</p>
        </div>
        <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
          Valorizamos muito a sua parceria e convidamos você a tentar novamente no próximo ciclo mensal.
          Se tiver dúvidas, entre em contato com a administração do ITECPB.
        </p>
        <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 20px 0;" />
        <p style="color: #9ca3af; font-size: 12px; text-align: center;">
          Parque Tecnológico de Pato Branco — SMCTI<br/>
          <a href="https://patobranco.tec.br" style="color: #3B68BD;">patobranco.tec.br</a>
        </p>
      </div>
    </div>
  `;

  const subject = `Solicitação de Mentoria — ${mentorName} (${month})`;

  // Destinatários: empresa solicitante + responsável ITEC
  const recipients = to === FROM_EMAIL ? [to] : [to, FROM_EMAIL];

  for (const recipient of recipients) {
    try {
      await transporter.sendMail({
        from: `"${SENDER_NAME}" <${FROM_EMAIL}>`,
        to: recipient,
        subject,
        html,
      });
      console.log(`📧 E-mail de rejeição enviado para ${recipient}`);
    } catch (error: any) {
      console.error(`❌ Falha ao enviar e-mail de rejeição para ${recipient}:`, error.message);
    }
  }
}
