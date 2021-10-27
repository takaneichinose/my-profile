////////////////////////////////////////////////////////////////////////////////
// Main menu, all of commands also seen here                                  //
////////////////////////////////////////////////////////////////////////////////

// ReactJS
import React, { useState } from "react";
import ReactDOM from "react-dom";

// React implementation of Redux
import { useSelector, useDispatch, } from "react-redux";

// Reducers (Set state methods)
import {
	hideMainMenu,
	showStatsWindow,
	showSpeechDialog,
	showAcknowledgement,
} from "../utils/systemSlice";

// Definition class for this project
import * as Definition from "../classes/Definition";

// Components
import MenuItem from "./MenuItem";

/**
 * Main menu, all of commands also seen here
 * @param object props Parameters passed to a component
 */
export default function MainMenu(props: Definition.CommonProperties): ReactDOM.HTMLElement {
	// Properties
	const lang: string = props.lang;
	
	// React useState hooks
	const [isFadeOut, setIsFadeOut] = useState(false);
	
	// This is to get the state from Redux
	const system: any = useSelector(state => state["system"]);
	const assets: any = useSelector(state => state["assets"]);
	
	// This is like setState or something
	const dispatch: any = useDispatch();
	
	if (!system.mainMenuShown) {
		return null;
	}
	
	// Class name to add while Fading-out
	const fadeOutClassName: string = "main-menu-fade-out";

	// Default class name
	let mainMenuClassName: string = "main-menu";

	if (isFadeOut) {
		mainMenuClassName += ` ${fadeOutClassName}`;
	}
	
	// Sizes
	const BACKGROUND_WIDTH: number =
		system.screen.width * Definition.MENU_BACKGROUND_WIDTH;
	const BACKGROUND_HEIGHT: number =
		system.screen.height * Definition.MENU_BACKGROUND_HEIGHT;
	const WIDTH: number = system.screen.width * Definition.MENU_WIDTH;
	const HEIGHT: number = system.screen.height * Definition.MENU_HEIGHT;
	
	// Shorthand of the text object from assets
	const text: any = assets.text[lang];
	
	return (
		<nav
			className={mainMenuClassName}
			style={{
				// FIXME: I'm still going to decide if I will put this or not.
				// "--background-image": `url(${assets.image.MenuBackground})`,
				"--background-width": `${BACKGROUND_WIDTH}px`,
				"--background-height": `${BACKGROUND_HEIGHT}px`,
			} as Definition.CSSProperties}
			onClick={(evt: React.MouseEvent): void => {
				evt.stopPropagation();

				setIsFadeOut(true);
			}}
			onAnimationEnd={evt => {
				if (evt.animationName === fadeOutClassName) {
					dispatch(hideMainMenu());
					
					setIsFadeOut(false);
				}
			}}>
			<div
				className="menu-window"
				style={{
					"--background-image": `url(${assets.image.MainMenu})`,
					"--width": `${WIDTH}px`,
					"--height": `${HEIGHT}px`,
				} as Definition.CSSProperties}>
					{/* 1st row */}
					<MenuItem
						img={assets.image.ProfileIcon}
						text={text.menuProfile}
						x={40}
						y={64}
						callback={evt => {
							evt.preventDefault();
						
							dispatch(showStatsWindow());
						}}
					/>
					<MenuItem
						img={assets.image.FilesIcon}
						text={text.menuFiles}
						link={Definition.LINK_TO_RESUME}
						x={85}
						y={64}
					/>
					<MenuItem
						img={assets.image.LaptopIcon}
						text={text.menuLaptop}
						link={Definition.LINK_TO_BLOG}
						x={130}
						y={64}
					/>
					{/* 2nd row */}
					<MenuItem
						img={assets.image.MessageIcon}
						text={text.menuMessage}
						x={40}
						y={109}
						callback={(evt: React.MouseEvent): void => {
							evt.preventDefault();
						
							dispatch(showSpeechDialog({
								message: text.messageConfirm,
								confirm: {
									yes: () => {
										window.open(Definition.LINK_TO_EMAIL, "_blank");
									},
								},
							}));
						}}
					/>
					<MenuItem
						img={assets.image.AcknowledgementIcon}
						text={text.menuAcknowledgement}
						x={85}
						y={109}
						callback={evt => {
							evt.preventDefault();

							dispatch(showAcknowledgement());
						}}
					/>
					{/* 3rd row */}
					<MenuItem
						img={assets.image.GithubIcon}
						text={text.menuGithub}
						link={Definition.LINK_TO_GITHUB}
						x={40}
						y={154}
					/>
					<MenuItem
						img={assets.image.TwitterIcon}
						text={text.menuTwitter}
						link={Definition.LINK_TO_TWITTER}
						x={85}
						y={154}
					/>
					<MenuItem
						img={assets.image.CodepenIcon}
						text={text.menuCodepen}
						link={Definition.LINK_TO_CODEPEN}
						x={130}
						y={154}
					/>
			</div>
		</nav>
	);
}

