import { ObjectData } from '@/Types/ObjectData';

// Background
export const OFFICE_NAME: string = 'office';

// Non collisible objects
export const CLOCK_OBJECT_DATA: ObjectData = { name: 'clock', x: 528, y: 16 };
export const DOOR_OBJECT_DATA: ObjectData = { name: 'door', x: 512, y: 96 };
export const VASE_OBJECT_DATA: ObjectData = {
  name: 'vase',
  x: 184,
  y: 128,
  zIndex: 221,
};
export const WINDOW_OBJECT_DATA: ObjectData = { name: 'window', x: 16, y: 16 };

// Static objects
export const DESK_OBJECT_DATA: ObjectData = {
  name: 'desk',
  x: 8,
  y: 160,
  hitBox: {
    x: 0,
    y: 32,
    w: 160,
    h: 64,
  },
};
export const DRAWER_OBJECT_DATA: ObjectData = {
  name: 'drawer',
  x: 176,
  y: 172,
  hitBox: {
    x: 0,
    y: 48,
    w: 80,
    h: 32,
  },
};
export const SHELF1_OBJECT_DATA: ObjectData = {
  name: 'shelf1',
  x: 368,
  y: 104,
  hitBox: {
    x: 0,
    y: 120,
    w: 128,
    h: 40,
  },
};
export const SHELF2_OBJECT_DATA: ObjectData = {
  name: 'shelf2',
  x: 48,
  y: 288,
  hitBox: {
    x: 0,
    y: 120,
    w: 128,
    h: 40,
  },
};
export const SHELF3_OBJECT_DATA: ObjectData = {
  name: 'shelf3',
  x: 280,
  y: 288,
  hitBox: {
    x: 0,
    y: 120,
    w: 128,
    h: 40,
  },
};
export const STAND_OBJECT_DATA: ObjectData = {
  name: 'stand',
  x: 420,
  y: 360,
  hitBox: {
    x: 0,
    y: 40,
    w: 80,
    h: 40,
  },
};
export const PLANT1_OBJECT_DATA: ObjectData = {
  name: 'plant1',
  x: 264,
  y: 152,
  hitBox: {
    x: 32,
    y: 80,
    w: 40,
    h: 16,
  },
};
export const PLANT2_OBJECT_DATA: ObjectData = {
  name: 'plant2',
  x: 180,
  y: 352,
  hitBox: {
    x: 32,
    y: 80,
    w: 40,
    h: 16,
  },
};
export const PLANT3_OBJECT_DATA: ObjectData = {
  name: 'plant3',
  x: 536,
  y: 376,
  hitBox: {
    x: 32,
    y: 80,
    w: 40,
    h: 16,
  },
};

// TODO: Should think of more efficient way to make a collection of objects
export const COLLISIBLE_OBJECTS: Array<ObjectData> = [
  DESK_OBJECT_DATA,
  DRAWER_OBJECT_DATA,
  SHELF1_OBJECT_DATA,
  SHELF2_OBJECT_DATA,
  SHELF3_OBJECT_DATA,
  STAND_OBJECT_DATA,
  PLANT1_OBJECT_DATA,
  PLANT2_OBJECT_DATA,
  PLANT3_OBJECT_DATA,
];
