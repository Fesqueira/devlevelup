# SPEC — Padronização da Infraestrutura do DevLevelUp

> **Status da implementação**: itens marcados com ✅ já existem no repo e devem ser **preservados**; itens marcados com ❌ precisam ser **implementados**; itens marcados com ⚠️ exigem **decisão** antes de implementar.

## 1. Objetivo

Padronizar a infraestrutura de desenvolvimento do DevLevelUp (LP estética 16 bits / dark arcade para o Hackathon SouJunior) para que os desenvolvedores do time utilizem as mesmas regras de:

- Formatação de código
- ESLint
- TypeScript
- Git
- Commits
- Pre-commit hooks
- Node.js
- OpenCode
- Agentes
- Skills
- Workflows

A implementação deve preservar o funcionamento atual do projeto.

---

# 2. Regra principal

> **Nenhuma ferramenta deve alterar automaticamente a arquitetura ou o código existente sem necessidade. A primeira prioridade é padronizar a infraestrutura sem quebrar o projeto atual.**

O agente deve:

- Analisar a estrutura existente antes de modificar arquivos.
- Reutilizar configurações existentes quando possível.
- Evitar substituir configurações funcionais sem necessidade.
- Não alterar componentes, páginas ou funcionalidades apenas para adequá-los ao novo padrão.
- Não realizar refatorações fora do escopo desta spec.
- Não atualizar dependências sem necessidade.
- Não alterar a arquitetura do projeto.
- Não remover configurações existentes sem verificar seu impacto.
- Se encontrar um conflito entre uma configuração existente e esta spec, identificar o conflito e escolher a solução que preserve o funcionamento do projeto.
- Ao final, informar todas as alterações realizadas.

---

# 3. Stack esperada

A infraestrutura deve considerar o stack atual do projeto:

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- ESLint
- Prettier
- Git
- Husky (❌ a adicionar)
- Node.js
- OpenCode

Não adicionar frameworks ou bibliotecas desnecessárias.

---

# 4. Ordem de execução

Executar as tarefas nesta ordem:

1. Analisar projeto existente ✅ (feito — ver §5)
2. EditorConfig ❌
3. Prettier ✅ (revisar — ver §7)
4. ESLint + TypeScript ✅ (revisar — ver §8 e §9)
5. Padronização de código ✅ (já documentada — ver §10)
6. Husky / pre-commit ❌
7. Conventional Commits ✅ (padrão do projeto — ver §12)
8. `.nvmrc` ❌
9. Scripts do `package.json` ⚠️ (faltam `lint:fix` e `typecheck`)
10. Agente Tech Lead do OpenCode ❌
11. Skill de Commit ❌
12. Workflows ❌
13. Validação final

---

# 5. Análise inicial

Análise realizada em 18/09/2026. Nada foi modificado durante esta etapa.

| Item                      | Situação                                                                                |
| ------------------------- | --------------------------------------------------------------------------------------- |
| Package manager           | ✅ **npm** (`package-lock.json` commitado)                                              |
| Versão do Node            | ✅ v24.21.0 local; CI usa `node-version: 24`                                            |
| Versão do React           | ✅ `^19.2.8`                                                                            |
| Versão do TypeScript      | ✅ `~6.0.2`                                                                             |
| Configuração do ESLint    | ✅ `eslint.config.js` (flat config)                                                     |
| Configuração do Prettier  | ✅ `.prettierrc` + `.prettierignore`                                                    |
| `.editorconfig`           | ❌ não existe                                                                           |
| Husky                     | ❌ não existe                                                                           |
| Git hooks                 | ❌ apenas os `.sample` do `git init`                                                    |
| Scripts do `package.json` | ✅ dev, build, preview, lint, format, format:check — ❌ faltam `lint:fix` e `typecheck` |
| Configuração do OpenCode  | ✅ `.opencode/` (agents, skills, spec) — sem `opencode.json` global                     |
| Skills existentes         | ✅ `componentes`, `react`, `tailwind-ui`, `testes`                                      |
| Agentes existentes        | ✅ `frontend` (primary), `code-reviewer` (subagent), `qa` (subagent)                    |
| Workflows existentes      | ❌ nenhum                                                                               |
| CI (GitHub Actions)       | ✅ `.github/workflows/ci.yml` (lint + format:check + build)                             |
| Template de PR            | ✅ `.github/PULL_REQUEST_TEMPLATE.md`                                                   |
| VS Code                   | ✅ `.vscode/settings.json` + `extensions.json`                                          |

