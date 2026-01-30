# 🎨 SOCIAL WIDGET - INSTRUKCJA KONFIGURACJI

Widget z profilami społecznościowymi (Google Business + Facebook) wyświetlający się w lewym dolnym rogu strony.

---

## 🚀 **CO ZROBIĆ TERAZ**

### **1. Zaktualizuj linki w `/App.tsx`:**

Znajdź komponent `<SocialWidget />` i zmień wartości na prawdziwe:

```tsx
<SocialWidget 
  // 🔴 ZMIEŃ TO - Google Business Profile
  googleBusinessUrl="https://g.page/r/YOUR_GOOGLE_PLACE_ID"
  googleRating={4.9}
  googleReviewCount={127}
  
  // 🔴 ZMIEŃ TO - Facebook Page
  facebookPageUrl="https://www.facebook.com/WojciechBozemski"
  facebookPageName="Wojciech Bożemski - Terapia Energetyczna"
  facebookFollowers={1542}
  
  position="bottom-left"
  showOnMobile={true}
/>
```

---

## 📍 **JAK ZNALEŹĆ GOOGLE PLACE ID**

### **Metoda 1: Google My Business Dashboard**

1. Zaloguj się na https://business.google.com
2. Wybierz swoją firmę
3. W menu bocznym kliknij "Info"
4. Przewiń do "Place ID" lub "Link do profilu"
5. Skopiuj link (będzie wyglądał jak: `https://g.page/r/CabcdEfGhIjKlM`)

### **Metoda 2: Google Maps**

1. Otwórz https://www.google.com/maps
2. Wyszukaj swoją firmę
3. Kliknij na kartę firmy
4. Kliknij "Udostępnij" → "Kopiuj link"
5. Link będzie wyglądał jak: `https://maps.app.goo.gl/XXXX` lub `https://goo.gl/maps/XXXX`
6. Użyj tego linku w `googleBusinessUrl`

### **Metoda 3: Place ID Finder (najbardziej precyzyjna)**

1. Otwórz https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
2. Wpisz nazwę firmy i miasto
3. Kliknij na marker
4. Skopiuj "Place ID" (np. `ChIJN1t_tDeuEmsRUsoyG83frY4`)

**Uwaga:** Place ID to nie to samo co link! Użyj **linku** w komponencie.

---

## 📱 **JAK ZNALEŹĆ FACEBOOK PAGE URL**

### **Szybka metoda:**

1. Zaloguj się na Facebook
2. Otwórz swoją stronę firmową
3. Kliknij "Więcej" → "O" (About)
4. Przewiń do sekcji "Ogólne informacje"
5. Skopiuj URL strony (np. `https://www.facebook.com/WojciechBozemski`)

### **Opcjonalna customizacja URL:**

Jeśli Twój URL to `https://www.facebook.com/profile.php?id=123456789`:

1. Przejdź do Ustawień strony
2. Wybierz "Nazwa strony i nazwa użytkownika"
3. Ustaw własny username (np. `WojciechBozemski`)
4. Twój nowy URL: `https://www.facebook.com/WojciechBozemski`

---

## 🔢 **JAK SPRAWDZIĆ STATYSTYKI**

### **Google Rating & Reviews:**

1. Zaloguj się na https://business.google.com
2. Wybierz swoją firmę
3. Dashboard pokazuje:
   - ⭐ Średnia ocena (np. 4.9)
   - 📊 Liczba opinii (np. 127)

### **Facebook Followers:**

1. Zaloguj się na Facebook jako admin strony
2. Przejdź do "Statystyki" (Insights)
3. Sprawdź "Polubienia strony" i "Obserwujący"
4. Użyj liczby "Obserwujący" w widgecie

---

## ⚙️ **DOSTĘPNE OPCJE KONFIGURACJI**

```typescript
interface SocialWidgetProps {
  // Google Business Profile
  googleBusinessUrl?: string;      // Link do profilu
  googlePlaceId?: string;           // Place ID (opcjonalnie)
  googleRating?: number;            // Ocena (1-5)
  googleReviewCount?: number;       // Liczba opinii
  
  // Facebook
  facebookPageUrl?: string;         // Link do strony
  facebookPageName?: string;        // Nazwa strony (wyświetlana)
  facebookFollowers?: number;       // Liczba obserwujących
  
  // Pozycja widgetu
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  
  // Mobile visibility
  showOnMobile?: boolean;           // true = pokazuj na mobile
}
```

---

## 🎨 **POZYCJONOWANIE**

Widget można umieścić w 4 miejscach:

```tsx
// Lewy dolny róg (domyślnie)
position="bottom-left"

// Prawy dolny róg
position="bottom-right"

// Lewy górny róg
position="top-left"

// Prawy górny róg
position="top-right"
```

**Zalecam:** `bottom-left` bo prawy róg jest zajęty przez FloatingActionButton (ChatBot).

---

## 📱 **KOMPATYBILNOŚĆ MOBILE**

Widget jest w pełni responsywny:

- ✅ Auto-hide na małych ekranach (można wyłączyć przez `showOnMobile={false}`)
- ✅ Touch-optimized buttons
- ✅ Nie blokuje innych floating elementów
- ✅ Z-index: 40 (poniżej modali, ale powyżej contentu)

