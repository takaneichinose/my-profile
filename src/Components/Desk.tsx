import { Assets, Texture } from 'pixi.js';
import React from 'react';

import { Object } from '@/Components/Object';
import { DESK_OBJECT_DATA } from '@/Constants/Objects';

import deskImage from '/assets/images/my-profile-desk.png';

/**
 * Component of the desk object
 * @returns {React.ReactElement}
 */
export function Desk(): React.ReactElement {
  const texture: Texture | undefined = Assets.get(deskImage);

  if (texture === undefined) {
    return <React.Fragment />;
  }

  return <Object texture={texture} objectData={DESK_OBJECT_DATA} />;
}
