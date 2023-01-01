import axios from "axios";

export const getLogin = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:8000/api/token/", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get("http://localhost:8000/user/", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};

export const postTransaction = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/transaction/",
      data,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
      }
    );

    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const getTransactions = async () => {
    try {
        const response = await axios.get("http://localhost:8000/transaction/", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        });
        return response.data;
    } catch (error) {
        return error?.response?.data;
    }
};

export const deleteTransaction = async (id) => {
    try {
        const response = await axios.delete(
        `http://localhost:8000/transaction/${id}/`,
        {
            headers: {
              "Authorization": "Bearer " + localStorage.getItem("access"),
            },
        }
        );
        return response.data;
    } catch (error) {
        return error?.response?.data;
    }
};
