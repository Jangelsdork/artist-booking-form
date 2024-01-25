/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { EmailTemplate } from '../../../components/EmailTemplate';

const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const demo = {
  firstName: "Jack",
  lastName: "Mang"
}

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['jack@wearee.nl'],
      subject: 'Hello world',
      react: EmailTemplate({ ...demo }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
