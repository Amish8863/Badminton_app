import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../utils/axiosInstance';

// ✅ Async thunk defined here itself
export const getAllMatches = createAsyncThunk(
  "matches/getAllMatches",
  async () => {
    const res = await axiosInstance.get("/api/matches");
    console.log("res: ", res?.data)
    return res.data;
  }
);

export const getUserMatches = createAsyncThunk(
  "matches/getUserMatches",
  async (userId) => {
    const res = await axiosInstance.get(`/api/matches/${userId}`);
    // const res = await axios.get('/api/matches/6880beff825f11c6c0ba1103');
    console.log("res.data: ", res.data)
    return res.data;
  }
)

// Initial state
const initialState = {
  data: null,
  isLoading: false,
  count: 0,
  error: null,
};

const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMatches.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(getAllMatches.fulfilled, (state, action) => {
        state.isloading = false;
        state.data = action.payload;
        state.count = action.payload.count;
      })
      .addCase(getAllMatches.rejected, (state) => {
        state.isloading = false;
        state.error = "Failed to load matches";
      })

      .addCase(getUserMatches.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserMatches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.count = action.payload.count;
      })
      .addCase(getUserMatches.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
      
  },
});

export default matchSlice.reducer;
// export { getAllMatches, getUserMatches };
