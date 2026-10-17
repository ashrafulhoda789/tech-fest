import { protectedServerFetch, serverFetch } from "../core/server"

export const getContact = async() =>{
    return protectedServerFetch('/api/admin/contacts');
}