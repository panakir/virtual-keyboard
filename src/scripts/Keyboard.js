import { english, mova } from "./_language.js";
import Key from "./Key.js";

class Keyboard {
  constructor (area, language) {
    this.language = language
    this.area = area
    this.functionalKeyCode = ['Backspace', 'Delete','CapsLock', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'AltRight', 'ControlRight']
    this.currentLanguage = language
    this.pressed = new Set()
  }

  generateKeys() {
    if (this.language === 'by') {
      this.keys = mova.map((key) => new Key(...key).generateKey())
    } else {
      this.keys = english.map((key) => new Key(...key).generateKey())
    }
  }

  generateKeyboard() {
    const keyboard = document.createElement('div')
    keyboard.classList.add('keyboard')
    this.generateKeys()
    this.keys.forEach(key => {
      keyboard.append(key)
    })
    return keyboard
  }

  keyDown(event) {
    event.preventDefault()
    let key = null
    if (event.type === 'mousedown') {
      key = event.target
      this.current = key
    } else {
      key = this.keys.find((elem) => elem.dataset.code === event.code)
    }
    if (key && key.classList.contains('key')) {
      this.pressed.add(key.dataset.code)
      key.classList.add('press')
      this.printKey(key)
    }
  }

  keyUp(event) {
    let key = null
    if (event.type === 'mouseup') {
      key = this.current
    } else {
      key = this.keys.find((elem) => elem.dataset.code === event.code)
    }
    key.classList.remove('press')
    this.pressed.delete(key.dataset.code)
  }

  printKey(key) {
    const position = this.area.selectionStart
    if (key.dataset.code === 'Enter') {
      this.area.value = this.area.value.slice(0, position) + '\n' + this.area.value.slice(position, this.area.value.length)
    } else if (key.dataset.code === 'Tab') {
      this.area.value = this.area.value.slice(0, position) + '\t' + this.area.value.slice(position, this.area.value.length)
    } else {
      this.area.value = this.area.value.slice(0, position) + key.textContent + this.area.value.slice(position, this.area.value.length)
      this.area.setSelectionRange(position + 1, position + 1)
    }
  }

  backspaceHandler(position) {
    if (position > 0) {
      this.area.value = this.area.value.slice(0, position - 1) + this.area.value.slice(position, this.area.value.length)
      this.area.setSelectionRange(position - 1, position - 1)
    }
  }

  deleteHandler(position) {
    this.area.value = this.area.value.slice(0, position) + this.area.value.slice(position + 1, this.area.value.length)
    this.area.setSelectionRange(position, position)
  }

  capslockHandler(key) {
    console.log('capsed');
    key.classList.toggle('press')
    this.keys.forEach(key => {
      if (key.dataset.code.includes('Key') || 'ёхъжэбю'.includes(key.textContent.toLowerCase())) {
        if (key.textContent === key.textContent.toLowerCase()) {
          key.textContent = key.textContent.toUpperCase()
        } else {
          key.textContent = key.textContent.toLowerCase()
        }
      }
    })
  }
  
}
export default Keyboard