// Get a random paragraph
const PARAGRAPH_API_GET = "http://api.quotable.io/random"

// Set variables or get elements from document
const input = document.querySelector('.input-text')
const randomTextBtn = document.querySelector('.custom-text-btn')
const customTextBtn = document.querySelector('.random-text-btn')
const documentParagraph = document.querySelector('.paragraph')
const textSelectSection = document.querySelector('.text-select')
const typeSection = document.querySelector('.type-section')
const documentTime = document.querySelector('.time')
const documentIncorrect = document.querySelector('.incorrect-text')
const documentWPM = document.querySelector('.wpm')
const wellDownSection = document.querySelector('.well-down')
const restartBtn = document.querySelector('.restart-btn')
const result = document.querySelector('.restart-text')
// time left
let time = 0
// all keydown
let allTyped = 0
// incorrect word typed
let incorrectType = 0
// this is for 
let paragraphIndex = 0
// text is ready for type or not
let isTextOk = false;
// and so WPM 😁😁
let WPM = 0;
// patagraph index
let howMuchIndex = 0;
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
    // set how much index is in the paragraph to calculate WPM
    howMuchIndex = paragraph.length
    documentParagraph.innerHTML = ""
    paragraph.split('').forEach(character => {
        const characterSpan = document.createElement("span")
        characterSpan.innerHTML = character
        documentParagraph.appendChild(characterSpan)
    })
    isTextOk = true
}




// a function to add and remove hidden class
const hiddenClass = () => {
    // hide the unusable elements in UI
    textSelectSection.classList.toggle('hidden')
    typeSection.classList.toggle('hidden')
}



// Handle custome text btn 
customTextBtn.addEventListener('click', () => {
    let timeSet = setInterval(() => {
        time += 1
        documentTime.textContent = `⏳ Time : ${time}`
    }, 1000)
    if (input.value == "") {
        // Check the internet 
        if (window.navigator.onLine) {
            // render a random paragraph
            renderNewParagraph();
            // hide the box
            hiddenClass()
        } else {
            document.querySelector('.error-conection').classList.remove('hidden')
        }
        // render custome paragraph from input
    } else {
        documentParagraph.innerHTML = ""
        const paragraphInput = input.value;
        // set how much index is in the paragraph to calculate WPM
        howMuchIndex = paragraphInput.length
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
    isTextOk = true
})


// handle random text btn
randomTextBtn.addEventListener('click', () => {
    let timeSet = setInterval(() => {
        time += 1
        documentTime.textContent = `⏳ Time : ${time}`
    }, 1000)

    // Check the internet 
    if (window.navigator.onLine) {
        // render a random paragraph
        renderNewParagraph();
        // hide the box
        hiddenClass()
    } else {
        document.querySelector('.error-conection').classList.remove('hidden')
    }

})




// Type system 
document.addEventListener('keydown', (e) => {
    // check the text is ok or not
    if (isTextOk) {
        // create the span tag to add to the document for each index
        const spanParagraph = documentParagraph.querySelectorAll('span')
        // check is keydown currect or not and then add the styles
        if (spanParagraph[paragraphIndex].innerHTML == e.key) {
            spanParagraph[paragraphIndex].classList.add('currect')
            spanParagraph[paragraphIndex].classList.toggle('current')
            // Update Index
            paragraphIndex += 1
            // Update allType
            allTyped += 1
            // Update progress
            const progress = (paragraphIndex / howMuchIndex) * 100
            document.querySelector('.progress div').style.width = `${progress}%`
            // check is progress completed or not and handle it
            if (progress == 100) {
                typeSection.classList.toggle('hidden')
                wellDownSection.classList.toggle('hidden')
                result.textContent += ` ${incorrectType >= 12 ? ` but You need to be a little more careful in typing🙃, you have ${incorrectType} incorrect word` : incorrectType >= 6 ? ` Your accuracy is good😁, you have ${incorrectType} incorrect word` : incorrectType < 6 ? ` Your accuracy is very high🥳,you have ${incorrectType} incorrect word` : ` sorry but your type was bad😢`} and finally your speed was ${WPM}`
            }

        } else if (!("Shift" == e.key || "Alt" == e.key || "Ctrl" == e.key || "Backspace" == e.key)) {
            // add incorrect style to the code
            spanParagraph[paragraphIndex].classList.add('incorrect')
            // Update Index
            incorrectType += 1
            // update the incorrect words in UI
            documentIncorrect.textContent = `⛔ incorrect : ${incorrectType}`
            // Update allType
            allTyped += 1

        }
    }
})


// calculate the WPM
const calcWPM = setInterval(() => {
    // calculate the WPm
    WPM = Math.floor(((allTyped / 5) - incorrectType) / (time / 60))
    if (WPM <= 0 || WPM == NaN) WPM = 0
    // add WPM to the UI each 1s
    documentWPM.textContent = `💪🏻 WPM : ${WPM}`
}, 1000)



// handle restart Btn
restartBtn.addEventListener('click', () => location.reload())