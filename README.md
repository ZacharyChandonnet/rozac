# Plomberie Rozac : site one-page
```
npm install
npm run dev      # développement
npm run build    # production (dossier dist, prêt pour Netlify)
```
## À personnaliser avant le déploiement
- Téléphone, courriel : `src/data/config.js`
- Villes desservies (données de démo) : `src/data/serviceAreas.js`
- Services : `src/data/services.js`
- Photo du hero : ajouter `public/images/hero.jpg` et changer le `src` dans `Hero.jsx` (+ `og:image` dans `index.html`)
- Envoi du formulaire : copier `.env.example` en `.env`, mettre l'URL Formspree dans `VITE_FORM_ENDPOINT` (ou adapter `src/services/submitForm.js`). Sur Netlify, ajouter la même variable. Sans cela, le formulaire affiche une erreur claire.
- Politique de confidentialité : `public/politique-de-confidentialite.html`
