////////////////////////////////////////////////////////////////////////////////
// Component of the instructions                                              //
////////////////////////////////////////////////////////////////////////////////

// ReactJS
import React, { useState } from "react";
import ReactDOM from "react-dom";

// React implementation of Redux
import { useSelector, useDispatch } from "react-redux";

// Reducers (Set state methods)
import { showSpeechDialog } from "../utils/systemSlice";

// Definition class for this project
import * as Definition from "../classes/Definition";

/**
 * Component of the instructions
 * @param CommonProperties props Parameters passed to a component
 */
export default function Instructions(props: Definition.CommonProperties): ReactDOM.Element {
	// Properties
	const lang: string = props.lang;
	
	// React useState hooks
	const [isShown, setIsShown] = useState(true);
	const [message, setMessage] = useState(Definition.InstructionMessage.Main);
	
	// This is like setState or something
	const dispatch: any = useDispatch();
	
	// This is to get the state from Redux
	const assets: any = useSelector(state => state["assets"]);
	
	if (!isShown) {
		return null;
	}
	
	// Shorthand of the text object from assets
	const text: any = assets.text[lang];
	
	// Key
	let textKey: string = `instructions${Definition.InstructionMessage[message]}`;
	
	if (text === undefined || textKey === null) {
		return null;
	}
	
	// Show instruction speech dialog
	const showInstruction: Function = (): void => {
		dispatch(showSpeechDialog({
			message: text[textKey],
			callback: (): void => {
				if (message + 1 >= Object.keys(Definition.InstructionMessage).length / 2) {
					setIsShown(false);
					
					return;
				}
				
				// Add one step to the shown instruction
				setMessage(message + 1);
				
				showInstruction();
			}
		}));
	};
	
	showInstruction();
	
	return (
		<div
			className="instructions"
			onClick={evt => {
				evt.stopPropagation();
			}}>
		</div>
	);
}

