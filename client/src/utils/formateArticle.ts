import { IArticleData } from '../api/types'

export function html_decode (str:string) {
  let s: string = ''
  if (str.length === 0) return ''
  s = str.replace(/</g, "<")
  s = s.replace(/>/g, ">")
  // s = s.replace(/ /g, " ")
  // s = s.replace(/'/g, "'\'")
  // s = s.replace(/"/g, "'\'")
  return s
}