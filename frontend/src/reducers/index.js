import { combineReducers } from 'redux'
import addMyProjects from './addMyProjects'
import LoggedUser from './LoggedUser'


const allReducers = combineReducers({
    userData: LoggedUser,
    myProjects: addMyProjects
})

export default allReducers
