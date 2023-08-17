import Airtable from 'airtable'

const token =
  'pate7m4elKou9i2Gq.509fe0e89292986b4bfb83b298003a7414e1ea9c51ca041b270a851b4b193df0'

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: token
})

const base = Airtable.base('apprEyigq68R4l6Pz')

// function getSlides() {
//   return new Promise((resolve, reject) => {
//     const content = []

//     base('Post Teasers')
//       .select({ maxRecords: 100 })
//       .firstPage()
//       .then((result) => {
//         result.forEach((record) => {
//           content.push({
//             id: record.id,
//             tags: record.fields['Tags'],
//             image: record.fields['Image'],
//             title: record.fields['Title'],
//             description: record.fields['Description'],
//             url: record.fields['Url']
//           })
//         })

//         resolve(content)
//       })
//   })
// }

function getSlides() {
  return new Promise((resolve, reject) => {
    const slides = []

    base('Slides')
      .select({ maxRecords: 100 })
      .firstPage()
      .then((result) => {
        result.forEach((record) => {
          slides.push({
            text: record.fields['text'],
            type: record.fields['type'],
            place: record.fields['place']
          })
        })

        console.log(slides)

        resolve(slides)
      })
  })
}

export { getSlides }
