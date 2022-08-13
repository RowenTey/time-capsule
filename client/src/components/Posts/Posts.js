/* eslint-disable no-unused-vars */
import React from 'react';
import Post from './Post/Post';
import useStyles from './styles';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  
  return (
    !posts.length ? <CircularProgress /> : (
      <Grid container className={classes.container} alignItems='stretch' spacing={3}>
        {posts.map((post) => (
          <Grid item key={post._id} xs={12} sm={6}>
            <Post post={post} setCurrentId={setCurrentId}/>
          </Grid>
        ))}
      </Grid>
    )
  );
}

export default Posts;