export const getUserData = (reqBody) => {
    let { email, pass } = reqBody
    return { email, pass };
}