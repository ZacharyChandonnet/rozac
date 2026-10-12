import styled from 'styled-components';
import { Phone } from 'lucide-react';
import { Container, Section, H2, Reveal, Btn, btnMotion } from './ui';
import { company } from '../data/config';

const Box = styled.div`background:${p => p.theme.colors.primary};border-radius:24px;padding:clamp(32px,6vw,72px);display:grid;gap:28px;position:relative;overflow:hidden;
  &::after{content:'';position:absolute;right:-60px;top:-60px;width:220px;height:220px;border-radius:50%;background:${p => p.theme.colors.accent};opacity:.55}
  > *{position:relative;z-index:1}h2{max-width:18ch}p{max-width:52ch;font-size:1.1rem}
  .row{display:flex;flex-wrap:wrap;gap:14px}`;
const Dark = styled(Btn)`background:${p => p.theme.colors.text};color:#fff;&:hover{box-shadow:0 8px 20px rgba(0,0,0,.3)}`;

export default function CallToAction() {
  return (
    <Section style={{ paddingTop: 0 }} aria-labelledby="cta-titre">
      <Container>
        <Reveal>
          <Box>
            <H2 id="cta-titre">Un projet de plomberie en tête ?</H2>
            <p>Expliquez-nous votre besoin en quelques lignes. On vous répond avec les prochaines étapes.</p>
            <div className="row">
              <Dark href={company.phoneHref} {...btnMotion}><Phone size={18} aria-hidden /> Appeler maintenant</Dark>
              <Btn href="#contact" $v="ghost" {...btnMotion}>Demander une soumission</Btn>
            </div>
          </Box>
        </Reveal>
      </Container>
    </Section>
  );
}
