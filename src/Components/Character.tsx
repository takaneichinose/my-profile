import { AnimatedSprite as PixiAnimatedSprite, Application, Container, Spritesheet, Texture, Assets } from 'pixi.js';
import React, { useCallback, useEffect, useState } from 'react';
import { AnimatedSprite, useApp, useTick } from '@pixi/react';

import {
  CHARACTER_ANIMATION_SPEED,
  CHARACTER_DATA,
  CHARACTER_FRONT_ANIMATION,
  CHARACTER_REAR_ANIMATION,
  CHARACTER_SIDE_ANIMATION,
} from '@/Constants/Character';
import { CONTAINER_NAME } from '@/Constants/Common';
import { createSpritesheet, findPath, setCharacterPosition } from '@/Methods/Character';
import { Position } from '@/Types/Position';
import { PressedKeys } from '@/Types/PressedKeys';

import { DebugBox } from './DebugBox';

import characterFrontImage from '/assets/images/my-profile-character-front.png';
import characterRearImage from '/assets/images/my-profile-character-rear.png';
import characterSideImage from '/assets/images/my-profile-character-side.png';
import { Directions } from '@/Enums/Directions';

type CharacterProps = {
  pressedKeys: PressedKeys;
  movePosition?: Position | null;
  onMoveFinished?: () => void;
};

/**
 * Component of the character
 * @returns {React.ReactElement}
 */
export function Character({ pressedKeys, movePosition = null, onMoveFinished }: CharacterProps): React.ReactElement {
  const app: Application = useApp();
  const container: Container | null = app.stage.getChildByName(CONTAINER_NAME);
  const character: PixiAnimatedSprite | null =
    container != null ? (container.getChildByName(CHARACTER_DATA.name) as PixiAnimatedSprite) : null;

  // Set the textures
  const textures: Record<string, Texture> = {
    front: Assets.get(characterFrontImage),
    rear: Assets.get(characterRearImage),
    side: Assets.get(characterSideImage),
  };

  const [frontSpritesheet, setFrontSpritesheet] = useState<Spritesheet>();
  const [rearSpritesheet, setRearSpritesheet] = useState<Spritesheet>();
  const [sideSpritesheet, setSideSpritesheet] = useState<Spritesheet>();
  const [currentSpritesheet, setCurrentSpritesheet] = useState<Spritesheet>();
  const [x, setX] = useState<number>(CHARACTER_DATA?.x as number);
  const [y, setY] = useState<number>(CHARACTER_DATA?.y as number);
  const [flip, setFlip] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [delta, setDelta] = useState<number>(0);
  const [movePath, setMovePath] = useState<Array<Position & PressedKeys>>([]);

  // z-index is based on the assigned hitbox' y position
  const zIndex: number = y + (CHARACTER_DATA?.hitBox?.y as number);

  // Move the position of the character by pressing keyboard
  const moveCharacterByKeyboard = useCallback((): void => {
    if (character == null) {
      return;
    }

    const { Up, Down, Left, Right } = pressedKeys;

    if (Up) {
      setCurrentSpritesheet(rearSpritesheet);
    } else if (Down) {
      setCurrentSpritesheet(frontSpritesheet);
    } else if (Left || Right) {
      setCurrentSpritesheet(sideSpritesheet);
    }

    const {
      x: movementX,
      y: movementY,
      isPlaying: movementIsPlaying,
      flip: movementFlip,
    } = setCharacterPosition(character, Up, Down, Left, Right, flip, delta);

    setX(movementX);
    setY(movementY);
    setIsPlaying(movementIsPlaying);
    setFlip(movementFlip);
  }, [character, frontSpritesheet, rearSpritesheet, sideSpritesheet, flip, pressedKeys, delta]);

  // Move the position of the character by pointing device or touch
  const moveCharacterByPointer = useCallback((): void => {
    if (movePath.length === 0) {
      return;
    }

    // Clone the path during process
    const tmpMovePath: Array<Position & PressedKeys> = [...movePath];

    const { x: moveX, y: moveY, Up, Down, Left, Right } = tmpMovePath[0];

    if (Up) {
      setCurrentSpritesheet(rearSpritesheet);
      setFlip(false);
    } else if (Down) {
      setCurrentSpritesheet(frontSpritesheet);
      setFlip(false);
    } else if (Left) {
      setCurrentSpritesheet(sideSpritesheet);
      setFlip(true);
    } else if (Right) {
      setCurrentSpritesheet(sideSpritesheet);
      setFlip(false);
    }

    setX(moveX);
    setY(moveY);
    setIsPlaying(true);

    tmpMovePath.shift();

    setMovePath([...tmpMovePath]);

    if (tmpMovePath.length === 0) {
      setIsPlaying(false);

      if (onMoveFinished != null) {
        onMoveFinished();
      }
    }
  }, [movePath, frontSpritesheet, rearSpritesheet, sideSpritesheet, onMoveFinished]);

  // Initialization
  useEffect(() => {
    setFrontSpritesheet(createSpritesheet(textures.front, CHARACTER_FRONT_ANIMATION));
    setRearSpritesheet(createSpritesheet(textures.rear, CHARACTER_REAR_ANIMATION));
    setSideSpritesheet(createSpritesheet(textures.side, CHARACTER_SIDE_ANIMATION));
  }, [textures.front, textures.rear, textures.side]);

  // After changing the state of front sprite sheet (Should trigger only during initialization)
  useEffect(() => {
    setCurrentSpritesheet(frontSpritesheet);
  }, [frontSpritesheet]);

  // Monitor if the texture of current spritesheet has changed
  useEffect(() => {
    setIsPlaying(false);
  }, [currentSpritesheet]);

  // Monitor the state of move position (Move character by pointer)
  useEffect(() => {
    if (character == null || movePosition == null || movePath.length > 0) {
      return;
    }

    const { height } = character;

    const { x: movementX, y: movementY } = movePosition;

    try {
      // Create pathfinder here
      const path: Array<Position & PressedKeys> = findPath(
        movementX,
        movementY - height / 2,
        character.width,
        delta,
        [
          {
            x: character.x,
            y: character.y,
            Up: false,
            Down: false,
            Left: false,
            Right: false,
          },
        ],
        0,
        Directions.X,
      );

      setMovePath([...path]);
    } catch (_) {
      setMovePath([]);

      if (onMoveFinished != null) {
        onMoveFinished();
      }
    }
  }, [movePosition, character, delta, movePath, onMoveFinished]);

  // Custom tick by PixiJS
  useTick((delta: number) => {
    moveCharacterByKeyboard();
    moveCharacterByPointer();
    setDelta(delta);
  });

  return currentSpritesheet == null ? (
    <React.Fragment />
  ) : (
    <React.Fragment>
      <AnimatedSprite
        name={CHARACTER_DATA.name}
        textures={(currentSpritesheet.animations as Record<string, Array<Texture>>).walk}
        isPlaying={isPlaying}
        x={x}
        y={y}
        zIndex={zIndex}
        scale={{
          x: flip ? -1 : 1,
          y: 1,
        }}
        anchor={{
          x: 0.5,
          y: 0,
        }}
        initialFrame={isPlaying ? 0 : 1}
        animationSpeed={CHARACTER_ANIMATION_SPEED}
      />
      <DebugBox x={x} y={y} hitBox={CHARACTER_DATA.hitBox} />
    </React.Fragment>
  );
}
