# 🌐 PRZEWODNIK WDROŻENIA NA WŁASNY HOSTING

Kompletna instrukcja krok po kroku jak wdrożyć projekt na własnym hostingu (shared hosting, VPS, dedykowany serwer).

---

## 📋 Wymagania

### Na Twoim komputerze:
- ✅ Node.js >= 18.0.0
- ✅ npm >= 9.0.0
- ✅ Dostęp do terminala/wiersza poleceń

### Na serwerze:
- ✅ Hosting z Apache lub Nginx
- ✅ Dostęp FTP/SFTP lub SSH
- ✅ Domena (np. www.wojciechbozemski.pl)
- ✅ Certyfikat SSL (zalecane - Let's Encrypt)

---

## 🚀 CZĘŚĆ 1: PRZYGOTOWANIE PROJEKTU

### Krok 1: Zainstaluj zależności

Otwórz terminal w katalogu projektu i uruchom:

```bash
npm install
```

**Czas:** ~3-5 minut  
**Co się dzieje:** Instaluje wszystkie wymagane pakiety (React, TypeScript, Tailwind, etc.)

### Krok 2: Skonfiguruj zmienne środowiskowe

Utwórz plik `.env` w głównym katalogu projektu:

```bash
# Windows (PowerShell)
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

Edytuj `.env`:

```env
VITE_SUPABASE_URL=https://upslsklauyerlkyisngq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwc2xza2xhdXllcmxreWlzbmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNjY1MTksImV4cCI6MjA3OTc0MjUxOX0.cERANcobhS4lbu94E9XFEAQf7epbbLruMHQoFBR3AXk
```

**⚠️ UWAGA:** Te dane są już skonfigurowane i działają. Jeśli chcesz użyć własnego projektu Supabase, zmień te wartości.

### Krok 3: Zaktualizuj dane kontaktowe

Przed buildem, zmień hardcoded dane kontaktowe:

**A. Numer telefonu w FloatingActionButton:**

Edytuj `/components/FloatingActionButton.tsx` (linia 17):

```typescript
// PRZED:
{ label: 'Zadzwoń', href: 'tel:+48123456789' },

// PO (wpisz prawdziwy numer):
{ label: 'Zadzwoń', href: 'tel:+48XXXXXXXXX' },
```

**B. Email (sprawdź poprawność):**

```typescript
{ label: 'Email', href: 'mailto:kontakt@wojciechbozemski.pl' },
```

### Krok 4: Zbuduj projekt (Production Build)

```bash
npm run build
```

**Czas:** ~1-2 minuty  
**Co się dzieje:**
- Kompiluje TypeScript → JavaScript
- Minifikuje kod (usuwanie spacji, skracanie nazw)
- Bundluje wszystkie pliki
- Optymalizuje obrazy
- Tworzy folder `/dist` z gotową stroną

**Wynik:** Folder `/dist` zawiera całą stronę gotową do upload.

### Krok 5: Sprawdź build lokalnie (opcjonalne)

```bash
npm run preview
```

Otwórz http://localhost:4173 i sprawdź czy wszystko działa.

---

## 📤 CZĘŚĆ 2: UPLOAD NA SERWER

### Metoda A: FTP/SFTP (najprostsza)

#### 1. Pobierz klienta FTP:
- **FileZilla** (https://filezilla-project.org/) - ZALECANE
- **WinSCP** (Windows)
- **Cyberduck** (Mac)

#### 2. Połącz się z serwerem:

W FileZilla:
- **Host:** ftp.twojdomena.pl (lub adres IP serwera)
- **Username:** Twoja nazwa użytkownika FTP
- **Password:** Twoje hasło FTP
- **Port:** 21 (FTP) lub 22 (SFTP)

#### 3. Upload plików:

**WAŻNE:** Uploaduj zawartość folderu `/dist`, NIE sam folder!

```
Twój komputer:                     Serwer:
/dist/                             /public_html/ (lub /www/)
  ├── index.html          →          ├── index.html
  ├── assets/             →          ├── assets/
  │   ├── index-xxx.js    →          │   ├── index-xxx.js
  │   ├── index-xxx.css   →          │   ├── index-xxx.css
  │   └── ...             →          │   └── ...
  └── ...                 →          └── ...
```

**Kroki w FileZilla:**
1. Lewy panel (lokalny): Otwórz folder `/dist`
2. Prawy panel (serwer): Przejdź do `/public_html` (lub `/www/`)
3. Zaznacz WSZYSTKIE pliki w `/dist` (Ctrl+A)
4. Przeciągnij na prawy panel
5. Poczekaj na upload (~2-5 minut)

#### 4. Skopiuj .htaccess (tylko Apache):

Jeśli Twój hosting używa Apache:
1. Skopiuj plik `/public/.htaccess` do głównego katalogu na serwerze
2. Upewnij się że ma nazwę `.htaccess` (kropka na początku!)

### Metoda B: SSH/SCP (zaawansowana)

Jeśli masz dostęp SSH do serwera:

```bash
# Upload całego folderu dist
scp -r dist/* user@twojserwer.pl:/var/www/html/

# Lub przez rsync (lepsze dla kolejnych update'ów)
rsync -avz --delete dist/ user@twojserwer.pl:/var/www/html/
```

### Metoda C: Panel hosting (cPanel/Plesk)

1. Zaloguj się do panelu hostingowego
2. Otwórz File Manager
3. Przejdź do `/public_html`
4. Kliknij "Upload"
5. Przeciągnij pliki z `/dist`
6. Poczekaj na upload

---

## ⚙️ CZĘŚĆ 3: KONFIGURACJA SERWERA

### Apache Configuration

#### Opcja 1: .htaccess (shared hosting)

Plik `.htaccess` został już przygotowany w `/public/.htaccess`. Skopiuj go do głównego katalogu:

```bash
# Skopiuj .htaccess z /public/.htaccess do głównego katalogu serwera
```

Zawartość (już przygotowana):
- ✅ SPA routing (wszystkie ścieżki → index.html)
- ✅ GZIP compression
- ✅ Cache headers (1 rok dla assetów)
- ✅ Security headers

#### Opcja 2: VirtualHost (VPS/dedykowany)

Edytuj `/etc/apache2/sites-available/wojciech-bozemski.conf`:

```apache
<VirtualHost *:80>
    ServerName www.wojciechbozemski.pl
    ServerAlias wojciechbozemski.pl
    DocumentRoot /var/www/wojciech-bozemski

    <Directory /var/www/wojciech-bozemski>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted

        # SPA routing
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    # Kompresja GZIP
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/plain text/xml
        AddOutputFilterByType DEFLATE text/css text/javascript
        AddOutputFilterByType DEFLATE application/javascript application/json
    </IfModule>

    # Cache headers
    <IfModule mod_expires.c>
        ExpiresActive On
        ExpiresByType image/jpg "access plus 1 year"
        ExpiresByType image/png "access plus 1 year"
        ExpiresByType image/svg+xml "access plus 1 year"
        ExpiresByType text/css "access plus 1 month"
        ExpiresByType application/javascript "access plus 1 month"
    </IfModule>

    # Security headers
    <IfModule mod_headers.c>
        Header set X-Content-Type-Options "nosniff"
        Header set X-Frame-Options "DENY"
        Header set X-XSS-Protection "1; mode=block"
    </IfModule>

    ErrorLog ${APACHE_LOG_DIR}/wojciech-bozemski-error.log
    CustomLog ${APACHE_LOG_DIR}/wojciech-bozemski-access.log combined
</VirtualHost>
```

Włącz konfigurację:

```bash
sudo a2ensite wojciech-bozemski.conf
sudo systemctl reload apache2
```

### Nginx Configuration

Edytuj `/etc/nginx/sites-available/wojciech-bozemski`:

```nginx
server {
    listen 80;
    server_name www.wojciechbozemski.pl wojciechbozemski.pl;
    root /var/www/wojciech-bozemski;
    index index.html;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache statycznych assetów
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Kompresja GZIP
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/xml
        image/svg+xml;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Logs
    access_log /var/log/nginx/wojciech-bozemski-access.log;
    error_log /var/log/nginx/wojciech-bozemski-error.log;
}
```

Włącz konfigurację:

```bash
sudo ln -s /etc/nginx/sites-available/wojciech-bozemski /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔒 CZĘŚĆ 4: SSL/HTTPS (ZALECANE)

### Opcja 1: Let's Encrypt (DARMOWY)

#### Apache:

```bash
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d www.wojciechbozemski.pl -d wojciechbozemski.pl
```

#### Nginx:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d www.wojciechbozemski.pl -d wojciechbozemski.pl
```

Auto-renewal (dodaje się automatycznie):

```bash
sudo certbot renew --dry-run
```

### Opcja 2: Panel hostingu (cPanel/Plesk)

1. Zaloguj się do panelu
2. Znajdź "SSL/TLS"
3. Wybierz "Let's Encrypt" lub "AutoSSL"
4. Kliknij "Install"

---

## ✅ CZĘŚĆ 5: WERYFIKACJA I TESTY

### 1. Sprawdź czy strona działa:

Otwórz przeglądarkę:
```
https://www.wojciechbozemski.pl
```

**Powinno się załadować:**
- ✅ Hero section z animacjami
- ✅ Logo Wojciecha Bożemskiego
- ✅ Nawigacja działa
- ✅ Smooth scroll

### 2. Testuj funkcjonalności:

#### A. Rejestracja nowego użytkownika:
1. Kliknij ikonę użytkownika (góra prawy róg)
2. Wybierz "Rejestracja"
3. Wprowadź dane testowe:
   - Email: `test@test.pl`
   - Hasło: `Test123!`
4. Kliknij "Zarejestruj się"
5. **Oczekiwany wynik:** Automatyczne zalogowanie

#### B. Rezerwacja sesji:
1. Kliknij "Umów sesję" (floating button lub navigation)
2. Wypełnij formularz
3. Kliknij "Umów sesję"
4. **Oczekiwany wynik:** Potwierdzenie rezerwacji

#### C. Panel Administratora:
1. Zaloguj się jako admin (patryk.siwkens@gmail.com lub użyj Ctrl+Alt+U)
2. Kliknij UserMenu → "Panel Administratora"
3. **Oczekiwany wynik:** Lista rezerwacji

#### D. ChatBot:
1. Kliknij ikonę czatu (dół prawy róg)
2. Zadaj pytanie: "Ile kosztuje sesja?"
3. **Oczekiwany wynik:** Odpowiedź z cennikiem

### 3. Testuj na mobile:

Otwórz stronę na telefonie:
- ✅ Menu hamburger działa
- ✅ ChatBot otwiera się
- ✅ Formularz rezerwacji działa
- ✅ Scroll jest smooth

### 4. Sprawdź performance:

Otwórz Chrome DevTools (F12):
- **Console:** Sprawdź czy nie ma błędów (czerwone wpisy)
- **Network:** Sprawdź czy wszystkie pliki się ładują (200 OK)
- **Lighthouse:** Uruchom audit (Performance > 80)

---

## 🐛 TROUBLESHOOTING

### Problem: Błąd 404 przy refresh (np. /blog)

**Przyczyna:** Brak konfiguracji SPA routing  
**Rozwiązanie:**
- Apache: Sprawdź czy `.htaccess` jest skopiowany
- Nginx: Sprawdź `try_files $uri $uri/ /index.html;`

### Problem: Białe strony (pusta strona)

**Rozwiązanie:**
1. Otwórz DevTools (F12) → Console
2. Sprawdź czy są błędy JavaScript
3. Najczęściej: Błąd importu - sprawdź czy wszystkie pliki z `/dist/assets` są uploadowane

### Problem: CSS nie działa (brak stylów)

**Rozwiązanie:**
1. DevTools → Network → sprawdź czy `index-xxx.css` się ładuje (200 OK)
2. Jeśli 404: Sprawdź ścieżki w `index.html` (powinny być relatywne `/assets/...`)
3. Jeśli CORS: Dodaj odpowiednie headery w konfiguracji serwera

### Problem: Błąd CORS przy API calls

**Rozwiązanie:**
1. Sprawdź czy Supabase Edge Functions są dostępne
2. Otwórz: https://upslsklauyerlkyisngq.supabase.co/functions/v1/make-server-139d10cf/health
3. Jeśli 200 OK - backend działa
4. Jeśli błąd - sprawdź zmienne środowiskowe

### Problem: Obrazy się nie ładują

**Rozwiązanie:**
1. Sprawdź czy folder `/dist/assets` zawiera wszystkie pliki
2. Sprawdź Network tab - które obrazy dają 404
3. Unsplash images: Sprawdź połączenie internetowe serwera

### Problem: Animacje nie działają / strona laguje

**Rozwiązanie:**
1. Sprawdź czy 3D tło (Three.js) się załadowało
2. W razie problemów, wyłącz PerformanceMonitor (Ctrl+Shift+P)
3. Sprawdź console - mogą być błędy WebGL

---

## 🔄 UPDATE STRONY (Kolejne wdrożenia)

Gdy chcesz zaktualizować stronę:

### 1. Wprowadź zmiany w kodzie

Edytuj pliki w projekcie lokalnie.

### 2. Zbuduj ponownie:

```bash
npm run build
```

### 3. Upload tylko zmienionych plików:

**Przez FTP:**
- Usuń stare pliki z `/assets` na serwerze
- Upload nową zawartość `/dist`

**Przez rsync (szybsze):**
```bash
rsync -avz --delete dist/ user@server:/var/www/html/
```

`--delete` usuwa stare pliki które już nie istnieją.

### 4. Wyczyść cache przeglądarki:

Po update zalecane:
- Ctrl+Shift+R (hard refresh)
- Lub dodaj `?v=2` do URL (cache busting)

---

## 📊 MONITORING I ANALITYKA (Opcjonalne)

### Google Analytics

Dodaj w `/index.html` przed `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Uptime Monitoring

**Zalecane narzędzia:**
- **UptimeRobot** (https://uptimerobot.com) - DARMOWY
- **Pingdom** (https://pingdom.com)
- **StatusCake** (https://statuscake.com)

Konfiguracja:
1. Zarejestruj się
2. Dodaj monitor: https://www.wojciechbozemski.pl
3. Otrzymaj alert gdy strona spadnie

---

## 📁 BACKUP

### Automatyczny backup (zalecane)

#### Przez cron (Linux):

```bash
# Backup codziennie o 3:00
0 3 * * * tar -czf /backups/wojciech-bozemski-$(date +\%Y\%m\%d).tar.gz /var/www/wojciech-bozemski
```

#### Przez hosting panel:

Większość paneli (cPanel, Plesk) ma wbudowane automatyczne backupy.

### Manualny backup:

**Przez FTP:**
1. Otwórz FileZilla
2. Zaznacz wszystkie pliki na serwerze
3. Przeciągnij do folderu lokalnego
4. Archiwizuj (ZIP)

**Przez SSH:**
```bash
tar -czf backup-$(date +%Y%m%d).tar.gz /var/www/wojciech-bozemski
scp backup-*.tar.gz local@computer:/backups/
```

---

## 🎯 CHECKLIST FINALNY

Przed ogłoszeniem strony jako "live":

- [ ] Wszystkie pliki z `/dist` są uploadowane
- [ ] `.htaccess` lub nginx config działa (SPA routing)
- [ ] SSL/HTTPS jest aktywny
- [ ] Strona ładuje się poprawnie
- [ ] Rejestracja działa
- [ ] Rezerwacja działa
- [ ] Panel admina działa (zaloguj jako wojciech@bozemski.pl)
- [ ] ChatBot odpowiada
- [ ] Nawigacja smooth scroll działa
- [ ] Mobile menu działa
- [ ] Numer telefonu jest zaktualizowany
- [ ] Email jest poprawny
- [ ] Google Analytics dodany (opcjonalne)
- [ ] Favicon widoczny w zakładce
- [ ] Uptime monitoring skonfigurowany (opcjonalne)
- [ ] Backup skonfigurowany

---

## 🎉 GOTOWE!

Gratulacje! Twoja strona jest live na własnym hostingu!

### Następne kroki:

1. **Zmień konto admin** (Ctrl+Alt+U):
   - Email: wojciech@bozemski.pl
   - Hasło: Wojciech2026

2. **Dodaj prawdziwe artykuły bloga** (Panel Administratora)

3. **Przetestuj wszystkie funkcje** z prawdziwymi danymi

4. **Promuj stronę**:
   - Social media
   - Google My Business
   - Wizytówki z URL

---

**Powodzenia! 🚀**

Jeśli masz problemy:
1. Sprawdź `/TROUBLESHOOTING.md`
2. Sprawdź browser console (F12)
3. Sprawdź server logs (error.log)