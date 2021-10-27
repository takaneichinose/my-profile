// ReactJS
import React from "react";
import ReactDOM from "react-dom";

// React-Redux provider component
import { Provider } from "react-redux";

// Redux store of states
import store from "./utils/store";

// Main component of my personal profile
import MyProfile from "./components/MyProfile";

function App(): any {
	return (
		<Provider store={store}>
			<MyProfile lang={document.documentElement.lang} />
		</Provider>
	);
}

ReactDOM.render(<App />, document.getElementById("app"));

