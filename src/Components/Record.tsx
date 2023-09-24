import { Assets, FederatedPointerEvent, Texture } from 'pixi.js';
import React from 'react';

import { Object } from '@/Components/Object';
import { RECORD_OBJECT_DATA } from '@/Constants/Interactables';

import recordImage from '/assets/images/my-profile-record.png';

/**
 * Component of the record object
 * @returns {React.ReactElement}
 */
export function Record(): React.ReactElement {
  const texture: Texture | undefined = Assets.get(recordImage);

  // Click event handler for the record
  const handleRecordClick = (event: FederatedPointerEvent) => {
    console.log(event);
  };

  if (texture == null) {
    return <React.Fragment />;
  }

  return (
    <Object
      texture={texture}
      objectData={RECORD_OBJECT_DATA}
      zIndex={RECORD_OBJECT_DATA.zIndex}
      interactive={true}
      onclick={handleRecordClick}
      ontouchend={handleRecordClick}
    />
  );
}
