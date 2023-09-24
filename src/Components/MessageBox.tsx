import React from 'react';
import { isMobile } from 'react-device-detect';

import clsx from 'clsx';

import { MESSAGE_INIT_DELAY } from '@/Constants/Common';

type MessageBoxProps = {
  text?: string;
  shown?: boolean;
  animating?: boolean;
};

/**
 * Component of the message box
 * @returns {React.ReactElement}
 */
export function MessageBox({ text, shown = true, animating = true }: MessageBoxProps): React.ReactElement {
  if (!shown) {
    return <React.Fragment />;
  }

  return (
    <div
      className={clsx(
        !isMobile ? 'p-[4vmin]' : 'w-full p-4',
        'w-full h-full flex items-end justify-center absolute top-0 left-0',
      )}
    >
      <div
        className={clsx(
          !isMobile
            ? 'text-[3vmin] w-[72vmin] h-[20vmin] px-[3vmin] py-[2vmin] space-y-[1vmin]'
            : 'w-full h-24 px-4 py-3 space-y-1',
          'text-pico-8 bg-pico-1 select-none',
        )}
      >
        {text?.split('').map((letter: string, i: number) => (
          <span
            key={i}
            className={clsx(animating && 'opacity-0 animate-show-50')}
            style={
              animating
                ? {
                    animationDelay: `${MESSAGE_INIT_DELAY * i}ms`,
                    animationFillMode: 'forwards',
                  }
                : undefined
            }
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
