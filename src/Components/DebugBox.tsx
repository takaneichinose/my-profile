import { Graphics as PixiGraphics } from 'pixi.js';
import React, { useCallback } from 'react';
import { Graphics } from '@pixi/react';

import { DEBUG_COLOR, DEBUG_WIDTH, IS_DEBUG } from '@/Constants/Common';
import { HitBox } from '@/Types/HitBox';

type DebugBoxProps = {
  x: number;
  y: number;
  hitBox: HitBox | undefined;
};

/**
 * Component of the debug box showing the collision point
 * @returns {React.ReactElement}
 */
export function DebugBox({ x, y, hitBox }: DebugBoxProps): React.ReactElement {
  x += hitBox?.x || 0;
  y += hitBox?.y || 0;
  const zIndex: number = y + 1;

  // Draw the rectangle object
  const draw = useCallback(
    (g: PixiGraphics): void => {
      const w: number = hitBox?.w as number;
      const h: number = hitBox?.h as number;

      g.clear();
      g.lineStyle(DEBUG_WIDTH, DEBUG_COLOR);
      g.drawRect(0, 0, w, h);
    },
    [hitBox?.w, hitBox?.h],
  );

  if (!IS_DEBUG || hitBox == null) {
    return <React.Fragment />;
  }

  return <Graphics draw={draw} x={x} y={y} zIndex={zIndex} />;
}
