import { Assets, Texture } from 'pixi.js';
import React from 'react';

import { Object } from '@/Components/Object';
import { SHELF3_OBJECT_DATA } from '@/Constants/Objects';

import shelfImage from '/assets/images/my-profile-shelf.png';

/**
 * Component of the shelf3 object
 * @returns {React.ReactElement}
 */
export function Shelf3(): React.ReactElement {
  const texture: Texture | undefined = Assets.get(shelfImage);

  if (texture === undefined) {
    return <React.Fragment />;
  }

  return <Object texture={texture} objectData={SHELF3_OBJECT_DATA} />;
}
