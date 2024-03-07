/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { Schema } from '@/components/BookingForm';
import { EmailTemplate } from '../../../components/emailTemplate';

const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest): Promise<NextResponse<unknown>> {

  const formData:Schema = await req.json()

  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [`${formData.agent}@wearee.nl`],
      subject: "New booking request",
      react: EmailTemplate({ ...formData }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
