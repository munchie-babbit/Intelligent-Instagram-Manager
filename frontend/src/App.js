import './App.css';
import Post from "./Post"
import UserSettings from "./UserSettings"
import { Grid } from "@mui/material"

function App() {
  return (
    <div className="App">
      <Grid container md={12} sx={{
        backgroundColor: "#f0a356",
        height: "100vh",
        display: "flex",
        alignItems: "center",

      }}>
        <Grid container spacing={10} justifyContent={"center"}>
          <Grid item md={5} xs={12}>
            <Post/>
          </Grid>
          <Grid item md={5} xs={12}>
            <UserSettings/>
          </Grid>
        </Grid>
      </Grid>

    </div>
  );
}

export default App;
