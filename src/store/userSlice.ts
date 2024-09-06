import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../types/User";
import axios from "axios";

interface UserState {
  users: User[];
  filteredUsers: User[];
  loading: boolean;
  filtersValue: {
    name: string;
    username: string;
    email: string;
    phone: string;
  };
}

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  loading: false,
  filtersValue: {
    name: "",
    username: "",
    email: "",
    phone: "",
  },
};

export const getUsers = createAsyncThunk(
  "users/fetch",

  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setNameFilter(state, action) {
      state.filtersValue.name = action.payload;
      state.filteredUsers = state.users.filter((user) =>
        user.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setUsernameFilter(state, action) {
      state.filtersValue.username = action.payload;
      state.filteredUsers = state.users.filter((user) =>
        user.username.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setEmailFilter(state, action) {
      state.filtersValue.email = action.payload;
      state.filteredUsers = state.users.filter((user) =>
        user.email.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setPhoneFilter(state, action) {
      state.filtersValue.phone = action.payload;
      state.filteredUsers = state.users.filter((user) =>
        user.phone.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    useAllFiltres(state) {
      state.filteredUsers = state.users.filter(
        (user) =>
          (state.filtersValue.name === "" ||
            user.name
              .toLowerCase()
              .includes(state.filtersValue.name.toLowerCase())) &&
          (state.filtersValue.username === "" ||
            user.username
              .toLowerCase()
              .includes(state.filtersValue.username.toLowerCase())) &&
          (state.filtersValue.email === "" ||
            user.email
              .toLowerCase()
              .includes(state.filtersValue.email.toLowerCase())) &&
          (state.filtersValue.phone === "" ||
            user.phone
              .toLowerCase()
              .includes(state.filtersValue.phone.toLowerCase()))
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.filteredUsers = action.payload;
      state.loading = false;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
  setNameFilter,
  setUsernameFilter,
  setEmailFilter,
  setPhoneFilter,
  useAllFiltres,
} = userSlice.actions;

export default userSlice.reducer;
