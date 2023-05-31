import "./App.css";
import Post from "./Post";
import UserSettings from "./UserSettings";
import { Grid } from "@mui/material";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Grid
          container
          md={12}
          sx={{
            backgroundColor: "#f0a356",
            height: "100vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid container spacing={10} justifyContent={"center"}>
            <Grid item md={5} xs={12}>
              <UserSettings />
            </Grid>
            <Grid item md={5} xs={12}>
              <Post />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </QueryClientProvider>
  );
}

export default App;
