import { Glow } from '../ui/Glow'

export function VoicesGlows() {
  return (
    <>
      <Glow
        tone="purple"
        opacity={15}
        blur={60}
        className="-left-30 top-20 size-90"
      />
      <Glow opacity={12} blur={60} className="-right-30 top-20 size-90" />
      <Glow opacity={12} blur={60} className="-left-30 bottom-10 size-90" />
      <Glow
        tone="purple"
        opacity={15}
        blur={60}
        className="-right-30 bottom-10 size-90"
      />
    </>
  )
}
