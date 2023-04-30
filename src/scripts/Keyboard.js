import { english } from "./_language.js";
import Key from "./Key.js";

class Keyboard {
  constructor (area, language) {
    this.language = language
    this.area = area
    this.functionalKeyCode = ['Backspace', 'Delete','CapsLock', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'AltRight', 'ControlRight']
    this.pressed = new Set()
  }


  generateKeys() {
    if (this.language === 'en') {
      this.keys = english.map((keys) => new Key(...keys).generateKey())
    }
    if (this.language === 'by') {
      this.keys = belarus.map((keys) => new Key(...keys).generateKey())
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
    this.area.value += key.textContent
    this.area.setSelectionRange(position + 1, position + 1)
  }
}

export default Keyboard