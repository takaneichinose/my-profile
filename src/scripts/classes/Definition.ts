////////////////////////////////////////////////////////////////////////////////
// Definition of the constant variables                                       //
////////////////////////////////////////////////////////////////////////////////

// ReactJS
import React, { ReactDOM } from "react";

// Debug flag for console logging
export const IS_DEBUG: boolean = true;

// Default language if not set
export const DEFAULT_LANGUAGE: string = "en";

// Value is in vmin unit. This is the main basis.
export const SCREEN_WIDTH: number = 100;
// 4:3 aspect ratio
export const SCREEN_HEIGHT: number = SCREEN_WIDTH * 3 / 4;

// Original size of screen based on the image size
export const ORIG_SCREEN_WIDTH: number = 320;
export const ORIG_SCREEN_HEIGHT: number = 240;
export const ORIG_SPACE_SIZE: number = 1;

// Original size of objects based on the image size
export const ORIG_OBJECT_WIDTH: number = 32;
export const ORIG_OBJECT_HEIGHT: number = 16;

// Original size of texts based on the image size
export const ORIG_TEXT_WIDTH: number = 10;
export const ORIG_TEXT_HEIGHT: number = 12;

// Original size of speech dialog based on the image size
export const ORIG_SPEECH_DIALOG_PAD: number = 32;

// Original size of menu based on the image size
export const ORIG_MENU_BACKGROUND_SIZE: number = 16;
export const ORIG_MENU_WIDTH: number = 208;
export const ORIG_MENU_HEIGHT: number = 208;
export const ORIG_MENU_BUTTON_SIZE: number = 38;

// Orignial size of basic details container in status
export const ORIG_STATS_IMG_WIDTH: number = 64;
export const ORIG_STATS_IMG_HEIGHT: number = 80;
export const ORIG_STATS_IMG_X: number = 16;
export const ORIG_STATS_IMG_Y: number = 16;
export const ORIG_STATS_TITLE_WIDTH: number = 208;
export const ORIG_STATS_TITLE_HEIGHT: number = 80;
export const ORIG_STATS_TITLE_X: number = 96;
export const ORIG_STATS_TITLE_Y: number = 16;
export const ORIG_STATS_DESC_WIDTH: number = 288;
export const ORIG_STATS_DESC_HEIGHT: number = 112;
export const ORIG_STATS_DESC_X: number = 16;
export const ORIG_STATS_DESC_Y: number = 112;
export const ORIG_STATS_PAD: number = 16;

// Original size of acknowledge based on the image size
export const ORIG_ACKNOWLEDGEMENT_WIDTH: number = 288;
export const ORIG_ACKNOWLEDGEMENT_HEIGHT: number = 208;
export const ORIG_ACKNOWLEDGEMENT_PAD: number = 16;

// Size of objects based on percentage of the screen size
export const OBJECT_WIDTH: number = ORIG_OBJECT_WIDTH / ORIG_SCREEN_WIDTH;
export const OBJECT_HEIGHT: number = ORIG_OBJECT_HEIGHT / ORIG_SCREEN_HEIGHT;
export const OBJECT_STEP_X: number = ORIG_SCREEN_WIDTH / ORIG_OBJECT_WIDTH;
export const OBJECT_STEP_Y: number = ORIG_SCREEN_HEIGHT / ORIG_OBJECT_HEIGHT;
export const SPACE_SIZE_X: number = ORIG_SPACE_SIZE / ORIG_SCREEN_WIDTH;
export const SPACE_SIZE_Y: number = ORIG_SPACE_SIZE / ORIG_SCREEN_HEIGHT;

// Constants for the character
export const CHARACTER_INIT_X: number = 7;
export const CHARACTER_INIT_Y: number = 7;
export const CHARACTER_MOVE_TIME: number = 512;

// Size of texts based on percentage of the screen size
export const TEXT_WIDTH: number = ORIG_TEXT_WIDTH / ORIG_SCREEN_WIDTH;
export const TEXT_HEIGHT: number = ORIG_TEXT_HEIGHT / ORIG_SCREEN_HEIGHT;

// Size of speech dialog based on percentage of the screen size
export const SPEECH_DIALOG_PAD_X: number = ORIG_SPEECH_DIALOG_PAD / ORIG_SCREEN_WIDTH;
export const SPEECH_DIALOG_PAD_Y: number = ORIG_SPEECH_DIALOG_PAD / ORIG_SCREEN_HEIGHT;

