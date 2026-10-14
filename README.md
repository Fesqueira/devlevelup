# DevLevelUp

LP (estética 16bits — dark arcade) feita para o Hackathon SouJunior.
Campanha de apoio ao projeto via [Apoia.se](https://apoia.se/soujunior).

## Stack

- **React** + **React DOM**
- **Vite**
- **TypeScript**
- **Tailwind CSS** 4 (`@tailwindcss/vite`)
- **Framer Motion**
- **Lucide React**
- **clsx** + **tailwind-merge**
- **@fontsource/\*** (Plus Jakarta Sans, Press Start 2P, Roboto Flex, Sora)

### Ferramentas de desenvolvimento

- **ESLint**
- **Prettier**
- **Husky**
- **lint-staged**
- **typescript-eslint**

> Versões exatas: consultar o `package.json` (evita drift deste README).

## Deploy

Produção: [https://devlevelup-puce.vercel.app/](https://devlevelup-puce.vercel.app/) — deploy automático da Vercel a partir de `main`.

## Squad

| Papel | Nome | LinkedIn | GitHub |
| --- | --- | --- | --- |
| PO (mentor) | Ricardo Tarchetti | [ricardotarchetti](https://www.linkedin.com/in/ricardotarchetti) | — |
| PO / QA | Sam Henrique | [samlimongihenrique](https://www.linkedin.com/in/samlimongihenrique) | — |
| Design | Claudia Mello | [claudia-ferreira-de-mello](https://www.linkedin.com/in/claudia-ferreira-de-mello) | — |
| Design | Renan Oliveira | [renan-oliveira-124564156](https://www.linkedin.com/in/renan-oliveira-124564156) | — |
| Dev (mentor) | Emerson Oliveira Leite Silva | [emersonoliveiratech](https://www.linkedin.com/in/emersonoliveiratech) | — |
| Dev | Anderson Guassu | [anderson-amelio-de-andrade-guassu-37a933201](https://www.linkedin.com/in/anderson-amelio-de-andrade-guassu-37a933201/) | [ANDERSONGUASSU](https://github.com/ANDERSONGUASSU) |
| Dev | Danielle Braga | [daniellebbraga](https://www.linkedin.com/in/daniellebbraga) | [daniebraga](https://github.com/daniebraga) |
| Dev | Pedro Jaime | [pedro-jaime-carvalho-maia](https://www.linkedin.com/in/pedro-jaime-carvalho-maia/) | — |
| QA | Felipe Siqueira | [felipe-rodrigues-siqueira-00694a369](https://www.linkedin.com/in/felipe-rodrigues-siqueira-00694a369) | [Fesqueira](https://github.com/Fesqueira) |
| QA | Italo Costa Ribeiro | [ítalo-costa-b9b7a12ab](https://www.linkedin.com/in/%C3%ADtalo-costa-b9b7a12ab/) | — |

## Design (Figma)

Protótipo da LP no Figma — [abrir no Figma](https://www.figma.com/design/C4zasm3lRXrvMw1NmvV8uP/Hackathon-SouJunior---Landing-Page-Apoia-se?node-id=75-75&t=Oznc1tXCsTwg5JJw-1)

Print da tela principal (Hero — protótipo hi-fi):

![Hero — protótipo hi-fi do Figma](docs/figma/figma-hero.png)

## Rodando

```bash
npm install
npm run dev
```

## Comandos

```bash
npm run dev      # dev server
npm run build    # typecheck + build
npm run lint     # eslint
npm run format   # prettier --write
npm run format:check  # prettier --check
npm run preview  # serve build
```