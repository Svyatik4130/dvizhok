export default (state = { token: undefined, user: undefined }, action) => {
    switch (action.type) {
        case "USER_ACTION":
            return action.payload
        default:
            return state;
    }
}