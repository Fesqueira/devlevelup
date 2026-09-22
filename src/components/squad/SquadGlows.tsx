import { Glow } from '../ui/Glow'

export function SquadGlows() {
  return (
    <>
      <Glow opacity={13} className="-left-25 top-7.5 size-125" />
      <Glow tone="purple" opacity={13} className="-right-28 top-7.5 size-125" />
      <Glow opacity={11} className="-left-30 top-50 size-105" />
      <Glow tone="purple" opacity={11} className="-right-25 top-50 size-110" />
      <Glow
        opacity={4}
        blur={60}
        className="left-1/2 top-20 h-75 w-150 -translate-x-1/2"
      />
      <Glow
        tone="level"
        opacity={60}
        blur={30}
        className="left-1/2 top-1/2 h-87.5 w-250 -translate-x-1/2 -translate-y-1/2"
      />
    </>
  )
}
