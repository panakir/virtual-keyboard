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

}

export default Keyboard