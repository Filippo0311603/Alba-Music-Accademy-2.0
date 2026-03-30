# Deployment Guide - Vercel + Render

## Setup Architecture

- **Frontend**: Vercel (React + Vite)
- **Backend**: Render (Express.js API)

---

## Step 1: Push il codice su GitHub

```bash
git init
git add .
git commit -m "Initial Alba Music Academy setup"
git remote add origin https://github.com/YOUR_USERNAME/alba-music-academy.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend su Render

### 2.1 Crea un nuovo Render Web Service
1. Vai su [https://render.com](https://render.com)
2. Clicca **"New +"** → **"Web Service"**
3. Seleziona il tuo repository GitHub
4. Configura:
   - **Name**: `alba-music-backend`
   - **Runtime**: Node.js
   - **Build Command**: `npm install`
   - **Start Command**: `npm run server`
   - **Plan**: Free

### 2.2 Aggiungi Environment Variables
Nel pannello Render, vai a **Environment** e aggiungi:

```
NODE_ENV=production
BOOKING_SERVER_PORT=3000
PUBLIC_APP_URL=https://alba-music-backend.onrender.com (campia dopo che hai l'URL)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-strong-password-here
ADMIN_SESSION_SECRET=your-64-character-secret-here
ADMIN_ALLOWED_ORIGINS=https://alba-music-academy.vercel.app
SMTP_HOST=in-v3.mailjet.com
SMTP_PORT=587
SMTP_USER=your-mailjet-api-key
SMTP_PASS=your-mailjet-secret-key
MAIL_FROM=Alba Music Academy <filippoleotta06@gmail.com>
```

### 2.3 Deploy
Clicca **"Deploy"** e aspetta che finisca. Anota l'URL finale (es: `alba-music-backend.onrender.com`)

---

## Step 3: Deploy Frontend su Vercel

### 3.1 Crea un nuovo progetto su Vercel
1. Vai su [https://vercel.com](https://vercel.com)
2. Clicca **"Add New"** → **"Project"**
3. Importa il tuo repository GitHub

### 3.2 Configurazione Build
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 3.3 Environment Variables
Aggiungi nella sezione **Environment Variables**:

```
VITE_API_URL=https://alba-music-backend.onrender.com
```

### 3.4 Deploy
Clicca **"Deploy"** e aspetta che finisca. Anota l'URL (es: `alba-music-academy.vercel.app`)

---

## Step 4: Aggiorna Render con l'URL finale

Torna su Render e aggiorna:
```
PUBLIC_APP_URL=https://alba-music-backend.onrender.com
```

E aggiungi il frontend URL a:
```
ADMIN_ALLOWED_ORIGINS=https://alba-music-academy.vercel.app
```

Riavvia il servizio.

---

## Step 5: Test End-to-End

1. Vai su **https://alba-music-academy.vercel.app**
2. Compila una prenotazione di test
3. Controlla che ricevi l'email (eventualmente controllo spam)
4. Clicca il link di conferma nell'email
5. Vai su **https://alba-music-academy.vercel.app/admin** e accedi

---

## Troubleshooting

### Il frontend non si connette all'API
- Verifica che `VITE_API_URL` sia impostato su Vercel
- Controlla che il backend su Render stia girando
- Apri la console del browser (F12) → Network tab per vedere i dettagli

### Email non arrive
- Controlla che le credenziali Mailjet siano corrette su Render
- Verifica in Mailjet dashboard che la quota non sia esaurita
- Controlla la cartella spam dell'email test

### Booking non appare nel DB
- Sul backend Render, la data è memorizzata come file JSON
- Ogni volta che rideploy su Render, el dati vengono resettati (piano free)
- Per persistenza duratura, configura un database like Render Postgres

---

## Migliorie Future

- Aggiungi un database PostgreSQL gratuito da Render
- Configura CORS correttamente
- Aggiungi analytics
- Setup dominio custom (es: alba-music.com)
