import { ISpritesheetData } from 'pixi.js';
import { ObjectData } from '@/Types/ObjectData';

// Width of the character
export const CHARACTER_WIDTH: number = 64;

// Height of the character
export const CHARACTER_HEIGHT: number = 96;

// Animation speed of the character (walking)
export const CHARACTER_ANIMATION_SPEED: number = 0.15;

// Movement speed of the character
export const CHARACTER_MOVE_SPEED: number = 2;

// Number of attempts count before giving up path finder
export const CHARACTER_FIND_ATTEMPT_THRESHOLD: number = 10;

// Object data of the character
export const CHARACTER_DATA: ObjectData = {
  name: 'character',
  // x: 528,
  x: 560,
  y: 136,
  hitBox: {
    // x: 16,
    x: -16,
    y: 84,
    w: 32,
    h: 12,
  },
};

// Frame number of standing still frame
export const CHARACTER_STANDING_FRAME: number = 1;

// Frame number of walking frame (start point)
export const CHARACTER_START_WALK_FRAME: number = 0;

// Animation of the character facing front
export const CHARACTER_FRONT_ANIMATION: ISpritesheetData = {
  frames: {
    front1: {
      frame: { x: 0, y: 0, w: CHARACTER_WIDTH, h: CHARACTER_HEIGHT },
      sourceSize: { w: CHARACTER_WIDTH, h: CHARACTER_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: CHARACTER_WIDTH, h: CHARACTER_HEIGHT },
    },
    front2: {
      frame: {
        x: CHARACTER_WIDTH,
        y: 0,
        w: CHARACTER_WIDTH,
        h: CHARACTER_HEIGHT,
      },
      sourceSize: { w: CHARACTER_WIDTH, h: CHARACTER_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: CHARACTER_WIDTH, h: CHARACTER_HEIGHT },
    },
    front3: {
      frame: {
        x: CHARACTER_WIDTH * 2,
        y: 0,
        w: CHARACTER_WIDTH,
        h: CHARACTER_HEIGHT,
      },
      sourceSize: { w: CHARACTER_WIDTH, h: CHARACTER_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: CHARACTER_WIDTH, h: CHARACTER_HEIGHT },
    },
  },
  meta: {
    scale: '1',
  },
  animations: {
    walk: ['front2', 'front1', 'front3', 'front1'],
  },
} as ISpritesheetData;

// Animation of the character facing back
export const CHARACTER_REAR_ANIMATION: ISpritesheetData = {
  frames: {
    rear1: {
      frame: { x: 0, y: 0, w: CHARACTER_WIDTH, h: CHARACTER_HEIGHT },
      sourceSize: { w: CHARACTER_WIDTH, h: CHARACTER_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: CHARACTER_WIDTH, h: CHARACTER_HEIGHT },
    },
    rear2: {
      frame: {
        x: CHARACTER_WIDTH,
        y: 0,
        w: CHARACTER_WIDTH,
        h: CHARACTER_HEIGHT,
      },
      sourceSize: { w: CHARACTER_WIDTH, h: CHARACTER_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: CHARACTER_WIDTH, h: CHARACTER_HEIGHT },
    },
    rear3: {
      frame: {
        x: CHARACTER_WIDTH * 2,
        y: 0,
        w: CHARACTER_WIDTH,
        h: CHARACTER_HEIGHT,
      },
      sourceSize: { w: CHARACTER_WIDTH, h: CHARACTER_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: CHARACTER_WIDTH, h: CHARACTER_HEIGHT },
    },
  },
  meta: {
    scale: '1',
  },
  animations: {
    walk: ['rear2', 'rear1', 'rear3', 'rear1'],
  },
} as ISpritesheetData;

// Animation of the character facing sideways
export const CHARACTER_SIDE_ANIMATION: ISpritesheetData = {
  frames: {
    side1: {
      frame: { x: 0, y: 0, w: CHARACTER_WIDTH, h: CHARACTER_HEIGHT },
      sourceSize: { w: CHARACTER_WIDTH, h: CHARACTER_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: CHARACTER_WIDTH, h: CHARACTER_HEIGHT },
    },
    side2: {
      frame: {
        x: CHARACTER_WIDTH,
        y: 0,
        w: CHARACTER_WIDTH,
        h: CHARACTER_HEIGHT,
      },
      sourceSize: { w: CHARACTER_WIDTH, h: CHARACTER_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: CHARACTER_WIDTH, h: CHARACTER_HEIGHT },
    },
    side3: {
      frame: {
        x: CHARACTER_WIDTH * 2,
        y: 0,
        w: CHARACTER_WIDTH,
        h: CHARACTER_HEIGHT,
      },
      sourceSize: { w: CHARACTER_WIDTH, h: CHARACTER_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: CHARACTER_WIDTH, h: CHARACTER_HEIGHT },
    },
  },
  meta: {
    scale: '1',
  },
  animations: {
    walk: ['side2', 'side1', 'side3', 'side1'],
  },
} as ISpritesheetData;
