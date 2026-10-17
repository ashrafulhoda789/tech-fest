import { serverMutation } from "../core/server";

export const createSpeaker = async (payload) => {
    return serverMutation('/api/admin/speakers', payload, 'POST');
};

export const updateSpeaker = async (id, payload) => {
    return serverMutation(`/api/admin/speakers/${id}`, payload, 'PUT');
};

export const deleteSpeaker = async (id) => {
    return serverMutation(`/api/admin/speakers/${id}`, {}, 'DELETE');
};