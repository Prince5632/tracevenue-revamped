import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


export const getConversations = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}api/v1/traceVenue/jobs/conversations/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};

export const getMessages = async (conversationId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}api/v1/traceVenue/messages/${conversationId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};