---
name: commit
description: Use ao preparar commits no DevLevelUp — analisa o diff, identifica o tipo Conventional Commit e sugere mensagem em português. Nunca commita sem autorização explícita.
---

# Commit

Regras de commit do DevLevelUp (ver `AGENTS.md` e `docs/git-branches.md`).

## Fluxo

1. **Analisar as alterações**: `git status` + `git diff` (e `--cached`, quando houver staging) — entenda o que foi feito antes de rotular.
2. **Identificar o tipo Conventional Commit** conforme a mudança coesa dominante:

   - `feat(escopo)` — nova funcionalidade/seção
   - `fix(escopo)` — correção
   - `chore(escopo)` — tooling/infra/CI
   - `refactor(escopo)` — mudança sem comportamento novo
   - `docs(escopo)` — documentação
   - `style(escopo)` — formatação

3. **Mensagem**: curta, objetiva, **em português**, no formato `<tipo>(<escopo>): <descrição>`.
4. **Regras**:

   - Uma mensagem por mudança coesa (nada de "commit bomb").
   - Não incluir alterações não relacionadas ao escopo.
   - Não usar mensagens genéricas (`update`, `changes`, `ajustes`, `final`, `coisas`).

## Regras obrigatórias

- **Nunca** criar commit automaticamente sem autorização explícita do usuário.
- **Nunca** commitar direto em `main`.
- Antes de commitar, sugerir rodar as checagens: `npm run lint`, `npm run format:check`, `npm run build` (o pre-commit também bloqueia se falhar).
- Idioma: código em inglês, mensagem de commit em português.

## Exemplos

```text
feat(hero): adiciona grid de requisitos
fix(button): corrige contraste do hover
chore(ci): adiciona workflow de lint/build
```