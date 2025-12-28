# 🚀 SZYBKI START - WDROŻENIE

**Projekt gotowy do wdrożenia!** Wykonaj poniższe kroki:

---

## ⚡ SZYBKA ŚCIEŻKA (5 minut)

### 1. Przed wdrożeniem - KRYTYCZNE ✅
```bash
☑ Sprawdź czy wszystkie sekcje działają (scroll test)
☑ Zaloguj się jako admin (patryk.siwkens@gmail.com)
☑ Przetestuj rezerwację sesji
☑ Sprawdź ChatBot (zadaj pytanie o cenę)
```

### 2. Wdróż w Figma Make 🚀
```
1. Kliknij przycisk "Publish" w prawym górnym rogu
2. Poczekaj ~1-2 minuty na build
3. Otrzymasz URL: https://[project-id].figma.site
```

### 3. PO wdrożeniu - NATYCHMIAST ⚠️
```bash
1. Otwórz stronę produkcyjną
2. Naciśnij Ctrl+Alt+U (lub dodaj ?admin=true do URL)
3. Zmień konto admin:
   
   Stare dane:
   Email: admin@test.pl
   Hasło: Admin123!
   
   Nowe dane:
   Email: wojciech@bozemski.pl
   Hasło: Wojciech123!
   
4. Kliknij "Aktualizuj konto administratora"
5. Zaloguj się nowym kontem
```

### 4. Zaktualizuj dane kontaktowe 📞
Edytuj `/components/FloatingActionButton.tsx`:
```typescript
// Linia 17-19
} else if (label === 'Zadzwoń') {
  window.location.href = 'tel:+48XXXXX'; // ← ZMIEŃ NA PRAWDZIWY NUMER
} else if (label === 'Email') {
  window.location.href = 'mailto:kontakt@wojciechbozemski.pl'; // ← SPRAWDŹ EMAIL
}
```

### 5. Pierwsze testy produkcyjne ✅
```bash
☑ Zaloguj się jako wojciech@bozemski.pl
☑ Sprawdź Panel Administratora (UserMenu → Panel Administratora)
☑ Utwórz testową rezerwację
☑ Zmień status rezerwacji na "confirmed"
☑ Sprawdź czy ChatBot działa
☑ Przetestuj na telefonie
```

---

## 📋 CHECKLIST WDROŻENIA

### PRZED PUBLISH
- [ ] Wszystkie sekcje mają prawidłowe ID
- [ ] Nawigacja działa (kliknij każdy link)
- [ ] ChatBot odpowiada na pytania
- [ ] Rezerwacja sesji działa
- [ ] Admin może zalogować się
- [ ] Mobile menu działa

### PO PUBLISH
- [ ] Zmieniono konto admin na wojciech@bozemski.pl
- [ ] Zaktualizowano numer telefonu w FloatingActionButton
- [ ] Przetestowano rejestrację nowego użytkownika
- [ ] Przetestowano tworzenie rezerwacji
- [ ] Sprawdzono admin dashboard
- [ ] Sprawdzono na mobile (prawdziwe urządzenie)

---

## 🆘 SZYBKIE ROZWIĄZYWANIE PROBLEMÓW

### Problem: Błąd 401 przy rejestracji
**Rozwiązanie:** Sprawdź czy endpoint `/signup` jest w publicEndpoints
```typescript
// W /supabase/functions/server/index.tsx linia 38-44
const publicEndpoints = [
  '/make-server-139d10cf/signup' // ← MUSI BYĆ
];
```

### Problem: Admin nie może się zalogować
**Rozwiązanie:** 
1. Sprawdź czy email jest w ADMIN_EMAILS
2. Użyj Ctrl+Alt+U aby zmienić hasło
3. Sprawdź Supabase Dashboard → Auth → Users

### Problem: Rezerwacje nie zapisują się
**Rozwiązanie:**
1. Sprawdź Network tab (F12) → szukaj 401/500
2. Sprawdź Authorization header w request
3. Sprawdź Supabase Dashboard → Table Editor → kv_store_139d10cf

