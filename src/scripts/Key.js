class Key {
  constructor(value, code, width, addition) {
    this.value = value
    this.code = code
    this.width = width
    this.addition = addition
  }

  generateKey() {
    const key = document.createElement('button')
    key.classList.add('key')
    key.textContent = this.value
    key.dataset.code = this.code
    key.dataset.addition = this.addition
    key.dataset.initial = this.value
    if (this.width > 1) {
      key.classList.add(`width-${this.width}`)
    }
    
    return key
  }
}

export default Key