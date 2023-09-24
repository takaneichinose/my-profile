import { Assets, Texture } from 'pixi.js';
import React from 'react';

import { Object } from '@/Components/Object';
import { WINDOW_OBJECT_DATA } from '@/Constants/Objects';

import windowImage from '/assets/images/my-profile-window.png';

/**
 * Component of the window object
 * @returns {React.ReactElement}
 */
export function Window(): React.ReactElement {
  const texture: Texture | undefined = Assets.get(windowImage);

  if (texture == null) {
    return <React.Fragment />;
  }

  return <Object texture={texture} objectData={WINDOW_OBJECT_DATA} />;
}
