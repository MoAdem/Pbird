// local files
import { store } from '../store/reducers/reducers'
import { constants } from './help'

const getTokenFromStore = () => {
  const { User } = store.getState()
  return User?.token
}

const setTokenInLocal = (token) => {
  return localStorage.setItem(constants.PBirdToken, token)
}

const getTokenFromLocal = () => {
  return localStorage.getItem(constants.PBirdToken)
}

const removeTokenFromLocal = () => {
  return localStorage.removeItem(constants.PBirdToken)
}

export {
  getTokenFromStore,
  setTokenInLocal,
  getTokenFromLocal,
  removeTokenFromLocal,
}
