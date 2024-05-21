import { createSlice } from "@reduxjs/toolkit";

const loadInitialState = () => {
  const storedData = localStorage.getItem("datas");
  try {
    return storedData ? JSON.parse(storedData) : [];
  } catch (e) {
    console.error("Error parsing stored data:", e);
    return [];
  }
};

const initialState = {
  datas: loadInitialState(),
};

export const dataSlice = createSlice({
  name: "datas",
  initialState,
  reducers: {
    allstocks: (state, action) => {
      state.datas = action.payload; // Update state with fetched data
      localStorage.setItem("datas", JSON.stringify(action.payload)); // Save to localStorage
    },
  },
});

export const { allstocks } = dataSlice.actions;

export default dataSlice.reducer;
