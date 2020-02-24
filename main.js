let word
let convertionInstance = {}
let currentConvertions = []
let convertionsHistory = []
let counter = 0

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
        word = deleteMultipleSpaces(word.trim())
        currentConvertions.push({"originalWord": word})
        allConvertions()
        printConvertions(word, currentConvertions, 'mainContainer')
        convertionsHistory.push(currentConvertions)
        printHistory()
        eachFirstWordCapitalized(word)
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
    newConvertion('Lower case with hyphens instead of spaces and no special characters:',
                    toLowerCase(replaceSpacesWithHyphens(replaceSpecialCharactersWithSpaces(word))))
    newConvertion('Each first word capitalized and no special characters:',
                    eachFirstWordCapitalized(replaceSpecialCharactersWithSpaces(word)))
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

const deleteMultipleSpaces = wordToConvert => wordToConvert.replace(/ +(?= )/g,'')

const replaceSpecialCharactersWithSpaces = wordToConvert =>{
    format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/
    for(let c of wordToConvert){
        if(c.match(format)){
            if(c === '&'){
                wordToConvert = wordToConvert.replace(c, 'and')
            }else{
                wordToConvert = wordToConvert.replace(c, ' ')
            }
        }    
    }
    return deleteMultipleSpaces(wordToConvert.trim())
}

const eachFirstWordCapitalized = wordToConvert => 
        wordToConvert.split(' ')
            .map(word=> word[0].toUpperCase() + word.slice(1)).join(' ')

// dynamic HTML generators
const printConvertions = (word, convertions, containerId) =>{
    const mainContainer = document.getElementById(containerId)
    const innerContainer = document.createElement('article')
    const title = document.createElement('input')
    selectElementWithOneClick(title, word)
    innerContainer.appendChild(title)
    convertions.forEach((convertion,index)=>{
        if(index !== 0){
            const convertionContainer = document.createElement('div')
            const type = document.createElement('p')
            type.innerText = convertion.type
            const convertedWord = document.createElement('input')
            selectElementWithOneClick(convertedWord, convertion.convertedWord)
            convertionContainer.appendChild(type)
            convertionContainer.appendChild(convertedWord)
            innerContainer.appendChild(convertionContainer)  
        }
    })
    mainContainer.appendChild(innerContainer)
}

const selectElementWithOneClick = (element, value) =>{
    element.value = value
    element.readOnly = true
    element.id = counter
    counter = counter + 1
    element.onclick = () => selectText(element.id)
}

const selectText = (id) =>{
    const input = document.getElementById(id)
    input.select()
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

