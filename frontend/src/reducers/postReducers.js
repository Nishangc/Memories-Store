import {
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_RESET,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_LIKE_FAIL,
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_UPDATE_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  SINGLE_POST_LIST_FAIL,
  SINGLE_POST_LIST_REQUEST,
  SINGLE_POST_LIST_SUCCESS,
} from "../constants/postConstants";

export const postListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return {
        loading: true,
        posts: [],
      };
    case POST_LIST_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
      };
    case POST_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const singlePostListReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case SINGLE_POST_LIST_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case SINGLE_POST_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        post: action.payload,
      };
    case SINGLE_POST_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return {
        loading: true,
      };
    case POST_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        post: action.payload,
      };
    case POST_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case POST_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const postUpdateReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case POST_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case POST_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        post: action.payload,
      };
    case POST_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const postLikeReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case POST_LIKE_REQUEST:
      return {
        loading: true,
      };
    case POST_LIKE_SUCCESS:
      return {
        loading: false,
        success: true,
        post: action.payload,
      };
    case POST_LIKE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_DELETE_REQUEST:
      return {
        loading: true,
      };
    case POST_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case POST_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