// Size of menu based on the image size
export const MENU_BACKGROUND_WIDTH: number = ORIG_MENU_BACKGROUND_SIZE / ORIG_SCREEN_WIDTH;
export const MENU_BACKGROUND_HEIGHT: number = ORIG_MENU_BACKGROUND_SIZE / ORIG_SCREEN_HEIGHT;
export const MENU_WIDTH: number = ORIG_MENU_WIDTH / ORIG_SCREEN_WIDTH;
export const MENU_HEIGHT: number = ORIG_MENU_HEIGHT / ORIG_SCREEN_HEIGHT;
export const MENU_BUTTON_WIDTH: number = ORIG_MENU_BUTTON_SIZE / ORIG_SCREEN_WIDTH;
export const MENU_BUTTON_HEIGHT: number = ORIG_MENU_BUTTON_SIZE / ORIG_SCREEN_HEIGHT;

// Size of basic details container in status
export const STATS_IMG_WIDTH: number = ORIG_STATS_IMG_WIDTH / ORIG_SCREEN_WIDTH;
export const STATS_IMG_HEIGHT: number = ORIG_STATS_IMG_HEIGHT / ORIG_SCREEN_HEIGHT;
export const STATS_IMG_X: number = ORIG_STATS_IMG_X / ORIG_SCREEN_WIDTH;
export const STATS_IMG_Y: number = ORIG_STATS_IMG_Y / ORIG_SCREEN_HEIGHT;
export const STATS_TITLE_WIDTH: number = ORIG_STATS_TITLE_WIDTH / ORIG_SCREEN_WIDTH;
export const STATS_TITLE_HEIGHT: number = ORIG_STATS_TITLE_HEIGHT / ORIG_SCREEN_HEIGHT;
export const STATS_TITLE_X: number = ORIG_STATS_TITLE_X / ORIG_SCREEN_WIDTH;
export const STATS_TITLE_Y: number = ORIG_STATS_TITLE_Y / ORIG_SCREEN_HEIGHT;
export const STATS_DESC_WIDTH: number = ORIG_STATS_DESC_WIDTH / ORIG_SCREEN_WIDTH;
export const STATS_DESC_HEIGHT: number = ORIG_STATS_DESC_HEIGHT / ORIG_SCREEN_HEIGHT;
export const STATS_DESC_X: number = ORIG_STATS_DESC_X / ORIG_SCREEN_WIDTH;
export const STATS_DESC_Y: number = ORIG_STATS_DESC_Y / ORIG_SCREEN_HEIGHT;
export const STATS_PAD_X: number = ORIG_STATS_PAD / ORIG_SCREEN_WIDTH;
export const STATS_PAD_Y: number = ORIG_STATS_PAD / ORIG_SCREEN_HEIGHT;

// Size of acknowledgement based on the image size
export const ACKNOWLEDGEMENT_WIDTH: number = ORIG_ACKNOWLEDGEMENT_WIDTH / ORIG_SCREEN_WIDTH;
export const ACKNOWLEDGEMENT_HEIGHT: number = ORIG_ACKNOWLEDGEMENT_HEIGHT / ORIG_SCREEN_HEIGHT;
export const ACKNOWLEDGEMENT_PAD_X: number = ORIG_ACKNOWLEDGEMENT_PAD / ORIG_SCREEN_WIDTH;
export const ACKNOWLEDGEMENT_PAD_Y: number = ORIG_ACKNOWLEDGEMENT_PAD / ORIG_SCREEN_HEIGHT;

// Maximum number of tries to relocate the character
export const MAX_TRY_COUNT: number = 3;

// Direction of the character
export enum Direction {
	Top,
	Bottom,
	Left,
	Right,
	Front,
	Rear,
	X,
	Y,
};

// Allowed clickable area
export enum ClickBoundary {
	X1 = 0,
	X2 = 9,
	Y1 = 7,
	Y2 = 1,
};

// Types of assets for this application
export enum AssetType {
	Image = 0,
	Audio = 1,
	JSON = 2,
};

// Instructions to be shown
export enum InstructionMessage {
	Main = 0,
	Profile = 1,
	Others = 2,
};

// Available set of characters for the text
export const CHARACTERS: Array<string> = [
	"alphabet",
	"numeric",
	"symbol",
	"hiragana",
	"katakana",
	"kanji",
];

// URL of my portfolio
export const LINK_TO_CODEPEN: string = "https://codepen.io/takaneichinose";
export const LINK_TO_GITHUB: string = "https://github.com/takaneichinose";
export const LINK_TO_TWITTER: string = "https://twitter.com/takane_ichi";
export const LINK_TO_BLOG: string = "https://dev.to/takaneichinose";
export const LINK_TO_RESUME: string = "https://assets.codepen.io/430361/Resume+%282021_10_23%29.pdf";
export const LINK_TO_EMAIL: string = "mailto:ichinose.takane@gmail.com";

// Root directory of assets
export const ASSETS_PATH: string = "https://assets.codepen.io/430361/";

