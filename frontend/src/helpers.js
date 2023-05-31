import axios from "axios";

export const getPosts = (accessToken) => {
  let pageId;

  //   axios
  //     .get("https://graph.facebook.com/v17.0/me/accounts", {
  //       params: {
  //         access_token: accessToken,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       pageId = response.data.id;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //   axios
  //     .get("https://graph.facebook.com/v17.0/" + pageId, {
  //       params: {
  //         fields: "instagram_business_account",
  //         access_token: accessToken,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
};

export const getProfile = (id) =>
  axios
    .get("http://localhost:8000/api/profile/", {
      params: {
        id: id,
      },
    })
    .then((res) => {
      return res.data[0];
    });

export const updateProfile = (profile) => {
  //   axios
  //     .post("http://localhost:8000/profile", {
  //       params: {
  //         id: 1,
  //       },
  //       body: profile,
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
};
