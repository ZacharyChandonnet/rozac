
import { useState, useRef } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Btn } from './ui';
import { serviceOptions } from '../data/services';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xvkzbrwz';

const Form = styled.form`
  background: #fff;
  color: ${p => p.theme.colors.text};
  border-radius: 20px;
  padding: clamp(22px, 4vw, 36px);
  display: grid;
  gap: 16px;

  .two {
    display: grid;
    gap: 16px;

    @media (min-width: ${p => p.theme.bp.md}) {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

const Field = styled.div`
  display: grid;
  gap: 6px;

  label {
    font-weight: 700;
    font-size: 0.92rem;
  }

  input,
  select,
  textarea {
    font: inherit;
    min-height: 48px;
    padding: 10px 14px;
    border-radius: 10px;
    border: 1.5px solid
      ${p => p.$err ? p.theme.colors.error : '#b9bec6'};
    background: #fff;
    width: 100%;
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }

  small {
    color: ${p => p.theme.colors.error};
    font-weight: 600;
  }
`;

const Check = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 0.9rem;

  input {
    width: 22px;
    height: 22px;
    margin-top: 2px;
    flex-shrink: 0;
    accent-color: ${p => p.theme.colors.primary};
  }
`;

const Msg = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 14px;
  border-radius: 10px;
  font-weight: 600;

  background: ${p => p.$ok ? '#e7f6ec' : '#fdecea'};
  color: ${p => p.$ok ? p.theme.colors.ok : p.theme.colors.error};

  svg {
    flex-shrink: 0;
  }
