import './index.css'

import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, set } from 'firebase/database'
import { firebaseConfig } from './javascript/config.js'
import { getSlides } from './javascript/slides_data.js'
import { addSlides, changeSlide } from './javascript/basics.js'

const app = initializeApp(firebaseConfig)
const db = getDatabase()
let currentSlide, lastSlide

function writeTouchData(slide) {
  const slidesListRef = ref(db, firebaseConfig.databaseName)
  const newSlideRef = push(slidesListRef)

  set(newSlideRef, {
    slide
  })
}

function addNavigationButtons() {
  const navigationContainer = document.createElement('div')
  navigationContainer.classList.add('navigationContainer')

  const prevButton = document.createElement('div')
  prevButton.classList.add('prevButton')

  const nextButton = document.createElement('div')
  nextButton.classList.add('nextButton')

  navigationContainer.appendChild(prevButton)
  navigationContainer.appendChild(nextButton)
  document.body.appendChild(navigationContainer)

  prevButton.addEventListener('click', () => {
    prevSlide()
  })

  // prevButton.addEventListener('touchend', () => {
  //   prevSlide()
  // })

  nextButton.addEventListener('click', () => {
    nextSlide()
  })

  // nextButton.addEventListener('touchend', () => {
  //   nextSlide()
  // })
}

function prevSlide() {
  if (currentSlide > 1) {
    setCurrentSlide(currentSlide - 1)
    changeSlide(currentSlide)
    writeTouchData(currentSlide)
  } else {
    setCurrentSlide(lastSlide)
    changeSlide(currentSlide)
    writeTouchData(currentSlide)
  }
}

function nextSlide() {
  if (currentSlide < lastSlide) {
    setCurrentSlide(currentSlide + 1)
    changeSlide(currentSlide)
    writeTouchData(currentSlide)
  } else {
    setCurrentSlide(1)
    changeSlide(currentSlide)
    writeTouchData(currentSlide)
  }
}

function setCurrentSlide(slide) {
  currentSlide = slide
}

function setLastSlide(slides) {
  lastSlide = slides.length
}

window.addEventListener('DOMContentLoaded', () => {
  getSlides()
    .then((slides) => {
      setLastSlide(slides)
      addSlides(slides)
    })
    .then(() => {
      setCurrentSlide(1)
      changeSlide(currentSlide)
      addNavigationButtons()
    })
})
