// Set variables or get elements from document
const PARAGRAPH_API_GET = "http://api.quotable.io/random"
const input = document.querySelector('.input-text')
const randomTextBtn = document.querySelector('.custom-text-btn')
const customTextBtn = document.querySelector('.random-text-btn')
const documentParagraph = document.querySelector('.paragraph')
const textSelectSection = document.querySelector('.text-select')
const typeSection = document.querySelector('.type-section')
////////////////////////////////////////////////////////////////////////////////////////////////




// fetch content from the API
function getParagraph() {
    return fetch(PARAGRAPH_API_GET)
        .then(res => res.json())
        .then(data => data.content)
}
// render text to element
async function renderNewParagraph() {
    const paragraph = await getParagraph()
    documentParagraph.innerHTML = ""
    paragraph.split('').forEach(character => {
        const characterSpan = document.createElement("span")
        characterSpan.innerHTML = character
        documentParagraph.appendChild(characterSpan)
    })
}




// a function to add and remove hidden class
const hiddenClass = () => {
    // hide the unusable elements in UI
    textSelectSection.classList.toggle('hidden')
    typeSection.classList.toggle('hidden')
}





// Handle custome text btn 
customTextBtn.addEventListener('click', () => {
    if (input.value == "") {
        // render a random paragraph
        renderNewParagraph();
        // hide the box
        hiddenClass()
        // render custome paragraph from input
    } else {
        documentParagraph.innerHTML = ""
        const paragraphInput = input.value;
        paragraphInput.split('').forEach((character) => {
            const spanInput = document.createElement('span')
            spanInput.innerHTML = character;
            documentParagraph.appendChild(spanInput)
        })
        // hide the box
        hiddenClass()
        // render custome paragraph from input
        input.value = ""
    }
})


// handle random text btn
randomTextBtn.addEventListener('click', () => {
    // render a random paragraph
    renderNewParagraph();
    // hide the box
    hiddenClass()
})







