import { publicMutation, serverMutation } from "../core/server"

export const createRegister = async(payload) =>{
    return publicMutation('/api/register', payload, 'POST');
}

export const deleteRegister = async(id) =>{
    return serverMutation(`/api/admin/registrations/${id}`, {}, 'DELETE');
}