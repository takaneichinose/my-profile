import { Assets, Texture } from 'pixi.js';
import React from 'react';

import { Object } from '@/Components/Object';
import { CLOCK_OBJECT_DATA } from '@/Constants/Objects';

import clockImage from '/assets/images/my-profile-clock.png';

/**
 * Component of the clock object
 * @returns {React.ReactElement}
 */
export function Clock(): React.ReactElement {
  const texture: Texture | undefined = Assets.get(clockImage);

  if (texture == null) {
    return <React.Fragment />;
  }

  return <Object texture={texture} objectData={CLOCK_OBJECT_DATA} />;
}
