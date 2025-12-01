/**
 * Email Service Module
 * Wysyłanie powiadomień email przez Resend API
 * 
 * Wymagane zmienne środowiskowe:
 * - RESEND_API_KEY - Klucz API z Resend (https://resend.com)
 * - EMAIL_FROM - Adres nadawcy (np. "Wojciech Bożemski <noreply@bozemski.pl>")
 */

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

/**
 * Wysyła email przez Resend API
 */
export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; error?: string }> {
  const apiKey = Deno.env.get('RESEND_API_KEY');
  const fromEmail = Deno.env.get('EMAIL_FROM') || 'Wojciech Bożemski <noreply@bozemski.pl>';

  if (!apiKey) {
    console.error('RESEND_API_KEY nie jest ustawiony');
    return { success: false, error: 'Email service nie jest skonfigurowany' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: options.from || fromEmail,
        to: options.to,
        subject: options.subject,
        html: options.html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend API error:', data);
      return { success: false, error: data.message || 'Błąd wysyłania emaila' };
    }

    console.log('Email wysłany pomyślnie:', data.id);
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Nieznany błąd' };
  }
}

/**
 * Szablon emaila - Potwierdzenie rezerwacji (do klienta)
 */
export function bookingConfirmationEmail(booking: {
  userName: string;
  date: string;
  serviceType: string;
  note?: string;
}): string {
  const formattedDate = new Date(booking.date).toLocaleDateString('pl-PL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Potwierdzenie Rezerwacji</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a; color: #ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">
                ✨ Rezerwacja Przyjęta
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #e2e8f0;">
                Cześć <strong style="color: #ffffff;">${booking.userName}</strong>,
              </p>
              
              <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #e2e8f0;">
                Dziękujemy za umówienie wizyty! Twoja rezerwacja została przyjęta i oczekuje na potwierdzenie.
              </p>

              <!-- Booking Details Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 24px; margin: 30px 0; border: 1px solid rgba(255, 255, 255, 0.1);">
                <tr>
                  <td style="padding-bottom: 16px;">
                    <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #ffffff; border-bottom: 2px solid #7c3aed; padding-bottom: 12px;">
                      📅 Szczegóły Rezerwacji
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="margin: 0; font-size: 14px; color: #94a3b8; margin-bottom: 4px;">Data i godzina:</p>
                    <p style="margin: 0; font-size: 18px; font-weight: 600; color: #ffffff;">${formattedDate}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="margin: 0; font-size: 14px; color: #94a3b8; margin-bottom: 4px;">Rodzaj terapii:</p>
                    <p style="margin: 0; font-size: 18px; font-weight: 600; color: #ffffff;">${booking.serviceType}</p>
                  </td>
                </tr>
                ${booking.note ? `
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="margin: 0; font-size: 14px; color: #94a3b8; margin-bottom: 4px;">Twoja wiadomość:</p>
                    <p style="margin: 0; font-size: 16px; color: #e2e8f0; font-style: italic;">"${booking.note}"</p>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                    <p style="margin: 0; font-size: 13px; color: #64748b; background-color: rgba(251, 191, 36, 0.1); padding: 12px; border-radius: 8px; border-left: 3px solid #fbbf24;">
                      ⏳ Status: <strong style="color: #fbbf24;">Oczekuje na potwierdzenie</strong><br>
                      Otrzymasz kolejny email, gdy termin zostanie potwierdzony.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 20px; font-size: 16px; line-height: 1.6; color: #e2e8f0;">
                Jeśli masz pytania lub chcesz zmienić termin, skontaktuj się ze mną:
              </p>

              <!-- Contact Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(124, 58, 237, 0.1); border-radius: 8px; padding: 20px; margin: 20px 0;">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 8px; font-size: 14px; color: #c4b5fd;">
                      📧 kontakt@wojciechbozemski.pl
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #c4b5fd;">
                      📱 +48 XXX XXX XXX
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 0; font-size: 14px; line-height: 1.6; color: #94a3b8; text-align: center;">
                Z energią i światłem,<br>
                <strong style="color: #ffffff;">Wojciech Bożemski</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: rgba(0, 0, 0, 0.2); text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <p style="margin: 0 0 8px; font-size: 12px; color: #64748b;">
                © ${new Date().getFullYear()} Bozemski.pl - Terapia Energetyczna
              </p>
              <p style="margin: 0; font-size: 12px; color: #64748b;">
                Ta wiadomość została wysłana automatycznie. Prosimy nie odpowiadać na ten email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Szablon emaila - Rezerwacja potwierdzona (do klienta)
 */
export function bookingConfirmedEmail(booking: {
  userName: string;
  date: string;
  serviceType: string;
}): string {
  const formattedDate = new Date(booking.date).toLocaleDateString('pl-PL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rezerwacja Potwierdzona</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a; color: #ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #065f46 0%, #047857 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">
                ✅ Rezerwacja Potwierdzona!
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #e2e8f0;">
                Cześć <strong style="color: #ffffff;">${booking.userName}</strong>,
              </p>
              
              <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #e2e8f0;">
                Świetna wiadomość! Twoja rezerwacja została potwierdzona. Do zobaczenia na sesji! 🌟
              </p>

              <!-- Booking Details Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 24px; margin: 30px 0; border: 1px solid rgba(255, 255, 255, 0.1);">
                <tr>
                  <td style="padding-bottom: 16px;">
                    <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #ffffff; border-bottom: 2px solid #10b981; padding-bottom: 12px;">
                      📅 Szczegóły Sesji
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="margin: 0; font-size: 14px; color: #94a3b8; margin-bottom: 4px;">Data i godzina:</p>
                    <p style="margin: 0; font-size: 18px; font-weight: 600; color: #ffffff;">${formattedDate}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="margin: 0; font-size: 14px; color: #94a3b8; margin-bottom: 4px;">Rodzaj terapii:</p>
                    <p style="margin: 0; font-size: 18px; font-weight: 600; color: #ffffff;">${booking.serviceType}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                    <p style="margin: 0; font-size: 13px; color: #86efac; background-color: rgba(16, 185, 129, 0.1); padding: 12px; border-radius: 8px; border-left: 3px solid #10b981;">
                      ✅ Status: <strong style="color: #10b981;">Potwierdzona</strong>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Preparation Tips -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(124, 58, 237, 0.1); border-radius: 8px; padding: 20px; margin: 20px 0;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 12px; font-size: 16px; font-weight: 600; color: #ffffff;">
                      💡 Przygotowanie do sesji:
                    </h3>
                    <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #e2e8f0;">
                      <li>Załóż wygodne ubranie</li>
                      <li>Zjedz lekki posiłek 1-2h przed sesją</li>
                      <li>Unikaj kofeiny tego dnia</li>
                      <li>Przyjdź z otwartością na doświadczenie</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 0; font-size: 14px; line-height: 1.6; color: #94a3b8; text-align: center;">
                Z energią i światłem,<br>
                <strong style="color: #ffffff;">Wojciech Bożemski</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: rgba(0, 0, 0, 0.2); text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <p style="margin: 0 0 8px; font-size: 12px; color: #64748b;">
                © ${new Date().getFullYear()} Bozemski.pl - Terapia Energetyczna
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Szablon emaila - Rezerwacja anulowana (do klienta)
 */
export function bookingCancelledEmail(booking: {
  userName: string;
  date: string;
  serviceType: string;
}): string {
  const formattedDate = new Date(booking.date).toLocaleDateString('pl-PL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rezerwacja Anulowana</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a; color: #ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">
                ❌ Rezerwacja Anulowana
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #e2e8f0;">
                Cześć <strong style="color: #ffffff;">${booking.userName}</strong>,
              </p>
              
              <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #e2e8f0;">
                Niestety, Twoja rezerwacja została anulowana. Szczegóły poniżej.
              </p>

              <!-- Booking Details Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 24px; margin: 30px 0; border: 1px solid rgba(255, 255, 255, 0.1);">
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="margin: 0; font-size: 14px; color: #94a3b8; margin-bottom: 4px;">Data i godzina:</p>
                    <p style="margin: 0; font-size: 18px; font-weight: 600; color: #ffffff;">${formattedDate}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="margin: 0; font-size: 14px; color: #94a3b8; margin-bottom: 4px;">Rodzaj terapii:</p>
                    <p style="margin: 0; font-size: 18px; font-weight: 600; color: #ffffff;">${booking.serviceType}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                    <p style="margin: 0; font-size: 13px; color: #fca5a5; background-color: rgba(239, 68, 68, 0.1); padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
                      ❌ Status: <strong style="color: #ef4444;">Anulowana</strong>
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 20px; font-size: 16px; line-height: 1.6; color: #e2e8f0;">
                Jeśli chcesz umówić nowy termin, możesz to zrobić przez formularz na stronie lub kontaktując się bezpośrednio:
              </p>

              <!-- Contact Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(124, 58, 237, 0.1); border-radius: 8px; padding: 20px; margin: 20px 0;">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 8px; font-size: 14px; color: #c4b5fd;">
                      📧 kontakt@wojciechbozemski.pl
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #c4b5fd;">
                      📱 +48 XXX XXX XXX
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 0; font-size: 14px; line-height: 1.6; color: #94a3b8; text-align: center;">
                Z energią i światłem,<br>
                <strong style="color: #ffffff;">Wojciech Bożemski</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: rgba(0, 0, 0, 0.2); text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <p style="margin: 0 0 8px; font-size: 12px; color: #64748b;">
                © ${new Date().getFullYear()} Bozemski.pl - Terapia Energetyczna
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Szablon emaila - Powiadomienie dla admina o nowej rezerwacji
 */
export function adminNewBookingEmail(booking: {
  userName: string;
  userEmail: string;
  date: string;
  serviceType: string;
  note?: string;
}): string {
  const formattedDate = new Date(booking.date).toLocaleDateString('pl-PL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nowa Rezerwacja</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a; color: #ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">
                🔔 Nowa Rezerwacja
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #e2e8f0;">
                Masz nową rezerwację wymagającą potwierdzenia.
              </p>

              <!-- Booking Details Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 24px; margin: 30px 0; border: 1px solid rgba(255, 255, 255, 0.1);">
                <tr>
                  <td style="padding-bottom: 16px;">
                    <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #ffffff; border-bottom: 2px solid #7c3aed; padding-bottom: 12px;">
                      📅 Szczegóły Rezerwacji
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="margin: 0; font-size: 14px; color: #94a3b8; margin-bottom: 4px;">Klient:</p>
                    <p style="margin: 0; font-size: 18px; font-weight: 600; color: #ffffff;">${booking.userName}</p>
                    <p style="margin: 0; font-size: 14px; color: #94a3b8;">${booking.userEmail}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="margin: 0; font-size: 14px; color: #94a3b8; margin-bottom: 4px;">Data i godzina:</p>
                    <p style="margin: 0; font-size: 18px; font-weight: 600; color: #ffffff;">${formattedDate}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="margin: 0; font-size: 14px; color: #94a3b8; margin-bottom: 4px;">Rodzaj terapii:</p>
                    <p style="margin: 0; font-size: 18px; font-weight: 600; color: #ffffff;">${booking.serviceType}</p>
                  </td>
                </tr>
                ${booking.note ? `
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="margin: 0; font-size: 14px; color: #94a3b8; margin-bottom: 4px;">Wiadomość od klienta:</p>
                    <p style="margin: 0; font-size: 16px; color: #e2e8f0; font-style: italic;">"${booking.note}"</p>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                    <p style="margin: 0; font-size: 13px; color: #fbbf24; background-color: rgba(251, 191, 36, 0.1); padding: 12px; border-radius: 8px; border-left: 3px solid #fbbf24;">
                      ⏳ Status: <strong style="color: #fbbf24;">Oczekuje na potwierdzenie</strong>
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 0; font-size: 14px; line-height: 1.6; color: #94a3b8; text-align: center;">
                Zaloguj się do panelu administratora, aby potwierdzić lub anulować rezerwację.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: rgba(0, 0, 0, 0.2); text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <p style="margin: 0; font-size: 12px; color: #64748b;">
                © ${new Date().getFullYear()} Bozemski.pl - Panel Administratora
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Szablon emaila - Powitalny po rejestracji
 */
export function welcomeEmail(userName: string, userEmail: string): string {
  return `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Witamy!</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a; color: #ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">
                ✨ Witamy w Bozemski.pl!
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #e2e8f0;">
                Cześć <strong style="color: #ffffff;">${userName}</strong>,
              </p>
              
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #e2e8f0;">
                Dziękujemy za rejestrację! Cieszymy się, że jesteś z nami na tej ścieżce do równowagi energetycznej i zdrowia.
              </p>

              <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #e2e8f0;">
                Teraz możesz:
              </p>

              <!-- Features List -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 24px; margin: 30px 0; border: 1px solid rgba(255, 255, 255, 0.1);">
                <tr>
                  <td>
                    <ul style="margin: 0; padding-left: 20px; font-size: 16px; line-height: 2; color: #e2e8f0;">
                      <li>📅 Umówić sesję terapeutyczną</li>
                      <li>📚 Przeglądać artykuły i wiedzę</li>
                      <li>🎵 Korzystać ze Strefy Audio</li>
                      <li>💬 Rozmawiać z naszym chatbotem</li>
                      <li>📊 Śledzić swoje postępy</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 20px; font-size: 16px; line-height: 1.6; color: #e2e8f0;">
                Jeśli masz pytania, jestem dostępny:
              </p>

              <!-- Contact Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(124, 58, 237, 0.1); border-radius: 8px; padding: 20px; margin: 20px 0;">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 8px; font-size: 14px; color: #c4b5fd;">
                      📧 kontakt@wojciechbozemski.pl
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #c4b5fd;">
                      📱 +48 XXX XXX XXX
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 0; font-size: 14px; line-height: 1.6; color: #94a3b8; text-align: center;">
                Z energią i światłem,<br>
                <strong style="color: #ffffff;">Wojciech Bożemski</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: rgba(0, 0, 0, 0.2); text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <p style="margin: 0 0 8px; font-size: 12px; color: #64748b;">
                © ${new Date().getFullYear()} Bozemski.pl - Terapia Energetyczna
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
