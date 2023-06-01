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
import { useLoginStore, useScheduleStore } from "./store";
import axios from "axios";

const UserSettings = () => {
  const REDIRECT_URI = "http://localhost:3000";
  const [provider, setProvider] = useState("");

  const setLogin = useLoginStore((state) => state.setLogin);
  const setLogout = useLoginStore((state) => state.setLogout);
  const postFrequency = useScheduleStore((state) => state.postFrequency);

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
            <BasicSelect
              options={[
                "Post once a month",
                "Post once a week",
                "Post once a day",
              ]}
              title="Posting schedule"
            />
            {postFrequency === "" ? null : postFrequency ===
              "Post once a month" ? (
              <BasicSelect
                options={Array.from({ length: 29 }, (_, index) => index)}
                title="Day"
              />
            ) : postFrequency === "Post once a week" ? (
              <BasicSelect
                options={[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ]}
                title="Day"
              />
            ) : (
              <BasicSelect
                options={["Morning", "Afternoon", "Evening", "Night"]}
                time="Time"
              />
            )}
            <Button sx={{ marginTop: 4 }} variant="contained">
              {" "}
              Save schedule
            </Button>
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

const BasicSelect = ({ options, title }) => {
  const setFrequency = useScheduleStore((state) => state.setPostFrequency);
  const postFrequency = useScheduleStore((state) => state.postFrequency);

  const handleChange = (event) => {
    setFrequency(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, maxWidth: 400, margin: "auto", marginTop: 4 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={title}
          onChange={handleChange}
        >
          {options.map((option) => {
            return <MenuItem value={option}>{option}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
