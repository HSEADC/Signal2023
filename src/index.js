import './index.css'

import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'
import { firebaseConfig } from './javascript/config.js'

const app = initializeApp(firebaseConfig)
const db = getDatabase()
const slidesCountRef = ref(db, firebaseConfig.databaseName)

console.log('slidesCountRef', slidesCountRef)

let currentSlide = 1

function setCurrentSlide(slide) {
  currentSlide = slide
  document.body.id = `slide${slide}`
}

onValue(slidesCountRef, (snapshot) => {
  const data = snapshot.val()
  const keys = Object.keys(data)
  const length = keys.length
  const lastKey = Object.keys(data)[length - 1]
  const { slide } = data[lastKey]

  console.log(data, slide)

  setCurrentSlide(slide)
})

window.addEventListener('DOMContentLoaded', () => {
  setCurrentSlide(currentSlide)
})
