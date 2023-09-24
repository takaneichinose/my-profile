import { Assets, Texture } from 'pixi.js';
import React from 'react';

import { Object } from '@/Components/Object';
import { STAND_OBJECT_DATA } from '@/Constants/Objects';

import standImage from '/assets/images/my-profile-stand.png';

/**
 * Component of the stand object
 * @returns {React.ReactElement}
 */
export function Stand(): React.ReactElement {
  const texture: Texture | undefined = Assets.get(standImage);

  if (texture == null) {
    return <React.Fragment />;
  }

  return <Object texture={texture} objectData={STAND_OBJECT_DATA} />;
}