---

# 6. EditorConfig ❌

Criar:

```text
.editorconfig
```

Configurações esperadas:

- `root = true`
- Charset UTF-8
- Final de linha LF
- Indentação com espaços
- `indent_size = 2`
- Remover espaços no final das linhas
- Inserir newline no final dos arquivos

O EditorConfig deve ser compatível com VS Code e outros editores utilizados pelo time.

---

# 7. Prettier ✅

Configuração existente em `.prettierrc`:

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all"
}
```

`.prettierignore` existente:

```text
dist
node_modules
package-lock.json
```

Scripts existentes:

```json
"format": "prettier --write .",
"format:check": "prettier --check ."
```

⚠️ **Decisão**: os demais padrões (`tabWidth: 2`, `useTabs: false`, `printWidth: 80`, `endOfLine: lf`) usam os defaults do Prettier e funcionam. Opcional explicitar no `.prettierrc` para deixar o padrão registrado — não é obrigatório.

O Prettier não deve formatar:

- `node_modules`
- arquivos de build (`dist`)
- arquivos gerados automaticamente (`package-lock.json`)
- arquivos de ambiente
- outros arquivos que não façam parte do código-fonte

---

# 8. ESLint ✅

Configuração existente em `eslint.config.js` (flat config):

- `@eslint/js` recommended
- `typescript-eslint` recommended
- `eslint-plugin-react-hooks` (recommended)
- `eslint-plugin-react-refresh` (`only-export-components` com `allowConstantExport`)

Funciona corretamente com TypeScript, React, React Hooks e não conflita com o Prettier (não há regras de estilo no ESLint).

Script existente:

```json
"lint": "eslint ."
```

❌ **Falta adicionar**:

```json
"lint:fix": "eslint . --fix"
```

⚠️ **Opcional**: avaliar regras adicionais de TypeScript (`no-explicit-any`, `eqeqeq`, imports, promises). Não adicionar regras excessivamente restritivas que dificultem o desenvolvimento da LP sem benefício claro.

---

# 9. TypeScript ✅

Configuração existente (`tsconfig.json` com project references para `tsconfig.app.json` e `tsconfig.node.json`):

- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`
- `noEmit: true` (typecheck sem gerar arquivos)

O `build` já roda `tsc -b && vite build` (typecheck embutido).

❌ **Falta adicionar** script dedicado:

```json
"typecheck": "tsc -b --noEmit"
```

Regras:

- Evitar `any` quando existir alternativa razoável.
- Preferir tipos explícitos em APIs públicas e estruturas importantes.
- Não utilizar `@ts-ignore` sem justificativa.
- Não desativar verificações TypeScript apenas para eliminar erros.
- Não modificar funcionalidades existentes apenas para esconder erros.

---

# 10. Padrão de código ✅

Já documentado em `AGENTS.md`, `docs/padrao-componentes.md` e `docs/git-branches.md`. Nada a implementar.

### Indentação

```text
2 espaços
```

### Nomes

Componentes React:

```text
PascalCase
```

Exemplo:

```text
Hero.tsx
```

Funções e variáveis:

```text
camelCase
```

Exemplo:

```text
getUserData()
```

Constantes:

```text
camelCase ou UPPER_SNAKE_CASE
```

Utilizar o padrão predominante do projeto e evitar alterações desnecessárias.

Tipos e interfaces:

```text
PascalCase
```

Exemplo:

```text
UserData
```

### Imports

Organizar imports de forma consistente.

Separar, quando aplicável:

1. Bibliotecas externas
2. Imports internos
3. Componentes
4. Hooks
5. Utils
6. Tipos
7. Assets

Não reorganizar todos os arquivos existentes apenas para aplicar essa regra. Aplicar principalmente a novos arquivos e arquivos modificados.

### Componentes

