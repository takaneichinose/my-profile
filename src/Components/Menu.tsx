import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

import clsx from 'clsx';

import { MENU_ITEMS } from '@/Constants/Menu';

import { Select } from './Select';

type MenuProps = {
  shown?: boolean;
  onShowProfile?: () => void;
  onExit?: () => void;
};

// TODO: Sound (https://github.com/pixijs/sound)
// TODO: Store text into an object (or JSON)
/**
 * Component of the menu
 * @returns {React.ReactElement}
 */
export function Menu({ shown = false, onShowProfile, onExit }: MenuProps): React.ReactElement {
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const [hiddenLink, setHiddenLink] = useState<string>('');

  const linkRef: RefObject<HTMLAnchorElement> = useRef<HTMLAnchorElement>(null);

  // Click event handler for menu item
  const handleMenuItemClick = (menuItem: string | URL) => {
    if (typeof menuItem !== 'string') {
      return;
    }

    setSelectedItem(0);

    if (menuItem === 'ShowProfile' && onShowProfile != null) {
      onShowProfile();
    } else if (menuItem === 'ExitMenu' && onExit != null) {
      onExit();
    }
  };

  // Mouse over event handler
  const handleMenuItemMouseOver = (index: number) => {
    setSelectedItem(index);
  };

  // Open new window by keyboard
  const doCommandByKeyboard = useCallback(() => {
    if (linkRef.current == null) {
      return;
    }

    // Get the menu item (key name) from the selected item (index by key)
    const menuItem: string = Object.keys(MENU_ITEMS).at(selectedItem) as string;

    if (typeof MENU_ITEMS[menuItem] !== 'string') {
      // Create click event for the link
      linkRef.current.click();
    } else {
      if (MENU_ITEMS[menuItem] === 'ShowProfile' && onShowProfile != null) {
        onShowProfile();
      } else if (MENU_ITEMS[menuItem] === 'ExitMenu' && onExit != null) {
        onExit();
      }
    }
  }, [linkRef, selectedItem, onShowProfile, onExit]);

  // Keyup event handler for the window
  const handleWindowKeyUp = useCallback(
    (event: KeyboardEvent): void => {
      const itemsCount: number = Object.keys(MENU_ITEMS).length;

      let tmpSelectedItem: number = selectedItem;

      switch (event.key) {
        case 'ArrowUp':
          tmpSelectedItem--;
          break;
        case 'ArrowDown':
          tmpSelectedItem++;
          break;
        case ' ':
          doCommandByKeyboard();
          break;
      }

      if (tmpSelectedItem < 0) {
        tmpSelectedItem = itemsCount - 1;
      } else if (tmpSelectedItem >= itemsCount) {
        tmpSelectedItem = 0;
      }

      setSelectedItem(tmpSelectedItem);
    },
    [selectedItem, doCommandByKeyboard],
  );

  // Initialization
  useEffect(() => {
    window.addEventListener('keyup', handleWindowKeyUp);

    return () => {
      // Remove the resize event on unmount
      window.removeEventListener('keyup', handleWindowKeyUp);
    };
  }, [handleWindowKeyUp, linkRef]);

  // Monitor the state of the selected item
  useEffect(() => {
    // Get the menu item (key name) from the selected item (index by key)
    const menuItem: string = Object.keys(MENU_ITEMS).at(selectedItem) as string;

    if (typeof MENU_ITEMS[menuItem] === 'object') {
      const url: string = (MENU_ITEMS[menuItem] as URL).href;

      setHiddenLink(url);
    } else {
      setHiddenLink('');
    }
  }, [selectedItem]);

  if (!shown) {
    return <React.Fragment />;
  }

  return (
    <div className={clsx('w-full h-full flex absolute top-0 left-0', !isMobile ? 'p-[2vmin]' : 'p-2')}>
      <div
        className={clsx(
          !isMobile ? 'text-[3vmin] w-[36vmin] px-[2vmin] py-[3.5vmin] space-y-[1vmin]' : 'w-48 px-1 space-y-1',
          'text-pico-8 bg-pico-1 h-full flex flex-col justify-center ml-auto select-none',
        )}
      >
        <React.Suspense>
          {Object.keys(MENU_ITEMS).map((item: string, index: number) => (
            <div key={index} className="px-4 flex items-center">
              <Select shown={selectedItem === index} />
              {typeof MENU_ITEMS[item] === 'object' ? (
                <a
                  href={(MENU_ITEMS[item] as URL).href}
                  target="_blank"
                  onMouseOver={() => handleMenuItemMouseOver(index)}
                  onTouchStart={() => handleMenuItemMouseOver(index)}
                >
                  {item}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => handleMenuItemClick(MENU_ITEMS[item])}
                  onMouseOver={() => handleMenuItemMouseOver(index)}
                  onTouchStart={() => handleMenuItemMouseOver(index)}
                >
                  {item}
                </button>
              )}
            </div>
          ))}
        </React.Suspense>
        <a
          ref={linkRef}
          target="_blank"
          href={hiddenLink}
          className="opacity-0 absolute top-0 left-0 pointer-events-none"
        />
      </div>
    </div>
  );
}
