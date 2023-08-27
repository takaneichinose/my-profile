// List of skills and year started
export const SKILL_LIST: Record<string, number> = {
  HTML: 2013,
  CSS: 2013,
  JavaScript: 2013,
  PHP: 2013,
  Java: 2018,
  'C#.NET': 2018,
  SQL: 2016,
  NodeJS: 2018,
  TypeScript: 2020,
  React: 2017,
  Vue: 2019,
  'Sass/SCSS': 2019,
  Laravel: 2016,
  Tailwindcss: 2022,
  'Spring Boot': 2018,
  'Front-end Web Dev': 2013,
  'Back-end Web Dev': 2016,
  'Game Development': 2021,
  'PICO-8': 2021,
  GDevelop: 2021,
  'Pixel Art': 2021,
};

// Total number of skills shown in a page
export const SKILLS_PER_PAGE: number = 7;

// Total number of items
export const TOTAL_ITEMS: number = Object.keys(SKILL_LIST).length;
