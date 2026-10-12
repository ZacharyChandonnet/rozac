// Envoi réel du formulaire. Configurez VITE_FORM_ENDPOINT (Formspree ou API).
// Pour Netlify Forms, remplacez par un POST vers "/" avec 'form-name' (voir README).
export async function submitContact(data) {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT;
  if (!endpoint) throw new Error('NOT_CONFIGURED');
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('SEND_FAILED');
  return true;
}
