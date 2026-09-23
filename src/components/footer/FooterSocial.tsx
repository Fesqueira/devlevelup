import {
  ArrowRightIcon,
  DiscordIcon,
  GitHubIcon,
  WhatsAppIcon,
} from '../ui/icons'
import { siteConfig } from '../../config'
import { socialLinks } from '../../data/footer'
import { cn } from '../../lib/utils'

interface FooterSocialProps {
  className?: string
}

const socialIcons = {
  discord: DiscordIcon,
  whatsapp: WhatsAppIcon,
  github: GitHubIcon,
} as const

export function FooterSocial({ className }: FooterSocialProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div className="flex flex-col gap-4">
        <h3 className="font-sans text-base font-semibold text-arcade-footer-heading">
          {'Canais Oficiais'}
        </h3>
        <ul className="flex flex-col gap-4">
          {socialLinks.map((link) => {
            const Icon = socialIcons[link.icon]
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-sans text-sm font-medium text-arcade-footer-text transition-colors hover:text-arcade-cyan"
                >
                  <Icon className="size-3.5" />
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
      <a
        href={siteConfig.links.apoia}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-arcade-cyan px-5 py-3 font-sans text-sm font-bold text-arcade-cta-text shadow-arcade-cta-cyan transition-colors hover:bg-arcade-cyan/90"
      >
        {'Apoie R$ 2,00+ no Apoia.se'}
        <ArrowRightIcon className="size-3.5" />
      </a>
    </div>
  )
}
