import React from 'react';

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
    <div className="w-full h-full p-[4vmin] flex items-end absolute top-0 left-0">
      <div
        className={clsx(
          'text-pico-8',
          'text-[3vmin]',
          'bg-pico-1',
          'w-[72vmin]',
          'h-[20vmin]',
          'px-[3vmin]',
          'py-[2vmin]',
          'space-y-[1vmin]',
          'select-none',
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