---

## 🎭 **JAK TO WYGLĄDA**

### **Stan zwinięty (Collapsed):**

```
┌─────────────────────────────┐
│  🔵📘  Obserwuj nas         │
│         Google & Facebook  →│
└─────────────────────────────┘
```

**Hover effect:** Scale 1.05 + glow + pulse animation

### **Stan rozwinięty (Expanded):**

```
┌─────────────────────────────┐
│  Znajdź nas online       [×]│
├─────────────────────────────┤
│  🔵 Google Business          │
│  ⭐⭐⭐⭐⭐ 4.9                │
│  127 opinii klientów         │
│  [Zobacz na mapie →]         │
├─────────────────────────────┤
│  📘 Facebook                 │
│  Wojciech Bożemski...        │
│  1,542 obserwujących         │
│  [Polub stronę →]            │
├─────────────────────────────┤
│     Ukryj na zawsze          │
└─────────────────────────────┘
```

**Kliknięcie:** Otwiera profil w nowej karcie (target="_blank")

---

## ✨ **ANIMACJE**

- **Wejście:** Fade in + scale up + slide up (delay 2s po załadowaniu strony)
- **Hover:** Scale 1.05 + glow effect
- **Pulse:** Border animation (repeat infinity)
- **Rozwijanie:** Spring animation (stiffness: 260, damping: 20)
- **Card hover:** Slide right 4px

---

## 🔒 **BEZPIECZEŃSTWO**

Widget używa bezpiecznych praktyk:

- ✅ `rel="noopener noreferrer"` na external links
- ✅ `target="_blank"` dla otwierania w nowej karcie
- ✅ Brak inline scripts
- ✅ Validated URLs (React router)

---

## 🐛 **TROUBLESHOOTING**

### **Problem: Widget nie wyświetla się**

**Rozwiązanie:**
1. Sprawdź czy import jest na górze `/App.tsx`:
   ```tsx
   import { SocialWidget } from './components/SocialWidget';
   ```
2. Sprawdź z-index conflicts (widget używa z-40)
3. Sprawdź czy `showOnMobile={true}` jeśli testujesz na mobile

### **Problem: Linki nie działają**

**Rozwiązanie:**
1. Sprawdź czy URLs są prawidłowe (muszą zaczynać się od `https://`)
2. Sprawdź czy strona Facebook jest publiczna
3. Sprawdź czy Google Business Profile jest aktywny

### **Problem: Widget blokuje inne elementy**

**Rozwiązanie:**
```tsx
// Zmień pozycję lub wyłącz na mobile
<SocialWidget 
  position="top-left"  // Zmień pozycję
  showOnMobile={false} // Wyłącz na mobile
/>
```

---

## 📊 **PERFORMANCE**

Widget jest zoptymalizowany pod kątem wydajności:

- ⚡ Lazy render (delay 2s)
- ⚡ AnimatePresence (smooth transitions)
- ⚡ No external API calls
- ⚡ Minimal re-renders
- ⚡ GPU-accelerated animations (transform, opacity)

**Bundle size:** ~8KB (gzipped)

---

## 🎯 **BEST PRACTICES**

### ✅ **DO:**
- Aktualizuj statystyki co miesiąc
- Używaj prawdziwych linków
- Testuj na mobile i desktop
- Monitoruj CTR (click-through rate)

### ❌ **DON'T:**
- Nie używaj fake numerów (statystyk)
- Nie umieszczaj w środku ekranu (position)
- Nie ukrywaj przycisku "Ukryj na zawsze" (UX)
- Nie dodawaj więcej social links (max 2)

---

## 📈 **TRACKING (Opcjonalnie)**

Dodaj Google Analytics events:

```tsx
<motion.a
  href={googleBusinessUrl}
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', 'social_click', {
        platform: 'google_business',
        action: 'profile_visit'
      });
    }
  }}
>
```

---

## 🚀 **PRZYKŁAD PEŁNEJ KONFIGURACJI**

```tsx
<SocialWidget 
  // Google Business Profile
  googleBusinessUrl="https://g.page/r/CZfR8XqK1b_sEAE"
  googleRating={4.9}
  googleReviewCount={127}
  
  // Facebook Page
  facebookPageUrl="https://www.facebook.com/WojciechBozemski"
  facebookPageName="Wojciech Bożemski - Terapia Energetyczna"
  facebookFollowers={1542}
  
  // UI Options
  position="bottom-left"
  showOnMobile={true}
/>
```

---

## ✅ **CHECKLIST**

- [ ] Zaktualizuj `googleBusinessUrl` w `/App.tsx`
- [ ] Zaktualizuj `facebookPageUrl` w `/App.tsx`
- [ ] Sprawdź `googleRating` i `googleReviewCount`
- [ ] Sprawdź `facebookFollowers`
- [ ] Przetestuj na desktop
- [ ] Przetestuj na mobile (Android/iOS)
- [ ] Sprawdź czy linki otwierają się w nowej karcie
- [ ] Dodaj do CHANGELOG
- [ ] Zrób screenshot do dokumentacji

---

**Pytania?** Sprawdź kod w `/components/SocialWidget.tsx`

**Potrzebujesz zmian?** Widget jest w pełni customizable! 🎨
