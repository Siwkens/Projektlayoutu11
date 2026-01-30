// Email templates for notifications

export interface BookingEmailData {
  userName: string;
  date: string;
  time: string;
  serviceType: string;
  note?: string;
}

export const getBookingConfirmationEmail = (data: BookingEmailData): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Potwierdzenie rezerwacji</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <table width="100%" cellpadding="0" cellspacing="0" style="min-height: 100vh;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden;">
              
              <!-- Header with gradient -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700;">✨ Potwierdzenie Rezerwacji</h1>
                  <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Twoja sesja została zarezerwowana</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <p style="margin: 0 0 20px; color: #333; font-size: 16px; line-height: 1.6;">
                    Cześć <strong>${data.userName}</strong>,
                  </p>
                  
                  <p style="margin: 0 0 30px; color: #666; font-size: 15px; line-height: 1.6;">
                    Dziękuję za zaufanie i zarezerwowanie sesji terapeutycznej. Z niecierpliwością czekam na spotkanie!
                  </p>
                  
                  <!-- Details card -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); border-radius: 12px; overflow: hidden; margin-bottom: 30px;">
                    <tr>
                      <td style="padding: 30px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.5);">
                              <p style="margin: 0; color: #667eea; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">📅 Data</p>
                              <p style="margin: 5px 0 0; color: #2d3748; font-size: 18px; font-weight: 700;">${data.date}</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.5);">
                              <p style="margin: 0; color: #667eea; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">⏰ Godzina</p>
                              <p style="margin: 5px 0 0; color: #2d3748; font-size: 18px; font-weight: 700;">${data.time}</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.5);">
                              <p style="margin: 0; color: #667eea; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">🌟 Rodzaj sesji</p>
                              <p style="margin: 5px 0 0; color: #2d3748; font-size: 18px; font-weight: 700;">${data.serviceType}</p>
                            </td>
                          </tr>
                          ${data.note ? `
                          <tr>
                            <td style="padding: 12px 0;">
                              <p style="margin: 0; color: #667eea; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">📝 Notatka</p>
                              <p style="margin: 5px 0 0; color: #2d3748; font-size: 15px; line-height: 1.6;">${data.note}</p>
                            </td>
                          </tr>
                          ` : ''}
                        </table>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Info box -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f7fafc; border-left: 4px solid #667eea; border-radius: 8px; margin-bottom: 30px;">
                    <tr>
                      <td style="padding: 20px;">
                        <p style="margin: 0; color: #4a5568; font-size: 14px; line-height: 1.6;">
                          💡 <strong>Przygotowanie do sesji:</strong><br>
                          Postaw się w spokojnym miejscu, gdzie nikt Ci nie przeszkodzi. Przygotuj wygodną przestrzeń do relaksacji.
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="margin: 0 0 20px; color: #666; font-size: 14px; line-height: 1.6;">
                    Jeśli masz jakiekolwiek pytania lub potrzebujesz zmienić termin, skontaktuj się ze mną.
                  </p>
                  
                  <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">
                    Do zobaczenia!<br>
                    <strong style="color: #667eea;">Wojciech Bożemski</strong><br>
                    Terapeuta Energetyczny
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background: #f7fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0 0 10px; color: #718096; font-size: 13px;">
                    © 2026 Wojciech Bożemski - Terapia Energetyczna
                  </p>
                  <p style="margin: 0; color: #a0aec0; font-size: 12px;">
                    Ten email został wysłany automatycznie. Nie odpowiadaj na tę wiadomość.
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

export const getAdminNotificationEmail = (data: BookingEmailData): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nowa rezerwacja</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f7fafc;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              
              <tr>
                <td style="background: #2d3748; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
                  <h1 style="margin: 0; color: white; font-size: 24px;">🔔 Nowa Rezerwacja</h1>
                </td>
              </tr>
              
              <tr>
                <td style="padding: 30px;">
                  <p style="margin: 0 0 20px; color: #2d3748; font-size: 16px; font-weight: 600;">
                    Klient: ${data.userName}
                  </p>
                  
                  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f7fafc; border-radius: 8px; margin-bottom: 20px;">
                    <tr>
                      <td style="padding: 20px;">
                        <p style="margin: 0 0 10px; color: #718096; font-size: 13px;">Data: <strong style="color: #2d3748;">${data.date}</strong></p>
                        <p style="margin: 0 0 10px; color: #718096; font-size: 13px;">Godzina: <strong style="color: #2d3748;">${data.time}</strong></p>
                        <p style="margin: 0; color: #718096; font-size: 13px;">Usługa: <strong style="color: #2d3748;">${data.serviceType}</strong></p>
                        ${data.note ? `<p style="margin: 10px 0 0; color: #718096; font-size: 13px;">Notatka: <strong style="color: #2d3748;">${data.note}</strong></p>` : ''}
                      </td>
                    </tr>
                  </table>
                  
                  <p style="margin: 0; color: #718096; font-size: 13px;">
                    Zaloguj się do panelu administracyjnego, aby zatwierdzić lub odrzucić rezerwację.
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

export const getReminderEmail = (data: BookingEmailData): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Przypomnienie o sesji</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
      <table width="100%" cellpadding="0" cellspacing="0" style="min-height: 100vh;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
              
              <tr>
                <td style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
                  <h1 style="margin: 0; color: white; font-size: 28px;">⏰ Przypomnienie o Sesji</h1>
                  <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Jutro spotykamy się!</p>
                </td>
              </tr>
              
              <tr>
                <td style="padding: 40px 30px;">
                  <p style="margin: 0 0 20px; color: #333; font-size: 16px;">
                    Cześć <strong>${data.userName}</strong>,
                  </p>
                  
                  <p style="margin: 0 0 30px; color: #666; font-size: 15px; line-height: 1.6;">
                    Przypominam o jutrzejszej sesji terapeutycznej:
                  </p>
                  
                  <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #fff5f5 0%, #ffe4e1 100%); border-radius: 12px; margin-bottom: 30px;">
                    <tr>
                      <td style="padding: 25px; text-align: center;">
                        <p style="margin: 0 0 8px; color: #f5576c; font-size: 14px; font-weight: 600;">JUTRO</p>
                        <p style="margin: 0 0 5px; color: #2d3748; font-size: 24px; font-weight: 700;">${data.time}</p>
                        <p style="margin: 0; color: #718096; font-size: 15px;">${data.serviceType}</p>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="margin: 0 0 20px; color: #666; font-size: 14px; line-height: 1.6;">
                    Pamiętaj o przygotowaniu spokojnej przestrzeni, gdzie będziesz mógł/mogła się zrelaksować bez żadnych przeszkód.
                  </p>
                  
                  <p style="margin: 0; color: #666; font-size: 14px;">
                    Do zobaczenia jutro!<br>
                    <strong style="color: #f5576c;">Wojciech Bożemski</strong>
                  </p>
                </td>
              </tr>
              
              <tr>
                <td style="background: #f7fafc; padding: 20px; text-align: center;">
                  <p style="margin: 0; color: #a0aec0; font-size: 12px;">
                    © 2026 Wojciech Bożemski - Terapia Energetyczna
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};
