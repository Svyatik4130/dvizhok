import { combineReducers } from 'redux'
import LoggedUser from './LoggedUser'


const allReducers = combineReducers({
    userData: LoggedUser
})

export default allReducers
