import StorageKeys from "../constants/storageKeys";
import axiosClient from "./axiosClient";
const accessToken = localStorage.getItem(StorageKeys.accessToken);

const postApi = {
  create(data) {
    const url = "/post/create";
    return axiosClient.post(url, data, {
      headers: { accessToken },
    });
  },

  async getAll(page = 1) {
    const url = `/post/?page=${page}&limit=${5}`;
    const accessToken = localStorage.getItem(StorageKeys.accessToken);
    return axiosClient.get(url, {
      headers: { accessToken },
    });
  },
  async getPostById(id) {
    const url = `/posts/${id}`;

    return axiosClient.get(url, {
      headers: { accessToken },
    });
  },

  async updatePostById(id, data) {
    const url = `/post/update/${id}`;
    return axiosClient.put(url, data, {
      headers: { accessToken },
    });
  },
  async getPostByUserID(id) {
    const accessToken = localStorage.getItem(StorageKeys.accessToken);
    const url = `/post/profile/${id}`;

    return axiosClient.get(url, {
      headers: { accessToken },
    });
  },

  async deletePostById(id) {
    const url = `/post/delete/${id}`;
    return axiosClient.delete(url, {
      headers: { accessToken },
    });
  },
  async setLove(postID) {
    const url = `/post/love`;
    return axiosClient.put(
      url,
      { postID },
      {
        headers: { accessToken },
      },
    );
  },
};

export default postApi;
