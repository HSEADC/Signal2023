import './index.css'

import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'
import { firebaseConfig } from './javascript/config.js'
import { getSlides } from './javascript/slides_data.js'
import { addSlides } from './javascript/basics.js'

const app = initializeApp(firebaseConfig)
const db = getDatabase()
const slidesCountRef = ref(db, firebaseConfig.databaseName)

let currentSlide

onValue(slidesCountRef, (snapshot) => {
  const data = snapshot.val()
  const keys = Object.keys(data)
  const length = keys.length
  const lastKey = Object.keys(data)[length - 1]
  const { slide } = data[lastKey]

  setCurrentSlide(slide)
})

function setCurrentSlide(slide) {
  currentSlide = slide
  document.body.id = `slide${slide}`
}

window.addEventListener('DOMContentLoaded', () => {
  getSlides()
    .then((slides) => addSlides(slides))
    .then(() => {
      setCurrentSlide(0)
    })
})
