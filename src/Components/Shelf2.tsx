import { Assets, Texture } from 'pixi.js';
import React from 'react';

import { Object } from '@/Components/Object';
import { SHELF2_OBJECT_DATA } from '@/Constants/Objects';

import shelfImage from '/assets/images/my-profile-shelf.png';

/**
 * Component of the shelf2 object
 * @returns {React.ReactElement}
 */
export function Shelf2(): React.ReactElement {
  const texture: Texture | undefined = Assets.get(shelfImage);

  if (texture == null) {
    return <React.Fragment />;
  }

  return <Object texture={texture} objectData={SHELF2_OBJECT_DATA} />;
}
