import { Assets, FederatedPointerEvent, Texture } from 'pixi.js';
import React from 'react';

import { Object } from '@/Components/Object';
import { LAPTOP_OBJECT_DATA } from '@/Constants/Interactables';

import laptopImage from '/assets/images/my-profile-laptop.png';

type LaptopTypes = {
  onClick?: (event: FederatedPointerEvent) => void;
};

/**
 * Component of the laptop object
 * @returns {React.ReactElement}
 */
export function Laptop({ onClick }: LaptopTypes): React.ReactElement {
  const texture: Texture | undefined = Assets.get(laptopImage);

  if (texture == null) {
    return <React.Fragment />;
  }

  return (
    <Object texture={texture} objectData={LAPTOP_OBJECT_DATA} interactive={true} onclick={onClick} ontap={onClick} />
  );
}
