export default (state = { token: undefined, user: undefined }, action) => {
    switch (action.type) {
        case "ADD_ALL_NOTIFICATIONS":
            return action.payload
        default:
            return state;
    }
}