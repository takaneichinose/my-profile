import { HitBox } from '@/Types/HitBox';

/**
 * Data of an object
 */
export type ObjectData = {
  // Name of the object
  name: string;
  // x position of an object
  x?: number;
  // y position of an object
  y?: number;
  // Width of an object
  w?: number;
  // Height of an object
  h?: number;
  // z-index of an object
  zIndex?: number;
  // Frame of an object
  hitBox?: HitBox;
};
