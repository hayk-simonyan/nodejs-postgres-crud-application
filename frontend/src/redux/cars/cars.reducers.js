import {
  GET_CARS,
  POST_CAR,
  PUT_CAR,
  DELETE_CAR,
  CARS_ERROR,
} from './cars.types';

const initialState = {
  cars: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CARS:
      return {
        ...state,
        cars: payload,
        loading: false,
      };
    case POST_CAR:
      return {
        ...state,
        cars: [...state.cars, payload],
        loading: false,
      };
    case PUT_CAR:
      return {
        ...state,
        cars: state.cars.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
        loading: false,
      };
    case DELETE_CAR:
      return {
        ...state,
        cars: state.cars.filter((c) => c.id !== payload),
        loading: false,
      };
    case CARS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
