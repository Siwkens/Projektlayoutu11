# 🔧 TECHNICAL REFERENCE - Szybka Referencja

Kluczowe informacje techniczne dla developerów i administratorów.

---

## 🔐 ZMIENNE ŚRODOWISKOWE

### Supabase (automatyczne w Figma Make)
```bash
SUPABASE_URL=https://upslsklauyerlkyisngq.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=[AUTO-MANAGED BY FIGMA MAKE]
SUPABASE_DB_URL=[AUTO-MANAGED BY FIGMA MAKE]
```

**⚠️ UWAGA:** Nigdy nie commituj SERVICE_ROLE_KEY do repozytorium!

---

## 📡 API ENDPOINTS REFERENCE

### Base URL
```
https://upslsklauyerlkyisngq.supabase.co/functions/v1/make-server-139d10cf
```

### Authentication Endpoints

#### POST /signup
**Opis:** Rejestracja nowego użytkownika  
**Auth:** ⚠️ Wymaga `Authorization: Bearer ${publicAnonKey}` (NAPRAWIONE)  
**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response:** `200 OK` + user object  
**Errors:** `400` (validation), `500` (server error)

#### POST /init-admin
**Opis:** Inicjalizacja konta admin (dev only)  
**Auth:** Publiczne  
**Body:** Brak  
**Response:** Tworzy `admin@test.pl` / `Admin123!`

#### POST /create-admin
**Opis:** Tworzenie nowego admina  
**Auth:** Publiczne  
**Body:**
```json
{
  "email": "admin@example.com",
  "password": "securePassword",
  "name": "Admin Name"
}
```

#### PUT /update-admin
**Opis:** Aktualizacja konta admin  
**Auth:** ⚠️ Wymaga `Authorization: Bearer ${publicAnonKey}` (NAPRAWIONE)  
**Body:**
```json
{
  "oldEmail": "admin@test.pl",
  "oldPassword": "Admin123!",
  "newEmail": "wojciech@bozemski.pl",
  "newPassword": "Wojciech2026"
}
```

### Booking Endpoints

#### POST /bookings
**Opis:** Tworzenie rezerwacji  
**Auth:** 🔒 Wymaga zalogowania (Bearer token)  
**Body:**
```json
{
  "date": "2024-12-30T10:00:00Z",
  "serviceType": "Bioterapia",
  "user_name": "Jan Kowalski",
  "user_email": "jan@example.com",
  "note": "Opcjonalna notatka"
}
```
**Response:**
```json
{
  "id": "booking_xxx",
  "status": "pending",
  "created_at": "2024-12-28T..."
}
```

#### GET /bookings
**Opis:** Pobieranie rezerwacji  
**Auth:** 🔒 Wymaga zalogowania  
**Logic:**
- Użytkownik: widzi tylko swoje rezerwacje
- Admin: widzi wszystkie rezerwacje
**Response:** Array bookings

#### PATCH /bookings/:id
**Opis:** Aktualizacja statusu (admin only)  
**Auth:** 🔒 Admin token  
**Body:**
```json
{
  "status": "confirmed" // lub "cancelled"
}
```

### Blog Endpoints

#### GET /blog/articles
**Opis:** Lista wszystkich artykułów  
**Auth:** Publiczne  
**Query params:** Brak  
**Response:**
```json
[
  {
    "id": "article_1",
    "title": "Tytuł artykułu",
    "excerpt": "Krótki opis...",
    "content": "Pełna treść markdown...",
    "category": "Wiedza podstawowa",
    "image": "https://...",
    "readTime": "5 min",
    "author": "Wojciech Bożemski",
    "created_at": "2024-12-28T...",
    "published": true
  }
]
```

#### GET /blog/articles/:id
**Opis:** Pojedynczy artykuł  
**Auth:** Publiczne  
**Response:** Single article object

#### POST /blog/articles
**Opis:** Tworzenie artykułu (admin)  
**Auth:** 🔒 Admin token  
**Body:**
```json
{
  "title": "Nowy artykuł",
  "excerpt": "Krótki opis",
  "content": "# Markdown content\n\nPełna treść...",
  "category": "Praktyka",
  "image": "https://images.unsplash.com/...",
  "readTime": "7 min",
  "published": true
}
```

#### PUT /blog/articles/:id
**Opis:** Edycja artykułu (admin)  
**Auth:** 🔒 Admin token  
**Body:** Pola do aktualizacji (partial update)

#### DELETE /blog/articles/:id
**Opis:** Usuwanie artykułu (admin)  
**Auth:** 🔒 Admin token  
**Response:** `200 OK`

---

## 🎨 MOOD SYSTEM (Dynamic Theming)

### Dostępne moody
```typescript
type MoodType = 'calm' | 'stress' | 'fatigue';

const moodColors = {
  calm: {
    primary: '#8B5CF6',     // Fioletowy
    accent: '#EC4899',      // Różowy
    background: '#0a0a1a',  // Bardzo ciemny
    text: '#ffffff'
  },
  stress: {
    primary: '#3B82F6',     // Niebieski
    accent: '#06B6D4',      // Cyan
    background: '#0f172a',  // Ciemnoniebieski
    text: '#ffffff'
  },
  fatigue: {
    primary: '#F59E0B',     // Pomarańczowy
    accent: '#EF4444',      // Czerwony
    background: '#1a0f0a',  // Ciemnobrązowy
    text: '#ffffff'
  }
};
```

