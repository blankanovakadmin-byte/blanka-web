import { Text } from '@react-email/components';
import { BaseEmail, heading, paragraph, ctaButton, divider } from './_base';
import type { Webinar } from '@/types';

interface Props { email: string; firstName?: string; webinar: Webinar }

export function WebinarReminder24hEmail({ email, firstName, webinar }: Props) {
  const dateFormatted = new Date(webinar.date).toLocaleDateString('hu-HU', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <BaseEmail preview={`Holnap: ${webinar.title} — itt a Zoom link! 🔔`}>
      {heading('Holnap találkozunk! 🔔')}
      {paragraph(`${firstName ? `Szia ${firstName}!` : 'Szia!'} Emlékeztetőként — holnap kerül sor a webinárra:`)}
      <Text style={{ backgroundColor: '#F3EAFC', borderRadius: '12px', padding: '16px', fontSize: '15px', color: '#173A7A', fontWeight: '600', margin: '0 0 20px' }}>
        📅 {webinar.title}<br/>
        🗓 {dateFormatted} — {webinar.time}<br/>
      </Text>
      {paragraph('Készülj fel: legyen kéznél egy füzet, és keress egy nyugodt helyet a csatlakozáshoz.')}
      {divider()}
      {webinar.zoomLink && ctaButton('Csatlakozás a Zoom linkkel →', webinar.zoomLink)}
      {paragraph('Holnap találkozunk!', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Blanka 💜', { color: '#7A7A8C', fontSize: '14px', marginBottom: 0 })}
    </BaseEmail>
  );
}

export default WebinarReminder24hEmail;
