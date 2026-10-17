import { serverFetch } from "../core/server"

export const getSpeakers = async() =>{
    return serverFetch('/api/admin/speakers');
}