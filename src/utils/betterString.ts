type HandleString = (s: string) => string

export class RanString {
  str: string
  length: number
  constructor(size: number | string = 0) {
    if (typeof size === 'string') {
      this.str = size
    } else {
      this.str = new Array(size).fill(' ').join('')
    }
    this.length = this.str.length
  }
  update(
    start: number = 0,
    end: number,
    sign: string = '',
    character: string | RegExp | HandleString = '',
  ): string {
    const length = this.str.length
    const startStr = this.str.slice(0, start)
    const endStr = this.str.slice(end, length)
    if (character instanceof RegExp) {
      const str = this.str.slice(start, end)
      this.str = `${startStr}${str.replace(character, sign)}${endStr}`
      return this.str
    }
    if (character instanceof Function) {
      const str = this.str.slice(start, end)
      this.str = `${startStr}${character(str)}${endStr}`
      return this.str
    }
    this.str = `${startStr}${sign}${endStr}`
    return this.str
  }
  toString(): string {
    return this.str
  }
  replace(rule: RegExp | string, char: string): string {
    this.str = this.str.replace(rule, char)
    return this.str
  }
  addSpaceBothSlide(start: number, end: number, str: string) {
    let left = true
    while (str.length < end - start) {
      if (left) {
        str = ' ' + str
        left = false
      } else {
        left = true
        str += ' '
      }
    }
    this.update(start, end, str)
  }
}