`;

const init = {
  nom: '',
  courriel: '',
  telephone: '',
  ville: '',
  service: '',
  description: '',
  consent: false,
  website: '',
};

function validate(v) {
  const e = {};

  if (v.nom.trim().length < 2) {
    e.nom = 'Veuillez entrer votre nom complet.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.courriel.trim())) {
    e.courriel = 'Veuillez entrer une adresse courriel valide.';
  }

  if (
    v.telephone &&
    v.telephone.replace(/\D/g, '').length < 10
  ) {
    e.telephone = 'Le numéro doit contenir au moins 10 chiffres.';
  }

  if (!v.ville.trim()) {
    e.ville = 'Veuillez indiquer votre ville ou secteur.';
  }

  if (!v.service) {
    e.service = 'Veuillez choisir un type de service.';
  }

  if (v.description.trim().length < 10) {
    e.description =
      'Décrivez votre besoin en quelques mots (10 caractères minimum).';
  }

  if (!v.consent) {
    e.consent =
      'Votre consentement est requis pour envoyer la demande.';
  }

  return e;
}

export default function ContactForm() {
  const [v, setV] = useState(init);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [errMsg, setErrMsg] = useState('');

  const mountedAt = useRef(Date.now());

  const set = key => event => {
    const { type, checked, value } = event.target;

    setV(previous => ({
      ...previous,
      [key]: type === 'checkbox' ? checked : value,
    }));
  };

  async function onSubmit(event) {
    event.preventDefault();

    const validationErrors = validate(v);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      document
        .getElementById(`f-${Object.keys(validationErrors)[0]}`)
        ?.focus();

      return;
    }

    // Protection anti-robot.
    if (
      v.website ||
      Date.now() - mountedAt.current < 3000
    ) {
      return;
    }

    setStatus('loading');
    setErrMsg('');

    try {
      const { website, consent, ...payload } = v;

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...payload,
          nom: payload.nom.trim(),
          courriel: payload.courriel.trim(),
          ville: payload.ville.trim(),
          description: payload.description.trim(),
          _subject: `Nouvelle demande de plomberie - ${payload.nom.trim()}`,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message = data.errors
          ?.map(error => error.message)
          .join(' ');

        throw new Error(message || 'SUBMIT_FAILED');
      }

      setStatus('success');
      setV({ ...init });
      setErrors({});
      mountedAt.current = Date.now();
    } catch (error) {
      setErrMsg(
        error.message === 'Failed to fetch' ||
        error.message === 'SUBMIT_FAILED'
          ? 'Une erreur est survenue lors de l’envoi. Réessayez ou appelez-nous.'
          : error.message
      );

      setStatus('error');
    }
  }

  const F = ({
    id,
    label,
    type = 'text',
    as,
    children,
    ...rest
  }) => {
    const Tag = as || 'input';

    return (
      <Field $err={!!errors[id]}>
        <label htmlFor={`f-${id}`}>{label}</label>

        <Tag
          id={`f-${id}`}
          name={id}
          type={as ? undefined : type}
          value={v[id]}
          onChange={set(id)}
          aria-invalid={!!errors[id]}
          aria-describedby={
            errors[id] ? `e-${id}` : undefined
          }
          {...rest}
        >
          {children}
        </Tag>

        {errors[id] && (
          <small id={`e-${id}`} role="alert">
            {errors[id]}
          </small>
        )}
      </Field>
    );
  };

  return (
    <Form
      onSubmit={onSubmit}
      noValidate
      aria-label="Formulaire de demande de soumission"
    >
      <div className="two">
        {F({
          id: 'nom',
          label: 'Nom complet *',
          autoComplete: 'name',
        })}

        {F({
          id: 'courriel',
          label: 'Courriel *',
          type: 'email',
          autoComplete: 'email',
        })}
      </div>

      <div className="two">
        {F({
          id: 'telephone',
          label: 'Téléphone (facultatif)',
          type: 'tel',
          autoComplete: 'tel',
        })}

        {F({
          id: 'ville',
          label: 'Ville ou secteur *',
          autoComplete: 'address-level2',
        })}
      </div>

      {F({
        id: 'service',
        label: 'Type de service *',
        as: 'select',
        children: [
          <option key="empty" value="">
            Choisir…
          </option>,
          ...serviceOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          )),
        ],
      })}

      {F({
        id: 'description',
        label: 'Description du besoin *',
        as: 'textarea',
      })}

      {/* Champ piège anti-robot */}
      <div
        style={{
          position: 'absolute',
          left: '-9999px',
        }}
        aria-hidden="true"
      >
        <label htmlFor="f-website">Ne pas remplir</label>

        <input
          id="f-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={v.website}
          onChange={set('website')}
        />
      </div>

      <div>
        <Check>
          <input
            id="f-consent"
            type="checkbox"
            checked={v.consent}
            onChange={set('consent')}
            aria-invalid={!!errors.consent}
            aria-describedby={
              errors.consent ? 'e-consent' : undefined
            }
          />

          <label htmlFor="f-consent">
            J’accepte que mes renseignements soient utilisés
            pour répondre à ma demande, conformément à la{' '}
            <a href="#politique">
              politique de confidentialité
            </a>
            . *
          </label>
        </Check>

        {errors.consent && (
          <small
            id="e-consent"
            role="alert"
            style={{
              color: '#c62828',
              fontWeight: 600,
            }}
          >
            {errors.consent}
          </small>
        )}
      </div>

      <Btn
        as={motion.button}
        type="submit"
        disabled={status === 'loading'}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={18} className="spin" aria-hidden />
            Envoi en cours…
          </>
        ) : (
          'Envoyer ma demande'
        )}
      </Btn>

      <div aria-live="polite">
        <AnimatePresence mode="wait">
          {status === 'success' && (
            <Msg
              key="success"
              $ok
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="status"
            >
              <CheckCircle2 size={20} aria-hidden />
              Merci ! Votre demande a bien été envoyée.
              On vous répond sous peu.
            </Msg>
          )}

          {status === 'error' && (
            <Msg
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="alert"
            >
              {errMsg}
            </Msg>
          )}
        </AnimatePresence>
      </div>
    </Form>
  );
}
