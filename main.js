let word
let convertionInstance = {}
let currentConvertions = []
let convertionsHistory = []

const initializeEventListener = () =>{
    const input = document.getElementById('word')
    input.addEventListener('keyup', event => {
        if(event.keyCode === 13) convert()
    })
}

const convert = () =>{
    word = document.getElementById('word').value
    if(word !== ''){
        clearOldData() 
        currentConvertions.push({"originalWord": word})
        allConvertions()
        printConvertions(word, currentConvertions, 'mainContainer')
        convertionsHistory.push(currentConvertions)
        printHistory()
    } 
}

const clearOldData = () =>{
    innerHTMLCleaner('mainContainer')
    innerHTMLCleaner('historyContainer')
    currentConvertions = []
    inputCleaner()
}

//convertion managers
const allConvertions = () =>{
    newConvertion('ALL CAPS:', toAllCaps(word))
    newConvertion('lower case:', toLowerCase(word))
    newConvertion('lower case with hyphens:', toLowerCase(replaceSpacesWithHyphens(word)))
}

const newConvertion = (description, convertedWord) =>{
    convertionInstance = new convertion(description, convertedWord)
    currentConvertions.push(convertionInstance)
}

//convertion constructor
function convertion(type, convertedWord){
    this.type = type
    this.convertedWord = convertedWord
}

//convertions
const toAllCaps = wordToConvert => wordToConvert.toUpperCase()

const toLowerCase = wordToConvert => wordToConvert.toLowerCase()

const replaceSpacesWithHyphens = wordToConvert => wordToConvert.replace(/ /g, "-")

// dynamic HTML generators
const printConvertions = (word, convertions, containerId) =>{
    const mainContainer = document.getElementById(containerId)
    const innerContainer = document.createElement('article')
    const title = document.createElement('h3')
    title.innerText = word
    innerContainer.appendChild(title)
    convertions.forEach((convertion,index)=>{
        if(index !== 0){
            const convertionContainer = document.createElement('div')
            const type = document.createElement('p')
            type.innerText = convertion.type
            const convertedWord = document.createElement('span')
            convertedWord.innerText = convertion.convertedWord
            convertedWord
            convertionContainer.appendChild(type)
            convertionContainer.appendChild(convertedWord)
            innerContainer.appendChild(convertionContainer)  
        }
    })
    mainContainer.appendChild(innerContainer)
}

const printHistory = () =>{
    const historyContainer = document.getElementById('historyContainer')
    const title = document.createElement('h2')
    title.innerText = 'Convertion history'
    historyContainer.appendChild(title)
    const contentContainer = document.createElement('div')
    contentContainer.id = 'historyContentContainer'
    historyContainer.appendChild(contentContainer)
    convertionsHistory.forEach(convertions=>{
        printConvertions(convertions[0].originalWord, convertions, 'historyContentContainer')
    })
}

//HTML cleaners
const inputCleaner = () =>{
    const input = document.getElementById('word')
    input.value = ''
}

const innerHTMLCleaner = elementId =>{
    const element = document.getElementById(elementId)
    element.innerHTML = ''
}

