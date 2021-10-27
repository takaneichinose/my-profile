// Redux toolkit
import { configureStore } from "@reduxjs/toolkit";

// Reducers (Set state methods)
import assetsReducer from "./assetsSlice";
import characterReducer from "./characterSlice";
import objectReducer from "./objectSlice";
import systemReducer from "./systemSlice";

// Configuration of the reducer
export default configureStore({
  reducer: {
		assets: assetsReducer,
		character: characterReducer,
		object: objectReducer,
		system: systemReducer,
	},
});
