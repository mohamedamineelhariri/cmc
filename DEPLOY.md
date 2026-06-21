# Déploiement — Site CMC Béni Mellal-Khénifra

Le site est une app **Next.js 16** exportée en **statique** (`output: 'export'`),
hébergeable sur Vercel (ou tout hébergeur de fichiers statiques). L'assistant appelle
le **backend FastAPI** via `NEXT_PUBLIC_API_URL`.

## 1. Configurer l'URL de l'API

Copiez `.env.local.example` → `.env.local` et renseignez `NEXT_PUBLIC_API_URL`.
En production, le backend doit être **accessible publiquement en HTTPS** (le site
statique tourne dans le navigateur du visiteur et appelle l'API directement).

## 2. Build local

```bash
npm install
npm run build      # génère ./out (statique)
```

> Note mémoire : sur une machine chargée (plusieurs conteneurs Docker), `next build`
> peut manquer de RAM. Augmentez le tas Node :
> `set NODE_OPTIONS=--max-old-space-size=4096 && npm run build` (Windows)
> ou libérez de la RAM (arrêter des conteneurs) avant le build.

## 3. Déployer sur Vercel

- Importez le dépôt sur Vercel, **Root Directory = `frontend`**.
- Framework : Next.js (détecté). Build : `next build`. Output : géré par `output: 'export'`.
- Ajoutez la variable d'environnement **`NEXT_PUBLIC_API_URL`** = URL publique du backend.
- Déployez.

## 4. CORS côté backend

Autorisez le domaine Vercel dans `CORS_ORIGINS` (fichier `.env` du backend), par ex. :

```
CORS_ORIGINS=https://votre-site.vercel.app,http://localhost:3000
```

## 5. Photos

Déposez les photos du campus dans `public/campus/` (voir `public/campus/README.md`).
