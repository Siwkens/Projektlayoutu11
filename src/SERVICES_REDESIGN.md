# 🎴 ServicesSection - Redesign Dokumentacja

**Data aktualizacji:** 28 Stycznia 2026  
**Wersja:** 2.0 - 3D Depth Layers

---

## 🎯 Zmiany w Redesignie

### **Poprzednia wersja:**
- ❌ Flip cards (obrót karty na hover)
- ❌ Proste ikony Lucide (Sparkles, Globe, Radio, Home)
- ❌ Jednowarstwowe karty

### **Nowa wersja:**
- ✅ **3D Depth Layer Cards** (wielowarstwowa głębia)
- ✅ **Symbole energetyczne** (Hand, Infinity, Radio, Shield)
- ✅ **6 warstw animacji** na każdej karcie
- ✅ **Parallax mouse tracking**
- ✅ **Floating particles** na hover
- ✅ **Zaawansowany glassmorphism**

---

## 🎨 Nowe Ikony Energetyczne

### Zmiana Symboli

| Usługa | Stara ikona | Nowa ikona | Znaczenie |
|--------|------------|-----------|-----------|
| **Bioterapia** | Sparkles ✨ | **Hand** 🤚 | Dłoń terapeuty pracująca z energią |
| **Synchronizacja Kwantowa** | Globe 🌐 | **Infinity** ∞ | Nieskończoność, kwantowe połączenia |
| **Sesje na odległość** | Radio 📻 | **Radio** 📡 | Fale energii bez granic (zostało) |
| **Oczyszczanie** | Home 🏠 | **Shield** 🛡️ | Ochrona i tarcza energetyczna |

**Import:**
```typescript
import { Hand, Infinity, Radio, Shield } from 'lucide-react';
```

---

## 🏗️ Architektura 6-Warstwowa (Depth Layers)

Każda karta składa się z 6 niezależnych warstw animowanych w 3D:

### **Layer 1: Background Blobs** 
**Z-index:** `translateZ(-60px)` (najgłębsza warstwa)

**Funkcja:** Animowane kule gradientowe w tle

**Charakterystyka:**
- 2 gradient blobs na kartę
- Blur: `blur-2xl` i `blur-3xl`
- Różne kolory dla każdej usługi
- Animacja na hover:
  - Blob 1: move (+20px, +20px), scale 1.3
  - Blob 2: move (-20px, -20px), scale 1.4

**Kod:**
```tsx
<motion.div
  style={{ transform: 'translateZ(-60px)' }}
  animate={{
    x: isHovered ? 20 : 0,
    y: isHovered ? 20 : 0,
    scale: isHovered ? 1.3 : 1,
  }}
>
  <div className="w-32 h-32 rounded-full blur-2xl" 
       style={{ background: service.glowColor }} />
</motion.div>
```

---

### **Layer 2: Main Container**
**Z-index:** `translateZ(0px)` (bazowa warstwa)

**Funkcja:** Główny kontener z glassmorphism i shimmer border

**Charakterystyka:**
- `backdrop-blur-xl bg-white/5`
- `border border-white/10`
- Animated box-shadow na hover
- Shimmer effect (gradient przesuwający się po ramce)

**Box-shadow transition:**
```tsx
animate={{
  boxShadow: isHovered 
    ? `0 25px 60px -10px ${service.glowColor}, 0 0 0 1px ${service.glowColor}`
    : '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
}}
```

---

### **Layer 3: Image with Parallax**
**Z-index:** `translateZ(20px)`

**Funkcja:** Zdjęcie usługi z efektem paralaksy

**Charakterystyka:**
- Przesuwa się na hover: `y: -10px`
- Scale na hover: 1 → 1.15
- Gradient overlays (2 warstwy):
  - Service gradient (opacity 30%)
  - Dark gradient (from-bottom)
- Opacity: 40% (delikatne tło)

**Efekt:** Obraz "unosi się" na hover tworząc głębię

---

### **Layer 4: Floating Icon**
**Z-index:** `translateZ(60px)`

**Funkcja:** Ikona energetyczna z 3D rotacją

