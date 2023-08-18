import './index.css'

import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'
import { firebaseConfig } from './javascript/config.js'
import { getSlides } from './javascript/slides_data.js'
import { addSlides, changeSlide } from './javascript/basics.js'

const app = initializeApp(firebaseConfig)
const db = getDatabase()
const slidesCountRef = ref(db, firebaseConfig.databaseName)
let currentSlide, lastSlide

onValue(slidesCountRef, (snapshot) => {
  const data = snapshot.val()
  const keys = Object.keys(data)
  const length = keys.length
  const lastKey = Object.keys(data)[length - 1]
  const { slide } = data[lastKey]

  setCurrentSlide(slide)
  changeSlide(currentSlide)
})

function setCurrentSlide(slide) {
  currentSlide = slide
}

function setLastSlide(slides) {
  lastSlide = slides.length
}

window.addEventListener('resize', () => {
  if (window.innerWidth > window.innerHeight) {
    changeSlide('error')
  } else {
    changeSlide(currentSlide)
  }
})

window.addEventListener('DOMContentLoaded', () => {
  getSlides()
    .then((slides) => {
      setLastSlide(slides)
      addSlides(slides)
    })
    .then(() => {
      setCurrentSlide(1)
      changeSlide(currentSlide)
    })
})
