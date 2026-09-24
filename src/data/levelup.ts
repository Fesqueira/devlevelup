export interface LevelData {
  level: string
  name: string
  description: string
  image: string
}

export interface LevelUpCopy {
  badge: string
  subtitle: string
  title: string
  description: string
  currentLabel: string
  xpLabel: string
  unlockCta: string
  unlockCompleteCta: string
  prevSlideLabel: string
  nextSlideLabel: string
  levels: LevelData[]
}

export const levelUpCopy: LevelUpCopy = {
  badge: '⚡ LEVEL-UP SYSTEM',
  subtitle: '',
  title: 'Todo mundo começa pequeno: A jornada de evolução',
  description:
    'Cada nível desbloqueia novas habilidades, suporte e oportunidades na comunidade.',
  currentLabel: 'Nível Atual',
  xpLabel: '+XP',
  unlockCta: 'Desbloquear personagem',
  unlockCompleteCta: 'Ajude no Apoia.se',
  prevSlideLabel: 'Personagem anterior',
  nextSlideLabel: 'Próximo personagem',
  levels: [
    {
      level: 'LV. 1',
      name: 'Iniciante',
      description: 'Primeiros passos e lógica',
      image: '/images/personagens/level1.png',
    },
    {
      level: 'LV. 2',
      name: 'Aprendiz',
      description: 'Projetos de estudo e mentoria',
      image: '/images/personagens/level2.png',
    },
    {
      level: 'LV. 3',
      name: 'Membro Squad',
      description: 'Projetos open-source em equipe',
      image: '/images/personagens/level3.png',
    },
    {
      level: 'LV. 4',
      name: 'Contribuidor',
      description: 'Projetos públicos reais',
      image: '/images/personagens/level4.png',
    },
    {
      level: 'LV. 5',
      name: 'Pronto pro Mercado',
      description: 'Contratação e liderança',
      image: '/images/personagens/level5.png',
    },
  ],
}
