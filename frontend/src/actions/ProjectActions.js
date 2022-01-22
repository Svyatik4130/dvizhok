export const addMyProjects = (projectsArr) => {
    return {
        type: "ADD_PROJECTS",
        payload: projectsArr
    }
}
export const addAllProjects = (projectsArr) => {
    return {
        type: "ADD_ALL_PROJECTS",
        payload: projectsArr
    }
}
