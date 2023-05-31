import { Card, Button, Box, Grid } from "@mui/material";
import placeholderIMG from "./images/Placeholder.png";
import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { getPosts } from "./helpers";
import { useLoginStore } from "./store";

const Post = () => {
  // const posts = getPosts();
  const caption = "some caption";
  const hashtags = "#hashtag";
  const postDate = "May 23, 2023";
  const username = "Chrysanthemum's Adventures";
  const [isUploaded, setIsUploaded] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);

  const [images, setImages] = React.useState([]);

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
    setIsUploaded(true);
  };

  const generatePost = () => {
    setIsGenerated(true);
    setIsUploaded(false);
  };

  return (
    <Card sx={{ height: "700px", margin: "auto", overflow: "scroll" }}>
      {isLoggedIn ? (
        <Grid>
          <h1>Posting to: {username}</h1>
          <ImageUploading
            multiple={true}
            value={images}
            onChange={onChange}
            maxNumber={10}
            dataURLKey="data_url"
            acceptType={["jpg", "png"]}
          >
            {({
              imageList,
              onImageUpload,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              <div className="upload__image-wrapper">
                <Button
                  style={isDragging ? { color: "red" } : null}
                  variant="contained"
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Upload an image
                </Button>
                &nbsp;
                {imageList.map((image, index) => (
                  <div
                    key={index}
                    className="image-item"
                    style={{ paddingTop: 40 }}
                  >
                    <img
                      src={image.data_url}
                      alt=""
                      width="70%"
                      style={{ borderRadius: 20 }}
                    />
                    <div className="image-item__btn-wrapper">
                      <Button onClick={() => onImageUpdate(index)}>
                        Update
                      </Button>
                      <Button onClick={() => onImageRemove(index)}>
                        Remove
                      </Button>
                    </div>
                    {isUploaded ? (
                      <div>
                        <Button
                          variant="contained"
                          onClick={generatePost}
                          sx={{}}
                        >
                          Generate Post
                        </Button>
                      </div>
                    ) : (
                      <Grid
                        container
                        center
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid item>
                          {/* <img
                        style={{ maxWidth: "70%", padding: 30 }}
                        src={placeholderIMG}
                      />
                    </Grid>
                    <Grid item> */}
                          <Button variant="contained" disabled sx={{}}>
                            Generate Post
                          </Button>
                        </Grid>
                      </Grid>
                    )}
                    {isGenerated ? (
                      <div>
                        <p>{caption}</p>
                        <p>{hashtags}</p>
                        <h2>Scheduled to post: {postDate}</h2>
                        <Button variant="contained">Post now</Button>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </Grid>
      ) : (
        <Grid>
          <h1>Welcome to the Social Media Manager</h1>
          <p>Login to continue</p>
        </Grid>
      )}
    </Card>
  );
};

export default Post;
