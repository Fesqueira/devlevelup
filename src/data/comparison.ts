import {
  Archive,
  Award,
  CircleX,
  EyeOff,
  LayoutDashboard,
  Server,
  Unlink,
  Users,
  type LucideIcon,
} from 'lucide-react'

export interface ComparisonCardData {
  eyebrow: string
  title: string
  bullets: { text: string; icon: LucideIcon }[]
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
      {
        text: 'Sem visibilidade de onde o dinheiro é aplicado.',
        icon: EyeOff,
      },
      {
        text: 'Projetos de juniores ficam engavetados sem mentoria.',
        icon: Archive,
      },
      {
        text: 'Sem integração entre PM, UX/UI, Dev e QA.',
        icon: Unlink,
      },
      {
        text: 'Doador não recebe benefícios ou reconhecimento.',
        icon: CircleX,
      },
    ],
  },
  ecosystem: {
    eyebrow: 'O PODER DO SEU APOIO',
    title: 'Ecossistema Ativo & Transparente',
    bullets: [
      {
        text: 'Transparência total via dashboard pública do Apoia.se.',
        icon: LayoutDashboard,
      },
      {
        text: 'Infraestrutura ativa de servidores e ambientes de teste no GitHub.',
        icon: Server,
      },
      {
        text: 'Squads multidisciplinares ativas (PM, UX/UI, Dev, QA) simulando mercado real.',
        icon: Users,
      },
      {
        text: 'Recompensas exclusivas: Badges no Discord, acesso ao Banco de Talentos e destaque na rede.',
        icon: Award,
      },
    ],
  },
  cta: '⚡ Comece a transformar talentos por R$ 2,00/mês',
  ctaSubtext: 'Cancele quando quiser · Transparência total via Apoia.se',
} as const
