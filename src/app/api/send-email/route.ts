/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { Schema } from '@/components/BookingForm';
import { EmailTemplate } from '../../../components/emailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
console.log(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest): Promise<NextResponse<unknown>> {

  const formData:Schema = await req.json()

  try {
    const data = await resend.emails.send({
      from: 'Booking König WE ARE E <bookings@wearee.nl>',
      to: [`${formData.agent}@wearee.nl`],
      subject: `New booking request for ${formData.artist_name} @ ${formData.venue_city}`,
      react: EmailTemplate({ ...formData }),
      text:''
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
