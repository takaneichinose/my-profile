import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { Container, Stage } from '@pixi/react';

import clsx from 'clsx';

import { Clock } from '@/Components/Clock';
import { Character } from '@/Components/Character';
import { Desk } from '@/Components/Desk';
import { Door } from '@/Components/Door';
import { Drawer } from '@/Components/Drawer';
import { Laptop } from '@/Components/Laptop';
import { Menu } from '@/Components/Menu';
import { Office } from '@/Components/Office';
import { Papers } from '@/Components/Papers';
import { Plant1 } from '@/Components/Plant1';
import { Plant2 } from '@/Components/Plant2';
import { Plant3 } from '@/Components/Plant3';
import { Record } from '@/Components/Record';
import { Shelf1 } from '@/Components/Shelf1';
import { Shelf2 } from '@/Components/Shelf2';
import { Shelf3 } from '@/Components/Shelf3';
import { Stand } from '@/Components/Stand';
import { Vase } from '@/Components/Vase';
import { Window } from '@/Components/Window';
import { CONTAINER_NAME, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/Constants/Common';
import { Instructions } from '@/Components/Instructions';
import { Position } from '@/Types/Position';
import { Profile } from '@/Components/Profile';

// TODO: Refactor this
/**
 * Component for the main application page
 * @returns {React.ReactElement}
 */
export function Main(): React.ReactElement {
  const containerRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  // Scale of the canvas based on the size of the screen (vmin)
  const [scaleX, setScaleX] = useState<number>(0);
  const [scaleY, setScaleY] = useState<number>(0);
  // Current pressed arrow keys
  const [upKey, setUpKey] = useState<boolean>(false);
  const [downKey, setDownKey] = useState<boolean>(false);
  const [leftKey, setLeftKey] = useState<boolean>(false);
  const [rightKey, setRightKey] = useState<boolean>(false);
  // Clicked to tappoed position of the canvas
  const [movePosition, setMovePosition] = useState<Position | null>(null);
  // Flags to show the message box
  const [instructionsShown, setInstructionsShown] = useState<boolean>(true);
  const [menuShown, setMenuShown] = useState<boolean>(false);
  const [profileShown, setProfileShown] = useState<boolean>(false);

  // Scale the PIXI application based on the size of the screen
  const resizeScreen = (): void => {
    const container: HTMLDivElement | null = containerRef.current;

    if (container == null) {
      return;
    }

    setScaleX(container.clientWidth / SCREEN_WIDTH);
    setScaleY(container.clientHeight / SCREEN_HEIGHT);
  };

  // Toggle the pressed key
  const togglePressedKey = useCallback(
    (key: string, pressed: boolean): void => {
      if (instructionsShown || menuShown || profileShown) {
        return;
      }

      switch (key) {
        case 'ArrowUp':
          setUpKey(pressed);
          break;
        case 'ArrowDown':
          setDownKey(pressed);
          break;
        case 'ArrowLeft':
          setLeftKey(pressed);
          break;
        case 'ArrowRight':
          setRightKey(pressed);
          break;
        case ' ':
          if (!pressed) {
            // Trigger only on keyup event
            setMenuShown(true);
          }
          break;
      }
    },
    [instructionsShown, menuShown, profileShown],
  );

  // Keydown event handler for the window
  const handleWindowKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      togglePressedKey(event.key, true);
    },
    [togglePressedKey],
  );

  // Keyup event handler for the window
  const handleWindowKeyUp = useCallback(
    (event: KeyboardEvent): void => {
      togglePressedKey(event.key, false);
    },
    [togglePressedKey],
  );

  // Click event for the stage
  const handleStageClick = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent> | React.TouchEvent<HTMLCanvasElement>,
  ): void => {
    const { offsetX, offsetY } = event.nativeEvent as MouseEvent;

    // x and y position relative to the canvas based on the scale of the container
    const x: number = Math.round(offsetX / scaleX);
    const y: number = Math.round(offsetY / scaleY);

    setMovePosition({ x, y });
  };

  // On move finished handler for the character
  const handleMoveFinished = (): void => {
    setMovePosition(null);
  };

  // On ended event handler for the instructions
  const handleInstructionsEnded = (): void => {
    setInstructionsShown(false);
  };

  // On exit event handler for the menu
  const handleMenuExit = () => {
    setMenuShown(false);
  };

  // On show profile event handler for the menu
  const handleProfileShow = () => {
    setProfileShown(true);
    setMenuShown(false);
  };

  // On exit event handler for the profile
  const handleProfileExit = () => {
    setProfileShown(false);
    setMenuShown(true);
  };

  // Click event handler for the laptop
  const handleLaptopClick = () => {
    setMenuShown(true);
  };

  // Monitor the container ref
  useEffect(() => {
    window.addEventListener('resize', resizeScreen);

    resizeScreen();

    return () => {
      // Remove the resize event on unmount
      window.removeEventListener('resize', resizeScreen);
    };
  }, [containerRef]);

  // Monitor the instructions shown state
  useEffect(() => {
    window.addEventListener('keydown', handleWindowKeyDown);
    window.addEventListener('keyup', handleWindowKeyUp);

    return () => {
      // Remove the resize event on unmount
      window.removeEventListener('keydown', handleWindowKeyDown);
      window.removeEventListener('keyup', handleWindowKeyUp);
    };
  }, [instructionsShown, menuShown, profileShown, handleWindowKeyDown, handleWindowKeyUp]);

  return (
    <div className={clsx('w-full h-full relative animate-show')} ref={containerRef}>
      <Stage
        width={containerRef.current != null ? containerRef.current.clientWidth : 0}
        height={containerRef.current != null ? containerRef.current.clientHeight : 0}
        options={{
          resizeTo: containerRef.current as HTMLDivElement,
          antialias: false,
          eventMode: 'passive',
        }}
        onClick={handleStageClick}
      >
        <Container
          name={CONTAINER_NAME}
          sortableChildren={true}
          scale={{
            x: scaleX,
            y: scaleY,
          }}
          interactive={true}
        >
          {/* Background */}
          <Office />
          {/* Non collible objects */}
          <Clock />
          <Door />
          <Vase />
          <Window />
          {/* Collisible objects */}
          <Desk />
          <Drawer />
          <Plant1 />
          <Plant2 />
          <Plant3 />
          <Shelf1 />
          <Shelf2 />
          <Shelf3 />
          <Stand />
          {/* Interactable objects */}
          <Laptop onClick={handleLaptopClick} />
          <Papers />
          <Record />
          {/* Character */}
          <Character
            pressedKeys={{
              Up: upKey,
              Down: downKey,
              Left: leftKey,
              Right: rightKey,
            }}
            movePosition={movePosition}
            onMoveFinished={handleMoveFinished}
          />
        </Container>
      </Stage>
      <Instructions shown={instructionsShown} onEnded={handleInstructionsEnded} />
      <Menu shown={menuShown} onShowProfile={handleProfileShow} onExit={handleMenuExit} />
      <Profile shown={profileShown} onExit={handleProfileExit} />
    </div>
  );
}
