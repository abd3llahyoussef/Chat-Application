import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ReactNode } from "react";

interface User {
  id: string;
  Fname: string;
  Lname: string;
  email: string;
  password: string;
  createdAt: ReactNode;
}

interface loginUser {
  email: string;
  password: string;
}

interface userData {
  clients: {
    id: string;
    Fname: string;
    Lname: string;
    email: string;
    password: string;
    createdAt?: string;
  };
  token: string;
}

interface state {
  user: User | null;
  loggedInUser: loginUser | null;
  userInfo: userData | null;
  isLoading: boolean;
  error: Error | null;
}

const initialState: state = {
  user: null,
  loggedInUser: null,
  userInfo: null,
  isLoading: false,
  error: null,
};

export const create = createAsyncThunk<User, any>(
  "user/register",
  async (user) => {
    const createUser = await axios.post<User>(
      "http://localhost:3000/api/user/register",
      user
    );
    return createUser.data;
  }
);

export const getUser = createAsyncThunk<loginUser, any>(
  "user/login",
  async (user) => {
    const res = await axios.post("http://localhost:3000/api/user/login", user);
    return res.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action) => {
      console.log(action.payload);
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      console.log("loading");
    });
    builder.addCase(
      getUser.fulfilled,
      (state, action: PayloadAction<loginUser | any>) => {
        state.userInfo = action.payload;
        console.log(state.userInfo);
      }
    );
    builder.addCase(getUser.rejected, (state) => {
      console.log("error");
      console.log("rejected");
    });
  },
});

export const { setName } = userSlice.actions;
export default userSlice.reducer;
