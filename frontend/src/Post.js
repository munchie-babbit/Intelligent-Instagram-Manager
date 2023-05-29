import { Card, Button, Box } from "@mui/material";
import placeholderIMG from "./images/Placeholder.png";
import React, { useState } from "react";
import ImageUploading from "react-images-uploading";

const Post = () => {
  const caption = "some caption";
  const hashtags = "#hashtag";
  const postDate = "May 23, 2023";
  const [imageURL, setImageURL] = useState(placeholderIMG);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
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
    <Card sx={{ height: "700px" }}>
      <h1>Chrysanthemum's Adventures</h1>
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
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>

      {isUploaded ? (
        <Button variant="contained" onClick={generatePost}>
          Generate Post
        </Button>
      ) : (
        <Button variant="contained" disabled>
          Generate Post
        </Button>
      )}
      {isGenerated ? (
        <div>
          <p>{caption}</p>
          <p>{hashtags}</p>
          <h2>Scheduled to post: {postDate}</h2>
          <Button variant="contained">Post now</Button>
        </div>
      ) : null}
    </Card>
  );
};

export default Post;
