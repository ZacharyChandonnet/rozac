import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`width:min(${p => p.theme.maxWidth},100% - 40px);margin-inline:auto`;
export const Section = styled.section`padding:clamp(64px,10vw,120px) 0;background:${p => p.$soft ? p.theme.colors.soft : '#fff'}`;
export const Eyebrow = styled.span`display:inline-block;font-weight:800;font-size:.8rem;letter-spacing:.12em;text-transform:uppercase;color:#a85d00;margin-bottom:14px;&::before{content:'';display:inline-block;width:28px;height:3px;background:${p => p.theme.colors.primary};margin-right:10px;vertical-align:middle}`;
export const H2 = styled.h2`font-size:clamp(1.9rem,4.5vw,3rem)`;
export const Lead = styled.p`color:${p => p.theme.colors.muted};font-size:clamp(1rem,1.6vw,1.15rem);max-width:60ch;margin-top:16px`;

export const Btn = styled(motion.a)`
  display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:48px;padding:0 24px;border-radius:999px;
  font:inherit;font-weight:700;text-decoration:none;cursor:pointer;border:2px solid transparent;transition:box-shadow .2s,background .2s;
  ${p => p.$v === 'ghost'
    ? `background:#fff;color:${p.theme.colors.text};border-color:${p.theme.colors.text};&:hover{background:${p.theme.colors.text};color:#fff}`
    : `background:${p.theme.colors.primary};color:${p.theme.colors.text};&:hover{box-shadow:0 8px 20px rgba(255,146,5,.4)}`}
  &:disabled{opacity:.6;cursor:wait}
`;
export const btnMotion = { whileHover: { y: -2 }, whileTap: { scale: 0.98 } };

export function Reveal({ children, delay = 0, y = 24, ...rest }) {
  return (
    <motion.div initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.55, delay, ease: 'easeOut' }} {...rest}>
      {children}
    </motion.div>
  );
}
