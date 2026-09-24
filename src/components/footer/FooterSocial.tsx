import {
  ArrowRightIcon,
  DiscordIcon,
  GitHubIcon,
  WhatsAppIcon,
} from '../ui/icons'
import { Button } from '../ui/Button'
import { siteConfig } from '../../config'
import { footerCopy, socialLinks } from '../../data/footer'
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
      <Button
        href={siteConfig.links.apoia}
        variant="cyan"
        size="lg"
        className="w-fit rounded-lg px-4 py-3.5 font-sans font-bold text-[13px] tracking-[0.04em] shadow-arcade-cta-cyan after:hidden lg:rounded-xl lg:px-5"
      >
        {footerCopy.ctaLabel}
        <ArrowRightIcon className="size-3.5" />
      </Button>
    </div>
  )
}
