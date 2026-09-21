export interface ComparisonCardData {
  eyebrow: string
  title: string
  bullets: string[]
}

export const comparisonCopy = {
  badge: '⚡ COMPARAÇÃO DE IMPACTO',
  title: 'Veja a diferença que seu apoio faz',
  description:
    'Compare o modelo tradicional de doação sem contexto com a transformação real do ecossistema SouJunior.',
  isolated: {
    eyebrow: 'MODELO ISOLADO',
    title: 'Doação Desconectada',
    bullets: [
      'Sem visibilidade de onde o dinheiro é aplicado.',
      'Projetos de juniores ficam engavetados sem mentoria.',
      'Sem integração entre PM, UX/UI, Dev e QA.',
      'Doador não recebe benefícios ou reconhecimento.',
    ],
  },
  ecosystem: {
    eyebrow: 'O PODER DO SEU APOIO',
    title: 'Ecossistema Ativo & Transparente',
    bullets: [
      'Transparência total via dashboard pública do Apoia.se.',
      'Infraestrutura ativa de servidores e ambientes de teste no GitHub.',
      'Squads multidisciplinares ativas (PM, UX/UI, Dev, QA) simulando mercado real.',
      'Recompensas exclusivas: Badges no Discord, acesso ao Banco de Talentos e destaque na rede.',
    ],
  },
  cta: '⚡ Comece a transformar talentos por R$ 2,00/mês',
  ctaSubtext: 'Cancele quando quiser · Transparência total via Apoia.se',
} as const
