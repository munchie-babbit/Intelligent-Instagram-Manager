import { Card, Divider, Button, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent, Box, TextField, Chip, Grid } from "@mui/material"
import { useState } from "react";



const UserSettings = () => {
    const username = "Chrys.advs"
    return ( 
        <Card sx={{height: "700px"}}>
            <Grid justifyContent={"center"}>
                <h1>Account</h1>
                <h2>Status</h2>
                <Chip label={"Logged in as " + username} />
                <Button>Log out</Button>
                <Divider/>
                <h1>Schedule settings</h1>
                <BasicSelect/>
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