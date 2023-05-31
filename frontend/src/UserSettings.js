import {
  Card,
  Divider,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
  Chip,
  Grid,
} from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { getProfile, updateProfile } from "./helpers";
import { useLoginStore } from "./store";
import axios from "axios";

const UserSettings = () => {
  const REDIRECT_URI = "http://localhost:3000";
  const [provider, setProvider] = useState("");

  const setLogin = useLoginStore((state) => state.setLogin);
  const setLogout = useLoginStore((state) => state.setLogin);

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(1),
  });

  const onLogout = useCallback(() => {
    setProvider("");
    setLogout();
  }, []);

  console.log(profileQuery.data);

  if (profileQuery.isSuccess) {
    setLogin();
  }

  return (
    <Card sx={{ height: "700px" }}>
      <Grid justifyContent={"center"}>
        <h1>Account</h1>
        {profileQuery.isSuccess ? (
          <div>
            <h2>Status</h2>
            <Chip label={"Logged in as " + profileQuery.data.first_name} />
            <Button>Log out</Button>
            <Divider />
            <h1>Set Posting Schedule</h1>
            <BasicSelect />
          </div>
        ) : (
          <LoginSocialFacebook
            appId={process.env.REACT_APP_FACEBOOK_APP_ID || ""}
            fieldsProfile={
              "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
            }
            onLogoutSuccess={onLogout}
            onResolve={({ provider, data }) => {
              const newProfile = {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                picture: data.picture,
                accessToken: data.accessToken,
              };
              updateProfile(newProfile);
              setLogin();
            }}
            onReject={(err) => {
              console.log(err);
            }}
            redirect_uri={REDIRECT_URI}
            // scope="public_profile instagram_basic pages_show_list"
            scope="public_profile "
          >
            <FacebookLoginButton />
          </LoginSocialFacebook>
        )}
      </Grid>
    </Card>
  );
};

export default UserSettings;

const BasicSelect = () => {
  const [schedule, setSchedule] = useState("");

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
};