**Charakterystyka:**
- Container: glassmorphic card (`backdrop-blur-md bg-white/10`)
- Border: `border-white/20`
- Box-shadow: custom glow w kolorze usługi
- Animacje na hover:
  - **RotateY:** 0° → 360° (obrót 3D)
  - **Scale:** 1 → 1.2
  - **Y:** 0 → -15px (unoszenie)
- Pulsating glow w tle (scale + opacity loop)

**Kod:**
```tsx
<motion.div
  style={{ transform: 'translateZ(60px)' }}
  animate={{
    rotateY: isHovered ? 360 : 0,
    scale: isHovered ? 1.2 : 1,
    y: isHovered ? -15 : 0,
  }}
  transition={{
    rotateY: { duration: 0.8 },
    scale: { duration: 0.4 },
    y: { duration: 0.4 }
  }}
>
  <service.icon className="w-12 h-12 text-white" />
</motion.div>
```

---

### **Layer 5: Basic Content**
**Z-index:** `translateZ(40px)`

**Funkcja:** Tytuł, subtitle, description (widoczne gdy !hover)

**Charakterystyka:**
- Fade out na hover (opacity: 1 → 0)
- Lekkie podniesienie: `y: -5px` na hover
- Text center aligned
- White text z różnymi opacity levels

**Struktura:**
```tsx
<motion.div
  initial={{ opacity: 1 }}
  animate={{ opacity: isHovered ? 0 : 1 }}
>
  <h3>{service.title}</h3>
  <p>{service.subtitle}</p>
  <p>{service.description}</p>
</motion.div>
```

---

### **Layer 6: Expanded Content**
**Z-index:** `translateZ(80px)` (najbliższa warstwa)

**Funkcja:** Rozszerzone informacje widoczne tylko na hover

**Charakterystyka:**
- Fade in + scale na hover:
  - Opacity: 0 → 1
  - Scale: 0.9 → 1
- Glassmorphic card:
  - `backdrop-blur-2xl`
  - `bg-gradient-to-br from-black/80 to-black/60`
  - `border border-white/20`
- Decorative corner elements (4 narożniki)
- Icon + title + detailed description

**Efekt:** Panel z dodatkowymi info "wysuwa się" w stronę użytkownika

**Narożniki dekoracyjne:**
```tsx
{/* Top-left corner */}
<div className="absolute top-2 left-2 w-4 h-4 
                border-t-2 border-l-2 border-white/30 rounded-tl-lg" />
```

---

## 🎭 Mouse Parallax Effect

### Implementacja

**Motion Values:**
```tsx
const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);
```

**Mouse tracking:**
```tsx
const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
  const rect = cardRef.current.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  const percentX = (e.clientX - centerX) / (rect.width / 2);
  const percentY = (e.clientY - centerY) / (rect.height / 2);
  
  mouseX.set(percentX);
  mouseY.set(percentY);
};
```

**Efekt:**
- Karta nachyla się zgodnie z pozycją myszy
- Ruch w zakresie ±5° (subtelny)
- Smooth reset na mouse leave
- 3D perspective: 1200px

---

## ✨ Floating Particles System

**Funkcja:** Cząstki energii unoszące się na hover

**Charakterystyka:**
- **Liczba:** 8 particles na kartę
- **Rozmiar:** 4-8px (randomized)
- **Kolor:** Service-specific glow color
- **Pozycja:** Random (20-80% width/height)
- **Animacja:**
  - Opacity: 0 → 1 → 0
  - Scale: 0 → 1 → 0
  - Y: 0 → -80px do -120px
  - X: ±20px (random drift)
- **Timing:** 1.5-2s duration, random delays
- **Box-shadow:** 10px glow

**Kod:**
```tsx
{isHovered && (
  <>
    {[...Array(8)].map((_, i) => (
      <motion.div
        style={{
          background: service.glowColor,
          boxShadow: `0 0 10px ${service.glowColor}`,
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
          y: [0, -80 - Math.random() * 40],
          x: [(Math.random() - 0.5) * 40],
        }}
        transition={{
          duration: 1.5 + Math.random() * 0.5,
          delay: Math.random() * 0.3,
        }}
      />
    ))}
  </>
)}
```

**Efekt:** Energia "emanuje" z karty podczas interakcji

