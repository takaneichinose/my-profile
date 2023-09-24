import { isMobile } from 'react-device-detect';

// List of skills and year started
export const SKILL_LIST: Record<string, number> = {
  HTML: 2013,
  CSS: 2013,
  JavaScript: 2013,
  PHP: 2013,
  Java: 2018,
  'C#.NET': 2018,
  Python: 2020,
  SQL: 2016,
  NodeJS: 2018,
  TypeScript: 2020,
  React: 2017,
  Vue: 2019,
  'Sass/SCSS': 2019,
  Laravel: 2016,
  TailwindCSS: 2022,
  'Spring Boot': 2018,
  'Front-end Web': 2013,
  'Back-end Web': 2016,
  'Game Dev': 2021,
  'PICO-8': 2021,
  GDevelop: 2021,
  'Godot Engine': 2023,
  'Pixel Art': 2021,
};

// Total number of skills shown in a page
export const SKILLS_PER_PAGE: number = !isMobile ? 7 : 5;

// Total number of items
export const TOTAL_ITEMS: number = Object.keys(SKILL_LIST).length;
