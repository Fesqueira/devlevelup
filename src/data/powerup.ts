export interface SupportTier {
  name: string
  price: string
  description: string
  featured?: boolean
  featuredLabel?: string
}

export const powerUpCopy = {
  badge: '⚡ POWER-UP DA COMUNIDADE',
  title: 'Meta de sustentabilidade e expansão',
  subtitle:
    'Todo financiamento coletivo é investido integralmente na infraestrutura necessária para acolher os novos talentos.',
  progress: {
    amount: 'R$ 4.100 acumulado',
    amountLabel: 'Receita coletiva mensal',
    meta: 'Meta: R$ 5.000 / mês',
    level: '⚡ NÍVEL 4: 82% ALCANÇADO',
    fillPercent: 82,
    note: 'Falta apenas R$ 900,00 mensais para alcançarmos a sustentabilidade integral das ferramentas ativas e expansão para novas squads.',
  },
  tiers: [
    {
      name: 'Apoio Básico',
      price: 'R$ 2 a R$ 5 / mês',
      description:
        'Apoio voltado à sustentação ativa das ferramentas de nuvem e laboratórios integrados de desenvolvimento.',
    },
    {
      name: 'Apoio Squad',
      price: 'R$ 20 / mês',
      description:
        'Destaque corporativo nas transmissões mensais e preferência nas indicações de talentos formados.',
      featured: true,
      featuredLabel: 'MAIS POPULAR',
    },
    {
      name: 'Apoio Patrocinador',
      price: 'R$ 100+ / mês',
      description:
        'Ideal para manter seu nome listado na área de patrocinadores oficiais e obter cargo especial no Discord.',
    },
  ] satisfies SupportTier[],
  cta: {
    label: 'Apoie a campanha no Apoia.se',
    mascotAlt: 'Mascote SouJunior apoiando a campanha',
  },
} as const
