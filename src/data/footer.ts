import { siteConfig } from '../config'

export interface FooterLink {
  label: string
  href: string
  external?: boolean
}

export interface SocialLink extends FooterLink {
  icon: 'site' | 'discord' | 'whatsapp' | 'github'
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export const footerColumns: FooterColumn[] = [
  {
    title: 'Comunidade',
    links: [
      { label: 'Quem Somos', href: '#inicio' },
      { label: 'Nossas Squads', href: '#squads' },
      {
        label: 'Projetos',
        href: siteConfig.links.github,
        external: true,
      },
    ],
  },
  {
    title: 'Transparência',
    links: [{ label: 'Métricas de Impacto', href: '#impacto' }],
  },
]

export const socialLinks: SocialLink[] = [
  { label: 'Website', href: siteConfig.links.site, icon: 'site' },
  { label: 'Discord', href: siteConfig.links.discord, icon: 'discord' },
  { label: 'WhatsApp', href: siteConfig.links.whatsapp, icon: 'whatsapp' },
  { label: 'GitHub', href: siteConfig.links.github, icon: 'github' },
]

export const footerCopy = {
  socialTitle: 'Canais Oficiais',
  ctaLabel: 'Apoie a partir de R$ 2',
} as const
