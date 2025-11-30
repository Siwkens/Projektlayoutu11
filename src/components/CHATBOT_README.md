# 🤖 Kosmiczny Chatbot Terapeutyczny

## 📋 Przegląd

Strona posiada **dwa warianty chatbota**:

### 1. **ChatBot.tsx** (Aktualnie aktywny) ✅
- **Rule-based system** - działa od razu bez konfiguracji
- Baza wiedzy z 11+ tematami o terapii energetycznej
- Zaawansowane animacje 3D i efekty cząsteczek
- Integracja z systemem nastrojów (MoodContext)
- Gotowe odpowiedzi FAQ
- **Idealny do prototypowania i demo**

### 2. **ChatBotAI.tsx** (Opcjonalny - prawdziwe AI) 🚀
- Integracja z **OpenAI GPT-4**
- Kontekst konwersacji (pamięta poprzednie wiadomości)
- Naturalne, inteligentne odpowiedzi
- Wymaga konfiguracji backendu i klucza API
- **Idealny do produkcji z prawdziwym AI**

---

## 🎨 Funkcje Obecnego Chatbota

### Efekty Wizualne
- ✨ **Pulsujący przycisk** z animowanymi pierścieniami
- 💫 **Cząsteczki Sparkle** wokół przycisku
- 🌊 **Smooth animations** przy otwieraniu/zamykaniu
- 🎭 **Dostosowanie do nastroju** - kolory zmieniają się z MoodSelector
- 🌌 **Kosmiczne tło** w headerze z animowanymi gwiazdkami
- ⚡ **Typing indicator** podczas "myślenia" bota

### Funkcje Interaktywne
- 💬 **11+ tematów wiedzy**: terapia, czakry, ceny, proces, rezerwacje, etc.
- 🔘 **Szybkie pytania** (Quick Questions) dla nowych użytkowników
- 📱 **Responsywny design** - działa na desktop i mobile
- ⌨️ **Enter to send** - wysyłanie wiadomości klawiszem Enter
- 🕐 **Timestamp** każdej wiadomości
- 📜 **Auto-scroll** do najnowszych wiadomości

### Baza Wiedzy (11 kategorii)
1. **Podstawy terapii** - czym jest terapia energetyczna
2. **Czakry** - system energetyczny, 7 czakr
3. **Cennik** - ceny sesji, pakiety
4. **Proces** - jak przebiega sesja (5 etapów)
5. **Rezerwacje** - jak umówić się na wizytę
6. **O terapeucie** - Wojciech Bożemski
7. **Korzyści** - co leczy terapia
8. **Przygotowanie** - jak się przygotować
9. **Sesje zdalne** - terapia online
10. **Częstotliwość** - jak często chodzić
11. **Kontakt** - email, telefon

---

## 🚀 Jak Włączyć Wersję AI (ChatBotAI)

### Krok 1: Dodaj Endpoint w Backendzie

Otwórz `/supabase/functions/server/index.tsx` i dodaj:

```typescript
// Na początku pliku dodaj import
import { Hono } from 'npm:hono';

// Dodaj endpoint dla chatu AI
app.post('/make-server-139d10cf/chat', async (c) => {
  const { message, conversationHistory } = await c.req.json();
  
  const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openaiApiKey) {
    console.error('OPENAI_API_KEY not found in environment');
    return c.json({ error: 'OPENAI_API_KEY not configured' }, 500);
  }
  
  const systemPrompt = `Jesteś profesjonalnym asystentem terapeutycznym dla Wojciecha Bożemskiego - doświadczonego terapeuty energetycznego.

INFORMACJE O TERAPII:
- Specjalizacja: terapia energetyczna, praca z czakrami, harmonizacja energii życiowej
- Metody: skanowanie aury, czyszczenie czakr, balansowanie energii, usuwanie blokad
- Praca z 7 głównymi czakrami: od korzeniowej po koronową

CENNIK:
- Pierwsza sesja (90 min): 350 zł - zawiera szczegółową diagnozę energetyczną
- Sesja standardowa (60 min): 250 zł
- Pakiet 5 sesji: 1100 zł (oszczędność 150 zł)

PROCES SESJI (60-90 min):
1. Wywiad - poznanie historii i potrzeb klienta
2. Diagnoza energetyczna - skanowanie czakr i aury
3. Praca energetyczna - usuwanie blokad, harmonizacja
4. Integracja - medytacja i ugruntowanie zmian
5. Feedback - omówienie sesji i zalecenia na przyszłość

DOSTĘPNOŚĆ:
- Sesje stacjonarne i zdalne (przez wideorozmowę)
- Rezerwacja przez formularz na stronie
- Kontakt: kontakt@wojciechbozemski.pl

KORZYŚCI TERAPII:
- Redukcja stresu i napięcia
- Praca z problemami emocjonalnymi (lęk, smutek, blokady)
- Usuwanie blokad energetycznych
- Łagodzenie bólów psychosomatycznych
- Rozwój duchowy i świadomość
- Poprawa jakości snu
- Zwiększenie witalności życiowej

CZĘSTOTLIWOŚĆ SESJI:
- Problemy ostre: 1 sesja/tydzień (3-5 sesji)
- Praca rozwojowa: 1 sesja/2-3 tygodnie
- Utrzymanie równowagi: 1 sesja/miesiąc

PRZYGOTOWANIE:
- Wygodne ubranie
- Lekki posiłek 1-2h przed sesją
- Unikaj kofeiny
- Otwartość na doświadczenie
- Przemyśl swoje intencje

