export function getFirstLocalToken() {
  const items = JSON.parse(localStorage.getItem("persist:root"))
  const { token } = JSON.parse(items.auth)
  return token
}

export function getNewLocalToken() {
  const newToken = JSON.parse(localStorage.getItem("new token"))
  return newToken
}
