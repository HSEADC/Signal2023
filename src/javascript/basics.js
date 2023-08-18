function addSlides(slides) {
  return new Promise((resolve, reject) => {
    slides.forEach((slide, index) => {
      const section = document.createElement('section')
      section.classList.add('slide')
      section.classList.add(`slide${slide.place}`)
      section.style.display = 'none'

      const text = document.createElement(slide.type)
      text.innerText = slide.text

      section.appendChild(text)
      document.body.appendChild(section)
    })

    resolve()
  })
}

function changeSlide(currentSlide) {
  const slides = document.getElementsByClassName('slide')
  let slide

  for (let index = 0; index < slides.length; index++) {
    const s = slides[index]
    s.style.display = 'none'
  }

  if (currentSlide === 'error') {
    slide = document.querySelector(`.slide.error`)
  } else {
    slide = document.querySelector(`.slide${currentSlide}`)
  }

  slide.style.display = 'flex'
}

export { addSlides, changeSlide }
