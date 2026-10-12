import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Phone, Check } from 'lucide-react';
import { Btn, btnMotion, Eyebrow } from './ui';
import { company } from '../data/config';

const Wrap = styled.section`display:grid;grid-template-columns:1fr;min-height:calc(100svh - 72px);@media(min-width:${p => p.theme.bp.lg}){grid-template-columns:1fr 1fr}`;
const Text = styled.div`display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:clamp(40px,7vw,96px) 20px;order:2;
  @media(min-width:${p => p.theme.bp.lg}){order:0;padding-left:max(20px,calc((100vw - ${p => p.theme.maxWidth})/2 + 20px));padding-right:clamp(32px,5vw,80px)}`;
const H1 = styled(motion.h1)`font-size:clamp(2.4rem,6.2vw,4.6rem);font-weight:800;span{background:linear-gradient(transparent 62%,${p => p.theme.colors.accent} 62%)}`;
const P = styled(motion.p)`margin-top:22px;font-size:clamp(1.02rem,1.7vw,1.2rem);color:${p => p.theme.colors.muted};max-width:52ch`;
const Actions = styled(motion.div)`display:flex;flex-wrap:wrap;gap:14px;margin-top:32px`;
const Trust = styled(motion.ul)`list-style:none;padding:0;margin:36px 0 0;display:flex;flex-wrap:wrap;gap:10px 24px;font-weight:600;li{display:flex;align-items:center;gap:8px}svg{color:#a85d00}`;
const Photo = styled(motion.div)`position:relative;min-height:320px;overflow:hidden;img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  @media(min-width:${p => p.theme.bp.lg}){border-bottom-left-radius:48px}`;

const up = d => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: d, ease: 'easeOut' } });

export default function Hero() {
  return (
    <Wrap id="accueil">
      <Text>
        <motion.div {...up(0)}><Eyebrow>Plomberie résidentielle</Eyebrow></motion.div>
        <H1 {...up(0.1)}>Votre plomberie entre de <span>bonnes mains.</span></H1>
        <P {...up(0.25)}>Fuite, installation ou rénovation : on s’occupe de la plomberie de votre maison avec soin, clarté et respect de votre domicile.</P>
        <Actions {...up(0.4)}>
          <Btn href="#contact" {...btnMotion}>Demander une soumission</Btn>
          <Btn href={company.phoneHref} $v="ghost" {...btnMotion}><Phone size={18} aria-hidden /> Nous appeler</Btn>
        </Actions>
        <Trust {...up(0.55)}>
          {['Service personnalisé', 'Travail soigné', 'Fiabilité'].map(t => <li key={t}><Check size={18} aria-hidden />{t}</li>)}
        </Trust>
      </Text>
      <Photo initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
        {/* Remplacez par /images/hero.jpg (photo réelle d’un plombier au travail) */}
        <img src="/images/hero.jpg" alt="Plombier au travail dans une salle de bain résidentielle" fetchPriority="high" width="800" height="900" />
      </Photo>
    </Wrap>
  );
}
