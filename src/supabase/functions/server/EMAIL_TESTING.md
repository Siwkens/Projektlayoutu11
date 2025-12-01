# 🧪 Testowanie Emaili

## Endpoint Testowy

Dodano endpoint do testowania wszystkich typów emaili. Dostępny tylko dla administratorów.

### Endpoint

```
POST /make-server-139d10cf/test-email
```

### Autoryzacja

Wymagany token autoryzacji w headerze:
```
Authorization: Bearer <token>
```

Tylko administratorzy mogą używać tego endpointu.

### Request Body

```json
{
  "type": "welcome" | "booking-confirmation" | "booking-confirmed" | "booking-cancelled" | "admin-notification",
  "to": "twoj-email@example.com"
}
```

### Dostępne Typy Emaili

1. **`welcome`** - Email powitalny po rejestracji
2. **`booking-confirmation`** - Potwierdzenie otrzymania rezerwacji (do klienta)
3. **`booking-confirmed`** - Rezerwacja potwierdzona (do klienta)
4. **`booking-cancelled`** - Rezerwacja anulowana (do klienta)
5. **`admin-notification`** - Powiadomienie dla admina o nowej rezerwacji

### Przykład Użycia

#### cURL

```bash
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/make-server-139d10cf/test-email \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "welcome",
    "to": "test@example.com"
  }'
```

#### JavaScript/TypeScript

```typescript
const response = await fetch(
  'https://YOUR_PROJECT.supabase.co/functions/v1/make-server-139d10cf/test-email',
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'booking-confirmation',
      to: 'test@example.com',
    }),
  }
);

const result = await response.json();
console.log(result);
```

### Response

#### Sukces (200)

```json
{
  "success": true,
  "message": "Email typu 'welcome' wysłany pomyślnie do test@example.com",
  "type": "welcome",
  "to": "test@example.com"
}
```

#### Błąd (400/403/500)

```json
{
  "success": false,
  "error": "Błąd wysyłania emaila",
  "type": "welcome",
  "to": "test@example.com"
}
```

### Przykłady Testowania

#### 1. Test Emaila Powitalnego

```bash
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/make-server-139d10cf/test-email \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"type": "welcome", "to": "twoj-email@gmail.com"}'
```

#### 2. Test Potwierdzenia Rezerwacji

```bash
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/make-server-139d10cf/test-email \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"type": "booking-confirmation", "to": "twoj-email@gmail.com"}'
```

#### 3. Test Powiadomienia dla Admina

```bash
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/make-server-139d10cf/test-email \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"type": "admin-notification", "to": "wojciech@bozemski.pl"}'
```

### Uwagi

- ✅ Endpoint jest bezpieczny - tylko administratorzy mogą go używać
- ✅ Wszystkie emaile są wysyłane przez Resend API
- ✅ Sprawdź logi w Supabase Dashboard jeśli email nie dotrze
- ✅ Użyj domeny testowej Resend (`onboarding.resend.dev`) do testów lokalnych

### Troubleshooting

**Problem:** Błąd 403 Forbidden
- **Rozwiązanie:** Upewnij się, że jesteś zalogowany jako administrator

**Problem:** Błąd 400 Bad Request
- **Rozwiązanie:** Sprawdź czy `type` i `to` są poprawnie ustawione

**Problem:** Email nie dotarł
- **Rozwiązanie:** 
  1. Sprawdź folder SPAM
  2. Sprawdź logi w Supabase Dashboard
  3. Sprawdź czy `RESEND_API_KEY` jest poprawnie skonfigurowany
  4. Sprawdź czy adres `to` jest poprawny

---

**Status:** ✅ Gotowe do użycia  
**Ostatnia aktualizacja:** Grudzień 2024
