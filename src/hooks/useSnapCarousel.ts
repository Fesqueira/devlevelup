import { useCallback, useEffect, useRef, useState } from 'react'

interface UseSnapCarouselOptions {
  count: number
  behavior?: ScrollBehavior
}

export function useSnapCarousel({
  count,
  behavior = 'smooth',
}: UseSnapCarouselOptions) {
  const trackRef = useRef<HTMLOListElement>(null)
  const slideRefs = useRef<(HTMLLIElement | null)[]>([])
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    setCanScrollLeft(track.scrollLeft > 0)
    setCanScrollRight(
      track.scrollLeft < track.scrollWidth - track.clientWidth - 1,
    )
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    setCanScrollLeft(track.scrollLeft > 0)
    setCanScrollRight(track.scrollWidth > track.clientWidth)
  }, [])

  const scrollToSlide = useCallback(
    (index: number) => {
      const track = trackRef.current
      const slide = slideRefs.current[index]
      if (!track || !slide) return
      if (track.scrollWidth <= track.clientWidth) return
      track.scrollTo({
        left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2,
        behavior,
      })
    },
    [behavior],
  )

  const scrollBySlide = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current
      if (!track) return
      if (track.scrollWidth <= track.clientWidth) return
      const center = track.scrollLeft + track.clientWidth / 2
      let nearest = 0
      let nearestDistance = Infinity
      slideRefs.current.forEach((slide, index) => {
        if (!slide) return
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2
        const distance = Math.abs(slideCenter - center)
        if (distance < nearestDistance) {
          nearestDistance = distance
          nearest = index
        }
      })
      const target = Math.min(Math.max(nearest + direction, 0), count - 1)
      scrollToSlide(target)
    },
    [count, scrollToSlide],
  )

  return {
    trackRef,
    slideRefs,
    canScrollLeft,
    canScrollRight,
    updateScrollState,
    scrollToSlide,
    scrollBySlide,
  }
}
