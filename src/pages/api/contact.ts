import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type ContactPayload = {
  nombre?: string;
  zona?: string;
  email?: string;
  telefono?: string;
  servicio?: string;
  mensaje?: string;
};

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT
  ? Number(process.env.SMTP_PORT)
  : 587;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpFrom = process.env.SMTP_FROM ?? smtpUser;
const contactTo = process.env.CONTACT_TO_EMAIL ?? "info@suringenieriasrl.com";

const transporter =
  smtpHost && smtpUser && smtpPass
    ? nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      })
    : null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!transporter || !smtpFrom) {
    return res.status(500).json({
      error: "SMTP no configurado. Defini SMTP_HOST, SMTP_PORT, SMTP_USER y SMTP_PASS.",
    });
  }

  const { nombre, zona, email, telefono, servicio, mensaje } = (req.body ??
    {}) as ContactPayload;

  if (!nombre || !zona || !email || !telefono || !servicio || !mensaje) {
    return res.status(400).json({
      error: "Completa nombre, zona, email, teléfono, servicio y mensaje.",
    });
  }

  const text = [
    "Nueva consulta desde SUR INGENIERIA",
    "",
    `Nombre: ${nombre}`,
    `Zona: ${zona}`,
    `Email: ${email}`,
    `Telefono: ${telefono}`,
    `Servicio: ${servicio}`,
    "",
    "Mensaje:",
    mensaje,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #1F2937; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">Nueva consulta desde SUR INGENIERIA</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
      <p><strong>Zona:</strong> ${escapeHtml(zona)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Teléfono:</strong> ${escapeHtml(telefono)}</p>
      <p><strong>Servicio:</strong> ${escapeHtml(servicio)}</p>
      <p><strong>Mensaje:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(mensaje)}</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: smtpFrom,
      to: contactTo,
      replyTo: email,
      subject: `Nueva consulta web - ${servicio}`,
      text,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact email error:", error);
    return res.status(500).json({
      error: "No se pudo enviar la consulta. Intenta nuevamente.",
    });
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
