////////////////////////////////////////////////////////////////////////////////
// Component of objects                                                       //
////////////////////////////////////////////////////////////////////////////////

// ReactJS
import React, { useState, useEffect } from "react";

// React implementation of Redux
import { useSelector, useDispatch } from "react-redux";

// Reducers (Set state methods)
import { addObject, clearObjects } from "../utils/objectSlice";
import { showMainMenu } from "../utils/systemSlice";

// Definition class for this project
import * as Definition from "../classes/Definition";

// Common method class for this project
import Methods from "../classes/Methods";

// Components
import SpeechDialog from "./SpeechDialog";

// Options for the object
interface Option {
	collision: boolean;
	hoverable: boolean;
	nonClickable: boolean;
	click: Function
}

/**
 * Component of objects
 * @param object props Properties object
 */
export default function Objects(props: Definition.CommonProperties): React.ReactElement {
	// Properties
	const lang: string = props.lang;
	
	// ReactJS useState hooks
	const [laptopDialogShown, setLaptopDialogShown] = useState(false);
	const [filesDialogShown, setFilesDialogShown] = useState(false);
	
	// This is to get the state from Redux
	const assets: any = useSelector(state => state["assets"]);
	const system: any = useSelector(state => state["system"]);
	const object: any = useSelector(state => state["object"]);
	
	// This is like setState or something
	const dispatch: any = useDispatch();
	
	// Create an object (type) of an object
	// Place an object into the screen
	// Set all the values as the size of a block, not their actual size.
	const placeObject: Function = (
		img: string,
		desc: string,
		w: number,
		h: number,
		x: number,
		y: number,
		z: number = null,
		opt: Option = null
	) => {
		// Has a collision with the character
		let hasCollision =
			!(opt !== null && opt.collision !== undefined && !opt.collision);

		if (z === null) {
			// If the "z" is not set, "z" will be just the same as "y" + 1

			if (hasCollision === false) {
				// If there is no collision with the object, value of "z" should be 0

				z = 0;
			}

			z = y + 1;
		}
		
		Methods.log(`Placed "${img}" at: { x: ${x}, y: ${y}}`);

		// Width and height on the object, times its size
		const width: number = system.screen.width * Definition.OBJECT_WIDTH * w;
		const height: number = system.screen.height * Definition.OBJECT_HEIGHT * h;
		
		dispatch(addObject({
			object: {
				name: img,
				img: `${assets.image[img]}`,
				desc: desc,
				x: x,
				y: y,
				width: width / (system.screen.width * Definition.OBJECT_WIDTH),
				height: height / (system.screen.height * Definition.OBJECT_HEIGHT),
				hasCollision: hasCollision,
				className: {
					object: true,
					hoverable: (opt !== null &&opt.hoverable !== undefined && opt.hoverable),
					"non-clickable":
						(opt !== null && opt.nonClickable !== undefined && opt.nonClickable),
				},
				style: {
					"--width": `${width}px`,
					"--height": `${height}px`,
					"--x": `${x * system.screen.width * Definition.OBJECT_WIDTH}px`,
					"--y": `${y * system.screen.height * Definition.OBJECT_HEIGHT}px`,
					"--z": z,
				},
				click: (opt !== null && typeof opt.click === "function") ? opt.click : null,
			},
		}));
	};
	
	// Call placeObject function multiple times
	const placeObjects = (): void => {
		// Shorthand of the text object from assets
		const text: any = assets.text[lang];
		
		// Place all the objects on the screen (Decorations)
		placeObject("Clock", text.decoration, 0.5, 1, 7.5, 2.5);
		placeObject("Door", text.decoration, 1.5, 3, 7, 4);
		placeObject("Desk", text.decoration, 2, 1, 3, 11);
		placeObject("Drawer", text.decoration, 1, 1, 2, 11);
		placeObject("Plant", text.decoration, 1, 1, 4, 7);
		placeObject("Plant", text.decoration, 1, 1, 5, 11);
		placeObject("Shelf", text.decoration, 2, 1, 0, 7);
		placeObject("Shelf", text.decoration, 2, 1, 2, 7);
		placeObject("Shelf", text.decoration, 2, 1, 7, 12);
		placeObject("Window", text.decoration, 5, 5, 1, 1);
		
		// Place all the objects on the screen (Interactables)
		placeObject("Laptop", text.portfolio, 1, 2, 3.05, 9, 12, {
			collision: false,
			hoverable: true,
			click: (): void => {
				setLaptopDialogShown(true);
			},
		});
		placeObject("Files", text.resume, 1, 2, 4, 9.6, 12, {
			collision: false,
			hoverable: true,
			click: (): void => {
				setFilesDialogShown(true);
			},
		});
		placeObject("MenuButton", text.menu, 0.5, 1, 9, 1, null, {
			collision: false,
			hoverable: true,
			click: (): void => {
				dispatch(showMainMenu());
			},
		});
		
		// Place all the objects on the screen (Non-clickables)
		placeObject("Carpet", text.decoration, 6, 6, 1.5, 8.5, 0, {
			collision: false,
			nonClickable: true,
		});
	};

	// ReactJS useEffect hook for initialization
	useEffect((): void => {
		// Number of loaded assets
		const loadedAssetsCount: number = system.loadedAssetsCount;
		
		// Total number of assets
		const totalAssetsCount: number = Methods.getAllAssetsCount();

		if (loadedAssetsCount < totalAssetsCount) {
			return;
		}
		
		// Clear the objects
		dispatch(clearObjects());
		
		placeObjects();
	}, [assets, system.screen]);

	let speechDialogElement: Array<React.ReactElement> = [];

	if (laptopDialogShown) {
		speechDialogElement = [...speechDialogElement, <SpeechDialog
			lang={lang}
			content={assets.text[lang].portfolio}
			confirm={{
				yes: () => {
					Methods.log("Opening blog...");
					Methods.log(`Portfolio: ${Definition.LINK_TO_BLOG}`);

					window.open(Definition.LINK_TO_BLOG, "_blank");

					setLaptopDialogShown(false);
				},
				no: () => {
					setLaptopDialogShown(false);
				},
			}}
		/>]
	}

	if (filesDialogShown) {
		speechDialogElement = [...speechDialogElement, <SpeechDialog
			lang={lang}
			content={assets.text[lang].resume}
			confirm={{
				yes: () => {
					Methods.log("Opening resume...");
					Methods.log(`Portfolio: ${Definition.LINK_TO_RESUME}`);

					window.open(Definition.LINK_TO_RESUME, "_blank");

					setFilesDialogShown(false);
				},
				no: () => {
					

					setFilesDialogShown(false);
				},
			}}
		/>];
	}
	
	// Array for rendering
	let objects: Array<React.ReactElement> = [];
	
	for (const obj of object.objects) {
		if (obj.img === null) {
			continue;
		}
		
		objects = [...objects, (
			<figure
				className={Methods.toClassName(obj.className)}
				style={obj.style}
				onClick={(evt: React.MouseEvent): void => {
					evt.stopPropagation();
					
					if (obj.click !== null) {
						obj.click();
					}
				}}>
				<img src={obj.img} alt={obj.text} />
			</figure>
		)];
	}
	
	return (
		<>
			{objects}
			{speechDialogElement}
		</>
	);
}

