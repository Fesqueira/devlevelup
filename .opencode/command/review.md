---
description: Workflow de review do DevLevelUp — analisa o diff/PR, roda code review (code-reviewer), checagens (lint/typecheck) e build antes de aprovar ou vetar.
---
# Review Workflow

Fluxo definido na spec (§17 de `.opencode/spec/spec.md`):

1. **Análise**: identifique o escopo do diff/PR (`git diff` da branch vs. base).
2. **Code review**: acione o agente `code-reviewer` (regras `AGENTS.md` + `docs/`); decisões técnicas no agente `tech-lead`, se necessário.
3. **Acessibilidade**: acione o agente `a11y` (semântica, foco, contraste, ARIA, teclado, responsividade).
4. **Checagens** (devem estar verdes):

   - `npm run lint`
   - `npm run typecheck`

5. **Build**: `npm run build`.
6. **Saída**: parecer priorizado `[Alta]` / `[Média]` / `[Baixa]` com `arquivo:linha`. Indique se o PR está apto para o QA (`qa`) avaliar no preview antes do merge.