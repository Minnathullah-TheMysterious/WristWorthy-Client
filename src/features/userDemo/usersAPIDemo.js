import axios from "axios";

export const fetchUsersAPI = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
};
