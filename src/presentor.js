import './index.css'

import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, set } from 'firebase/database'
import { firebaseConfig } from './javascript/config.js'

const app = initializeApp(firebaseConfig)
const db = getDatabase()
const firstSlide = 1
const lastSlide = 20
let currentSlide = 1

function writeTouchData(slide) {
  const slidesListRef = ref(db, firebaseConfig.databaseName)
  const newSlideRef = push(slidesListRef)

  console.log('writeTouchData', slide)

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

  // prevButton.addEventListener('click', () => {
  //   prevSlide()
  // })

  prevButton.addEventListener('touchend', () => {
    prevSlide()
  })

  // nextButton.addEventListener('click', () => {
  //   nextSlide()
  // })

  nextButton.addEventListener('touchend', () => {
    nextSlide()
  })
}

function prevSlide() {
  if (currentSlide > firstSlide) {
    setCurrentSlide(currentSlide - 1)
    writeTouchData(currentSlide)
  }
}

function nextSlide() {
  if (currentSlide < lastSlide) {
    setCurrentSlide(currentSlide + 1)
    writeTouchData(currentSlide)
  }
}

function setCurrentSlide(slide) {
  currentSlide = slide
  document.body.id = `slide${slide}`
}

window.addEventListener('DOMContentLoaded', () => {
  setCurrentSlide(currentSlide)
  addNavigationButtons()
})