### Użycie w komponencie
```typescript
import { useMood } from './context/MoodContext';

function MyComponent() {
  const { colors, mood, setMood } = useMood();
  
  return (
    <div style={{ background: colors.background, color: colors.text }}>
      <button onClick={() => setMood('calm')}>Spokój</button>
      <button onClick={() => setMood('stress')}>Antystres</button>
      <button onClick={() => setMood('fatigue')}>Energia</button>
    </div>
  );
}
```

---

## 🗺️ SEKCJE I ID (ROUTING)

### Główne sekcje strony
```typescript
// App.tsx - kolejność sekcji
const sections = [
  'hero',        // Landing (brak ID, scrollTo 0)
  'about',       // O mnie
  'chakra-map',  // System czakr (3D)
  'services',    // Usługi (flip cards)
  'media',       // Media coverage
  'audio-zone',  // Strefa audio
  'blog',        // Blog
  'faq'          // FAQ
  // USUNIĘTE: gallery, testimonials, stats
];
```

### Smooth scroll helper
```typescript
function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80; // Navbar height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}
```

---

## 👤 ADMIN SYSTEM

### Lista adminów (hardcoded)
```typescript
// W komponentach: AdminDashboard, UserMenu
const ADMIN_EMAILS = [
  "wojciech@bozemski.pl",    // Główny admin
  "bozemskiw@gmail.com",     // Admin główny
  "patryk.siwkens@gmail.com", // Dev admin
  "admin@test.pl"             // Testowy (do usunięcia)
];
```

### Sprawdzanie uprawnień
```typescript
import { useAuth } from './context/AuthContext';

function AdminComponent() {
  const { user } = useAuth();
  const ADMIN_EMAILS = ["wojciech@bozemski.pl", ...];
  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email);
  
  if (!isAdmin) {
    return <div>Brak dostępu</div>;
  }
  
  return <div>Admin Panel</div>;
}
```

---

## 🎯 CHATBOT KNOWLEDGE BASE

### Kategorie tematyczne
```typescript
const categories = [
  'basics',        // Podstawy terapii
  'chakras',       // System czakr
  'pricing',       // Cennik
  'process',       // Przebieg sesji
  'booking',       // Rezerwacje
  'about',         // O terapeucie
  'benefits',      // Korzyści
  'preparation',   // Przygotowanie
  'remote',        // Sesje zdalne
  'frequency',     // Częstotliwość
  'contact',       // Kontakt
  'mood'           // Zarządzanie nastrojem
];
```

### Smart Actions
```typescript
type ActionType = 'booking' | 'mood_change' | 'scroll_to';

interface SmartAction {
  type: ActionType;
  label: string;
  data?: any;
}

// Przykłady:
const actions = [
  { type: 'booking', label: '📅 Umów sesję', data: null },
  { type: 'mood_change', label: '🌊 Zmień na uspokajający motyw', data: 'stress' },
  { type: 'scroll_to', label: '✨ Zobacz czakry', data: 'chakra-map' }
];
```

### Dodawanie nowej wiedzy
```typescript
// W /components/ChatBotEnhanced.tsx
const knowledgeBase = [
  {
    keywords: ['słowo1', 'słowo2', 'fraza'],
    response: '🌟 Odpowiedź chatbota z emoji i formatowaniem',
    category: 'custom',
    suggestedActions: [
      { type: 'scroll_to', label: 'Zobacz więcej', data: 'section-id' }
    ]
  }
];
```

---

## 🖼️ OBRAZY I ASSETS

### Lokalizowane Zasoby (Local Assets)
```typescript
// POPRAWNIE (używając aliasu @/assets)
import logoImg from '@/assets/logo.png';

// ❌ BŁĘDNIE (stary system figma:asset)
// import logoImg from 'figma:asset/...';
```

### SVG Vectors
```typescript
// Import SVG paths
import svgPaths from './imports/svg-wg56ef214f';

// Użycie
<svg viewBox="0 0 100 100">
  <path d={svgPaths.path1} fill="currentColor" />
</svg>
```

### Unsplash Images
```typescript
// Przez ImageWithFallback (dla nowych obrazów)
import { ImageWithFallback } from './components/figma/ImageWithFallback';

<ImageWithFallback
  src="https://images.unsplash.com/photo-xxx"
  alt="Description"
  className="w-full h-full object-cover"
/>
```

---

## ⚡ PERFORMANCE OPTIMIZATION

### Lazy Loading
```typescript
// W App.tsx
const CosmicScene = lazy(() => 
  import('./components/canvas/CosmicBackground').then(module => ({ 
    default: module.CosmicScene 
  }))
);

// Użycie
<Suspense fallback={<SceneFallback />}>
  <CosmicScene />
</Suspense>
```

