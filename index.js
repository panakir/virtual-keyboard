import Keyboard from './src/scripts/Keyboard.js'

window.onload = function() {
  renderElementsToDom()
  bindEvents()
}

document.body.classList.add('body')

if (!localStorage.getItem('language')) {
  localStorage.setItem('language', 'en')
}

const createElement = (element, ...classes) => {
  const node = document.createElement(element)
  node.classList.add(...classes)
  return node
}

const textArea = createElement('textarea', 'input-field')
      textArea.autofocus = true
      textArea.placeholder = 'Press ControlLeft + AltLeft for change language'
const createKeyboard = new Keyboard(textArea, localStorage.getItem('language'))
const keyboard = createKeyboard.generateKeyboard()

const instruction = createElement('p', 'instruction')
      instruction.innerHTML = 'Keybord was created in Windows OS. Press ControlLeft + AltLeft for change language'

const generateFooter = () => {
  const footer = createElement('footer', 'footer')
  const author = createElement('a', 'footer__author')
        author.href = 'https://github.com/panakir'
        author.innerHTML = '&copy; panakir, 2023'
  const logo = createElement('a', 'footer__logo')
        logo.href = 'https://rollingscopes.com/'
  footer.append(author)
  footer.append(logo)

  return footer
}

const renderElementsToDom = () => {
  document.body.prepend(textArea, keyboard, instruction, generateFooter(), )
}

const bindEvents = () => { 
  document.body.addEventListener('keydown', event => {
    createKeyboard.keyDown(event)
  })
  document.body.addEventListener('keyup', event => {
    createKeyboard.keyUp(event)
  })
  keyboard.addEventListener('mousedown', event => {
    createKeyboard.keyDown(event)
  })
  keyboard.addEventListener('mouseup', event => {
    createKeyboard.keyUp(event)
  })
  
}