// For image files
export interface Images {
	CharacterFront: string;
	CharacterFrontMove: string;
	CharacterRear: string;
	CharacterRearMove: string;
	CharacterLeft: string;
	CharacterLeftMove: string;
	CharacterRight: string;
	CharacterRightMove: string;
	Background: string;
	Carpet: string;
	Clock: string;
	Door: string;
	Desk: string;
	Drawer: string;
	Files: string;
	Laptop: string;
	Plant: string;
	Shelf: string;
	Window: string;
	Alphabet: string;
	SpeechDialog: string;
	MenuButton: string;
	Numeric: string;
	TextSelector: string;
	MenuBackground: string;
	MainMenu: string;
	ProfileIcon: string;
	GithubIcon: string;
	TwitterIcon: string;
	CodepenIcon: string;
	LaptopIcon: string;
	FilesIcon: string;
	MessageIcon: string;
	AcknowledgementIcon: string;
	StatsImage: string;
	StatsTitle: string;
	StatsDescription: string;
	Symbol: string;
	Acknowledgement: string;
}
export const IMAGES_DIR: string = `${ASSETS_PATH}`;
export const IMAGES: Images = {
	CharacterFront: "profile-character-front.png",
	CharacterFrontMove: "profile-character-front-move.gif",
	CharacterRear: "profile-character-rear.png",
	CharacterRearMove: "profile-character-rear-move.gif",
	CharacterLeft: "profile-character-left.png",
	CharacterLeftMove: "profile-character-left-move.gif",
	CharacterRight: "profile-character-right.png",
	CharacterRightMove: "profile-character-right-move.gif",
	Background: "profile-background.png",
	Carpet: "profile-carpet.png",
	Clock: "profile-clock.png",
	Door: "profile-door.png",
	Desk: "profile-desk.png",
	Drawer: "profile-drawer.png",
	Files: "profile-files.png",
	Laptop: "profile-laptop.png",
	Plant: "profile-plant.png",
	Shelf: "profile-shelf.png",
	Window: "profile-window.png",
	Alphabet: "profile-alphabet.png",
	SpeechDialog: "profile-speech-dialog.png",
	MenuButton: "profile-menu-button.png",
	Numeric: "profile-numeric.png",
	TextSelector: "profile-text-selector.png",
	MenuBackground: "profile-menu-background.png",
	MainMenu: "profile-main-menu.png",
	ProfileIcon: "profile-profile-icon.png",
	GithubIcon: "profile-github-icon.png",
	TwitterIcon: "profile-twitter-icon.png",
	CodepenIcon: "profile-codepen-icon.png",
	LaptopIcon: "profile-laptop-icon.png",
	FilesIcon: "profile-files-icon.png",
	MessageIcon: "profile-message-icon.png",
	AcknowledgementIcon: "profile-acknowledgement-icon.png",
	StatsImage: "profile-stats-image.png",
	StatsTitle: "profile-stats-title.png",
	StatsDescription: "profile-stats-description.png",
	Symbol: "profile-symbol.png",
	Acknowledgement: "profile-acknowledgement.png",
};

// For audio files
export interface Audios {
	Background: string;
}
export const AUDIOS_DIR: string = `${ASSETS_PATH}`;
export const AUDIOS: Audios = {
	Background: "White+Christmas.mpga",
};

// For JSON files
export interface JsonMap {
	Text: string;
	Alphabet: string;
	Numeric: string;
	Symbol: string;
	Hiragana: string;
	Katakana: string;
	Kanji: string;
	Skills1: string;
	Skills2: string;
}
export const JSON_DIR: string = `${ASSETS_PATH}`;
export const JSON_MAP: JsonMap = {
	Text: "profile-internationalization.json",
	Alphabet: "profile-alphabet.json",
	Numeric: "profile-numeric.json",
	Symbol: "profile-symbol.json",
	Hiragana: "profile-hiragana.json",
	Katakana: "profile-katakana.json",
	Kanji: "profile-kanji.json",
	Skills1: "profile-skills-1.json",
	Skills2: "profile-skills-2.json",
};

export interface Assets {
	key: string;
	url: string;
	type: AssetType;
	asset: string;
}

// Background image asset
export interface BGImage {
	Background: string;
	Numeric: string;
	Alphabet: string;
	Symbol: string;
	Hiragana: string;
	Katakana: string;
	Kanji: string;
}

// Properties for the confirm message
export interface Confirm {
	yes: Function;
	no: Function;
}

// Properties to be passed on the React DOM element
export interface CommonProperties {
	lang?: string;
	content?: string;
	click?: React.MouseEventHandler;
	confirm?: Confirm;
	img?: string;
	text?: string;
	x?: number;
	y?: number;
	callback?: Function;
	link?: string;
}

// With common CSS variables
export interface CSSProperties extends React.CSSProperties {
	"--width": string;
	"--height": string;
	"--background-image": string;
	"--background-position": string;
	"--background-size": string;
	"--background-width": string;
	"--background-height": string;
	"--space": string;
	"--selector-background-image": string;
	"--x": string;
	"--y": string;
	"--z": number;
	"--padding": string;
	"--value": string;
}
