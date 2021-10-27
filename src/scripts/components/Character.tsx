////////////////////////////////////////////////////////////////////////////////
// Component of the character                                                 //
////////////////////////////////////////////////////////////////////////////////

// ReactJS
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// React implementation of Redux
import { useSelector, useDispatch } from "react-redux";

// Reducers (Set state methods)
import {
	setCharacterImg,
	setCharacterText,
	setCharacterPosition,
	setCharacterStyle,
	stopCharacterMovement,
} from "../utils/characterSlice";

// Definition class for this project
import * as Definition from "../classes/Definition";

// Common method class for this project
import Methods from "../classes/Methods";

interface CharacterDirection {
	x: number;
	y: number;
	characterDirection?: Definition.Direction
}

/**
 * Component of the character
 * @param object props Properties object
 */
export default function Character(props: Definition.CommonProperties): ReactDOM.Element {
	// Properties
	const lang: string = props.lang;
	
	// ReactJS useState hooks
	const [
		directionState,
		setDirectionState
	] = useState(Definition.Direction.Front);
	const [moveHistory, setMoveHistory] = useState([]);
	
	// This is to get the state from Redux
	const assets: any = useSelector(state => state["assets"]);
	const system: any = useSelector(state => state["system"]);
	const character: any = useSelector(state => state["character"]);
	const object: any = useSelector(state => state["object"]);
	
	// This is like setState or something
	const dispatch: any = useDispatch();
	
	// Update the X and Y position of the character
	const updateCharacterPosition: Function = (x: number, y: number, z: number): any => {
		Methods.log(`Current position: { x: ${x}, y: ${y} }`);
		
		if (x !== 0) {
			x = system.screen.width * Definition.OBJECT_WIDTH * x;
		}

		if (y !== 0) {
			y = system.screen.height * Definition.OBJECT_HEIGHT * y;
		}
		
		dispatch(setCharacterStyle({
			style: {
				"--width": `${system.screen.width * Definition.OBJECT_WIDTH}px`,
				"--height": `${system.screen.height * Definition.OBJECT_HEIGHT}px`,
				"--x": `${x}px`,
				"--y": `${y}px`,
				"--z": z,
			} as Definition.CSSProperties
		}));
	};
	
	// Animate the character
	const animateCharacter: Function = (): void => {
		let indexName: string = "Character";
		
		switch (directionState) {
			case Definition.Direction.Front:
				indexName += "Front";
				break;
			case Definition.Direction.Rear:
				indexName += "Rear";
				break;
			case Definition.Direction.Left:
				indexName += "Left";
				break;
			case Definition.Direction.Right:
				indexName += "Right";
				break;
		}

		if (character.moveTo !== null) {
			indexName += "Move";
		}
		
		if (assets.image[indexName] === null) {
			return;
		}
		
		dispatch(
			setCharacterImg({ img: `${assets.image[indexName]}` }));
	};
	
	// Determine if the specific x and y point is in history
	const inHistory: Function = (x: number, y: number): boolean => {
		return moveHistory.indexOf(JSON.stringify({ x: x, y: y })) >= 0;
	};
	
	// Get the collision and change the direction of the movement
	const getCollision: Function = (
		x: number,
		y: number,
		adjX: number,
		adjY: number,
		x2: number,
		y2: number,
		dir: Definition.Direction
	): CharacterDirection => {
		for (const obj of object.objects) {
			// Loop through the objects on the screen
			
			if (!obj.hasCollision) {
				// We can pass through the object without collision
				
				continue;
			}
			
			if (
				// Condition for x axis
				(x + adjX >= obj.x && x + adjX <= obj.x + obj.width - 1)
				&&
				// Condition for y axis
				(y + adjY >= obj.y && y + adjY <= obj.y + obj.height - 1)
			) {
				setMoveHistory([...moveHistory, JSON.stringify({ x: x, y: y })]);
				
				switch (dir) {
					case Definition.Direction.Front:
					case Definition.Direction.Rear:
						// Checking of collision in x axis
						
						if (x > x2 || inHistory(x + 1, y)) {
							return getCollision(x, y, -1, 0, x2, y2,
																	Definition.Direction.Left);
						} else if (x <= x2 || inHistory(x - 1, y)) {
							return getCollision(x, y, 1, 0, x2, y2,
																	Definition.Direction.Right);
						}
						
						return;
					case Definition.Direction.Left:
					case Definition.Direction.Right:
						// Checking of collision in y axis
						
						if (y > y2 || inHistory(x, y + 1)) {
							return getCollision(x, y, 0, -1, x2, y2,
																	Definition.Direction.Rear);
						} else if (y <= y2 || inHistory(x, y - 1)) {
							return getCollision(x, y, 0, 1, x2, y2,
																	Definition.Direction.Front);
						}
						
						return;
				}
			}
		}
		
		return {
			x: x + adjX,
			y: y + adjY,
			characterDirection: dir
		} as CharacterDirection;
	};
	
	// Determine which coordinate the character will move
	// If there is a collision, try to change direction
	const moveCharacterDirection = (direction, x1, x2, y1, y2): CharacterDirection => {
		let x, y, collision, dir;
		
		if (direction === Definition.Direction.X && x1 > x2) {
			// Direction to left
		
			collision =
				getCollision(x1, y1, -1, 0, x2, y2, Definition.Direction.Left);
		} else if (direction === Definition.Direction.X && x1 <= x2) {
			// Direction to right
		
			collision =
				getCollision(x1, y1, 1, 0, x2, y2, Definition.Direction.Right);
		} else if (direction === Definition.Direction.Y && y1 > y2) {
			// Direction to top

			collision =
				getCollision(x1, y1, 0, -1, x2, y2, Definition.Direction.Rear);
		} else if (direction === Definition.Direction.Y && y1 <= y2) {
			// Direction to bottom
		
			collision =
				getCollision(x1, y1, 0, 1, x2, y2, Definition.Direction.Front);
		}
		
		x = collision.x;
		y = collision.y;
		
		setDirectionState(collision.characterDirection);
		
		// Destination point where the character should go next
		const destinationPoint = {
			x: x,
			y: y,
		};
		
		return destinationPoint;
	};
	
	// Relocate the position of the character from 1 point to another
	const moveCharacter: Function = (): CharacterDirection => {
		if (character.moveTo === null) {
			return;
		}
		
		// Current point of the character and the clicked point
		const x1: number = character.x;
		const x2: number = character.moveTo.x;
		const y1: number = character.y;
		const y2: number = character.moveTo.y;
		
		// If the point of the character and the clicked point is the same,...
		if (x1 === x2 && y1 === y2) {
			// ...the chracter will stop moving.
			
			dispatch(stopCharacterMovement());

			return;
		}
		
		// Prioritize the x axis in walking
		let direction: Definition.Direction = Definition.Direction.X;
		
		if (
			// If the x axis of location and the x axis of destination is the same
			x1 === x2
			||
			// If moving right won't do anything
			inHistory(x1 + 1, y1)
			||
			// If moving left won't do anything
			inHistory(x1 - 1, y1)
		) {
			direction = Definition.Direction.Y;
		}
		
		try {
			// The direction where the character should move
			const { x, y } = moveCharacterDirection(direction, x1, x2, y1, y2);
			
			dispatch(
				setCharacterPosition({
					x: x,
					y: y,
				}));
		} catch (ex) {
			// Maybe, the movement returned null value.
		}
	};
	
	// ReactJS useEffect hook for setting the text 
	useEffect((): any => {
		if (assets.text[lang] === undefined) {
			return;
		}
		
		dispatch(setCharacterText({text: assets.text[lang].character}));
	}, [assets.text]);
	
	// ReactJS useEffect hook when the direction of the character changes
	useEffect(() => {
		animateCharacter();
	}, [assets.image, directionState, character.moveTo]);
	
	// ReactJS useEffect hook when the position of the character changes
	useEffect(() => {
		updateCharacterPosition(
			character.x,
			character.y,
			character.y + 1
		);
	}, [character.x, character.y, system.screen]);
	
	// ReactJS useEffect hook when the movement position changes
	useEffect(() => {
		if (character.moveTo === null) {
			return;
		}
		
		Methods.log(
			`Relocate position: { x: ${character.moveTo.x}, y: ${character.moveTo.y}}`
		);
		
		setMoveHistory([]);
		
		moveCharacter();
	}, [character.moveTo]);
	
	return (
		<figure
			className={Methods.toClassName(character.class)}
			style={character.style}
			onClick={(evt: React.MouseEvent): void => {
				evt.stopPropagation();
			}}
			onTransitionEnd={(evt: React.TransitionEvent): void => {
				if (evt.propertyName === "left" || evt.propertyName === "top") {
					moveCharacter();
				}
			}}>
			<img src={character.img} alt={character.text} />
		</figure>
	);
}

