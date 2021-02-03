import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import {
  deletePost,
  getPostsById,
  likePost,
} from "../../../actions/postActions";

const Post = ({ post }) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const editPostHandler = (id) => {
    dispatch(getPostsById(post._id));
  };

  const deletePostHandler = (id) => {
    if (window.confirm("Are you sure?? ")) {
      dispatch(deletePost(id));
    }
  };
  const likeHandler = (id) => {
    dispatch(likePost(post._id));
  };
  return (
    <Card className={classes.card}>
      <img src={post.selectedFile} alt="" />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => {
            editPostHandler(post._id);
          }}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5">
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            likeHandler(post._id);
          }}
        >
          <ThumbUpAltIcon fontSize="small" />
          &nbsp; Like &nbsp; {post.likeCount}{" "}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            deletePostHandler(post._id);
          }}
        >
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
