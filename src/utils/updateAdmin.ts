import { projectId } from './supabase/info';

/**
 * Funkcja do aktualizacji danych administratora
 * Użyj w konsoli przeglądarki:
 * 
 * import { updateAdminAccount } from './utils/updateAdmin';
 * updateAdminAccount('admin@test.pl', 'wojciech@bozemski.pl', 'Wojciech123!');
 */
export async function updateAdminAccount(
  oldEmail: string,
  newEmail: string,
  newPassword: string
) {
  try {
    console.log('🔄 Rozpoczynam aktualizację konta administratora...');
    console.log('📧 Zmiana z:', oldEmail, '→', newEmail);

    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-139d10cf/update-admin`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldEmail,
          newEmail,
          newPassword,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Sukces!', data);
      console.log('');
      console.log('📋 Nowe dane logowania:');
      console.log('   Email:', data.newEmail);
      console.log('   Hasło:', newPassword);
      console.log('');
      return data;
    } else {
      console.error('❌ Błąd:', data);
      throw new Error(data.error || 'Błąd aktualizacji');
    }
  } catch (error) {
    console.error('❌ Wyjątek podczas aktualizacji:', error);
    throw error;
  }
}

// Wywołaj funkcję automatycznie
updateAdminAccount('admin@test.pl', 'wojciech@bozemski.pl', 'Wojciech123!')
  .then(() => {
    console.log('');
    console.log('🎉 Konto administratora zostało zaktualizowane!');
    console.log('🔐 Możesz się teraz zalogować używając:');
    console.log('   Email: wojciech@bozemski.pl');
    console.log('   Hasło: Wojciech123!');
  })
  .catch((error) => {
    console.error('💥 Nie udało się zaktualizować konta:', error.message);
  });
