import { Heart, Rocket, Star, Zap, type LucideIcon } from 'lucide-react'

export type VoiceColor = 'pink' | 'blue' | 'cyan' | 'purple' | 'teal'

export interface TestimonialTag {
  label: string
  icon: LucideIcon
}

export interface Testimonial {
  name: string
  category: string
  color: VoiceColor
  quote: string
  role: string
  affiliation: string
  tags: readonly TestimonialTag[]
}

export const vozesCopy = {
  badge: 'VOZES DA COMUNIDADE',
  title: 'Quem vive a comunidade, conta',
  description:
    'Experiências de quem encontrou na SouJunior espaço para aprender, colaborar e crescer profissionalmente.',
  testimonials: [
    {
      name: 'Juliana M.',
      category: 'Colaboração Real',
      color: 'pink',
      role: 'UX/UI Designer',
      affiliation: 'Membro desde Fev/2024',
      quote:
        'Como designer, poder colaborar em produtos reais com times multidisciplinares acelerou meu aprendizado de forma incrível e ampliou meu portfólio.',
      tags: [
        { label: 'Lv. 2 Designer', icon: Zap },
        { label: '2+ Projetos Entregues', icon: Rocket },
      ],
    },
    {
      name: 'Lucas R.',
      category: 'Crescimento Pessoal',
      color: 'blue',
      role: 'QA Tester',
      affiliation: 'Membro desde Mar/2024',
      quote:
        'A comunidade me deu a confiança que eu precisava. Participar de projetos reais mudou minha visão sobre o mercado e me preparou para os desafios do dia a dia.',
      tags: [
        { label: 'Lv. 2 QA', icon: Zap },
        { label: '2+ Projetos Entregues', icon: Rocket },
      ],
    },
    {
      name: 'Ana S.',
      category: 'Primeira Experiência',
      color: 'cyan',
      role: 'Junior Dev',
      affiliation: 'Squad #02',
      quote:
        'Entrar em uma squad me deu a experiência prática que os recrutadores cobram. Foi minha primeira oportunidade real de trabalho em equipe colaborativa.',
      tags: [
        { label: 'Squad #02 · Lv. 2 Dev', icon: Zap },
        { label: '3+ Projetos Entregues', icon: Rocket },
      ],
    },
    {
      name: 'Marcus V.',
      category: 'Impacto em Mentoria',
      color: 'purple',
      role: 'Mentor Voluntário',
      affiliation: 'Membro desde Jan/2024 · Squad #04',
      quote:
        'Mentorar a nova geração fortalece todo o mercado de tecnologia. A plataforma me deu o espaço certo para compartilhar conhecimento e acompanhar o crescimento de cada talento.',
      tags: [
        { label: 'Apoiador Apoia.se', icon: Heart },
        { label: 'Lv. 3 Mentor', icon: Star },
      ],
    },
    {
      name: 'Renata L.',
      category: 'Transição de Carreira',
      color: 'teal',
      role: 'Tech Manager · Apoiador',
      affiliation: 'Squad #05',
      quote:
        'O apoio da comunidade foi essencial na minha transição de carreira. Encontrei mentores incríveis e projetos que me desafiaram a crescer profissionalmente.',
      tags: [
        { label: 'Apoiador Apoia.se', icon: Heart },
        { label: '4+ Projetos Entregues', icon: Rocket },
      ],
    },
  ],
} as const
