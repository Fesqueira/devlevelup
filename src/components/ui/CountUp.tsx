import { useCountUp } from '../../hooks/useCountUp'
import { useInView } from '../../hooks/useInView'
import { cn } from '../../lib/utils'

interface CountUpProps {
  value: string
  className?: string
}

function parseValue(value: string) {
  const match = value.match(/^(\D*)([\d.,\s]+)(\D*)$/)
  if (!match) return { prefix: '', number: 0, suffix: '' }
  return {
    prefix: match[1],
    number: Number(match[2].replace(/\D/g, '')),
    suffix: match[3],
  }
}

export function CountUp({ value, className }: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>()
  const { prefix, number, suffix } = parseValue(value)
  const current = useCountUp(number, { start: inView })
  const finalValue = value

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      <span aria-hidden="true">
        {prefix}
        {current}
        {suffix}
      </span>
      <span className="sr-only">{finalValue}</span>
    </span>
  )
}
