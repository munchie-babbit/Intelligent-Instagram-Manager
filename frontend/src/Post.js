import { Card, Button, Box } from "@mui/material"
import placeholderIMG from "./images/Placeholder.png"
import { useState } from "react";


const Post = () => {
    const caption="some caption";
    const hashtags = "#hashtag"
    const postDate = "May 23, 2023"
    const [imageURL, setImageURL] = useState(placeholderIMG)
    const [isUploaded, setIsUploaded] = useState(false); 
    const [isGenerating, setIsGenerating] = useState(false)

    const uploadFile = (event) => {
        setImageURL(event.target.files[0]);
        setIsUploaded(true);
    };

    const generatePost = ()=>{
        setIsGenerating(true)

    }

    return ( 
        <Card sx={{height: "700px"}}>
            <h1>Chrysanthemum's Adventures</h1>
            <input type="file" name="myImage" onChange={()=>uploadFile} />
            <Box sx={{
                img: {
                    width: "300px",
                    height: "300px"
                }
            }}>
                <img src={imageURL}></img>
            </Box>
            {isUploaded ?
                <Button variant="contained" onClick={()=>(generatePost)}>Generate Post</Button>
                : <Button variant="contained" disabled>Generate Post</Button>
            }
            {isGenerating ?  <div>
                    <p>{caption}</p>
                    <p>{hashtags}</p>
                    <h2>Scheduled to post: {postDate}</h2>
                    <Button variant="contained">Post now</Button>
                </div> :   null }

               

            
        </Card>
    );
}
 
export default Post;