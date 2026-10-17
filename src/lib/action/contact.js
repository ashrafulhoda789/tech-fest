import { publicMutation, serverMutation } from "../core/server"

export const createContact = async(payload) =>{
    return publicMutation('/api/contact', payload, 'POST');
}

export const deleteContact = async(id) =>{
    return serverMutation(`/api/admin/contacts/${id}`, {}, 'DELETE');
}