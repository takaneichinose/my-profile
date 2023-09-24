const TITLE: string = 'Takane Ichinose | Profile Home Page';
const DESCRIPTION: string =
  "Personal home page of Takane Ichinose. My skills are written here. I'm web developer by profession, but game developer by hobby.";

/**
 * Vite plugin for my profile
 */
export const myProfile = () => {
  return {
    name: 'my-profile',
    transformIndexHtml(html: string) {
      return html.replace(/{% TITLE %}/g, TITLE).replace(/{% DESCRIPTION %}/g, DESCRIPTION);
    },
  };
};
