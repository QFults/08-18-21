const localStorage = window.localStorage

let saved = JSON.parse(localStorage.getItem('saved')) || []

if (saved.length !== 0) {
  document.getElementById('gifs').innerHTML = ''

  saved.forEach(gif => {
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
    class="btn btn-danger removeGif"
    data-id="${gif.id}"
    >
    Remove
    </button>
    </div>
    `
    document.getElementById('gifs').append(gifElem)
  })
}

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
  if (event.target.classList.contains('removeGif')) {
    saved = saved.filter(gif => gif.id !== event.target.dataset.id)
    localStorage.setItem('saved', JSON.stringify(saved))
    event.target.parentNode.parentNode.remove()
  }
})
