import { combineReducers } from 'redux'
import addMyProjects from './addMyProjects'
import addAllProjects from './addAllProjects'
import LoggedUser from './LoggedUser'
import addNotifications from './addNotifications'


const allReducers = combineReducers({
    userData: LoggedUser,
    myProjects: addMyProjects,
    allProjects: addAllProjects,
    notifications: addNotifications
})

export default allReducers
