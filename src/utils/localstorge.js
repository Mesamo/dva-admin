
export const read = (key) => {
  return localStorage.getItem(key)
}

export const readObject = (key) => {
  const text = read(key)
  let obj = {}
  try {
    obj = JSON.parse(text)
  } catch (error) {
    console.error(error)
  }
  return obj
}

export const write = (key, data) => {
  localStorage.setItem(key, data)
}

export const writeObject = (key, data) => {
  const text = JSON.stringify(data)
  write(key, text)
}

export const remove = (key) => {
  localStorage.removeItem(key)
}
