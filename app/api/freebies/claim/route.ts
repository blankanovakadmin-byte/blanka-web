import { NextRequest, NextResponse } from 'next/server';
import { addFreebieContact } from '@/lib/systemio';
import { generateSignedUrl } from '@/lib/blob';
import { sendEmail } from '@/lib/resend';
import { FreebieDeliveryEmail } from '@/emails/freebie-delivery';
import { getActiveFreebies } from '@/lib/airtable';
import type { FreebieClaimPayload } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { email, productId } = await req.json() as FreebieClaimPayload;
    if (!email || !productId) {
      return NextResponse.json({ error: 'Email and productId required' }, { status: 400 });
    }

    const freebies = await getActiveFreebies();
    const freebie = freebies.find(f => f.id === productId);
    if (!freebie) return NextResponse.json({ error: 'Freebie not found' }, { status: 404 });

    const downloadUrl = generateSignedUrl(freebie.blobKey);

    await Promise.allSettled([
      addFreebieContact(email, productId),
      sendEmail({
        to: email,
        subject: `A te letöltésed: ${freebie.title}`,
        template: FreebieDeliveryEmail({ email, productTitle: freebie.title, downloadUrl }),
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
