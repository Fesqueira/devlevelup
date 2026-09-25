export interface ImpactStat {
  value: string
  title: string
  description: string
}

export const impactCopy = {
  badge: '🏆 REGISTRO DE IMPACTO',
  title: 'Nosso impacto em números',
  subtitle:
    'Resultados reais de transformação social, técnica e profissional gerados pela comunidade.',
  stats: [
    {
      value: '+3',
      title: 'Projetos em andamento',
      description: 'Produtos reais sendo desenvolvidos de ponta a ponta',
    },
    {
      value: '+35',
      title: 'Mentores ativos',
      description: 'Voluntários que fazem a diferença',
    },
    {
      value: '+50',
      title: 'Colocações de mercado',
      description: 'Juniores acelerados profissionalmente',
    },
  ],
} as const
