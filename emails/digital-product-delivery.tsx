import { Text } from '@react-email/components';
import { BaseEmail, heading, paragraph, ctaButton, divider } from './_base';

interface Props { email: string; productTitle: string; downloadUrl: string }

export function DigitalProductDeliveryEmail({ email, productTitle, downloadUrl }: Props) {
  return (
    <BaseEmail preview={`A letöltésed kész: ${productTitle}`}>
      {heading('A vásárlásod sikerült! 🎊')}
      {paragraph(`Köszönjük a vásárlást! A "${productTitle}" letöltési linkje 72 óráig érvényes.`)}
      <Text style={{ backgroundColor: '#F0FFF4', borderRadius: '12px', padding: '16px', fontSize: '14px', color: '#166534', margin: '0 0 20px' }}>
        ⏰ A link 72 óráig érvényes. Töltsd le és mentsd el a fájlt!
      </Text>
      {ctaButton('Letöltés →', downloadUrl)}
      {divider()}
      {paragraph('Ha a link lejárt vagy nem működik, válaszolj erre az emailre és újat küldök.', { color: '#7A7A8C', fontSize: '14px' })}
      {paragraph('Blanka 💜', { color: '#7A7A8C', fontSize: '14px', marginBottom: 0 })}
    </BaseEmail>
  );
}

export default DigitalProductDeliveryEmail;
