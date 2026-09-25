import {
  ArrowRightIcon,
  DiscordIcon,
  GitHubIcon,
  GlobeIcon,
  WhatsAppIcon,
} from '../ui/icons'
import { siteConfig } from '../../config'
import { footerCopy, socialLinks } from '../../data/footer'
import { cn } from '../../lib/utils'

interface FooterSocialProps {
  className?: string
}

const socialIcons = {
  site: GlobeIcon,
  discord: DiscordIcon,
  whatsapp: WhatsAppIcon,
  github: GitHubIcon,
} as const

export function FooterSocial({ className }: FooterSocialProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div className="flex flex-col gap-4">
        <h3 className="font-sans text-base font-semibold text-arcade-footer-heading">
          {footerCopy.socialTitle}
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
                  className="inline-flex items-center gap-2 font-sans text-sm font-medium text-arcade-footer-text transition-colors hover:text-arcade-cyan"
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
        rel="noreferrer"
        className="hidden h-10 w-fit items-center rounded-lg bg-arcade-cyan px-3 font-sans text-sm font-semibold text-arcade-950 shadow-arcade-badge transition-colors hover:bg-arcade-secondary md:inline-flex md:px-5 md:py-2.5"
      >
        {footerCopy.ctaLabel}
        <ArrowRightIcon className="size-3.5" />
      </a>
    </div>
  )
}
