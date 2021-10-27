////////////////////////////////////////////////////////////////////////////////
// Component of speech dialog                                                 //
////////////////////////////////////////////////////////////////////////////////

// ReactJS
import React, { useState, } from "react";
import ReactDOM from "react-dom";

// React implementation of Redux
import {
	useSelector,
	useDispatch,
} from "react-redux";

// Reducers (Set state methods)
import { hideSpeechDialog, } from "../utils/systemSlice";

// Definition class for this project
import * as Definition from "../classes/Definition";

// Common method class for this project
import Methods from "../classes/Methods";

// Components
import Text from "./Text";
import Spacer from "./Spacer";

/**
 * Buttons for confirmation box
 * @param object props Properties object
 */
function ConfirmButtons(props: Definition.CommonProperties): ReactDOM.Element {
	// Properties
	const lang: string = props.lang;
	const confirm: Definition.Confirm = props.confirm;
	
	// This is to get the state from Redux
	const assets: any = useSelector(state => state["assets"]);
	
	if (confirm === null || confirm === undefined) {
		return null;
	}
	
	return (
		<div className="dialog-confirm">
			<Text
				content={assets.text[lang].no}
				click={() => {
					if (confirm.no !== null && typeof confirm.no !== "undefined") {
						confirm.no();
					}
				}}
			/>
			<Spacer />
			<Spacer />
			<Text
				content={assets.text[lang].yes}
				click={() => {
					if (confirm.yes !== null && typeof confirm.yes !== "undefined") {
						confirm.yes();
					}
				}}
			/>
		</div>
	);
}

/**
 * Component of speech dialog
 * @param object props Properties object
 */
export default function SpeechDialog(props: Definition.CommonProperties): ReactDOM.Element {
	// Properties
	const lang: string = props.lang;
	
	// ReactJS useState
	const [isFadeOut, setIsFadeOut] = useState(false);
	
	// This is to get the state from Redux
	const system: any = useSelector(state => state["system"]);
	const assets: any = useSelector(state => state["assets"]);
	
	// This is like setState or something
	const dispatch: any = useDispatch();
	
	// States for the speech dialog
	const content: string = system.speechDialogMessage;
	const callback: Function = system.speechDialogCallback;
	const confirm: Definition.Confirm = system.speechDialogConfirm;

	if (!system.speechDialogShown || content === null) {
		return null;
	}

	// Class name to add while Fading-out
	const fadeOutClassName: string = "speech-dialog-fade-out";

	// Default class name
	let speechDialogClassName: string = "speech-dialog";

	if (isFadeOut) {
		speechDialogClassName += ` ${fadeOutClassName}`;
	}
	
	// Number of loaded assets
	const loadedAssetsCount: number = system.loadedAssetsCount;

	// Total number of assets
	const totalAssetsCount: number = Methods.getAllAssetsCount();
	
	if (loadedAssetsCount < totalAssetsCount) {
		return null;
	}
	
	const speechDialogStyle: Definition.CSSProperties = {
		"--background-image": `url("${assets.image.SpeechDialog}")`
	} as Definition.CSSProperties;
	
	// Padding of the speech dialog
	const paddingX: number = system.screen.width * Definition.SPEECH_DIALOG_PAD_X;
	const paddingY: number = system.screen.height * Definition.SPEECH_DIALOG_PAD_Y;
	
	return (
		<article
			className={speechDialogClassName}
			style={speechDialogStyle}
			onClick={(evt: React.MouseEvent) => {
				evt.stopPropagation();

				setIsFadeOut(true);
			}}
			onAnimationEnd={(evt: React.AnimationEvent) => {
				if (evt.animationName === fadeOutClassName) {
					dispatch(hideSpeechDialog());
					
					setIsFadeOut(false);
					
					if (callback !== null && typeof callback !== "undefined") {
						callback();
					}
				}
			}}>
			<section
				className="speech-dialog-box"
				style={{
					"--padding": `${paddingY}px ${paddingX}px`,
				} as Definition.CSSProperties}>
				<Text content={content} />
				<ConfirmButtons lang={lang} confirm={confirm} />
			</section>
		</article>
	);
}

