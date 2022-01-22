export function getSignature() {
    let navigator_info = window.navigator
    let screen_info = window.screen
    let uid = navigator_info.mimeTypes.length
    uid += navigator_info.userAgent.replace(/\D+/g, '')
    uid += screen_info.height || ''
    uid += screen_info.width || ''
    uid += screen_info.pixelDepth || ''
    return(uid)
}