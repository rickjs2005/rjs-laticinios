# RJS Laticínios

Site institucional de uma fábrica de laticínios fictícia, feito como peça de portfólio da MilWeb. A marca, os produtos, os depoimentos e os números do site são ilustrativos.

É uma página única com mascote panda em SVG interativo (segue o cursor), seletor de sabor que muda as cores da página, catálogo de produtos com filtro por categoria, receitas, parceiros, estatísticas e rodapé com contato. Não há backend: o conteúdo fica em `src/constants/data.ts` e as fotos de produto vêm do Unsplash.

## Stack

- Next.js 15 (App Router), React 19, TypeScript
- SCSS Modules (sem Tailwind)
- Framer Motion, GSAP (ScrollTrigger) e Lenis
- three e @react-three/fiber / drei
- react-icons

## Como rodar

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
npm run start   # serve o build
npm run lint
```

Não há variáveis de ambiente. A URL canônica fica escrita em `src/app/layout.tsx` (metadata) e em `src/app/sitemap.ts`.
