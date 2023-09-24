import { Texture } from 'pixi.js';
import React, { ComponentProps } from 'react';
import { Sprite } from '@pixi/react';

import { ObjectData } from '@/Types/ObjectData';
import { DebugBox } from '@/Components/DebugBox';

type ObjectProps = ComponentProps<typeof Sprite> & {
  texture: Texture;
  objectData: ObjectData;
};

/**
 * Component of the object
 * @returns {React.ReactElement}
 */
export function Object({ texture, objectData, ...props }: ObjectProps): React.ReactElement {
  const x: number = objectData?.x || 0;
  const y: number = objectData?.y || 0;

  let zIndex: number = 0;

  if (props.zIndex != null) {
    // z-index that has zIndex property set
    zIndex = props.zIndex;
  } else if (objectData?.hitBox != null) {
    // z-index is based on the assigned hitbox' y position
    zIndex = y + objectData.hitBox.y;
  }

  return (
    <React.Fragment>
      <Sprite name={objectData.name} texture={texture} x={x} y={y} zIndex={zIndex} {...props} />
      <DebugBox x={x} y={y} hitBox={objectData.hitBox} />
    </React.Fragment>
  );
}
