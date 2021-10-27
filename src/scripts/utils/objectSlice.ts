// createSlice method of Redux toolkit
import { createSlice } from "@reduxjs/toolkit";

// Create object slice
export const objectSlice = createSlice({
	name: "object",
	initialState: {
		objects: [],
	},
	reducers: {
		// Add an object to the object list
		addObject: (state, action) => {
			state.objects = [...state.objects, action.payload.object];
		},
		// Clear the objects
		clearObjects: (state) => {
			state.objects = [];
		},
	},
});

// Export the available reducers (Set state methods) to use
export const {
	addObject,
	clearObjects,
} = objectSlice.actions;

// Export the reducers
export default objectSlice.reducer;
