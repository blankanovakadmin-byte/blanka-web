import { Text } from '@react-email/components';
import { BaseEmail, heading, paragraph, ctaButton, divider } from './_base';
import type { Webinar } from '@/types';

interface Props { email: string; firstName?: string; webinar: Webinar }

export function WebinarReminder1hEmail({ email, firstName, webinar }: Props) {
  return (
    <BaseEmail preview={`1 óra múlva kezdődik: ${webinar.title}! ⏰`}>
      {heading('1 óra múlva találkozunk! ⏰')}
      {paragraph(`${firstName ? `Szia ${firstName}!` : 'Szia!'} Mindjárt kezdünk! Az "${webinar.title}" webinár 1 óra múlva indul.`)}
      <Text style={{ backgroundColor: '#FFF3E0', borderRadius: '12px', padding: '16px', fontSize: '14px', color: '#173A7A', margin: '0 0 20px' }}>
        ⚡ Ne feledd: tedd csöndre a telefont, és keress egy csendes helyet!
      </Text>
      {divider()}
      {webinar.zoomLink && ctaButton('Csatlakozás most →', webinar.zoomLink)}
      {paragraph('Ha nem tudsz csatlakozni, írd meg — megoldjuk!', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Blanka 💜', { color: '#7A7A8C', fontSize: '14px', marginBottom: 0 })}
    </BaseEmail>
  );
}

export default WebinarReminder1hEmail;
