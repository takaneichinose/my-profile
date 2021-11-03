////////////////////////////////////////////////////////////////////////////////
// Component of Statistics, skill level component                             //
////////////////////////////////////////////////////////////////////////////////

// ReactJS
import React, { useState } from "react";

// React implementation of Redux
import { useSelector, useDispatch } from "react-redux";

// Reducers (Set state methods)
import { hideAcknowledgement } from "../utils/systemSlice";

// Definition class for this project
import * as Definition from "../classes/Definition";

// Components
import Text from "./Text";

/**
 * Acknowledgement, my message to the people
 * @param object props Parameters passed to a component
 */
// Properties
export default function Acknowledgement(props: Definition.CommonProperties): React.ReactElement {
	const lang: any = props.lang;
	
	// React useState hooks
	const [isFadeOut, setIsFadeOut] = useState(false);
	
	// This is to get the state from Redux
	const system: any = useSelector(state => state["system"]);
	const assets: any = useSelector(state => state["assets"]);

	// This is like setState or something
	const dispatch: any = useDispatch();
	
	if (!system.acknowledgementShown) {
		return null;
	}
	
	// Class name to add while Fading-out
	const fadeOutClassName: string = "acknowledgement-fade-out";
	
	// Default class name
	let acknowledgementClassName: string = "acknowledgement";
	
	if (isFadeOut) {
		acknowledgementClassName += ` ${fadeOutClassName}`;
	}
	
	// Shorthand of the text object from assets
	const text: any = assets.text[lang];
	
	const WIDTH: number = system.screen.width * Definition.ACKNOWLEDGEMENT_WIDTH;
	const HEIGHT: number = system.screen.height * Definition.ACKNOWLEDGEMENT_HEIGHT;
	const PAD_X: number = system.screen.width * Definition.ACKNOWLEDGEMENT_PAD_X;
	const PAD_Y: number = system.screen.height * Definition.ACKNOWLEDGEMENT_PAD_Y;
	
	return (
		<div
			className={acknowledgementClassName}
			onClick={(evt: React.MouseEvent): void => {
				evt.stopPropagation();

				setIsFadeOut(true);
			}}
			onAnimationEnd={(evt: React.AnimationEvent): void => {
				if (evt.animationName === fadeOutClassName) {
					dispatch(hideAcknowledgement());
					
					setIsFadeOut(false);
				}
			}}>
			<div
				className="acknowledgement-dialog"
				style={{
					"--background-image": `url(${assets.image.Acknowledgement})`,
					"--width": `${WIDTH}px`,
					"--height": `${HEIGHT}px`,
					"--padding": `${PAD_X}px ${PAD_Y}px`,
				} as Definition.CSSProperties}>
				<Text content={text.acknowledgementTitle} />
				<Text content={text.acknowledgementDescription} />
			</div>
		</div>
	);
}

