# 🔐 Informacje o kontach administratorów

## 📋 Zaktualizowane dane dostępowe

### Główne konto administratora
- **Email:** `wojciech@bozemski.pl`
- **Hasło:** `Wojciech2026`
- **Status:** Gotowe do użycia
- **Uprawnienia:** Pełny dostęp do panelu administracyjnego

---

## 🚀 Jak zaktualizować konto?

Przygotowałem **3 sposoby** na łatwą aktualizację konta `admin@test.pl` → `wojciech@bozemski.pl`:

### Metoda 1: AdminUpdater (Najłatwiejsza) ✨

Komponent AdminUpdater jest już zintegrowany w aplikacji. Możesz go aktywować na 3 sposoby:

#### **Desktop:**
- Naciśnij: `Ctrl + Alt + U`
- Otworzy się panel w prawym dolnym rogu
- Kliknij przycisk "Zaktualizuj konto"

#### **Mobile - URL parameter:**
- Dodaj do URL: `?admin=true`
- Przykład: `https://twoja-strona.com?admin=true`

#### **Mobile - Gesture:**
- Kliknij 5x szybko w **prawy górny róg ekranu** (100px x 100px)
- Pojawi się licznik tapnięć (1/5, 2/5, itd.)
- Po 5 tapnięciach otworzy się panel

---

### Metoda 2: Konsola przeglądarki 💻

1. Otwórz aplikację w przeglądarce
2. Naciśnij `F12` aby otworzyć DevTools
3. Przejdź do zakładki **Console**
4. Skrypt `updateAdmin.ts` uruchomi się automatycznie i zaktualizuje konto

Zobaczysz komunikaty:
```
🔄 Rozpoczynam aktualizację konta administratora...
📧 Zmiana z: admin@test.pl → wojciech@bozemski.pl
✅ Sukces!
🎉 Konto administratora zostało zaktualizowane!
🔐 Możesz się teraz zalogować używając:
   Email: wojciech@bozemski.pl
   Hasło: Wojciech2026
```

---

### Metoda 3: API Request (Dla zaawansowanych) 🛠️

```bash
curl -X PUT https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-139d10cf/update-admin \
  -H "Content-Type: application/json" \
  -d '{
    "oldEmail": "admin@test.pl",
    "newEmail": "wojciech@bozemski.pl",
    "newPassword": "Wojciech2026"
  }'
```

---

## 👥 Wszyscy administratorzy w systemie

| # | Email | Hasło | Status | Uprawnienia |
|---|-------|-------|--------|-------------|
| 1 | `wojciech@bozemski.pl` | `Wojciech2026` | ✅ Aktywny | Pełny admin |
| 2 | `bozemskiw@gmail.com` | *(ustaw samodzielnie)* | ✅ Aktywny | Pełny admin |
| 3 | `patryk.siwkens@gmail.com` | *(ustaw samodzielnie)* | ⏳ Do ustawienia | Pełny admin |
| 4 | `admin@test.pl` | `Admin123!` | ⚠️ Testowe | Pełny admin |

---

## 🔒 Uprawnienia administratorów

Administratorzy mają dostęp do:

✅ **Zarządzanie rezerwacjami**
- Przeglądanie wszystkich rezerwacji użytkowników
- Potwierdzanie/anulowanie rezerwacji
- Endpoint: `/make-server-139d10cf/bookings`

✅ **Zarządzanie blogiem**
- Tworzenie artykułów (`POST /blog/articles`)
- Edycja artykułów (`PUT /blog/articles/:id`)
- Usuwanie artykułów (`DELETE /blog/articles/:id`)

✅ **Panel administracyjny**
- Dostęp do komponentu `AdminDashboard`
- Statystyki i analityka
- Zarządzanie użytkownikami

---

## 📝 Jak dodać kolejnego administratora?

### Przez AdminUpdater lub API:

```bash
POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-139d10cf/create-admin
Content-Type: application/json

{
  "email": "nowy-admin@example.com",
  "password": "BezpieczneHaslo123!",
  "name": "Jan Kowalski"
}
```

### Ważne:
Po utworzeniu nowego konta, musisz dodać jego email do listy w pliku `/supabase/functions/server/index.tsx` w liniach:
- 153 (Booking route)
- 175 (Update booking)
- 470 (Create blog article)
- 511 (Update blog article)
- 544 (Delete blog article)

Znajdź:
```typescript
const ADMIN_EMAILS = ["wojciech@bozemski.pl", "bozemskiw@gmail.com", "patryk.siwkens@gmail.com", "admin@test.pl"];
```

I dodaj nowy email:
```typescript
const ADMIN_EMAILS = ["wojciech@bozemski.pl", "bozemskiw@gmail.com", "patryk.siwkens@gmail.com", "admin@test.pl", "nowy-admin@example.com"];
```

---

## 🔐 Zmiana hasła administratora

Użyj tego samego endpointu `/update-admin`:

```bash
PUT /make-server-139d10cf/update-admin
{
  "oldEmail": "wojciech@bozemski.pl",
  "newPassword": "NoweHaslo2027!"
}
```

Lub użyj komponentu AdminUpdater (edytuj `/components/AdminUpdater.tsx` i zmień hasło w linii 90).

---

## ⚠️ Bezpieczeństwo

1. **Zmień hasło testowe** `Admin123!` w środowisku produkcyjnym
2. **Nie udostępniaj** haseł w publicznych repozytoriach
3. **Używaj silnych haseł** (minimum 12 znaków, litery, cyfry, znaki specjalne)
4. **Regularna rotacja** - zmieniaj hasła co 90 dni
5. Konta są automatycznie potwierdzane (`email_confirm: true`) - nie wymagają weryfikacji email

---

## 🆘 Troubleshooting

### Problem: "Użytkownik już istnieje"
✅ Rozwiązanie: Użyj endpointu `/update-admin` zamiast `/create-admin`

### Problem: "Unauthorized"
✅ Rozwiązanie: Upewnij się, że wysyłasz poprawny token autoryzacji lub używasz publicznego endpointu

### Problem: Nie widzę panelu AdminUpdater
✅ Rozwiązanie:
- Desktop: Naciśnij `Ctrl + Alt + U`
- Mobile: Dodaj `?admin=true` do URL
- Mobile: Kliknij 5x w prawy górny róg

---

## 📞 Kontakt

W razie problemów:
- Email: wojciech@bozemski.pl
- Panel admina: Zaloguj się i przejdź do sekcji "Admin"