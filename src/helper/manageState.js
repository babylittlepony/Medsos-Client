export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("authState", serializedState)
  } catch (err) {
    console.log("Error saving state to localStorage:", err)
  }
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("authState")
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.log("Error loading state from localStorage:", err)
    return undefined
  }
}