- Arquivos `PascalCase.tsx` com **named export**.
- Props tipadas com interface `XxxProps`, sempre aceitando `className?: string`.
- Mesclar classes com `cn()` de `src/lib/utils.ts` (clsx + tailwind-merge) — nunca concatenar strings.
- Usar somente tokens do `@theme` (`--color-arcade-*`, `--font-sans`/`--font-display`) — cores/fontes hardcoded proibidas.
- `src/sections/` exportam somente componentes (regra `react-refresh/only-export-components`).

---

# 11. Husky / Pre-commit ❌

Utilizar **Husky** para configurar Git Hooks.

Criar:

```text
.husky/pre-commit
```

O objetivo do hook é impedir commits que contenham problemas de lint ou formatação.

Avaliar o uso de:

```text
lint-staged
```

para executar verificações somente nos arquivos modificados.

O fluxo esperado é:

```text
git commit
     ↓
pre-commit
     ↓
ESLint
     ↓
Prettier
     ↓
commit permitido ou bloqueado
```

Se houver erro:

```text
commit bloqueado
```

Não executar ações destrutivas no hook.

Não realizar `git push` automaticamente.

⚠️ **Atenção**: Husky e lint-staged são dependências novas → exigem PR revisado (regra do `AGENTS.md`). Não instalar e commitar direto na branch de trabalho.

---

# 12. Commits ✅

O projeto utiliza **Conventional Commits** (documentado em `AGENTS.md` e `docs/git-branches.md`).

Todos os commits devem ser escritos em **português** (padrão predominante do projeto — ver §15).

Tipos permitidos:

```text
feat
fix
docs
style
refactor
test
chore
```

Exemplos:

```text
feat(hero): adiciona grid de requisitos
fix(button): corrige contraste do hover
chore(ci): adiciona workflow de lint/build
```

Formato:

```text
<type>(<escopo>): <descrição>
```

A descrição deve ser curta, objetiva e descritiva.

Não utilizar commits como:

```text
update
changes
teste
ajustes
coisas
final
```

---

# 13. Skill de Commit ❌

Criar uma skill específica para commits.

Responsabilidades:

- Analisar alterações realizadas.
- Identificar o tipo de Conventional Commit adequado.
- Gerar a mensagem em português, com escopo quando aplicável.
- Manter a mensagem curta e objetiva.
- Não incluir alterações não relacionadas.
- Não criar commit automaticamente sem autorização explícita do usuário.

Exemplo:

```text
feat(hero): adiciona hero genérico da LP
```

A skill deve respeitar as regras de Conventional Commits definidas nesta spec.

---

# 14. Agente Tech Lead ❌

Criar/configurar um agente do OpenCode responsável por atuar como Tech Lead do projeto.

Nome sugerido:

```text
tech-lead
```

Responsabilidades:

- Revisar decisões técnicas.
- Verificar arquitetura.
- Verificar padrões de código.
- Verificar TypeScript.
- Verificar React.
- Verificar organização do projeto.
- Identificar duplicação desnecessária.
- Identificar código potencialmente problemático.
- Verificar aderência às regras do projeto.
- Sugerir melhorias quando necessário.

O Tech Lead deve priorizar:

```text
simplicidade
manutenibilidade
consistência
legibilidade
baixo acoplamento
```

O Tech Lead não deve:

- Fazer refatorações gigantes sem solicitação.
- Alterar arquitetura sem justificativa.
- Adicionar dependências desnecessárias.
- Criar abstrações prematuras.
- Ignorar padrões definidos neste documento.

⚠️ **Observação**: o agente `code-reviewer` já cobre parte desse papel (revisão de diffs contra `AGENTS.md` e `docs/`). O `tech-lead` deve ser complementar, focado em decisões técnicas e arquitetura.

---

# 15. Idioma

### Código

Utilizar inglês para:

- Variáveis
- Funções
- Componentes
- Tipos
- Interfaces
- Hooks
- Arquivos
- Pastas
- Comentários técnicos quando necessários

### Commits

Utilizar **português** (padrão predominante do projeto — ver §12).

### Comunicação

O OpenCode pode conversar com os desenvolvedores em português.

Exemplo:

```text
feat(hero): adiciona hero genérico da LP
```

e não:

```text
feat: add generic hero section
```

---

# 16. Skills ✅

Skills existentes (organizadas, uma responsabilidade cada, sem duplicação):

```text
componentes
react
tailwind-ui
testes
```

❌ **Falta adicionar**:

