////////////////////////////////////////////////////////////////////////////////
// Button on the menu screen. These are interactables by click                //
////////////////////////////////////////////////////////////////////////////////

// ReactJS
import React from "react";

// React implementation of Redux
import { useSelector } from "react-redux";

// Definition class for this project
import * as Definition from "../classes/Definition";

/**
 * Button on the menu screen. These are interactables by click
 */
export default function MenuItem(props: Definition.CommonProperties): React.ReactElement {
	const img = props.img;
	const text = props.text;
	const x = props.x;
	const y = props.y;
	const callback = props.callback;
	const link = props.link;
	
	// This is to get the state from Redux
	const system: any = useSelector(state => state["system"]);
	
	const width: number = system.screen.width * Definition.MENU_BUTTON_WIDTH;
	const height: number = system.screen.height * Definition.MENU_BUTTON_HEIGHT;
	const styleX: number = x * system.screen.width * Definition.SPACE_SIZE_X;
	const styleY: number = y * system.screen.height * Definition.SPACE_SIZE_Y;
	
	return (
		<a
			href={(link !== null && link !== undefined) ? link : null}
			target={(link !== null && link !== undefined) ? "_blank" : null}
			className="menu-button hoverable"
			style={{
				"--width": `${width}px`,
				"--height": `${height}px`,
				"--x": `${styleX}px`,
				"--y": `${styleY}px`,
			} as Definition.CSSProperties}
			onClick={(evt: React.MouseEvent): void => {
				if (callback !== null && callback !== undefined) {
					callback(evt);
				}
			}}>
			<img src={img} alt={text} />
		</a>
	);
}