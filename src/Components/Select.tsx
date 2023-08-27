import React from 'react';

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
    <span className="w-[4vmin] inline-block">{shown && <img src={select} className="w-[2vmin] h-[2vmin]" />}</span>
  );
}
