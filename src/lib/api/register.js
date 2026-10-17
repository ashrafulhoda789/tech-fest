import { protectedServerFetch, serverFetch } from "../core/server"

export const getRegister = async() =>{
    return protectedServerFetch('/api/admin/registrations');
}