import { combineReducers } from 'redux'
import addMyProjects from './addMyProjects'
import addAllProjects from './addAllProjects'
import LoggedUser from './LoggedUser'


const allReducers = combineReducers({
    userData: LoggedUser,
    myProjects: addMyProjects,
    allProjects: addAllProjects
})

export default allReducers
