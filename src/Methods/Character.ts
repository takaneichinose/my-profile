import { AnimatedSprite, ISpritesheetData, Spritesheet, Texture } from 'pixi.js';

import { CHARACTER_DATA, CHARACTER_FIND_ATTEMPT_THRESHOLD, CHARACTER_MOVE_SPEED } from '@/Constants/Character';
import { SCREEN_HEIGHT, SCREEN_WIDTH, WALL_Y } from '@/Constants/Common';
import { COLLISIBLE_OBJECTS } from '@/Constants/Objects';
import { Directions } from '@/Enums/Directions';
import { HitBox } from '@/Types/HitBox';
import { Position } from '@/Types/Position';
import { ObjectData } from '@/Types/ObjectData';
import { PressedKeys } from '@/Types/PressedKeys';

/**
 * Create Spritesheets for animation
 * @param {Texture} texture Texture of the spritesheet
 * @param {ISpritesheetData} data Data of the spritesheet
 * @returns {Spritesheet}
 */
export function createSpritesheet(texture: Texture, data: ISpritesheetData): Spritesheet {
  // Initialize the spritesheet
  const spritesheet = new Spritesheet(texture, data);

  // Parse the spritesheet to set the animation
  spritesheet.parse();

  return spritesheet;
}

/**
 * Checks the collision between the character and collisible objects
 * @param {number} x Current x position of the character
 * @param {number} y Current y position of the character
 * @param {number} dx Current x velocity of the character
 * @param {number} dy Current y velocity of the character
 * @param {number} w Width of the character
 * @returns {boolean}
 */
