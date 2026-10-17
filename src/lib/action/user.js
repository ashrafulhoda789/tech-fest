import { serverMutation } from "../core/server"

export const adminSignIn = async (email, password) => {
    return serverMutation('/api/auth/sign-in', { email, password }, 'POST')
}