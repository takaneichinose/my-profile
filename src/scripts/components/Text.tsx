////////////////////////////////////////////////////////////////////////////////
// Component of text                                                          //
////////////////////////////////////////////////////////////////////////////////

// ReactJS
import React from "react";

// React implementation of Redux
import { useSelector } from "react-redux";

// Definition class for this project
import * as Definition from "../classes/Definition";

/**
 * Get the information of the image based on the text
 * @param string text Text to be rendered
 * @param number width Width of the image
 * @param number height Height of the image
 * @param object assets Map of assets
 */
function getImagePosition(text: string, width: number, height: number, assets: object) {
	let index: number = null;

	text = text.toUpperCase();

	// Background image CSS styles
	let backgroundImage: string = "";
	let backgroundPosition: string = "";
	let backgroundSize: string = "";

	for (let characters of Definition.CHARACTERS) {
		// Set of characters from the asset image
		const charSet: string = assets[characters];
		
		if ((index = charSet.indexOf(text)) >= 0) {
			backgroundImage = `var(--${characters}-image)`;
			backgroundPosition = `${index * width * -1 }px 0px`;
			backgroundSize = `${charSet.length * width}px ${height}px`;
		}
	}
	
	return {
		backgroundImage: backgroundImage,
		backgroundPosition: backgroundPosition,
		backgroundSize: backgroundSize,
	};
}

/**
 * Component of text
 * @param object props Parameters passed to a component
 */
export default function Text(props: Definition.CommonProperties): React.ReactElement {
	// Properties
	const content: string = props.content;
	const click: React.MouseEventHandler = props.click;
	
	// This is to get the state from Redux
	const system = useSelector(state => state["system"]);
	const assets = useSelector(state => state["assets"]);
	
	// Sizes
	const WIDTH: number = system.screen.width * Definition.TEXT_WIDTH;
	const HEIGHT: number = system.screen.height * Definition.TEXT_HEIGHT;
	
	// Array of element of text
	let textArray: Array<React.ReactElement> = [];
			
	for (const word of content.split(" ")) {
		// Separate the sentence by space
		
		// Array to contain characters into words
		let wordArray: Array<React.ReactElement> = [];
		
		for (const text of word) {
			const {
				backgroundImage,
				backgroundPosition,
				backgroundSize,
			} = getImagePosition(text, WIDTH, HEIGHT, assets);

			wordArray = [...wordArray, (
				<div className="text" style={{
					"--width": `${WIDTH}px`,
					"--height": `${HEIGHT}px`,
					"--background-image": backgroundImage,
					"--background-position": backgroundPosition,
					"--background-size": backgroundSize,
				} as Definition.CSSProperties}></div>
			)];
		}
		
		textArray = [...textArray, (
			<div
				className="word"
				style={{ "--space": `${WIDTH}px` } as Definition.CSSProperties}>
				{wordArray}
			</div>
		)];
	}
	
	if (click !== null && click !== undefined) {
		return (
			<button
				className="dialog-confirm-button"
				style={{
					"--width": `${WIDTH}px`,
					"--height": `${HEIGHT}px`,
					"--selector-background-image": `url(${assets.image.TextSelector})`,
				} as Definition.CSSProperties}
				onClick={click}>
				{textArray}
			</button>
		);
	}
	
	return (<div className="sentence">{textArray}</div>);
}
