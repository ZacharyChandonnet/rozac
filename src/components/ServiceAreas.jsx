import styled from 'styled-components';
import { MapPin } from 'lucide-react';
import { Container, Section, Eyebrow, H2, Lead, Reveal, Btn, btnMotion } from './ui';
import { serviceAreas } from '../data/serviceAreas';

const Layout = styled.div`display:grid;gap:40px;@media(min-width:${p => p.theme.bp.lg}){grid-template-columns:5fr 7fr;align-items:center;gap:72px}`;
const List = styled.ul`list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:12px`;
const Chip = styled.li`display:flex;align-items:center;gap:8px;padding:12px 18px;border-radius:999px;background:#fff;border:1.5px solid ${p => p.theme.colors.text};font-weight:700;svg{color:${p => p.theme.colors.primary}}`;
const Demo = styled.p`margin-top:18px;font-size:.85rem;color:${p => p.theme.colors.muted}`;

export default function ServiceAreas() {
  return (
    <Section id="secteurs">
      <Container>
        <Layout>
          <Reveal>
            <Eyebrow>Zone de service</Eyebrow>
            <H2>Nous desservons votre secteur</H2>
            <Lead>Votre ville n’apparaît pas dans la liste ? Écrivez-nous : on vérifiera si votre adresse est desservie.</Lead>
            <div style={{ marginTop: 28 }}><Btn href="#contact" {...btnMotion}>Vérifier mon secteur</Btn></div>
          </Reveal>
          <Reveal delay={0.1}>
            <List aria-label="Villes desservies">
              {serviceAreas.map(c => <Chip key={c}><MapPin size={16} aria-hidden />{c}</Chip>)}
            </List>
          </Reveal>
        </Layout>
      </Container>
    </Section>
  );
}
