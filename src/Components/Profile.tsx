import React, { useCallback, useEffect, useState } from 'react';

import clsx from 'clsx';

import { SKILLS_PER_PAGE, SKILL_LIST, TOTAL_ITEMS } from '@/Constants/Profile';
import { ProfileCommand } from '@/Enums/Profile';

import { Select } from './Select';

import portrait from '/assets/images/my-profile-portrait.png';

type ProfileProps = {
  shown?: boolean;
  onExit?: () => void;
};

// TODO: Store text into an object (or JSON)
/**
 * Component of the profile
 * @returns {React.ReactElement}
 */
export function Profile({ shown = false, onExit }: ProfileProps): React.ReactElement {
  const date: Date = new Date();
  const year: number = date.getFullYear();

  const [selectedCommand, setSelectedCommand] = useState<ProfileCommand>(ProfileCommand.Next);
  const [skillIndex, setSkillIndex] = useState<number>(0);

  // Click event handler for next command
  const handleNextClick = useCallback(() => {
    const nextPage: number = skillIndex + SKILLS_PER_PAGE;

    setSkillIndex(nextPage);

    if (nextPage === TOTAL_ITEMS - SKILLS_PER_PAGE) {
      setSelectedCommand(ProfileCommand.Previous);
    }
  }, [skillIndex]);

  // Click event handler for previous command
  const handlePreviousClick = useCallback(() => {
    const previousPage: number = skillIndex - SKILLS_PER_PAGE;

    setSkillIndex(previousPage);

    if (previousPage === 0) {
      setSelectedCommand(ProfileCommand.Next);
    }
  }, [skillIndex]);

  // Click event handler for exit command
  const handleExitClick = useCallback(() => {
    if (onExit !== undefined) {
      onExit();
    }
  }, [onExit]);

  // Mouse over event handler for all the commands
  const handleCommandMouseOver = (command: number) => {
    setSelectedCommand(command);
  };

  // Keyup event handler for the window
  const handleWindowKeyUp = useCallback(
    (event: KeyboardEvent): void => {
      switch (event.key) {
        case 'ArrowLeft':
          setSelectedCommand(selectedCommand > ProfileCommand.Previous ? selectedCommand - 1 : ProfileCommand.Exit);
          break;
        case 'ArrowRight':
          setSelectedCommand(selectedCommand < ProfileCommand.Exit ? selectedCommand + 1 : ProfileCommand.Previous);
          break;
        case ' ':
          switch (selectedCommand) {
            case ProfileCommand.Previous:
              handlePreviousClick();
              break;
            case ProfileCommand.Next:
              handleNextClick();
              break;
            case ProfileCommand.Exit:
              handleExitClick();
              break;
          }
          break;
      }
    },
    [selectedCommand, handlePreviousClick, handleNextClick, handleExitClick],
  );

  // Monitor the instructions shown state
  useEffect(() => {
    window.addEventListener('keyup', handleWindowKeyUp);

    return () => {
      // Remove the resize event on unmount
      window.removeEventListener('keyup', handleWindowKeyUp);
    };
  }, [handleWindowKeyUp]);

  if (!shown) {
    return <React.Fragment />;
  }

  return (
    <div className="w-full h-full flex absolute top-0 left-0">
      <React.Suspense>
        <div
          className={clsx(
            'text-pico-8',
            'text-[3vmin]',
            'bg-pico-1',
            'w-full',
            'h-full',
            'p-[2vmin]',
            'flex',
            'flex-col',
            'select-none',
          )}
        >
          <div className="pb-[2vmin] flex grow">
            <div className="mr-[2vmin] shrink-0">
              <img src={portrait} className="w-[24vmin] h-[32vmin]" />
              <div className="text-center pt-[2vmin]">
                <div>Takane Ichinose</div>
                <div>Web developer</div>
              </div>
            </div>
            <div className="pl-[4vmin] flex flex-col grow">
              <div>Skills</div>
              <div className="grow py-[1rem]">
                {Object.keys(SKILL_LIST)
                  .filter((_, index: number) => index >= skillIndex && index < skillIndex + SKILLS_PER_PAGE)
                  .map((skill: string, index: number) => (
                    <div key={index} className="flex justify-between">
                      <div>{skill}</div>
                      <div>
                        {year - SKILL_LIST[skill]} year{year - SKILL_LIST[skill] > 1 && 's'}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="flex justify-between">
                <div className="flex">
                  <div className="w-[18vmin]">
                    {skillIndex > 0 && (
                      <React.Fragment>
                        <Select shown={selectedCommand === ProfileCommand.Previous} />
                        <button
                          onClick={handlePreviousClick}
                          onMouseOver={() => handleCommandMouseOver(ProfileCommand.Previous)}
                        >
                          Previous
                        </button>
                      </React.Fragment>
                    )}
                  </div>
                  <div>
                    {skillIndex < TOTAL_ITEMS - SKILLS_PER_PAGE && (
                      <React.Fragment>
                        <Select shown={selectedCommand === ProfileCommand.Next} />
                        <button
                          onClick={handleNextClick}
                          onMouseOver={() => handleCommandMouseOver(ProfileCommand.Next)}
                        >
                          Next
                        </button>
                      </React.Fragment>
                    )}
                  </div>
                </div>
                <div>
                  <Select shown={selectedCommand === ProfileCommand.Exit} />
                  <button onClick={handleExitClick} onMouseOver={() => handleCommandMouseOver(ProfileCommand.Exit)}>
                    Exit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>Front end web developer by profession,</div>
          <div>game developer by hobby, and music enthusiast.</div>
        </div>
      </React.Suspense>
    </div>
  );
}
