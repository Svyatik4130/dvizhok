export const addAllNotifications = (notificationsArr) => {
    return {
        type: "ADD_ALL_NOTIFICATIONS",
        payload: notificationsArr
    }
}