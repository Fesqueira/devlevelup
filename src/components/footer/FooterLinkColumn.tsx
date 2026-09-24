import type { FooterColumn } from '../../data/footer'
import { cn } from '../../lib/utils'

interface FooterLinkColumnProps {
  column: FooterColumn
  className?: string
}

export function FooterLinkColumn({ column, className }: FooterLinkColumnProps) {
  return (
    <div className={cn('flex flex-col gap-5', className)}>
      <h3 className="font-sans text-base font-semibold text-arcade-footer-heading">
        {column.title}
      </h3>
      <ul className="flex flex-col gap-3.5">
        {column.links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-1 font-sans text-sm font-medium text-arcade-footer-text transition-colors hover:text-arcade-cyan"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
