import { ColorSource } from 'pixi.js';

// Width of the "game screen"
export const SCREEN_WIDTH: number = 640;

// Height of the "game screen"
export const SCREEN_HEIGHT: number = 480;

// Name of the container
export const CONTAINER_NAME: string = 'container';

// y Position of the wall
export const WALL_Y: number = 224;

// Delay in showing per letters in message box
export const MESSAGE_INIT_DELAY: number = 30;

// Debug mode
export const IS_DEBUG: boolean = false;

// Debug mode only: stroke opacity
export const DEBUG_OPACITY: number = 0.8;

// Debug mode only: stroke color
export const DEBUG_COLOR: ColorSource = {
  r: 255,
  g: 0,
  b: 255,
  a: DEBUG_OPACITY,
};

// Debug mode only: stroke width
export const DEBUG_WIDTH: number = 3;
