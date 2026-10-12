import styled from 'styled-components';
import { Phone, Mail } from 'lucide-react';
import { Container } from './ui';
import ContactForm from './ContactForm';
import { company } from '../data/config';
import { serviceAreas } from '../data/serviceAreas';

const Wrap = styled.footer`background:${p => p.theme.colors.text};color:#fff;padding:clamp(56px,9vw,104px) 0 28px;
  .grid{display:grid;gap:48px;@media(min-width:${p => p.theme.bp.lg}){grid-template-columns:5fr 7fr;gap:72px}}
  h2{font-size:clamp(1.8rem,4vw,2.6rem)}h3{font-size:.8rem;letter-spacing:.12em;text-transform:uppercase;color:${p => p.theme.colors.accent};margin:28px 0 8px}
  p,li{color:#d5d9de}ul{list-style:none;padding:0;margin:0;display:grid;gap:4px}
  a{text-decoration:none}a:hover{text-decoration:underline}
  .ct a{display:flex;align-items:center;gap:10px;padding:6px 0;font-weight:700;color:#fff}
  .legal{margin-top:56px;padding-top:20px;border-top:1px solid #ffffff26;display:flex;flex-wrap:wrap;gap:12px;justify-content:space-between;font-size:.88rem;color:#b9bec6}`;

export default function Footer() {
  return (
    <Wrap id="contact">
      <Container>
        <div className="grid">
          <div>
            <h2>{company.name}</h2>
            <p style={{ marginTop: 14 }}>Plomberie résidentielle. Décrivez-nous votre besoin et on vous revient rapidement.</p>
            <div className="ct" style={{ marginTop: 20 }}>
              <a href={company.phoneHref}><Phone size={18} aria-hidden /> {company.phone}</a>
              <a href={`mailto:${company.email}`}><Mail size={18} aria-hidden /> {company.email}</a>
            </div>
            <h3>Secteurs desservis</h3>
            <p>{serviceAreas.join(' · ')}</p>
            <h3>Navigation</h3>
            <ul>{[['Accueil', '#accueil'], ['Services', '#services'], ['Secteurs', '#secteurs']].map(([l, h]) => <li key={h}><a href={h}>{l}</a></li>)}</ul>
          </div>
          <ContactForm />
        </div>
        <div className="legal">
          <span>© {new Date().getFullYear()} {company.name}. Tous droits réservés.</span>
          <a id="politique" href="/politique-de-confidentialite.html">Politique de confidentialité</a>
        </div>
      </Container>
    </Wrap>
  );
}