### Problem: ChatBot nie działa
**Rozwiązanie:**
1. Otwórz Console (F12)
2. Sprawdź czy są błędy JavaScript
3. Sprawdź czy scroll_to używa prawidłowych ID (chakra-map, services, etc.)

### Problem: Nawigacja nie scroll'uje
**Rozwiązanie:**
1. Sprawdź czy sekcje mają odpowiednie `id` attributes
2. W App.tsx każda SectionTransition powinna mieć `id` prop
3. ID musi pasować do href w Navigation

---

## 📊 MONITORING PO WDROŻENIU

### Sprawdź logi w Supabase
```
1. Otwórz https://supabase.com/dashboard
2. Wybierz projekt: upslsklauyerlkyisngq
3. Kliknij Edge Functions → make-server-139d10cf → Logs
4. Sprawdź czy są błędy (czerwone wpisy)
```

### Performance Monitor (opcjonalne)
```
1. Na stronie naciśnij Ctrl+Shift+P
2. Zobacz FPS, Memory usage, Component render times
3. Jeśli FPS < 30 → sprawdź czy 3D tło nie jest zbyt ciężkie
```

---

## 🎯 KLUCZOWE ENDPOINTY DO PRZETESTOWANIA

### Publiczne (działają bez logowania)
```bash
# Health check
GET https://upslsklauyerlkyisngq.supabase.co/functions/v1/make-server-139d10cf/health

# Artykuły bloga
GET https://upslsklauyerlkyisngq.supabase.co/functions/v1/make-server-139d10cf/blog/articles

# Rejestracja
POST https://upslsklauyerlkyisngq.supabase.co/functions/v1/make-server-139d10cf/signup
Body: { "email": "test@test.pl", "password": "Test123!" }
```

### Chronione (wymagają zalogowania)
```bash
# Tworzenie rezerwacji
POST https://upslsklauyerlkyisngq.supabase.co/functions/v1/make-server-139d10cf/bookings
Headers: { "Authorization": "Bearer [access_token]" }
Body: { "date": "2024-12-30", "serviceType": "Bioterapia", "user_name": "Jan", "user_email": "jan@test.pl" }

# Lista rezerwacji
GET https://upslsklauyerlkyisngq.supabase.co/functions/v1/make-server-139d10cf/bookings
Headers: { "Authorization": "Bearer [access_token]" }
```

---

## 📱 TEST NA MOBILE (WAŻNE!)

### Przed publikacją
```
1. Otwórz Chrome DevTools (F12)
2. Kliknij toggle device toolbar (Ctrl+Shift+M)
3. Wybierz iPhone 12 Pro
4. Testuj:
   ☑ Menu hamburger otwiera się
   ☑ ChatBot działa
   ☑ UserMenu działa
   ☑ Formularz rezerwacji działa
   ☑ Scroll jest smooth
```

### Po publikacji
```
1. Otwórz na prawdziwym telefonie
2. Sprawdź te same rzeczy co wyżej
3. Sprawdź czy animacje nie lagują
4. Sprawdź czy klawiatura nie zasłania inputów
```

---

## ✅ GOTOWE!

Po wykonaniu wszystkich kroków Twoja strona jest:
- ✅ Wdrożona produkcyjnie
- ✅ Zabezpieczona (admin zmieniony)
- ✅ Przetestowana
- ✅ Gotowa do użytku przez pacjentów

---

## 📞 DANE DOSTĘPOWE

### Konto Administratora (PO ZMIANIE)
```
Email: wojciech@bozemski.pl
Hasło: Wojciech123!
```

### Supabase Dashboard
```
URL: https://supabase.com/dashboard/project/upslsklauyerlkyisngq
```

### Strona Produkcyjna
```
URL: [będzie dostępny po publish w Figma Make]
```

---

**Powodzenia! 🚀**

Jeśli masz pytania, sprawdź pełny raport w `/DEPLOYMENT_CHECKLIST.md`
