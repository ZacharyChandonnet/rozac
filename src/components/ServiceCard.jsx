import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Card = styled(motion.article)`display:flex;flex-direction:column;height:100%;padding:28px;border-radius:${p => p.theme.radius};background:#fff;border:1px solid ${p => p.theme.colors.border};transition:box-shadow .25s,border-color .25s;
  &:hover{box-shadow:${p => p.theme.shadow};border-color:${p => p.theme.colors.primary}}
  .ic{display:grid;place-items:center;width:52px;height:52px;border-radius:12px;background:${p => p.theme.colors.accent}33;color:#a85d00;margin-bottom:20px}
  h3{font-size:1.25rem}p{color:${p => p.theme.colors.muted};margin:10px 0 22px;flex:1}
  a{display:inline-flex;align-items:center;gap:8px;font-weight:700;text-decoration:none;color:${p => p.theme.colors.text};padding:6px 0;&:hover{color:#a85d00}}`;

export default function ServiceCard({ icon: Icon, title, text, index = 0 }) {
  return (
    <Card initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: (index % 3) * 0.08 }} whileHover={{ y: -4 }}>
      <div className="ic"><Icon size={26} aria-hidden /></div>
      <h3>{title}</h3>
      <p>{text}</p>
      <a href={`#contact`} aria-label={`Demander une soumission : ${title}`}>Demander une soumission <ArrowRight size={16} aria-hidden /></a>
    </Card>
  );
}
