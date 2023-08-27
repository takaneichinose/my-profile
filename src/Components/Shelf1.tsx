import { Assets, Texture } from 'pixi.js';
import React from 'react';

import { Object } from '@/Components/Object';
import { SHELF1_OBJECT_DATA } from '@/Constants/Objects';

import shelfImage from '/assets/images/my-profile-shelf.png';

/**
 * Component of the shelf1 object
 * @returns {React.ReactElement}
 */
export function Shelf1(): React.ReactElement {
  const texture: Texture | undefined = Assets.get(shelfImage);

  if (texture === undefined) {
    return <React.Fragment />;
  }

  return <Object texture={texture} objectData={SHELF1_OBJECT_DATA} />;
}
