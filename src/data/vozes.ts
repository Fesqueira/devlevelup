export interface Testimonial {
  name: string
  role: string
  membership: string
  badges: readonly string[]
  topic: string
  quote: string
  avatar: string
}

export const vozesCopy = {
  badge: 'VOZES DA COMUNIDADE',
  title: 'Quem vive a comunidade, conta',
  description:
    'Experiências de quem encontrou na SouJunior espaço para aprender, colaborar e crescer profissionalmente.',
  testimonials: [
    {
      name: 'Lucas R.',
      role: 'QA TESTER',
      membership: 'Membro desde Mar/2024',
      badges: ['🏅 Lv. 2 QA', '🚀 2+ Projetos Entregues'],
      topic: 'CRESCIMENTO PESSOAL',
      quote:
        'A comunidade me deu a confiança que eu precisava. Participar de projetos reais mudou minha visão sobre o mercado e me preparou para os desafios do dia a dia.',
      avatar: '/images/vozes/lucas.jpg',
    },
    {
      name: 'Ana S.',
      role: 'JUNIOR DEV',
      membership: 'Atuou na Squad #02',
      badges: ['⚡ Squad #02 • Lv. 2 Dev', '🚀 2+ Projetos Entregues'],
      topic: 'PRIMEIRA EXPERIÊNCIA',
      quote:
        'Entrar em uma squad me deu a experiência prática que os recrutadores cobram. Foi minha primeira oportunidade real de trabalho em equipe colaborativo.',
      avatar: '/images/vozes/ana.jpg',
    },
    {
      name: 'Marcus V.',
      role: 'MENTOR VOLUNTÁRIO',
      membership: 'Membro desde Jan/2024 · Squad #04',
      badges: ['⚡ Apoiador Apoia.se', '🏅 Lv. 3 Mentor'],
      topic: 'IMPACTO EM MENTORIA',
      quote:
        'Mentorar a nova geração fortalece todo o mercado de tecnologia. A plataforma me deu o espaço certo para compartilhar conhecimento e acompanhar o crescimento de cada talento.',
      avatar: '/images/vozes/marcus.jpg',
    },
    {
      name: 'Renata L.',
      role: 'TECH MANAGER · APOIADOR',
      membership: 'Atuou na Squad #05',
      badges: ['⚡ Apoiador Apoia.se', '🚀 3+ Projetos Entregues'],
      topic: 'TRANSIÇÃO DE CARREIRA',
      quote:
        'O apoio da comunidade foi essencial na minha transição de carreira. Encontrei mentores incríveis e projetos que me desafiaram a crescer profissionalmente.',
      avatar: '/images/vozes/renata.jpg',
    },
    {
      name: 'Juliana M.',
      role: 'UX/UI DESIGNER',
      membership: 'Membro desde Fev/2024',
      badges: ['🏅 Lv. 2 Designer', '🚀 4+ Projetos Entregues'],
      topic: 'COLABORAÇÃO REAL',
      quote:
        'Como designer, poder colaborar em produtos reais com times multidisciplinares acelerou meu aprendizado de forma incrível e ampliou meu portfólio.',
      avatar: '/images/vozes/juliana.jpg',
    },
  ],
} as const
