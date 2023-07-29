export function userReducer (state="Welcome", action) {
    switch(action.type) {
        case "LOGIN":
            return action.payload
        default:
            return state
    }
}