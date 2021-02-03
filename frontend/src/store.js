import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  postCreateReducer,
  postDeleteReducer,
  postLikeReducer,
  postListReducer,
  postUpdateReducer,
  singlePostListReducer,
} from "./reducers/postReducers";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  postsList: postListReducer,
  singlePost: singlePostListReducer,
  postsCreate: postCreateReducer,
  postDelete: postDeleteReducer,
  postUpdate: postUpdateReducer,
  postLike: postLikeReducer,
});

const middleware = [thunk];
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
