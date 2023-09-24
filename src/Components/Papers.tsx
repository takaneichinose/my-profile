import { Assets, FederatedPointerEvent, Texture } from 'pixi.js';
import React from 'react';

import { Object } from '@/Components/Object';
import { PAPERS_OBJECT_DATA } from '@/Constants/Interactables';

import papersImage from '/assets/images/my-profile-papers.png';

/**
 * Component of the papers object
 * @returns {React.ReactElement}
 */
export function Papers(): React.ReactElement {
  const texture: Texture | undefined = Assets.get(papersImage);

  // Click event handler for the papers
  const handlePapersClick = (event: FederatedPointerEvent) => {
    console.log(event);
  };

  if (texture == null) {
    return <React.Fragment />;
  }

  return <Object texture={texture} objectData={PAPERS_OBJECT_DATA} interactive={true} onclick={handlePapersClick} />;
}
