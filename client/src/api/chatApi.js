import axiosClient from "./axiosClient";
import StorageKeys from "../constants/storageKeys";

const chatApi = {
  async createMessage(data) {
    const accessToken = localStorage.getItem(StorageKeys.accessToken);
    const url = "/chat/message";
    return axiosClient.post(url, data, {
      headers: { accessToken },
    });
  },

  async getConversations() {
    const accessToken = localStorage.getItem(StorageKeys.accessToken);

    const url = "/chat/conversations";
    return axiosClient.get(url, {
      headers: { accessToken },
    });
  },

  async getMessages(id, page = 2) {
    const accessToken = localStorage.getItem(StorageKeys.accessToken);
    const url = `/chat/message/${id}?limit=${page * 9}`;

    return axiosClient.get(url, {
      headers: { accessToken },
    });
  },
  async deleteConversation(id) {
    const accessToken = localStorage.getItem(StorageKeys.accessToken);
    const url = `/chat/conversations/${id}`;
    return axiosClient.delete(url, {
      headers: { accessToken },
    });
  },
};

export default chatApi;
