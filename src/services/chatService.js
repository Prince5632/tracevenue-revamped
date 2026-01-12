import API from "./API";

const chatService = {
  sendMessage: async (data) => {
    try {
      const response = await API.post("/api/v1/traceVenue/chats/chat/users", data);
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  getChatsBetweenUsers: async (data) => {
    try {
      const response = await API.post(`/api/v1/traceVenue/chats/between/users`, data);
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  getChatById: async (chatId) => {
    try {
      const response = await API.get(`/api/v1/traceVenue/chats/${chatId}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  markAllAsRead: async ({ receiverId, senderId, jobId }) => {
    try {
      let url = `/api/v1/traceVenue/chats/mark-all-read/${receiverId}`;
      const params = new URLSearchParams();
      if (senderId) params.append('senderId', senderId);
      if (jobId) params.append('jobId', jobId);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await API.put(url);
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  getUnreadCount: async (userId) => {
    try {
      const response = await API.get(`/api/v1/traceVenue/chats/unread/${userId}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  },
};
export default chatService;
