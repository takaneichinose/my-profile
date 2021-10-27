////////////////////////////////////////////////////////////////////////////////
// Component of spacer                                                        //
////////////////////////////////////////////////////////////////////////////////

// ReactJS
import React from "react";
import ReactDOM from "react-dom";

// React implementation of Redux
import { useSelector } from "react-redux";

// Definition class for this project
import * as Definition from "../classes/Definition";

/**
 * Component of spacer
 */
export default function Spacer(): ReactDOM.Element {
	// This is to get the state from Redux
	const system: any = useSelector(state => state["system"]);
	
	// Sizes
	const WIDTH: number = system.screen.width * Definition.TEXT_WIDTH;
	const HEIGHT: number = system.screen.height * Definition.TEXT_HEIGHT;
	
	return (
		<div
			className="spacer"
			style={{
				"--width": `${WIDTH}px`,
				"--height": `${HEIGHT}px`,
			} as Definition.CommonProperties}></div>
	);
}

