import { createGlobalStyle } from 'styled-components';
export default createGlobalStyle`
  *,*::before,*::after{box-sizing:border-box}
  html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
  @media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
  body{margin:0;font-family:'Manrope',system-ui,-apple-system,'Segoe UI',sans-serif;color:${p => p.theme.colors.text};background:#fff;line-height:1.6;overflow-x:hidden}
  img{max-width:100%;display:block}
  h1,h2,h3{line-height:1.1;margin:0;letter-spacing:-.02em}
  p{margin:0}
  a{color:inherit}
  section[id],footer[id]{scroll-margin-top:84px}
  :focus-visible{outline:3px solid ${p => p.theme.colors.text};outline-offset:3px;border-radius:4px}
  .skip{position:absolute;left:-999px;top:8px;background:#fff;padding:8px 14px;z-index:200}
  .skip:focus{left:8px}
  .spin{animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}
`;
