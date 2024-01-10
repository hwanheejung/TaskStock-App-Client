import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRegisterUser } from "../../screens/Login/EmailRegisterScreen";
import { client } from "../../services/api";
import { saveCredentials } from "./autoSignIn";

// 회원가입, 로그인
// accessToken => asyncStorage, redux에 저장
// refreshToken => asyncStorage에 저장
// accessExp, refreshExp => asyncStorage, redux에 저장
// email, password => keyChain에 저장
export const registerWithEmail = createAsyncThunk(
  "REGISTER_WITH_EMAIL",
  async (data: IRegisterUser, { rejectWithValue }) => {
    try {
      const responseData = await client.post("account/register", data);

      // email, password => secure store에 저장
      await saveCredentials(data.email, data.password);
      console.log("회원가입 시 서버 응답:", responseData);
      return responseData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 로그인 실패: 가입된 정보가 없을 때 처리
export const loginWithEmail = createAsyncThunk(
  "LOGIN_WITH_EMAIL",
  async (
    data: {
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const responseData = await client.post("account/login/email", data);
      // emaiil, password => secure store에 저장
      console.log("data", data);
      await saveCredentials(data.email, data.password);
      console.log("로그인 시 서버 응답: ", responseData);
      return responseData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 로그아웃
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;
      const accessToSend = accessToken.replace(/^"|"$/g, "");

      const data = await client.delete("account/logout", {
        accessToken: accessToSend,
      });
      console.log("로그아웃 시 받은 데이터", data);

      if (data.result !== "success") {
        throw new Error(data.message || "로그아웃 실패");
      }
      return data;
    } catch (error) {
      // console.error("로그아웃 처리 중 오류:", error);
      return rejectWithValue(error.message);
    }
  }
);