### Throttling (scroll events)
```typescript
let timeoutId: any = null;
const throttledScroll = () => {
  if (!timeoutId) {
    timeoutId = setTimeout(() => {
      handleScroll();
      timeoutId = null;
    }, 100); // 100ms throttle
  }
};

window.addEventListener('scroll', throttledScroll);
```

### IntersectionObserver (zamiast scroll)
```typescript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id);
      }
    });
  },
  {
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0
  }
);

sections.forEach(section => {
  const element = document.getElementById(section.id);
  if (element) observer.observe(element);
});
```

---

## 🔒 SECURITY BEST PRACTICES

### Frontend
```typescript
// ✅ DOBRZE - nie używaj SERVICE_ROLE_KEY
import { publicAnonKey } from './utils/supabase/info';

fetch(url, {
  headers: {
    'Authorization': `Bearer ${publicAnonKey}`
  }
});

// ❌ ŹLE - nigdy w frontend
const serviceRoleKey = 'eyJhbGci...'; // NIGDY!
```

### Backend (Edge Function)
```typescript
// ✅ DOBRZE - z env variables
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// ✅ DOBRZE - weryfikacja tokena
const token = req.headers.get('Authorization')?.split(' ')[1];
const { data: { user } } = await supabase.auth.getUser(token);
if (!user) return c.json({ error: 'Unauthorized' }, 401);
```

### Input Validation
```typescript
// ✅ ZAWSZE waliduj input
if (!email || !password) {
  return c.json({ error: 'Email i hasło są wymagane' }, 400);
}

if (password.length < 6) {
  return c.json({ error: 'Hasło musi mieć min. 6 znaków' }, 400);
}

// ✅ Sanitize HTML (React robi to automatycznie)
<div>{userInput}</div> // React escapes automatically
```

---

## 🐛 DEBUGGING TOOLS

### Performance Monitor
```typescript
// Włącz: Ctrl+Shift+P
// Wyświetla:
// - FPS (frames per second)
// - Memory usage
// - Component render count
// - Render time
```

### Admin Updater
```typescript
// Włącz: Ctrl+Alt+U lub ?admin=true
// Umożliwia zmianę konta admin bez dostępu do bazy
```

### Browser DevTools
```bash
# Console
console.log('Debug info:', data);
console.error('Error:', error);

# Network Tab
# Sprawdź:
# - Status codes (200, 401, 500)
# - Request headers (Authorization)
# - Response body (error messages)
# - Timing (slow requests)
```

### Supabase Logs
```bash
1. Otwórz https://supabase.com/dashboard
2. Wybierz projekt: upslsklauyerlkyisngq
3. Edge Functions → make-server-139d10cf → Logs
4. Filtruj po:
   - Error level (errors only)
   - Time range (last hour)
   - Search phrase (user email, endpoint)
```

---

## 📦 KLUCZOWE IMPORTY

### Context
```typescript
import { useAuth, supabase } from './context/AuthContext';
import { useMood } from './context/MoodContext';
```

### Animation
```typescript
import { motion, AnimatePresence } from 'motion/react';
```

### Ikony
```typescript
import { Icon } from 'lucide-react';
// UWAGA: Zawsze sprawdź czy ikona istnieje w lucide-react!
```

### Supabase Client
```typescript
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);
```

---

## 🎨 TAILWIND CUSTOM CLASSES

### Typography
```css
/* Zdefiniowane w globals.css, NIE używaj w JSX: */
.text-2xl  /* ❌ Nie używaj - mamy custom typography */
.text-xl   /* ❌ Nie używaj */
.text-lg   /* ❌ Nie używaj */

/* Zamiast tego styluj inline lub użyj domyślnych: */
<h1>Tytuł</h1>              /* ✅ Użyje custom typography */
<p style={{ fontSize: '1.25rem' }}> /* ✅ Inline styles OK */
```

### Glassmorphism
```typescript
// Pattern używany w projekcie
className="bg-white/10 backdrop-blur-md border border-white/20"
```

### Gradients
```typescript
// Fioletowo-niebieski (primary)
className="bg-gradient-to-r from-purple-600 to-blue-600"

// Dynamiczny z mood
style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
```

---

## 📞 DANE KONTAKTOWE (DO AKTUALIZACJI)

### W FloatingActionButton.tsx
```typescript
// Linia 17-20 - ZMIEŃ PRZED WDROŻENIEM
{ label: 'Zadzwoń', href: 'tel:+48123456789' },  // ← ZMIEŃ NUMER
{ label: 'Email', href: 'mailto:kontakt@wojciechbozemski.pl' },
```

### W ChatBot knowledge base
```typescript
// Linia 101-104
response: '📧 Skontaktuj się:\n• Email: kontakt@wojciechbozemski.pl\n• Telefon: +48 XXX XXX XXX'
```

### W Footer.tsx
```typescript
// Sprawdź footer czy ma poprawne dane
```

---

**Ostatnia aktualizacja:** 28 Grudnia 2024  
**Wersja dokumentacji:** 1.0  
**Projekt:** Wojciech Bożemski - Terapia Energetyczna