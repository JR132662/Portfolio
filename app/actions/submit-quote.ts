'use server';

import nodemailer from 'nodemailer';

/* ─── Types ─── */
interface QuotePayload {
  projectType: string;
  projectTypeOther?: string;
  description: string;
  features: string[];
  featuresOther?: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  howFound?: string;
}

interface ActionResult {
  success: boolean;
  message: string;
}

/* ─── Label maps ─── */
const projectLabels: Record<string, string> = {
  website: 'Website',
  webapp: 'Web Application',
  saas: 'SaaS Product',
  'ai-automation': 'AI & Automation',
  mobile: 'Mobile App',
  other: 'Other',
};

const budgetLabels: Record<string, string> = {
  '<5k': 'Under $5,000',
  '5k-15k': '$5,000 – $15,000',
  '15k-50k': '$15,000 – $50,000',
  '50k-100k': '$50,000 – $100,000',
  '100k+': '$100,000+',
  unsure: 'Not sure yet',
};

const timelineLabels: Record<string, string> = {
  asap: 'ASAP',
  '1-2months': '1 – 2 months',
  '3-6months': '3 – 6 months',
  '6months+': '6+ months',
  flexible: 'Flexible / ongoing',
};

/* ─── Server Action ─── */
export async function submitQuote(payload: QuotePayload): Promise<ActionResult> {
  // Validate required fields
  if (!payload.name?.trim() || !payload.email?.trim() || !payload.description?.trim()) {
    return { success: false, message: 'Missing required fields.' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return { success: false, message: 'Invalid email address.' };
  }

  const projectLabel = projectLabels[payload.projectType] ?? payload.projectType;
  const budgetLabel = budgetLabels[payload.budget] ?? payload.budget;
  const timelineLabel = timelineLabels[payload.timeline] ?? payload.timeline;
  const features = payload.features.length
    ? payload.features.join(', ') + (payload.featuresOther ? `, ${payload.featuresOther}` : '')
    : 'None selected';

  // Build HTML email
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #e5e5e5; border-radius: 12px; overflow: hidden; border: 1px solid #222;">
      <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 24px 32px;">
        <h1 style="margin: 0; color: white; font-size: 22px;">New Quote Request</h1>
        <p style="margin: 4px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">From ${payload.name}</p>
      </div>

      <div style="padding: 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; font-size: 13px; width: 130px; vertical-align: top;">Project Type</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #fff; font-size: 14px;">${projectLabel}${payload.projectTypeOther ? ` — ${payload.projectTypeOther}` : ''}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; font-size: 13px; vertical-align: top;">Budget</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #fff; font-size: 14px;">${budgetLabel}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; font-size: 13px; vertical-align: top;">Timeline</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #fff; font-size: 14px;">${timelineLabel}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; font-size: 13px; vertical-align: top;">Features</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #fff; font-size: 14px;">${features}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; font-size: 13px; vertical-align: top;">Description</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #fff; font-size: 14px; white-space: pre-wrap;">${payload.description}</td>
          </tr>
        </table>

        <div style="margin-top: 28px; padding: 20px; background: #111; border-radius: 8px; border: 1px solid #222;">
          <h3 style="margin: 0 0 12px; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Contact Info</h3>
          <p style="margin: 0 0 6px; color: #fff; font-size: 14px;"><strong>${payload.name}</strong></p>
          <p style="margin: 0 0 4px; font-size: 14px;"><a href="mailto:${payload.email}" style="color: #60a5fa;">${payload.email}</a></p>
          ${payload.phone ? `<p style="margin: 0 0 4px; color: #ccc; font-size: 14px;">${payload.phone}</p>` : ''}
          ${payload.company ? `<p style="margin: 0 0 4px; color: #ccc; font-size: 14px;">${payload.company}</p>` : ''}
          ${payload.howFound ? `<p style="margin: 8px 0 0; color: #888; font-size: 12px;">Found via: ${payload.howFound}</p>` : ''}
        </div>
      </div>

      <div style="padding: 16px 32px; background: #111; border-top: 1px solid #222; text-align: center;">
        <p style="margin: 0; color: #555; font-size: 12px;">Sent from jonathanrodriguez.dev/quote</p>
      </div>
    </div>
  `;

  // Plain text fallback
  const text = [
    `NEW QUOTE REQUEST`,
    ``,
    `Project: ${projectLabel}${payload.projectTypeOther ? ` — ${payload.projectTypeOther}` : ''}`,
    `Budget: ${budgetLabel}`,
    `Timeline: ${timelineLabel}`,
    `Features: ${features}`,
    ``,
    `Description:`,
    payload.description,
    ``,
    `--- Contact ---`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.company ? `Company: ${payload.company}` : '',
    payload.phone ? `Phone: ${payload.phone}` : '',
    payload.howFound ? `Found via: ${payload.howFound}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Quote" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: payload.email,
      subject: `💼 Quote Request — ${projectLabel} | ${payload.name}`,
      text,
      html,
    });

    return { success: true, message: 'Quote request sent successfully!' };
  } catch (error) {
    console.error('Failed to send quote email:', error);
    return { success: false, message: 'Failed to send. Please try again or email me directly.' };
  }
}
