import { serverFetch } from "../core/server"

export const getAdmin = async() =>{
    return serverFetch('/api/admin/sign-in');
}