STYL ODPOWIEDZI:
- Odpowiadaj ciepło, empatycznie i profesjonalnie
- Używaj emoji dla lepszej komunikacji: ✨🌟💫🔮🧘‍♂️💎⚡🌈
- Bądź wspierający i zachęcający
- Jeśli pytanie wykracza poza terapię energetyczną, grzecznie przekieruj do tematu
- W odpowiedziach formatuj listy używając bullet points
- Mów językiem zrozumiałym, unikaj żargonu
- Zawsze zachęcaj do zadawania pytań i rezerwacji sesji`;
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          ...conversationHistory,
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 600,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return c.json({ error: errorData.error?.message || 'OpenAI API error' }, response.status);
    }
    
    const data = await response.json();
    
    return c.json({ 
      response: data.choices[0].message.content 
    });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    return c.json({ 
      error: error instanceof Error ? error.message : 'Failed to get AI response' 
    }, 500);
  }
});
```

### Krok 2: Dodaj Klucz API OpenAI

W panelu Supabase:
1. Idź do **Project Settings** → **Edge Functions** → **Secrets**
2. Dodaj nowy secret:
   - Name: `OPENAI_API_KEY`
   - Value: `sk-...` (Twój klucz z OpenAI)

Lub użyj CLI Supabase:
```bash
supabase secrets set OPENAI_API_KEY=sk-...
```

### Krok 3: Zamień Komponent w App.tsx

W pliku `/App.tsx` zmień import:

```typescript
// PRZED:
import { ChatBot } from './components/ChatBot';

// PO:
import { ChatBotAI as ChatBot } from './components/ChatBotAI';
```

### Krok 4: Testuj!

1. Otwórz chatbot na stronie
2. Zadaj pytanie: "Czym jest terapia energetyczna?"
3. Bot odpowie używając GPT-4 🎉

---

## 🔧 Troubleshooting

### Problem: Bot nie odpowiada
**Rozwiązanie:**
1. Sprawdź console w przeglądarce (F12)
2. Sprawdź logi Supabase Edge Function
3. Upewnij się, że `OPENAI_API_KEY` jest ustawiony

### Problem: Błąd 401 Unauthorized
**Rozwiązanie:**
- Sprawdź czy klucz API OpenAI jest poprawny
- Sprawdź czy masz środki na koncie OpenAI

### Problem: Błąd 429 Rate Limit
**Rozwiązanie:**
- OpenAI limituje zapytania - poczekaj chwilę
- Rozważ upgrade planu OpenAI

### Problem: Zbyt długie odpowiedzi
**Rozwiązanie:**
- Zmniejsz `max_tokens` w kodzie backendu (obecnie 600)

---

## 💰 Koszty OpenAI

### GPT-4 Pricing (stan na 2024):
- **Input:** $0.03 / 1K tokens
- **Output:** $0.06 / 1K tokens

### Przykładowe koszty:
- 100 konwersacji (średnio 10 wiadomości każda): ~$3-5
- 1000 konwersacji: ~$30-50

### Oszczędzanie kosztów:
1. **Użyj GPT-3.5-turbo** zamiast GPT-4:
   ```typescript
   model: 'gpt-3.5-turbo', // 10x tańszy!
   ```
2. **Ogranicz max_tokens** do 400-500
3. **Cachuj popularne odpowiedzi** w bazie danych
4. **Monitoruj użycie** w panelu OpenAI

---

## 🎯 Porównanie Wersji

| Feature | ChatBot (Rule-based) | ChatBotAI (GPT-4) |
|---------|---------------------|-------------------|
| **Koszt** | ✅ Darmowy | ❌ ~$0.05/rozmowa |
| **Konfiguracja** | ✅ Działa od razu | ⚙️ Wymaga API key |
| **Inteligencja** | ⚠️ Ograniczona | ✅ Bardzo wysoka |
| **Kontekst** | ❌ Brak pamięci | ✅ Pamięta rozmowę |
| **Personalizacja** | ⚠️ Ograniczona | ✅ Pełna |
| **Szybkość** | ✅ Instant | ⚠️ 1-3 sekundy |
| **Offline** | ✅ Działa | ❌ Wymaga internetu |

---

## 🔮 Przyszłe Usprawnienia

### Możliwe rozszerzenia:
1. **Sentiment Analysis** - wykrywanie emocji użytkownika
2. **Voice Input** - możliwość mówienia zamiast pisania
3. **Multilingual** - automatyczne tłumaczenie
4. **Integration z Calendar** - bezpośrednia rezerwacja przez chat
5. **Personalization** - zapamiętanie preferencji użytkownika
6. **Analytics** - tracking najpopularniejszych pytań
7. **Rating System** - ocena odpowiedzi bota
8. **Export Chat** - możliwość pobrania rozmowy

### Alternatywne AI providers:
- **Anthropic Claude** - świetny do długich kontekstów
- **Google Gemini** - darmowy tier
- **Llama 3** (self-hosted) - całkowicie darmowy

---

## 📝 Customizacja

### Zmiana wyglądu:
Edytuj style w `ChatBot.tsx` lub `ChatBotAI.tsx`:
- Kolory: wykorzystują `colors` z MoodContext
- Rozmiar okna: `w-96 h-[600px]`
- Pozycja: `bottom-6 right-6`

### Zmiana osobowości AI:
Edytuj `systemPrompt` w backendzie:
```typescript
const systemPrompt = `Twój własny prompt...`;
```

### Dodanie nowych tematów (rule-based):
Edytuj `knowledgeBase` w `ChatBot.tsx`:
```typescript
{
  keywords: ['słowa', 'kluczowe'],
  response: 'Odpowiedź bota',
  category: 'kategoria'
}
```

---

## 🎉 Gotowe!

Chatbot jest w pełni funkcjonalny i gotowy do użycia. 

**Pytania? Problemy?**
Sprawdź console w przeglądarce lub logi Supabase.

Made with ✨ and 💜
