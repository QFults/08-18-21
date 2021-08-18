const axios = window.axios
const localStorage = window.localStorage

let gifs = []
const saved = JSON.parse(localStorage.getItem('saved')) || []

document.getElementById('searchGIPHY').addEventListener('click', event => {
  event.preventDefault()

  const search = document.getElementById('gif').value

  axios.get(`https://api.giphy.com/v1/gifs/search?api_key=j6yOF05YP8AGwMifwqeDBZ1RYjr4n0Tj&q=${search}&limit=20&rating=g`)
    .then(res => {
      gifs = res.data.data
      console.log(gifs)

      document.getElementById('gifs').innerHTML = ''
      gifs.forEach(gif => {
        const gifElem = document.createElement('div')
        gifElem.className = 'card col-sm-3 gif bg-dark'
        gifElem.innerHTML = `
          <img 
            src="${gif.images.original_still.url}" 
            class="card-img-top gifClick" 
            alt="${gif.title}"
            data-still="${gif.images.original_still.url}"
            data-animated="${gif.images.original.url}">
          <div class="card-body">
            <h5 class="card-title">${gif.title}</h5>
            <button 
            class="btn btn-success saveGif"
            data-id="${gif.id}"
            >
            Save
            </button>
          </div>
        `
        document.getElementById('gifs').append(gifElem)
      })

      document.getElementById('gif').value = ''
    })
    .catch(err => console.error(err))
})

document.addEventListener('click', event => {
  if (event.target.classList.contains('gifClick')) {
    if (event.target.src === event.target.dataset.still) {
      event.target.src = event.target.dataset.animated
    } else {
      event.target.src = event.target.dataset.still
    }
  }
})

document.addEventListener('click', event => {
  if (event.target.classList.contains('saveGif')) {
    const gif = gifs.filter(gif => gif.id === event.target.dataset.id)[0]
    saved.push(gif)
    localStorage.setItem('saved', JSON.stringify(saved))
    event.target.parentNode.parentNode.remove()
  }
})
