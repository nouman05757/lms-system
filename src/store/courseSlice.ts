import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface Course {
  id: string;
  title: string;
  description: string;
}

interface CourseState {
  list: Course[];
}

const initialState: CourseState = {
  list: [],
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<Course>) => {
      state.list.push(action.payload);
    },
  },
});

export const { addCourse } = courseSlice.actions;
export default courseSlice.reducer;
