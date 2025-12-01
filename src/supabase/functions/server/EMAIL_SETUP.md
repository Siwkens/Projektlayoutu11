# 📧 Konfiguracja Systemu Powiadomień Email

System powiadomień email został zaimplementowany z użyciem **Resend API** - nowoczesnego serwisu do wysyłania emaili transakcyjnych.

---

## 🚀 Szybki Start

### 1. Utwórz konto w Resend

1. Przejdź na [https://resend.com](https://resend.com)
2. Zarejestruj się (darmowe konto)
3. Zweryfikuj swoją domenę (lub użyj domeny testowej `onboarding.resend.dev`)

### 2. Uzyskaj API Key

1. W panelu Resend przejdź do **API Keys**
2. Kliknij **Create API Key**
3. Nadaj nazwę (np. "Bozemski.pl Production")
4. Skopiuj wygenerowany klucz (zaczyna się od `re_...`)

### 3. Skonfiguruj zmienne środowiskowe w Supabase

#### Opcja A: Przez Supabase Dashboard

1. Przejdź do swojego projektu w [Supabase Dashboard](https://app.supabase.com)
2. Przejdź do **Project Settings** → **Edge Functions** → **Secrets**
3. Dodaj następujące zmienne:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=Wojciech Bożemski <noreply@bozemski.pl>
```

**Uwaga:** Zamień `noreply@bozemski.pl` na swój zweryfikowany adres email w Resend.

#### Opcja B: Przez Supabase CLI

```bash
# Zainstaluj Supabase CLI jeśli jeszcze nie masz
npm install -g supabase

# Zaloguj się
supabase login

# Ustaw secrets
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
supabase secrets set EMAIL_FROM="Wojciech Bożemski <noreply@bozemski.pl>"
```

---

## 📨 Typy Emaili

System automatycznie wysyła następujące emaile:

### 1. **Email powitalny** (po rejestracji)
- **Kiedy:** Gdy użytkownik rejestruje się na stronie
- **Odbiorca:** Nowy użytkownik
- **Temat:** "✨ Witamy w Bozemski.pl!"

### 2. **Potwierdzenie rezerwacji** (do klienta)
- **Kiedy:** Gdy klient utworzy rezerwację
- **Odbiorca:** Klient
- **Temat:** "✨ Rezerwacja przyjęta - Bozemski.pl"
- **Zawartość:** Szczegóły rezerwacji, status "Oczekuje na potwierdzenie"

### 3. **Powiadomienie dla admina** (o nowej rezerwacji)
- **Kiedy:** Gdy klient utworzy rezerwację
- **Odbiorca:** Administratorzy (wojciech@bozemski.pl, patryk.siwkens@gmail.com)
- **Temat:** "🔔 Nowa rezerwacja od [Imię]"
- **Zawartość:** Szczegóły rezerwacji do potwierdzenia

### 4. **Rezerwacja potwierdzona** (do klienta)
- **Kiedy:** Gdy admin potwierdzi rezerwację
- **Odbiorca:** Klient
- **Temat:** "✅ Rezerwacja potwierdzona - Bozemski.pl"
- **Zawartość:** Potwierdzenie terminu, wskazówki przygotowania

### 5. **Rezerwacja anulowana** (do klienta)
- **Kiedy:** Gdy admin anuluje rezerwację
- **Odbiorca:** Klient
- **Temat:** "❌ Rezerwacja anulowana - Bozemski.pl"
- **Zawartość:** Informacja o anulowaniu, kontakt

---

## 🎨 Szablony Emaili

Wszystkie szablony znajdują się w pliku `/src/supabase/functions/server/email.tsx`:

- `bookingConfirmationEmail()` - Potwierdzenie rezerwacji
- `bookingConfirmedEmail()` - Rezerwacja potwierdzona
- `bookingCancelledEmail()` - Rezerwacja anulowana
- `adminNewBookingEmail()` - Powiadomienie dla admina
- `welcomeEmail()` - Email powitalny

### Dostosowywanie szablonów

Możesz edytować szablony bezpośrednio w pliku `email.tsx`. Szablony używają HTML inline z responsywnym designem.

**Kolory używane w szablonach:**
- Fioletowy gradient: `#7c3aed` → `#4f46e5` (główny brand)
- Zielony: `#10b981` (potwierdzenie)
- Czerwony: `#ef4444` (anulowanie)
- Żółty: `#fbbf24` (oczekiwanie)

---

## 🔧 Konfiguracja Zaawansowana

### Zmiana adresu nadawcy

Edytuj zmienną `EMAIL_FROM` w Supabase Secrets:

```
EMAIL_FROM=Twoje Imię <twoj-email@bozemski.pl>
```

**Wymagania:**
- Adres musi być zweryfikowany w Resend
- Format: `"Nazwa <email@domena.pl>"`

### Zmiana adresów adminów

Edytuj tablicę `ADMIN_EMAILS` w pliku `/src/supabase/functions/server/index.tsx`:

```typescript
const ADMIN_EMAILS = [
  "wojciech@bozemski.pl", 
  "patryk.siwkens@gmail.com",
  "nowy-admin@example.com" // Dodaj tutaj
];
```

### Wyłączenie wysyłania emaili (tryb deweloperski)

Możesz dodać warunek w kodzie, aby wyłączyć wysyłanie emaili w środowisku deweloperskim:

```typescript
const isProduction = Deno.env.get('ENVIRONMENT') === 'production';

if (isProduction) {
  await sendEmail({ ... });
}
```

---

## 🧪 Testowanie

### Testowanie lokalne

1. Użyj domeny testowej Resend: `onboarding.resend.dev`
2. Ustaw `EMAIL_FROM` na: `"Test <onboarding@resend.dev>"`
3. Wszystkie emaile będą wysyłane, ale trafią do folderu testowego w Resend

### Sprawdzanie logów

1. Przejdź do **Supabase Dashboard** → **Edge Functions** → **Logs**
2. Filtruj po nazwie funkcji: `make-server-139d10cf`
3. Szukaj logów z prefiksem `Email wysłany pomyślnie:` lub `Błąd wysyłania emaila:`

### Testowanie ręczne

Możesz przetestować wysyłanie emaili przez endpoint testowy (dodaj do `index.tsx`):

```typescript
app.post("/make-server-139d10cf/test-email", async (c) => {
  const { to } = await c.req.json();
  
  const result = await sendEmail({
    to: to || 'test@example.com',
    subject: 'Test Email',
    html: '<h1>To jest test!</h1>',
  });
  
  return c.json(result);
});
```

---

## 💰 Koszty Resend

### Darmowy Plan
- **100 emaili/dzień**
- **3,000 emaili/miesiąc**
- Wystarczający do startu

### Plan Pro ($20/miesiąc)
- **50,000 emaili/miesiąc**
- Więcej domen
- Zaawansowane analytics

### Plan Business ($80/miesiąc)
- **100,000 emaili/miesiąc**
- Dedicated IP
- Priority support

**Szacunkowe użycie:**
- 10 rezerwacji/dzień = ~30 emaili/dzień (klient + admin)
- 300 emaili/miesiąc = **Darmowy plan wystarczy!**

---

## 🐛 Rozwiązywanie Problemów

### Problem: Emails nie są wysyłane

**Sprawdź:**
1. Czy `RESEND_API_KEY` jest ustawiony w Supabase Secrets?
2. Czy klucz API jest poprawny (zaczyna się od `re_`)?
3. Czy adres `EMAIL_FROM` jest zweryfikowany w Resend?
4. Sprawdź logi w Supabase Dashboard

### Problem: Błąd "Email service nie jest skonfigurowany"

**Rozwiązanie:**
- Ustaw zmienną `RESEND_API_KEY` w Supabase Secrets

### Problem: Emails trafiają do spamu

**Rozwiązanie:**
1. Zweryfikuj swoją domenę w Resend (SPF, DKIM, DMARC)
2. Użyj zweryfikowanego adresu nadawcy
3. Unikaj słów spamowych w treści
4. Dodaj link do rezygnacji z subskrypcji

### Problem: Błąd "Invalid API key"

**Rozwiązanie:**
- Sprawdź czy klucz API jest poprawny
- Upewnij się, że nie ma dodatkowych spacji w zmiennej środowiskowej
- Wygeneruj nowy klucz w Resend

---

## 📊 Monitoring i Analytics

### Resend Dashboard

1. Przejdź do [Resend Dashboard](https://resend.com/emails)
2. Zobacz statystyki:
   - Wysłane emaile
   - Otwarcia (open rate)
   - Kliknięcia (click rate)
   - Błędy dostarczenia

### Supabase Logs

Wszystkie błędy wysyłania są logowane w Supabase Edge Functions logs.

---

## 🔒 Bezpieczeństwo

- ✅ API Key jest przechowywany jako secret w Supabase (nie w kodzie)
- ✅ Wszystkie emaile są wysyłane przez bezpieczne połączenie HTTPS
- ✅ Resend automatycznie weryfikuje adresy email
- ✅ Brak wrażliwych danych w logach

---

## 📝 Checklist Wdrożenia

- [ ] Utworzono konto w Resend
- [ ] Zweryfikowano domenę (lub użyto domeny testowej)
- [ ] Wygenerowano API Key
- [ ] Ustawiono `RESEND_API_KEY` w Supabase Secrets
- [ ] Ustawiono `EMAIL_FROM` w Supabase Secrets
- [ ] Przetestowano wysyłanie emaila testowego
- [ ] Zweryfikowano otrzymywanie emaili
- [ ] Zaktualizowano adresy adminów (jeśli potrzeba)
- [ ] Dostosowano szablony emaili (jeśli potrzeba)

---

## 🆘 Wsparcie

- **Resend Docs:** [https://resend.com/docs](https://resend.com/docs)
- **Supabase Edge Functions:** [https://supabase.com/docs/guides/functions](https://supabase.com/docs/guides/functions)
- **Logi:** Supabase Dashboard → Edge Functions → Logs

---

**Status:** ✅ Gotowe do użycia  
**Ostatnia aktualizacja:** Grudzień 2024
