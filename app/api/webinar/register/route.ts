import { NextRequest, NextResponse } from 'next/server';
import { addWebinarContact } from '@/lib/systemio';
import { addWebinarSubscriber } from '@/lib/airtable';
import { sendEmail } from '@/lib/resend';
import { WebinarConfirmationEmail } from '@/emails/webinar-confirmation';
import { getWebinarById } from '@/lib/airtable';
import type { WebinarRegisterPayload } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { email, firstName, webinarId } = await req.json() as WebinarRegisterPayload;

    if (!email || !webinarId) {
      return NextResponse.json({ error: 'Email and webinarId required' }, { status: 400 });
    }

    const webinar = await getWebinarById(webinarId);
    if (!webinar) return NextResponse.json({ error: 'Webinar not found' }, { status: 404 });
    if (!webinar.registrationOpen) {
      return NextResponse.json({ error: 'Registration is closed' }, { status: 400 });
    }

    await Promise.allSettled([
      addWebinarContact(email, firstName || '', webinarId),
      addWebinarSubscriber({ email, firstName: firstName || '', webinarId }),
      sendEmail({
        to: email,
        subject: `Regisztráció megerősítve: ${webinar.title}`,
        template: WebinarConfirmationEmail({ email, firstName: firstName || '', webinar }),
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
