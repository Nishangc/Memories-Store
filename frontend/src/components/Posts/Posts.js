import React, { useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/postActions";
import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const postsList = useSelector((state) => state.postsList);
  const { posts } = postsList;

  const postLike = useSelector((state) => state.postLike);
  const { success: likeSuccess } = postLike;

  const postsCreate = useSelector((state) => state.postsCreate);
  const { success: successCreate } = postsCreate;

  const postDelete = useSelector((state) => state.postDelete);
  const { success: deleteSuccess } = postDelete;

  const postUpdate = useSelector((state) => state.postUpdate);
  const { success: updateSuccess } = postUpdate;

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, likeSuccess, successCreate, deleteSuccess, updateSuccess]);

  return postsList.length < 1 ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
