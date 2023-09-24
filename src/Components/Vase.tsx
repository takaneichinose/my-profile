import { Assets, Texture } from 'pixi.js';
import React from 'react';

import { Object } from '@/Components/Object';
import { VASE_OBJECT_DATA } from '@/Constants/Objects';

import vaseImage from '/assets/images/my-profile-vase.png';

/**
 * Component of the vase object
 * @returns {React.ReactElement}
 */
export function Vase(): React.ReactElement {
  const texture: Texture | undefined = Assets.get(vaseImage);

  if (texture == null) {
    return <React.Fragment />;
  }

  return <Object texture={texture} objectData={VASE_OBJECT_DATA} zIndex={VASE_OBJECT_DATA.zIndex} />;
}
