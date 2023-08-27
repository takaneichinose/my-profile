import { Assets, Texture } from 'pixi.js';
import React from 'react';

import { Object } from '@/Components/Object';
import { DRAWER_OBJECT_DATA } from '@/Constants/Objects';

import drawerImage from '/assets/images/my-profile-drawer.png';

/**
 * Component of the drawer object
 * @returns {React.ReactElement}
 */
export function Drawer(): React.ReactElement {
  const texture: Texture | undefined = Assets.get(drawerImage);

  if (texture === undefined) {
    return <React.Fragment />;
  }

  return <Object texture={texture} objectData={DRAWER_OBJECT_DATA} />;
}