---

## 🌈 Service-Specific Colors

Każda usługa ma własną paletę kolorów:

### **1. Bioterapia (Purple-Pink)**
```typescript
{
  gradient: 'from-purple-600 to-pink-600',
  glowColor: 'rgba(168, 85, 247, 0.5)',
}
```

### **2. Synchronizacja Kwantowa (Blue-Cyan)**
```typescript
{
  gradient: 'from-blue-600 to-cyan-600',
  glowColor: 'rgba(59, 130, 246, 0.5)',
}
```

### **3. Sesje na odległość (Indigo-Purple)**
```typescript
{
  gradient: 'from-indigo-600 to-purple-600',
  glowColor: 'rgba(99, 102, 241, 0.5)',
}
```

### **4. Oczyszczanie (Emerald-Teal)**
```typescript
{
  gradient: 'from-emerald-600 to-teal-600',
  glowColor: 'rgba(16, 185, 129, 0.5)',
}
```

**Wykorzystanie:**
- Background gradient blobs
- Box-shadows
- Border shimmer
- Floating particles
- Icon glow

---

## 🎬 Animations Timeline

### **Card Entrance (Scroll into view)**

```tsx
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ 
  duration: 0.8, 
  delay: index * 0.15,
  ease: [0.25, 0.46, 0.45, 0.94]
}
```

**Efekt:** Karty pojawiają się od dołu z opóźnieniem (stagger 150ms)

---

### **Hover State Sequence**

1. **Karta (instant):**
   - Scale: 1 → 1.05 (spring animation)
   - Mouse parallax activates
   
2. **Background blobs (600ms):**
   - Move apart (+20px / -20px)
   - Scale up (1.3x / 1.4x)
   
3. **Image layer (600ms):**
   - Move up (-10px)
   - Scale (1.15x)
   
4. **Icon (800ms / 400ms / 400ms):**
   - RotateY 360° (800ms)
   - Scale 1.2x (400ms)
   - Move up -15px (400ms)
   
5. **Content swap (300ms / 400ms):**
   - Basic content fade out (300ms)
   - Expanded content fade in + scale (400ms)
   
6. **Particles (immediate):**
   - 8 particles spawn and float up (1.5-2s)
   
7. **Glow effects (400ms):**
   - Box-shadow intensifies
   - Radial glow overlay appears

---

## 🎨 Background Enhancements

### **Animated Grid**

```tsx
<motion.div
  style={{
    backgroundImage: 'linear-gradient(...), linear-gradient(90deg, ...)',
    backgroundSize: '50px 50px',
  }}
  animate={{
    x: [0, 50],
    y: [0, 50],
  }}
  transition={{
    duration: 20,
    repeat: Infinity,
    ease: "linear"
  }}
/>
```

**Efekt:** Subtelna siatka przesuwająca się w tle (sci-fi vibe)

---

### **Gradient Orbs**

- **Orb 1:** Purple (top-left)
  - Move: x: 0→50→0, y: 0→30→0
  - Scale: 1→1.2→1
  - Duration: 10s
  
- **Orb 2:** Blue (bottom-right)
  - Move: x: 0→-50→0, y: 0→-30→0
  - Scale: 1→1.3→1
  - Duration: 12s

**Efekt:** Organiczne, pulsujące tło energetyczne

---

## 📊 Section Header Redesign

### Nowe elementy:

**1. Badge (animated scale pulse):**
```tsx
<div className="px-4 py-2 backdrop-blur-md bg-white/5 
                border border-white/10 rounded-full">
  <span className="text-purple-400">METODY TERAPEUTYCZNE</span>
</div>
```

**2. Main heading:**
```tsx
<h2 className="text-5xl font-bold">
  Jak pracuję z energią
</h2>
```

**3. Subheading:**
```tsx
<p className="text-white/60 text-lg max-w-2xl mx-auto">
  Odkryj unikalne metody energetyczne...
</p>
```

**Efekt:** Profesjonalny, hierarchiczny układ z subtelnymi animacjami

---

## 🔧 Technical Details

### **3D Configuration**

