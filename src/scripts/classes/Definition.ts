////////////////////////////////////////////////////////////////////////////////
// Definition of the constant variables                                       //
////////////////////////////////////////////////////////////////////////////////

// ReactJS
import React from "react";

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
	Y2 = 14,
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
export const LINK_TO_RESUME: URL = new URL("../../assets/pdf/takane_ichinose_resume.pdf", import.meta.url);
export const LINK_TO_EMAIL: string = "mailto:ichinose.takane@gmail.com";

// For image files
export interface Images {
	CharacterFront: URL;
	CharacterFrontMove: URL;
	CharacterRear: URL;
	CharacterRearMove: URL;
	CharacterLeft: URL;
	CharacterLeftMove: URL;
	CharacterRight: URL;
	CharacterRightMove: URL;
	Background: URL;
	Carpet: URL;
	Clock: URL;
	Door: URL;
	Desk: URL;
	Drawer: URL;
	Files: URL;
	Laptop: URL;
	Plant: URL;
	Shelf: URL;
	Window: URL;
	Alphabet: URL;
	SpeechDialog: URL;
	MenuButton: URL;
	Numeric: URL;
	TextSelector: URL;
	MenuBackground: URL;
	MainMenu: URL;
	ProfileIcon: URL;
	GithubIcon: URL;
	TwitterIcon: URL;
	CodepenIcon: URL;
	LaptopIcon: URL;
	FilesIcon: URL;
	MessageIcon: URL;
	AcknowledgementIcon: URL;
	StatsImage: URL;
	StatsTitle: URL;
	StatsDescription: URL;
	Symbol: URL;
	Acknowledgement: URL;
}
export const IMAGES: Images = {
	CharacterFront: new URL("../../assets/images/profile-character-front.png", import.meta.url),
	CharacterFrontMove: new URL("../../assets/images/profile-character-front-move.gif", import.meta.url),
	CharacterRear: new URL("../../assets/images/profile-character-rear.png", import.meta.url),
	CharacterRearMove: new URL("../../assets/images/profile-character-rear-move.gif", import.meta.url),
	CharacterLeft: new URL("../../assets/images/profile-character-left.png", import.meta.url),
	CharacterLeftMove: new URL("../../assets/images/profile-character-left-move.gif", import.meta.url),
	CharacterRight: new URL("../../assets/images/profile-character-right.png", import.meta.url),
	CharacterRightMove: new URL("../../assets/images/profile-character-right-move.gif", import.meta.url),
	Background: new URL("../../assets/images/profile-background.png", import.meta.url),
	Carpet: new URL("../../assets/images/profile-carpet.png", import.meta.url),
	Clock: new URL("../../assets/images/profile-clock.png", import.meta.url),
	Door: new URL("../../assets/images/profile-door.png", import.meta.url),
	Desk: new URL("../../assets/images/profile-desk.png", import.meta.url),
	Drawer: new URL("../../assets/images/profile-drawer.png", import.meta.url),
	Files: new URL("../../assets/images/profile-files.png", import.meta.url),
	Laptop: new URL("../../assets/images/profile-laptop.png", import.meta.url),
	Plant: new URL("../../assets/images/profile-plant.png", import.meta.url),
	Shelf: new URL("../../assets/images/profile-shelf.png", import.meta.url),
	Window: new URL("../../assets/images/profile-window.png", import.meta.url),
	Alphabet: new URL("../../assets/images/profile-alphabet.png", import.meta.url),
	SpeechDialog: new URL("../../assets/images/profile-speech-dialog.png", import.meta.url),
	MenuButton: new URL("../../assets/images/profile-menu-button.png", import.meta.url),
	Numeric: new URL("../../assets/images/profile-numeric.png", import.meta.url),
	TextSelector: new URL("../../assets/images/profile-text-selector.png", import.meta.url),
	MenuBackground: new URL("../../assets/images/profile-menu-background.png", import.meta.url),
	MainMenu: new URL("../../assets/images/profile-main-menu.png", import.meta.url),
	ProfileIcon: new URL("../../assets/images/profile-profile-icon.png", import.meta.url),
	GithubIcon: new URL("../../assets/images/profile-github-icon.png", import.meta.url),
	TwitterIcon: new URL("../../assets/images/profile-twitter-icon.png", import.meta.url),
	CodepenIcon: new URL("../../assets/images/profile-codepen-icon.png", import.meta.url),
	LaptopIcon: new URL("../../assets/images/profile-laptop-icon.png", import.meta.url),
	FilesIcon: new URL("../../assets/images/profile-files-icon.png", import.meta.url),
	MessageIcon: new URL("../../assets/images/profile-message-icon.png", import.meta.url),
	AcknowledgementIcon: new URL("../../assets/images/profile-acknowledgement-icon.png", import.meta.url),
	StatsImage: new URL("../../assets/images/profile-stats-image.png", import.meta.url),
	StatsTitle: new URL("../../assets/images/profile-stats-title.png", import.meta.url),
	StatsDescription: new URL("../../assets/images/profile-stats-description.png", import.meta.url),
	Symbol: new URL("../../assets/images/profile-symbol.png", import.meta.url),
	Acknowledgement: new URL("../../assets/images/profile-acknowledgement.png", import.meta.url),
};

// For audio files
export interface Audios {
	Background: URL;
}
export const AUDIOS: Audios = {
	Background: new URL("../../assets/audios/White Christmas.mpga", import.meta.url),
};

// For JSON files
export interface JsonMap {
	Text: URL;
	Alphabet: URL;
	Numeric: URL;
	Symbol: URL;
	Hiragana: URL;
	Katakana: URL;
	Kanji: URL;
	Skills1: URL;
	Skills2: URL;
}
export const JSON_MAP: JsonMap = {
	Text: new URL("../../assets/json/profile-internationalization.data", import.meta.url),
	Alphabet: new URL("../../assets/json/profile-alphabet.data", import.meta.url),
	Numeric: new URL("../../assets/json/profile-numeric.data", import.meta.url),
	Symbol: new URL("../../assets/json/profile-symbol.data", import.meta.url),
	Hiragana: new URL("../../assets/json/profile-hiragana.data", import.meta.url),
	Katakana: new URL("../../assets/json/profile-katakana.data", import.meta.url),
	Kanji: new URL("../../assets/json/profile-kanji.data", import.meta.url),
	Skills1: new URL("../../assets/json/profile-skills-1.data", import.meta.url),
	Skills2: new URL("../../assets/json/profile-skills-2.data", import.meta.url),
};

export interface Assets {
	key: string;
	url: URL;
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
	yes?: Function;
	no?: Function;
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
	"--numeric-image": string;
	"--alphabet-image": string;
	"--symbol-image": string;
	"--hiragana-image": string;
	"--katakana-image": string;
	"--kanji-image": string;
}
