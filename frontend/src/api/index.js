import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8800/api/' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const signIn = (formData) => API.post(`/users/login`, formData);
export const signUp = (formData) => API.post(`/users/register`, formData);
export const updateUser = (id, updatedUser) => API.put(`/users/${id}`, updatedUser);
export const fetchUser = (id) => API.get(`/users/${id}`);
export const deleteUser = (id, deletedUser) => API.delete(`/users/${id}`, deletedUser);
export const fetchUsers=()=>API.post('/users//all');
export const adFriend = (id, currentId) => API.put(`/users/${id}/follow`, currentId);
export const fetchLikedDonations = (id_korisnika) => API.get(`/users/${id_korisnika}/liked`);
export const adImage = (id, image) => API.put(`/users/${id}/updateProfilePicture`, image);

export const fetchDonationsByType = (tip) => API.post(`/post/filter`, tip);
export const createNewDonation = (newData) => API.post(`/post/`, newData);
export const donateToPost = (id, updatedDonation) => API.put(`/post/${id}/donate`, updatedDonation);
export const fetchLatestDonations=()=>API.post(`/post/latest`);

export const fetchUsersDonations = (id_korisnika) => API.get(`/post/${id_korisnika}/posts`);
export const fetchUsersVolunteerings = (id_korisnika) => API.get(`/volunteering/${id_korisnika}/all`);
export const deleteUsersDonation = (id, usersDonation) => API.delete(`/post/${id}`,  usersDonation);
export const deleteUsersVolunteering = (id,usersVolunteering ) => API.delete(`/volunteering/${id}`, usersVolunteering);
export const updateUsersDonation = (id, usersDonatin) => API.put(`/post/${id}`, usersDonatin);
export const updateUsersVolunteering = (id, userVolunteering) => API.put(`/volunteering/${id}/update`, userVolunteering);

export const fetchCategory = (type) => API.get(`/category/${type}`);
export const createNewVolunteering = (data) => API.post(`/volunteering/`, data);
export const fetchAllVolunteerings=()=>API.post('/volunteering/getAll');



export const getMessages = (conversationId) => API.get(`/message/${conversationId}`);
export const sendMessage = (data) => API.post(`/message`, data);


export const allConversations = (userId) => API.get(`/conversation/${userId}`);
export const getConversation = (conversationId) => API.get(`/conversation/find/${conversationId}`);
export const createConversation = (body) => API.post(`/conversation/`, body);

