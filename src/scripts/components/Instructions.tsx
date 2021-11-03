////////////////////////////////////////////////////////////////////////////////
// Component of the instructions                                              //
////////////////////////////////////////////////////////////////////////////////

// ReactJS
import React, { useState } from "react";

// React implementation of Redux
import { useSelector } from "react-redux";

// Definition class for this project
import * as Definition from "../classes/Definition";

// Components
import SpeechDialog from "./SpeechDialog";

/**
 * Component of the instructions
 * @param CommonProperties props Parameters passed to a component
 */
export default function Instructions(props: Definition.CommonProperties): React.ReactElement {
	// Properties
	const lang: string = props.lang;
	
	// React useState hooks
	const [message, setMessage] = useState(Definition.InstructionMessage.Main);
	const [speechDialogShown, setSpeechDialogShown] = useState(true);
	
	// This is to get the state from Redux
	const assets: any = useSelector(state => state["assets"]);
	
	if (!speechDialogShown) {
		return null;
	}
	
	// Shorthand of the text object from assets
	const text: any = assets.text[lang];
	
	// Key
	let textKey: string = `instructions${Definition.InstructionMessage[message]}`;
	
	if (text === undefined || textKey === null) {
		return null;
	}
	
	let instructionDialogElement: React.ReactElement;

	if (speechDialogShown) {
		instructionDialogElement = (
			<SpeechDialog
				lang={lang}
				content={text[textKey]}
				callback={() => {
					if (message + 1 >= Object.keys(Definition.InstructionMessage).length / 2) {
						setSpeechDialogShown(false);
						
						return;
					}

					// Add one step to the shown instruction
					setMessage(message + 1);
					
					setSpeechDialogShown(true);
				}}
			/>
		);
	}

	return (
		<>
			<div
				className="instructions"
				onClick={evt => {
					evt.stopPropagation();
				}}>
			</div>
			{instructionDialogElement}
		</>
	);
}

