import axios from "axios";
import {
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
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

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: POST_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/posts`);

    dispatch({
      type: POST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPostsById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SINGLE_POST_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: SINGLE_POST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_POST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({
      type: POST_CREATE_REQUEST,
    });

    const { data } = await axios.post(`/api/posts`, post);

    dispatch({
      type: POST_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePost = (post) => async (dispatch) => {
  try {
    dispatch({
      type: POST_UPDATE_REQUEST,
    });

    const { data } = await axios.put(`/api/posts/${post.id}`, post);

    dispatch({
      type: POST_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: POST_LIKE_REQUEST,
    });

    const { data } = await axios.put(`/api/posts/${id}/likePost`);

    dispatch({
      type: POST_LIKE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_LIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: POST_DELETE_REQUEST,
    });

    await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: POST_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: POST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
