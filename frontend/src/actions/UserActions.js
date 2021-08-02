export const loggedUser = (userInfo) => {
    return {
        type: "USER_ACTION",
        payload: userInfo
    }
}
export const getAllUsers = (allUsers) => {
    return {
        type: "GET_USERS",
        payload: allUsers
    }
}
export const deleteUserRedux = (index) => {
    return {
        type: "DELETE_USER",
        payload: index
    }
}
export const deletePendingUserRedux = (index) => {
    return {
        type: "DELETE_PENDING_USER",
        payload: index
    }
}
export const getAllPendingUsers = (allPendingUsers) => {
    return {
        type: "GET_PENDING_USERS",
        payload: allPendingUsers
    }
}