```text
commit
```

Cada skill deve possuir uma responsabilidade clara.

Evitar colocar todas as regras em uma única skill.

Evitar duplicar as mesmas regras em várias skills.

---

# 17. Workflows ❌

Um workflow representa um processo formado por várias skills.

Conceito:

```text
Workflow
   ↓
Skills relacionadas
   ↓
Execução de uma tarefa completa
```

Criar, quando aplicável:

### Commit Workflow

Fluxo:

```text
análise das alterações
→ lint
→ format check
→ typecheck
→ sugestão de Conventional Commit
→ autorização do usuário
→ commit
```

### Review Workflow

Fluxo:

```text
análise
→ code review
→ lint
→ typecheck
→ build
```

Não criar workflows desnecessários. Os fluxos de desenvolvimento e de PR já estão cobertos pelo agente `frontend`, pelo `code-reviewer`/`qa` e pelo CI (`ci.yml`).

---

# 18. `.nvmrc` ❌

Criar:

```text
.nvmrc
```

A versão deve ser definida com base na versão do Node atualmente compatível com o projeto e suas dependências.

Base para a decisão:

- Node local: v24.21.0
- CI (`ci.yml`): `node-version: 24`

Valor sugerido:

```text
24
```

Não atualizar Node apenas por estar disponível uma versão mais recente.

O `.nvmrc` deve representar a versão oficial utilizada pelo projeto.

---

# 19. Package.json ⚠️

Scripts existentes:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

❌ **Faltam adicionar**:

```json
{
  "scripts": {
    "lint:fix": "eslint . --fix",
    "typecheck": "tsc -b --noEmit"
  }
}
```

Não remover scripts existentes sem verificar se estão sendo utilizados.

---

# 20. Validação

Após todas as configurações, executar:

```bash
npm install
```

Depois:

```bash
npm run lint
```

```bash
npm run format:check
```

```bash
npm run typecheck
```

```bash
npm run build
```

Também testar o Git Hook:

```bash
git commit
```

com uma alteração controlada.

---

# 21. Critérios de aceite

A implementação será considerada concluída quando:

- [ ] `.editorconfig` estiver configurado. ❌
- [ ] Prettier estiver configurado. ✅
- [ ] ESLint estiver integrado ao TypeScript. ✅
- [ ] ESLint e Prettier não apresentarem conflitos. ✅
- [ ] Indentação estiver padronizada em 2 espaços. ✅
- [ ] TypeScript possuir verificação via `typecheck`. ❌ (script)
- [ ] Husky estiver funcionando. ❌
- [ ] Pre-commit estiver funcionando. ❌
- [ ] Commits seguirem Conventional Commits. ✅
- [ ] Commits forem padronizados em português. ✅
- [ ] Skill de commit estiver criada. ❌
- [ ] Agente Tech Lead estiver configurado. ❌
- [ ] Skills estiverem organizadas. ✅
- [ ] Workflows estiverem definidos. ❌
- [ ] `.nvmrc` estiver configurado. ❌
- [ ] Scripts do `package.json` estiverem funcionando. ⚠️ (faltam `lint:fix` e `typecheck`)
- [ ] `lint` passar. ✅
- [ ] `format:check` passar. ✅
- [ ] `typecheck` passar. ❌ (script)
- [ ] `build` passar. ✅
- [ ] Projeto continuar executando normalmente. ✅
- [ ] Nenhuma funcionalidade da LP tiver sido alterada sem necessidade. ✅

---

# 22. Relatório final

Ao terminar, o OpenCode deve apresentar um resumo contendo:

### Arquivos criados

Lista dos novos arquivos.

### Arquivos modificados

Lista dos arquivos alterados.

### Dependências adicionadas

Lista das dependências instaladas e motivo de cada uma (Husky, lint-staged — via PR revisado).

### Configurações

Resumo das principais configurações realizadas.

### Validação

Informar o resultado de:

```text
lint
format:check
typecheck
build
pre-commit
```

### Problemas encontrados

Informar qualquer problema que não tenha sido possível resolver automaticamente.

### Alterações fora do escopo

Se alguma alteração fora do escopo tiver sido necessária, explicar:

- O que foi alterado.
- Por que foi necessário.
- Qual o impacto.
