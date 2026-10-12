import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Container, Btn, btnMotion } from './ui';
import { company } from '../data/config';

const Bar = styled.header`position:sticky;top:0;z-index:100;background:#fff;transition:box-shadow .25s;box-shadow:${p => p.$s ? '0 4px 20px rgba(0,0,0,.08)' : '0 0 0 rgba(0,0,0,0)'}`;
const Row = styled(Container)`display:flex;align-items:center;justify-content:space-between;height:72px;gap:16px`;
const Logo = styled.a`text-decoration:none;display:inline-flex;align-items:center;justify-content:center;line-height:1;
  img{display:block;width:90px;height:auto}
  @media(min-width:${p => p.theme.bp.md}){img{width:110px}}`;
const Nav = styled.nav`display:none;gap:28px;a{text-decoration:none;font-weight:600;padding:6px 0;border-bottom:2px solid transparent;&:hover{border-color:${p => p.theme.colors.primary}}}
  @media(min-width:${p => p.theme.bp.lg}){display:flex}`;
const Right = styled.div`display:none;align-items:center;gap:18px;@media(min-width:${p => p.theme.bp.lg}){display:flex}`;
const Tel = styled.a`display:flex;align-items:center;gap:8px;font-weight:700;text-decoration:none`;
const Burger = styled.button`display:grid;place-items:center;width:48px;height:48px;border:0;background:none;cursor:pointer;color:inherit;@media(min-width:${p => p.theme.bp.lg}){display:none}`;
const Mobile = styled(motion.div)`position:absolute;inset:72px 0 auto 0;background:#fff;padding:12px 20px 24px;box-shadow:0 20px 30px rgba(0,0,0,.08);display:flex;flex-direction:column;gap:4px;
  a.l{padding:14px 4px;font-weight:700;text-decoration:none;border-bottom:1px solid ${p => p.theme.colors.border}}`;

const links = [['Accueil', '#accueil'], ['Services', '#services'], ['Secteurs', '#secteurs'], ['Contact', '#contact']];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    const esc = e => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc); return () => window.removeEventListener('keydown', esc);
  }, []);
  const close = () => setOpen(false);
  return (
    <Bar $s={scrolled}>
      <Row>
        <Logo href="#accueil" aria-label="Rozac Plomberie, accueil"><img src="/images/logo_rozac.svg" alt="Rozac Plomberie" /></Logo>
        <Nav aria-label="Navigation principale">{links.map(([l, h]) => <a key={h} href={h}>{l}</a>)}</Nav>
        <Right>
          <Tel href={company.phoneHref}><Phone size={18} aria-hidden /> {company.phone}</Tel>
          <Btn href="#contact" {...btnMotion}>Demander une soumission</Btn>
        </Right>
        <Burger aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen(o => !o)}>
          {open ? <X /> : <Menu />}
        </Burger>
      </Row>
      <AnimatePresence>
        {open && (
          <Mobile id="menu-mobile" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
            {links.map(([l, h]) => <a key={h} className="l" href={h} onClick={close}>{l}</a>)}
            <Tel href={company.phoneHref} style={{ padding: '16px 4px' }}><Phone size={18} aria-hidden /> {company.phone}</Tel>
            <Btn href="#contact" onClick={close}>Demander une soumission</Btn>
          </Mobile>
        )}
      </AnimatePresence>
    </Bar>
  );
}
