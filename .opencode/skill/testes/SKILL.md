---
name: testes
description: Use quando for validar mudanças no DevLevelUp. O repo ainda não tem testes automatizados; cobertura é lint + format:check + build + QA manual via preview.
---

# Testes

O DevLevelUp **não tem testes automatizados** por enquanto (ver `AGENTS.md`). Validação é feita por três frentes:

## 1. Checagens automáticas (antes de qualquer commit/PR)

```bash
npm run lint          # eslint — regras JS/TS/React/Hooks
npm run format:check  # prettier — padrão de formatação
npm run build         # tsc -b + vite build — typecheck + bundle
```

As três precisam terminar **verdes**. Em CI, `npm run lint && npm run format:check && npm run build` rodam a cada PR.

## 2. QA manual (agente `qa` / reviewer humano)

- Navegar no preview da Vercel (Hero, CTA, Footer).
- Responsividade (mobile/tablet/desktop) e estética dark arcade 16 bits.
- Interações: hovers, transições e links (ex.: Apoia.se).

## 3. Quando implementar uma mudança

- Prove a mudança pelo `npm run dev` (teste manual) e pelas checagens acima.
- Liste no PR (template) o que foi validado e onde o QA deve procurar.

## Futuro

Se a equipe decidir adicionar testes automatizados, revisar com o time via PR antes (novo pacote de teste = dependência → passa por review). Sugestão de baseline: Vitest + React Testing Library.