```tsx
<div style={{ perspective: '1200px' }}>
  <motion.div
    style={{
      transformStyle: 'preserve-3d',
      rotateX,
      rotateY,
    }}
  >
    {/* Layers with different translateZ values */}
  </motion.div>
</div>
```

**Klucz:** `preserve-3d` + `translateZ` na każdej warstwie

---

### **Performance Optimizations**

1. **Transform-only animations:**
   - ✅ `translateZ`, `translateY`, `translateX`
   - ✅ `scale`, `rotate`, `opacity`
   - ❌ Brak: `width`, `height`, `top`, `left`

2. **Conditional rendering:**
   - Particles renderują się tylko gdy `isHovered`
   - Expanded content tylko na hover

3. **useTransform:**
   - Mouse parallax używa `useTransform` (no re-renders)

4. **Motion values:**
   - `mouseX` i `mouseY` są motion values (not state)

---

## 📱 Responsywność

### Desktop (lg: 1024px+)
```tsx
<div className="grid lg:grid-cols-4 gap-8">
```
- 4 kolumny
- Gap: 32px
- Card height: 450px

### Tablet (sm: 640px - lg: 1023px)
```tsx
<div className="grid sm:grid-cols-2 gap-8">
```
- 2 kolumny
- Gap: 32px

### Mobile (<640px)
- 1 kolumna
- Stack vertically
- Hover effects działają na touch (tap)

---

## 🆚 Comparison: Old vs New

| Feature | Stara wersja | Nowa wersja |
|---------|-------------|-------------|
| **Mechanika** | Flip cards (rotate 180°) | Depth layers (6 warstw 3D) |
| **Ikony** | Sparkles, Globe, Radio, Home | Hand, Infinity, Radio, Shield |
| **Interakcja** | Hover flip | Hover reveal + parallax |
| **Głębia** | 2 strony (front/back) | 6 warstw z translateZ |
| **Animacje** | 1 rotacja | 10+ animacji jednocześnie |
| **Particles** | Brak | 8 floating particles |
| **Mouse tracking** | Brak | Parallax tracking |
| **Kolory** | 2 (purple/pink) | 4 unikalne palety |
| **Glassmorphism** | Podstawowy | Zaawansowany (multi-layer) |
| **Performance** | Dobra | Zoptymalizowana |

---

## ✅ Kluczowe Ulepszenia

### 1. **Znacznie większa głębia wizualna**
✅ 6 warstw vs 2 strony  
✅ Prawdziwy 3D (perspective + translateZ)  
✅ Każda warstwa animuje się niezależnie  

### 2. **Lepsze storytelling**
✅ Ikony energetyczne bardziej tematyczne  
✅ Reveal content zamiast flip (bardziej intuicyjne)  
✅ Particles sugerują przepływ energii  

### 3. **Premium feel**
✅ Glassmorphism na 3 poziomach  
✅ Custom glow colors dla każdej usługi  
✅ Smooth, organic animations  
✅ Mouse parallax (interactive)  

### 4. **Accessibility**
✅ Content dostępny bez hover (Layer 5)  
✅ Touch-friendly (tap = hover)  
✅ Keyboard navigation ready  

---

## 🎯 Design Philosophy

**Przed:** "Pokaż dodatkowe info na drugiej stronie karty"  
**Po:** "Stwórz immersive, 3D experience który wizualizuje przepływ energii"

**Inspiracje:**
- Apple product cards (depth)
- Gaming UI (layers)
- Energy meditation apps (particles, glow)
- iOS/macOS design language (glassmorphism)

---

## 🚀 Rezultat

**Użytkownik widzi:**
1. Eleganckie karty z delikatnym ruchem (entrance)
2. Najazd myszką → karta się "ożywia":
   - Nachyla zgodnie z myszą
   - Warstwy przesuwają się tworząc głębię
   - Ikona obraca się w 3D
   - Cząstki energii unoszą się
   - Pojawia się rozszerzony opis
3. Wrażenie: "Wow, to jest interaktywne i premium!"

**Przed:** Zwykłe flip cards  
**Teraz:** 3D interactive energy showcase

---

**Dokument utworzony:** 28 Stycznia 2026  
**Autor:** AI Assistant  
**Status:** ✅ ZAIMPLEMENTOWANE
