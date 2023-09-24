import { Assets, Texture } from 'pixi.js';
import React from 'react';
import { TilingSprite } from '@pixi/react';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/Constants/Common';
import { OFFICE_NAME } from '@/Constants/Objects';

import officeImage from '/assets/images/my-profile-office.png';

/**
 * Component of the office
 * @returns {React.ReactElement}
 */
export function Office(): React.ReactElement {
  const texture: Texture | undefined = Assets.get(officeImage);

  if (texture == null) {
    return <React.Fragment />;
  }

  return (
    <TilingSprite
      name={OFFICE_NAME}
      texture={texture}
      width={SCREEN_WIDTH}
      height={SCREEN_HEIGHT}
      tilePosition={{
        x: 0,
        y: 0,
      }}
    />
  );
}
