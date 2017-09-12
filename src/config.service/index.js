'use strict'

module.exports = env

function env (key) {
  return new Env(key)
}

class Env {
  constructor (key) {
    this.key = key
    this.value = process.env[this.key]
  }

  exec () {
    return this.value
  }

  default (value) {
    if (!this.value) {
      this.value = value
    }
    return this
  }

  required () {
    if (!this.value) {
      throw new Error(`${this.key} must be defined`)
    }
    return this
  }

  int () {
    if (isNaN(parseInt(this.value))) {
      throw new Error(`${this.key} must be an integer`)
    }
    this.value = parseInt(this.value)
    return this
  }

  arr () {
    let delimiter = ','
    this.value = this.value.split(delimiter)
    return this
  }

  fixNewline () {
    if (this.value.includes('\\n')) {
      this.value = this.value.replace(/\\n/g, '\n')
    }
    return this
  }
}
