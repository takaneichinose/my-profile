import { ObjectData } from '@/Types/ObjectData';

// Interactable objects
export const LAPTOP_OBJECT_DATA: ObjectData = {
  name: 'laptop',
  x: 24,
  y: 140,
  hitBox: {
    x: 0,
    y: 52,
    w: 64,
    h: 12,
  },
};
export const PAPERS_OBJECT_DATA: ObjectData = {
  name: 'papers',
  x: 108,
  y: 168,
  hitBox: {
    x: 0,
    y: 52,
    w: 64,
    h: 12,
  },
};
export const RECORD_OBJECT_DATA: ObjectData = {
  name: 'record',
  x: 428,
  y: 270,
  hitBox: {
    x: 0,
    y: 52,
    w: 64,
    h: 12,
  },
  zIndex: 400,
};
