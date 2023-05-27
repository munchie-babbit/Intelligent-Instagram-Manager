import { Card, Divider, Button, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent, Box, TextField, Chip, Grid } from "@mui/material"
import { useState, useCallback } from "react";
import {
    LoginSocialFacebook,
    IResolveParams,
  } from 'reactjs-social-login';

  import {
    FacebookLoginButton,
  } from 'react-social-login-buttons';

const UserSettings = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoginError, setIsLoginError] = useState(false)
    const [picture, setPicture] = useState('');
    const [facebookData, setFacebookData] = useState("");
    const REDIRECT_URI = 'http://localhost:3000/account/login'
    const [provider, setProvider] = useState('');
    const [profile, setProfile] = useState();

      const onLogout = useCallback(() => {
        setProfile(null);
        setProvider('');
      }, []);
      
    return ( 
        <Card sx={{height: "700px"}}>
            <Grid justifyContent={"center"}>
                <h1>Account</h1>
                {profile ? 
    
                    <div>
                    <h2>Status</h2>
                    <Chip label={"Logged in as " + profile.name} />
                    <Button>Log out</Button>
                    <Divider/>
                    <h1>Schedule settings</h1>
                    <BasicSelect/>
                    </div>
                :<LoginSocialFacebook
                    appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
                    fieldsProfile={
                    'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
                    }
                    onLogoutSuccess={onLogout}
                    onResolve={({ provider, data }) => {
                        setProvider(provider);
                        setProfile(data);
                        console.log(profile);
                      }}
                    onReject={err => {
                    console.log(err);
                    }}
                    redirect_uri={REDIRECT_URI}
                    scope="public_profile"
                >
                    <FacebookLoginButton />
                </LoginSocialFacebook>
                }
            </Grid>
        </Card>);
}
 
export default UserSettings;

const BasicSelect = () => {
    const [schedule, setSchedule] = useState("")

  
    const handleChange = (event) => {
      setSchedule(event.target.value);
    };


  
    return (
      <Box sx={{ minWidth: 120, maxWidth: 400, margin: "auto" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Schedule</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={schedule}
            label="Schedule"
            onChange={handleChange}
          >
            <MenuItem value={10}>Post once a month</MenuItem>
            <MenuItem value={20}>Post once a week</MenuItem>
            <MenuItem value={30}>Post once a day</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  }