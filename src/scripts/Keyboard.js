import { english, mova } from "./_language.js";
import Key from "./Key.js";

class Keyboard {
  constructor (area, language) {
    this.language = language
    this.area = area
    this.functionalKeyCode = ['Backspace', 'Delete','CapsLock', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'AltRight', 'ControlRight']
    this.currentLanguage = language
    this.pressedKeys = new Set()
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
      this.pressedKeys.add(key.dataset.code)
      if (this.functionalKeyCode.includes(key.dataset.code)) {
        this.functionalKeysHandler(key)
      } else {
        key.classList.add('press')
        this.printKey(key)
      }
    }
  }

  keyUp(event) {
    let key = null
    if (event.type === 'mouseup') {
      key = this.current
    } else {
      key = this.keys.find((elem) => elem.dataset.code === event.code)
    }
    if (key && key.dataset.code !== 'CapsLock') {
      key.classList.remove('press')
      if (key.dataset.code === 'ShiftLeft' || key.dataset.code === 'ShiftRight') {
        this.shiftUp()
      }
      if (this.pressedKeys.has('ControlLeft') && this.pressedKeys.has('AltLeft')) {
        console.log(this.pressedKeys);
        this.changeLanguage()
      }
    }
    this.pressedKeys.delete(key.dataset.code)
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

  shiftDown(key) {
    this.pressedKeys.delete(key.dataset.code)
    const shiftKeys = this.keys.filter((key) => key.dataset.code === 'ShiftLeft' || key.dataset.code === 'ShiftRight')
    if (shiftKeys.some((key) => key.classList.contains('press'))) {
      return null
    }
    key.classList.add('press')
    this.keys.forEach(key => {
      if (key.dataset.code.includes('Key') || 'ёхъжэбю'.includes(key.textContent.toLowerCase())) {
        if (key.textContent === key.textContent.toLowerCase()) {
          key.textContent = key.textContent.toUpperCase()
        } else {
          key.textContent = key.textContent.toLowerCase()
        }
      } else if (key.dataset.addition !== 'null') {
        key.textContent = key.dataset.addition
      }
    })

    return
  }

  shiftUp() {
    const shiftKeys = this.keys.filter((key) => key.dataset.code === 'ShiftLeft' || key.dataset.code === 'ShiftRight')
    if (shiftKeys.some((key) => key.classList.contains('press'))) {
      return null
    }
    this.keys.forEach(key => {
      if (key.dataset.code.includes('Key') || 'ёхъжэбю'.includes(key.textContent.toLowerCase())) {
        if (key.textContent === key.textContent.toLowerCase()) {
          key.textContent = key.textContent.toUpperCase()
        } else {
          key.textContent = key.textContent.toLowerCase()
        }
      } else {
        key.textContent = key.dataset.initial
      }
    })

    return
  }

  functionalKeysHandler(key) {
    switch(key.dataset.code) {
      case 'Backspace':
        key.classList.add('press')
        this.backspaceHandler(this.area.selectionStart)
        break
      case 'Delete':
        key.classList.add('press')
        this.deleteHandler(this.area.selectionStart)
        break
      case 'CapsLock':
        this.capslockHandler(key)
        break
      case 'ShiftLeft':
      case 'ShiftRight':
        this.shiftDown(key)
      default:
      key.classList.add('press')
    }
  }

  changeLanguage() {
    let languageToChange = []
    if (this.currentLanguage === 'en') {
      languageToChange = mova
      this.currentLanguage = 'by'
    } else {
      languageToChange = english
      this.currentLanguage = 'en'
    }
    
    localStorage.setItem('language', this.currentLanguage)

    let shift
    let caps

    this.keys.forEach((item, index) => {
      const prevKeys = item
      const nextKeys = new Key(...languageToChange[index]).generateKey()

      if ((prevKeys.dataset.code === 'ShiftLeft' || prevKeys.dataset.code === 'ShiftRight') && prevKeys.classList.contains('press')) {
        shift = nextKeys
      }
      if (prevKeys.dataset.code === "CapsLock" && prevKeys.classList.contains('press')) {
        caps = nextKeys
      }

      this.keys[this.keys.indexOf(prevKeys)] = nextKeys
      prevKeys.parentNode.replaceChild(nextKeys, prevKeys)
    })

    if (shift) {
      this.shiftDown(shift)
    }
    if (caps) {
      this.capslockHandler(caps)
    }

  }

}

export default Keyboard