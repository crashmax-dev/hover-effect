class HoverEffect {
  private el: HTMLDivElement
  private threshold = 20

  constructor(el: HTMLDivElement) {
    this.el = el
    this.el.addEventListener('mouseenter', this.mouseenter.bind(this))
    this.el.addEventListener('mouseleave', this.mouseleave.bind(this))
    this.el.addEventListener('mousemove', this.mousemove.bind(this))
  }

  private mouseenter(event: MouseEvent): void {
    this.el.classList.add('over')
  }

  private mouseleave(event: MouseEvent): void {
    this.el.classList.remove('over')
    this.el.style.transform = `perspective(${this.el.clientWidth}px) rotateX(0deg) rotateY(0deg)`
  }

  private mousemove(event: MouseEvent) {
    const { clientX, clientY, currentTarget } = event
    const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget as HTMLDivElement

    const horizontal = (clientX - offsetLeft) / clientWidth
    const vertical = (clientY - offsetTop) / clientHeight
    const rotateY = (vertical * this.threshold - this.threshold / 2).toFixed(2)
    const rotateX = (this.threshold / 2 - horizontal * this.threshold).toFixed(2)

    // const _rotateY = (vertical * this.threshold - this.threshold / 2).toFixed(2)
    // const _rotateX = (horizontal * this.threshold - this.threshold / 2).toFixed(2)

    let transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg)`

    if (this.el.classList.contains('over')) {
      transform += ' scale3d(1.07, 1.07, 1.07)'
    }

    card.style.transform = transform
  }
}

const motion = window.matchMedia('(prefers-reduced-motion)')
const card = document.querySelector<HTMLDivElement>('.card')!

if (!motion.matches) {
  new HoverEffect(card)
}
