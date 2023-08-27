import React, { useCallback, useEffect, useState } from 'react';
import { MessageBox } from './MessageBox';

type InstructionsProps = {
  shown: boolean;
  onEnded: () => void;
};

// TODO: Store text into an object (or JSON)
/**
 * Component of the instructions
 * @returns {React.ReactElement}
 */
export function Instructions({ shown, onEnded }: InstructionsProps): React.ReactElement {
  const [step, setStep] = useState<number>(1);

  // Click event handler for the window
  const handleWindowClick = useCallback((): void => {
    setStep(step + 1);
  }, [step]);

  // Keyup event handler for the window
  const handleWindowKeyUp = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === ' ') {
        setStep(step + 1);
      }
    },
    [step],
  );

  // Monitor the value of the 'step' state
  useEffect(() => {
    window.addEventListener('click', handleWindowClick);
    window.addEventListener('keyup', handleWindowKeyUp);

    if (step === 4) {
      onEnded();
    }

    return () => {
      // Remove the resize event on unmount
      window.removeEventListener('click', handleWindowClick);
      window.removeEventListener('keyup', handleWindowKeyUp);
    };
  }, [step, handleWindowClick, handleWindowKeyUp, onEnded]);

  if (!shown) {
    return <React.Fragment />;
  }

  return (
    <React.Fragment>
      <MessageBox shown={step === 1} text="Tap everywhere on the screen to continue." />
      <MessageBox shown={step === 2} text="Tap the screen or use the arrow keys to move the character." />
      <MessageBox shown={step === 3} text="Press 'Space Bar' or click the laptop to open the menu." />
    </React.Fragment>
  );
}
