import axios from 'axios';
import {
  GET_CARS,
  POST_CAR,
  PUT_CAR,
  DELETE_CAR,
  CARS_ERROR,
} from './cars.types';
import setAuthToken from '../../utils/setAuthToken';

export const getCars = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`/cars`);

    dispatch({
      type: GET_CARS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CARS_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const postCar = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`/cars`, formData, config);

    dispatch({
      type: POST_CAR,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CARS_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const putCar = (id, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(`/cars/${id}`, formData, config);

    dispatch({
      type: PUT_CAR,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CARS_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const deleteCar = (id) => async (dispatch) => {
  try {
    await axios.delete(`/cars/${id}`);

    dispatch({
      type: DELETE_CAR,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: CARS_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};
