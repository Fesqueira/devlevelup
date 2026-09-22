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
      value: '+500',
      title: 'Membros ativos',
      description: 'Juniores acelerados profissionalmente',
    },
    {
      value: '30+',
      title: 'Projetos lançados',
      description: 'Produtos reais criados de ponta a ponta',
    },
    {
      value: '100+',
      title: 'Colocações de mercado',
      description: 'Membros contratados por grandes empresas',
    },
  ],
} as const
