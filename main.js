let word
let convertionInstance = {}
let currentConvertions = []
let convertionsHistory = []

const convert = () =>{
    innerHTMLCleaner('mainContainer')
    innerHTMLCleaner('historyContainer')
    currentConvertions = []
    word = document.getElementById('word').value
    currentConvertions.push({"word": word})
    inputCleaner()
    toAllCaps()
    toLowerCase()
    toLowerCaseWithHyphens()
    printConvertions(word, currentConvertions, 'mainContainer')
    convertionsHistory.push(currentConvertions)
    printHistory()
    console.log(convertionsHistory)
}

const toAllCaps = () =>{
    const convertedWord = word.toUpperCase()
    convertionInstance = new convertion("ALL CAPS: ", convertedWord)
    currentConvertions.push(convertionInstance)
}

const toLowerCase = () =>{
    const convertedWord = word.toLowerCase()
    convertionInstance = new convertion("to lower case: ", convertedWord)
    currentConvertions.push(convertionInstance)
}

const toLowerCaseWithHyphens = () =>{
    const convertedWord = word.toLowerCase().replace(/ /g, "-")
    convertionInstance = new convertion("lower-case-hyphenated: ", convertedWord)
    currentConvertions.push(convertionInstance)
}

const printConvertions = (word, convertions, containerId) =>{
    const container = document.getElementById(containerId)
    const title = document.createElement('h2')
    title.innerText = word
    container.appendChild(title)
    convertions.forEach((convertion,index)=>{
        if(index !== 0){
            const convertionContainer = document.createElement('div')
            const type = document.createElement('p')
            type.innerText = convertion.type
            const convertedWord = document.createElement('p')
            convertedWord.innerText = convertion.convertedWord
            convertionContainer.appendChild(type)
            convertionContainer.appendChild(convertedWord)
            container.appendChild(convertionContainer)  
        }
    })
}

const printHistory = () =>{
    const historyContainer = document.getElementById('historyContainer')
    const title = document.createElement('h3')
    title.innerText = 'Convertion history'
    historyContainer.appendChild(title)
    convertionsHistory.forEach(convertions=>{
        printConvertions(convertions[0].word, convertions, 'historyContainer')
    })
}

const inputCleaner = () =>{
    const input = document.getElementById('word')
    input.value = ''
}

const innerHTMLCleaner = elementId =>{
    const element = document.getElementById(elementId)
    element.innerHTML = ''
}
 
function convertion(type, convertedWord){
    this.type = type
    this.convertedWord = convertedWord
}

