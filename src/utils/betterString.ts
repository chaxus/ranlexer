export class BetterString {
  str: string
  constructor(size: number | string = 0) {
    if (typeof size === 'string') {
      this.str = size
    } else {
      this.str = new Array(size).fill(' ').join('')
    }
  }
  update(start: number = 0, end: number, string: string = ''): string {
    const length = this.str.length
    const startStr = this.str.slice(0, start)
    const endStr = this.str.slice(end || string.length, length)
    this.str = `${startStr}${string}${endStr}`
    return this.str
  }
  toString(): string {
    return this.str
  }
}