export function checkCollisionWithObjects(
  objectData: ObjectData,
  x: number,
  y: number,
  dx: number,
  dy: number,
  w: number,
): boolean {
  x += dx;
  y += dy;

  x -= w / 2;

  const hitBox: HitBox = CHARACTER_DATA.hitBox as HitBox;
  const objectHitBox: HitBox = objectData.hitBox as HitBox;
  const objectX: number = (objectData.x as number) + objectHitBox.x;
  const objectY: number = (objectData.y as number) + objectHitBox.y;

  // Collision point of the character
  const characterX1: number = x - hitBox.x;
  const characterX2: number = x - hitBox.x + hitBox.w;
  const characterY1: number = y + hitBox.y;
  const characterY2: number = y + hitBox.y + hitBox.h;

  // Collision point of an object
  const objectX1: number = objectX;
  const objectX2: number = objectX + objectHitBox.w;
  const objectY1: number = objectY;
  const objectY2: number = objectY + objectHitBox.h;

  // Create the possible conditions beforehand
  const conditionXList: Array<boolean> = [];
  const conditionYList: Array<boolean> = [];

  conditionXList.push(characterX1 <= objectX1 && characterX2 >= objectX1 && characterX2 <= objectX2);
  conditionXList.push(characterX1 >= objectX1 && characterX1 <= objectX2 && characterX2 >= objectX2);
  conditionXList.push(characterX1 <= objectX1 && characterX2 >= objectX1 && characterX2 <= objectX2);
  conditionXList.push(characterX1 <= objectX2 && characterX1 >= objectX1 && characterX2 >= objectX2);
  conditionXList.push(characterX1 >= objectX1 && characterX1 <= objectX2 && characterX2 <= objectX2);
  conditionYList.push(characterY1 <= objectY1 && characterY2 >= objectY1 && characterY2 <= objectY2);
  conditionYList.push(characterY1 >= objectY1 && characterY1 <= objectY2 && characterY2 >= objectY2);
  conditionYList.push(characterY1 <= objectY1 && characterY2 >= objectY1 && characterY2 <= objectY2);
  conditionYList.push(characterY1 <= objectY2 && characterY1 >= objectY1 && characterY2 >= objectY2);
  conditionYList.push(characterY1 >= objectY1 && characterY1 <= objectY2 && characterY2 <= objectY2);

  for (const conditionX of conditionXList) {
    for (const conditionY of conditionYList) {
      if (conditionX && conditionY) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Check the collision between character and objects
 * @param {number} x Current x position of the character
 * @param {number} y Current y position of the character
 * @param {number} dx Current x velocity of the character
 * @param {number} dy Current y velocity of the character
 * @param {number} w Width of the character
 * @returns {ObservablePoint | null}
 */
export function checkCollision(x: number, y: number, dx: number, dy: number, w: number): boolean {
  const hitBox: HitBox = CHARACTER_DATA.hitBox as HitBox;

  x -= w / 2;

  if (
    (dx < 0 && x - hitBox.x <= 0) ||
    // Collision against left side of the screen
    (dx > 0 && x + w - hitBox.w / 2 >= SCREEN_WIDTH) ||
    // Collision against right side of the screen
    (dy < 0 && y + hitBox.y <= WALL_Y) ||
    // Collision against the wall
    (dy > 0 && y + dy + hitBox.y + hitBox.h >= SCREEN_HEIGHT)
  ) {
    return true;
  }

  return false;
}

/**
 * Set the position of the character based on pressed key
 * @param {AnimatedSprite} character Object of the character
 * @param {boolean} up Check if the up key is pressed
 * @param {boolean} down Check if the down key is pressed
 * @param {boolean} left Check if the left key is pressed
 * @param {boolean} right Check if the right key is pressed
 * @param {boolean} flip Check if the character is flipped
 * @param {number} delta Delta parameter from the ticker
 * @returns {{ x: number, y: number, isPlaying: boolean, flip: boolean }}
 */
export function setCharacterPosition(
  character: AnimatedSprite,
  up: boolean,
  down: boolean,
  left: boolean,
  right: boolean,
  flip: boolean,
  delta: number,
): { x: number; y: number; isPlaying: boolean; flip: boolean } {
  const moveSpeed: number = Math.ceil(CHARACTER_MOVE_SPEED * delta);

  const { width } = character;

  let { x, y } = character;
  let isPlaying = false;
  let dx: number = 0;
  let dy: number = 0;

  if (up) {
    dy = -moveSpeed;
    flip = false;
  } else if (down) {
    dy = moveSpeed;
    flip = false;
  } else if (left) {
    dx = -moveSpeed;
    flip = true;
  } else if (right) {
    dx = moveSpeed;
    flip = false;
  }

  if (checkCollision(x, y, dx, dy, width)) {
    isPlaying = false;

    dx = 0;
    dy = 0;
  }

  for (const objectData of COLLISIBLE_OBJECTS) {
    if (checkCollisionWithObjects(objectData, x, y, dx, dy, width)) {
      isPlaying = false;

      dx = 0;
      dy = 0;
    }
  }

  if (dx !== 0) {
    x += dx;
    isPlaying = true;
  } else if (dy !== 0) {
    y += dy;
    isPlaying = true;
  }

  return { x, y, isPlaying, flip };
}

/**
 * Create path finder
 * @param {number} targetX Target x position
 * @param {number} targetY Target y position
 * @param {number} width Width of the character
 * @param {number} delta Delta parameter from the ticker
 * @param {Array<Position & PressedKeys>} path Path to follow
 * @param {number} attemptCount Number of attempted find
 * @returns {Array<Position & PressedKeys>}
 */
export function findPath(
  targetX: number,
  targetY: number,
  width: number,
  delta: number,
  path: Array<Position & PressedKeys>,
  attemptCount: number,
  priority: Directions,
): Array<Position & PressedKeys> {
  if (attemptCount === CHARACTER_FIND_ATTEMPT_THRESHOLD) {
    return path;
  }

  const moveSpeed: number = Math.ceil(CHARACTER_MOVE_SPEED * delta);
  const { x: characterX, y: characterY } = path.at(-1) as Position;

  let dx: number = 0;
  let dy: number = 0;
  let Up: boolean = false;
  let Down: boolean = false;
  let Left: boolean = false;
  let Right: boolean = false;

  if (characterX > targetX && priority === Directions.X) {
    Left = true;
    dx = -moveSpeed;
  } else if (characterX < targetX && priority === Directions.X) {
    Right = true;
    dx = moveSpeed;
  } else if (characterY > targetY && priority === Directions.Y) {
    Up = true;
    dy = -moveSpeed;
  } else if (characterY < targetY && priority === Directions.Y) {
    Down = true;
    dy = moveSpeed;
  }

  if (checkCollision(characterX, characterY, dx, dy, width)) {
    priority = priority === Directions.X ? Directions.Y : Directions.X;
    return findPath(targetX, targetY, width, delta, path, attemptCount + 1, priority);
  }

  for (const objectData of COLLISIBLE_OBJECTS) {
    if (checkCollisionWithObjects(objectData, characterX, characterY, dx, dy, width)) {
      priority = priority === Directions.X ? Directions.Y : Directions.X;
      return findPath(targetX, targetY, width, delta, path, attemptCount + 1, priority);
    }
  }

  if (
    Math.abs(characterX) % moveSpeed !== 0 ||
    (dx < 0 && characterX + dx < targetX) ||
    (dx > 0 && characterX + dx > targetX)
  ) {
    dx = (targetX - characterX) % moveSpeed;
  }

  if (
    Math.abs(characterY) % moveSpeed !== 0 ||
    (dy < 0 && characterY + dy < targetY) ||
    (dy > 0 && characterY + dy > targetY)
  ) {
    dy = (targetY - characterY) % moveSpeed;
  }

  const x: number = characterX + dx;
  const y: number = characterY + dy;

  if (dx !== 0 || dy !== 0) {
    path.push({ x, y, Up, Down, Left, Right });

    return findPath(targetX, targetY, width, delta, path, 0, priority);
  } else if (x !== targetX || y !== targetY) {
    const newPriority: Directions = priority === Directions.X ? Directions.Y : Directions.X;

    return findPath(targetX, targetY, width, delta, path, attemptCount + 1, newPriority);
  }

  return path;
}
