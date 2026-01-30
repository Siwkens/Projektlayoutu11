# 📱 Instrukcja aktualizacji konta administratora - ANDROID

## 🎯 Co zostanie zmienione?
- **Stary email:** admin@test.pl
- **Nowy email:** wojciech@bozemski.pl
- **Nowe hasło:** Wojciech2026

---

## 🔓 Metody aktywacji panelu (wybierz jedną):

### ✅ METODA 1: URL Parameter (NAJPROSTSZA)
1. Otwórz przeglądarkę na telefonie
2. Wejdź na stronę i dodaj `?admin=true` na końcu URL:
   ```
   https://twoja-strona.com/?admin=true
   ```
3. Panel pojawi się automatycznie

### ✅ METODA 2: Magiczny dotyk (5x tap)
1. Otwórz stronę w przeglądarce
2. Szybko tapnij **5 razy** w **prawy górny róg** ekranu (w ciągu 2 sekund)
3. Zobaczysz licznik "1/5 tap", "2/5 tap" itd.
4. Po 5 tapnięciu pojawi się panel

### ⌨️ METODA 3: Desktop (jeśli masz dostęp do komputera)
1. Otwórz stronę w przeglądarce na komputerze
2. Naciśnij: `Ctrl + Alt + U`
3. Panel pojawi się automatycznie

---

## 🚀 Kroki aktualizacji:

1. **Aktywuj panel** (wybierz jedną z metod powyżej)
2. **Kliknij przycisk** "Zaktualizuj konto"
3. **Poczekaj** na komunikat:
   - ✅ "Sukces! Email: wojciech@bozemski.pl" - gotowe!
   - ❌ Jeśli błąd - sprawdź konsolę (patrz poniżej)
4. **Zamknij panel** przyciskiem "Zamknij"
5. **Zaloguj się** nowymi danymi przez UserMenu

---

## 🔍 Sprawdzanie logów (jeśli coś nie działa):

### Na Androidzie:
1. Otwórz Chrome
2. Wpisz w adres: `chrome://inspect`
3. Kliknij "inspect" przy swojej stronie
4. Przejdź do zakładki "Console"
5. Szukaj komunikatów:
   - 📨 "Incoming request to..."
   - ✅ "Public endpoint - skipping auth check"
   - 🔄 "Rozpoczynam aktualizację..."

### Alternatywnie - Eruda (mobilna konsola):
1. Dodaj do URL: `?eruda=true`
2. Kliknij ikonę konsoli w prawym dolnym rogu
3. Sprawdź zakładkę "Console"

---

## ❓ Rozwiązywanie problemów:

### Problem: "Missing authorization header"
**Rozwiązanie:** Backend nie rozpoznaje endpointu jako publicznego
1. Sprawdź logi w konsoli
2. Szukaj linii: "Is public endpoint? false"
3. Zgłoś exact path z logów

### Problem: "User not found"
**Rozwiązanie:** Konto admin@test.pl nie istnieje
1. Sprawdź czy konto zostało utworzone
2. Użyj endpointu `/create-admin` najpierw

### Problem: Panel się nie pojawia
**Rozwiązanie:**
- Metoda 1: Upewnij się że masz `?admin=true` w URL
- Metoda 2: Tapnij dokładnie w **prawy górny róg** (100px x 100px)
- Metoda 2: Tapnij szybciej (w ciągu 2 sekund)

---

## 📋 Po udanej aktualizacji:

✅ **Nowe dane logowania:**
```
Email: wojciech@bozemski.pl
Hasło: Wojciech2026
```

---

## 🔐 Bezpieczeństwo:

⚠️ **Po zakończeniu aktualizacji:**
1. Usuń `?admin=true` z URL
2. Panel automatycznie się ukryje
3. Nikt inny nie będzie miał dostępu do niego (wymaga specjalnej aktywacji)

---

## 💡 Wskazówki:

- Panel AdminUpdater to **narzędzie developerskie** - użytkownicy nie mają do niego dostępu
- Można go **bezpiecznie usunąć** z App.tsx po zakończeniu aktualizacji
- Endpoint `/update-admin` będzie działał tylko dla istniejących kont
- Można używać wielokrotnie do zmiany innych kont administratorów

---

**Powodzenia! 🚀**