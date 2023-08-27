import { Assets, Texture } from 'pixi.js';
import React from 'react';

import { Object } from '@/Components/Object';
import { DOOR_OBJECT_DATA } from '@/Constants/Objects';

import doorImage from '/assets/images/my-profile-door.png';

/**
 * Component of the door object
 * @returns {React.ReactElement}
 */
export function Door(): React.ReactElement {
  const texture: Texture | undefined = Assets.get(doorImage);

  if (texture === undefined) {
    return <React.Fragment />;
  }

  return <Object texture={texture} objectData={DOOR_OBJECT_DATA} />;
}
