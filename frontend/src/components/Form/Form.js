import axios from "axios";
import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./styles";
import Loader from "../Loader";
import Message from "../Message";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/postActions";

const Form = () => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const { post, success: successPost } = useSelector(
    (state) => state.singlePost
  );
  const { _id: postId, creator, title, message, tags, selectedFile } = post;

  const postUpdate = useSelector((state) => state.postUpdate);
  const { success: updateSuccess } = postUpdate;

  const postsCreate = useSelector((state) => state.postsCreate);
  const { loading: loadingCreate, error: errorCreate } = postsCreate;

  const postDelete = useSelector((state) => state.postDelete);
  const { loading: loadingDelete, error: errorDelete } = postDelete;

  useEffect(() => {
    if (successPost) {
      setPostData({
        id: postId,
        creator,
        title,
        message,
        tags,
        selectedFile,
      });
    }
  }, [successPost, creator, message, postId, tags, title, selectedFile]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("selectedFile", file);

    const { data } = await axios.post("/api/upload", formData);

    setPostData({ ...postData, selectedFile: data });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!successPost) {
      dispatch(createPost(postData));
    } else {
      dispatch(updatePost(postData));
    }
    clear();
  };

  const clear = () => {
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      <>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">
            {successPost && !updateSuccess ? "Editing" : "Creating"} a Memory{" "}
          </Typography>
          <TextField
            name="creator"
            variant="outlined"
            label="Creator"
            fullWidth
            value={postData.creator}
            onChange={(e) =>
              setPostData({ ...postData, creator: e.target.value })
            }
          />
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
          <div className={classes.fileInput}>
            <input
              type="file"
              multiple={false}
              onChange={(e) => uploadFileHandler(e)}
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </>
    </Paper>
  );
};

export default Form;
