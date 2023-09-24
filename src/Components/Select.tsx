import React from 'react';
import { isMobile } from 'react-device-detect';

import clsx from 'clsx';

import select from '/assets/images/my-profile-select.png';

type SelectProps = {
  shown?: boolean;
};

/**
 * Component of the selected item on profile
 * @returns {React.ReactElement}
 */
export function Select({ shown = false }: SelectProps): React.ReactElement {
  return (
    <span className={clsx('inline-block', !isMobile ? 'w-[4vmin]' : 'w-4')}>
      {shown && <img src={select} className={clsx(!isMobile ? 'w-[2vmin] h-[2vmin]' : 'w-2 h-2')} />}
    </span>
  );
}
