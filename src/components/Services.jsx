import styled from 'styled-components';
import { Container, Section, Eyebrow, H2, Lead, Reveal } from './ui';
import ServiceCard from './ServiceCard';
import { services } from '../data/services';

const Grid = styled.div`display:grid;gap:20px;margin-top:48px;grid-template-columns:1fr;
  @media(min-width:${p => p.theme.bp.md}){grid-template-columns:repeat(2,1fr)}
  @media(min-width:${p => p.theme.bp.lg}){grid-template-columns:repeat(3,1fr);gap:24px}`;

export default function Services() {
  return (
    <Section id="services" $soft>
      <Container>
        <Reveal>
          <Eyebrow>Nos services</Eyebrow>
          <H2>Des solutions adaptées à vos besoins</H2>
          <Lead>Chaque maison est différente. On prend le temps de bien comprendre le problème, puis on fait le travail comme il se doit, du premier coup.</Lead>
        </Reveal>
        <Grid>{services.map((s, i) => <ServiceCard key={s.id} index={i} {...s} />)}</Grid>
      </Container>
    </Section>
  );
}
