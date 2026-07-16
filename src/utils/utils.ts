const prettifyKey = (key: string, replaceValue: string) => {
  return key
    .replace(new RegExp(`^${replaceValue}`), '')
    .replace(/([A-Z])/g, ' $1')
    .trim()
}

const utils = {
  prettifyKey
}
export default utils
