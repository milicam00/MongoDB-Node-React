import { combineReducers } from 'redux';

import auth from './auth';
import category from './category';
import donations from './donations';
import usersDonations from './usersDonations';
import usersVolunteerings from './usersVolunteerings';
import volunteerings from './volunteerings';
import likedDonations from './likedDonations';
import usersConversations from './conversation.js';
import chatMessages from './chat.js';

export const reducers = combineReducers({auth, donations, usersDonations, usersVolunteerings, category,volunteerings, likedDonations, usersConversations, chatMessages});