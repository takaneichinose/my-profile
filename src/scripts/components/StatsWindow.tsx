////////////////////////////////////////////////////////////////////////////////
// Component of Statistics, skill level component                             //
////////////////////////////////////////////////////////////////////////////////

// ReactJS
import React, { useState } from "react";

// React implementation of Redux
import {
	useSelector,
	useDispatch,
} from "react-redux";

// Reducers (Set state methods)
import { hideStatsWindow } from "../utils/systemSlice";

// Definition class for this project
import * as Definition from "../classes/Definition";

// Components
import Text from "./Text";

/**
 * Where the pixel art of my portrait will be shown
 */
function StatsImage(): React.ReactElement {
	// This is to get the state from Redux
	const system: any = useSelector(state => state["system"]);
	const assets: any = useSelector(state => state["assets"]);
	
	const WIDTH: number = system.screen.width * Definition.STATS_IMG_WIDTH;
	const HEIGHT: number = system.screen.height * Definition.STATS_IMG_HEIGHT;
	const X: number = system.screen.width * Definition.STATS_IMG_X;
	const Y: number = system.screen.height * Definition.STATS_IMG_Y;
	
	return (
		<div
			className="stats-image"
			style={{
				"--background-image": `url(${assets.image.StatsImage})`,
				"--width": `${WIDTH}px`,
				"--height": `${HEIGHT}px`,
				"--x": `${X}px`,
				"--y": `${Y}px`,
			} as Definition.CSSProperties}>
		</div>
	);
}

/**
 * Where my basic information will be shown
 * @param object props Parameters passed to a component
 */
function StatsTitle(props: Definition.CommonProperties): React.ReactElement {
	// Properties
	const lang = props.lang;
	
	// This is to get the state from Redux
	const system: any = useSelector(state => state["system"]);
	const assets: any = useSelector(state => state["assets"]);
	
	const WIDTH: number = system.screen.width * Definition.STATS_TITLE_WIDTH;
	const HEIGHT: number = system.screen.height * Definition.STATS_TITLE_HEIGHT;
	const X: number = system.screen.width * Definition.STATS_TITLE_X;
	const Y: number = system.screen.height * Definition.STATS_TITLE_Y;
	const PAD_X: number = system.screen.width * Definition.STATS_PAD_X;
	const PAD_Y: number = system.screen.height * Definition.STATS_PAD_Y;
	
	// Shorthand of the text object from assets
	const text = assets.text[lang];
	
	return (
		<div
			className="stats-title"
			style={{
				"--background-image": `url(${assets.image.StatsTitle})`,
				"--width": `${WIDTH}px`,
				"--height": `${HEIGHT}px`,
				"--padding": `${PAD_X}px ${PAD_Y}px`,
				"--x": `${X}px`,
				"--y": `${Y}px`,
			} as Definition.CSSProperties}>
			<Text content={text.statsName} />
			<Text content={text.statsOccupation} />
			<Text content={text.statsHobby} />
			<Text content={text.statsHobby2} />
		</div>
	);
}

/**
 * Where the detailed explanation of my skills will be shown
 * @param object props Parameters passed to a component
 */
function StatsDescription(props: Definition.CommonProperties): React.ReactElement {
	// Properties
	const lang = props.lang;
	
	// This is to get the state from Redux
	const system: any = useSelector(state => state["system"]);
	const assets: any = useSelector(state => state["assets"]);
	
	const WIDTH: number = system.screen.width * Definition.STATS_DESC_WIDTH;
	const HEIGHT: number = system.screen.height * Definition.STATS_DESC_HEIGHT;
	const X: number = system.screen.width * Definition.STATS_DESC_X;
	const Y: number = system.screen.height * Definition.STATS_DESC_Y;
	const PAD_X: number = system.screen.width * Definition.STATS_PAD_X;
	const PAD_Y: number = system.screen.height * Definition.STATS_PAD_Y;
	
	// Shorthand of the text object from assets
	const text: string = assets.text[lang];
	
	// This is to be rendered
	let skillsList1: Array<React.ReactElement> = [];
	let skillsList2: Array<React.ReactElement> = [];
	
	for (let skill of assets.skills1) {
		skillsList1 = [...skillsList1, <Text content={skill} />];
	}
	
	for (let skill of assets.skills2) {
		skillsList2 = [...skillsList2, <Text content={skill} />];
	}
	
	return (
		<div
			className="stats-description"
			style={{
				"--background-image": `url(${assets.image.StatsDescription})`,
				"--width": `${WIDTH}px`,
				"--height": `${HEIGHT}px`,
				"--padding": `${PAD_X}px ${PAD_Y}px`,
				"--x": `${X}px`,
				"--y": `${Y}px`,
			} as Definition.CSSProperties}>
			<div className="stats-description-details">
				{skillsList1}
			</div>
			<div className="stats-description-details">
				{skillsList2}
			</div>
		</div>
	);
}

/**
 * Statistics, skill level component
 * @param object props Parameters passed to a component
 */
export default function StatsWindow(props: Definition.CommonProperties): React.ReactElement {
	// Properties
	const lang: string = props.lang;
	
	// React useState hooks
	const [isFadeOut, setIsFadeOut] = useState(false);
	
	// This is to get the state from Redux
	const system: any = useSelector(state => state["system"]);
	
	// This is like setState or something
	const dispatch: any = useDispatch();
	
	if (!system.statsWindowShown) {
		return null;
	}
	
	// Class name to add while Fading-out
	const fadeOutClassName: string = "stats-window-fade-out";
	
	// Default class name
	let statsWindowClassName: string = "stats-window";
	
	if (isFadeOut) {
		statsWindowClassName += ` ${fadeOutClassName}`;
	}
	
	// const BACKGROUND_WIDTH =
	// 	system.screen.width * Definition.MENU_BACKGROUND_WIDTH;
	// const BACKGROUND_HEIGHT =
	// 	system.screen.height * Definition.MENU_BACKGROUND_HEIGHT;
	
	return (
		<div
			className={statsWindowClassName}
			style={{
				// FIXME: I'm still going to decide if I will put this or not.
				// "--background-image": `url(${assets.image.MenuBackground})`,
				// "--background-width": `${BACKGROUND_WIDTH}px`,
				// "--background-height": `${BACKGROUND_HEIGHT}px`,
			}}
			onClick={(evt: React.MouseEvent) => {
				evt.stopPropagation();

				setIsFadeOut(true);
			}}
			onAnimationEnd={(evt: React.AnimationEvent) => {
				if (evt.animationName === fadeOutClassName) {
					dispatch(hideStatsWindow());
					
					setIsFadeOut(false);
				}
			}}>
			<StatsImage />
			<StatsTitle lang={lang} />
			<StatsDescription lang={lang} />
		</div>
	);
}

