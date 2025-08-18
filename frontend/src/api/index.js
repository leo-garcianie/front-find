import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

export const getQuestions = async () => {
  return await axiosInstance.get('/questions');
};

export const getRecommendations = async (answers) => {
  return await axiosInstance.post('/recommend', answers);
};

export const getFramework = async (id) => {
  return await axiosInstance.get(`/framework/${id}`);
};
