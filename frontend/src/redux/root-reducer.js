import { combineReducers } from 'redux';

import cars from './cars/cars.reducers';
import auth from './auth/auth.reducers';

export default combineReducers({ cars, auth });
