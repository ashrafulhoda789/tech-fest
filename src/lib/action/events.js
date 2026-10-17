import { serverMutation } from "../core/server"

export const createEvent = async (payload) => {
    return serverMutation('/api/admin/fests', payload, 'POST');
}

export async function updateEvent(id, payload) {
    return serverMutation(`/api/admin/fests/${id}`, payload, 'PUT');
}

export const deleteEvent = async (id) => {
    return serverMutation(`/api/admin/fests/${id}`, {}, 'DELETE');
}