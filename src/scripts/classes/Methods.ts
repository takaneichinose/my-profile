////////////////////////////////////////////////////////////////////////////////
// Methods to perform the logics and algorithms of the program                //
////////////////////////////////////////////////////////////////////////////////

// Definition class for this project
import * as Definition from "../classes/Definition";

export default class Methods {
	/**
	 * Write log on the console (Simply console.log) with debug flag
	 * @param string message Message to be shown on the log
	 */
	static log(message: string): void {
		if (!Definition.IS_DEBUG) {
			return;
		}
		
		console.log(message);
	}
	
	/**
	 * Get class name from object type
	 * @param object Class name
	 * @returns Class name
	 */
	static toClassName(value: object | string): string {
		if (typeof value === "object") {
			let className: Array<string> = [];
			
			for (let key in value) {
				if (value[key] !== true) {
					continue;
				}
				
				className = [...className, key];
			}
			
			value = className.join(" ");
		}
		
		return value;
	}
	
	/**
	 * Get the specification of the asset
	 * @param ASSET_TYPE type Type of an asset
	 * @returns 
	 */
	static getAssetSpec(type: Definition.AssetType): object {
		// For the return value
		let assetObject: object = {};
		
		// Temporary container of the asset object
		let tempObject: object = null;
		
		switch (type) {
			case Definition.AssetType.Image:
				tempObject = Definition.IMAGES;
				break;
			case Definition.AssetType.Audio:
				tempObject = Definition.AUDIOS;
				break;
			case Definition.AssetType.JSON:
				tempObject = Definition.JSON_MAP;
				break;
		}
		
		if (tempObject === null) {
			return null;
		}
		
		for (const key in tempObject) {
			assetObject[key] = null;
		}
		
		return assetObject;
	}
	
	/**
	 * Merge all the assets, and its type
	 */
	static getAllAssets(): Array<Definition.Assets> {
		let allAssets: Array<Definition.Assets> = [];
		
		for (const key in Definition.IMAGES) {
			allAssets = [...allAssets, {
				key: key,
				url: Definition.IMAGES[key],
				type: Definition.AssetType.Image,
			} as Definition.Assets];
		}
		
		for (const key in Definition.AUDIOS) {
			allAssets = [...allAssets, {
				key: key,
				url: Definition.AUDIOS[key],
				type: Definition.AssetType.Audio,
			} as Definition.Assets];
		}
		
		for (const key in Definition.JSON_MAP) {
			allAssets = [...allAssets, {
				key: key,
				url: Definition.JSON_MAP[key],
				type: Definition.AssetType.JSON,
			} as Definition.Assets];
		}
		
		return allAssets;
	}
	
	/**
	 * Get all the counts of assets
	 */
	static getAllAssetsCount(): number {
		return this.getAllAssets().length;
	}
	
	/**
	 * Read blob data then return as Base64
	 * @param blob Blob data to be converted
	 * @returns 
	 */
	static readBlobData(blob: Blob): Promise<string> {
		return new Promise((resolve) => {
			const reader: FileReader = new FileReader();

			reader.readAsDataURL(blob);

			reader.onload = (): void => {
				resolve(reader.result as string);
			};
		});
	}
	
	/**
	 * Load an image/audio file then return as Base64
	 * Used only in Promise
	 * @param string path Path of the file
	 * @param function resolve A function from loadAsset Promise
	 * @param function reject A function from loadAsset Promise
	 */
	static loadBlob(path: string): Promise<string> {
		return fetch(path).then((response: Response) => {
			if (!response.ok) {
				throw null;
			}
			
			return response.blob();
		}).then(async (blob: Blob): Promise<string> => {
			return await this.readBlobData(blob);
		}).catch((error: any): string => {
			console.error(`LoadAssetError: Failed to fetch data: ${path}`);
			
			return null;
		});
	}
	
	/**
	 * Load a JSON file then return as JSON object
	 * Used only in Promise
	 * @param string path Path of the file
	 */
	static loadJSON(path: string): Promise<string> {
		return fetch(path).then(
			(response: Response): Promise<string> => response.text()
		).then((json: string): string => {
			try {
				return JSON.parse(json);
			}	catch (ex: any) {
				console.error(`LoadAssetError: Failed to parse JSON: ${json}`);
				
				return null;
			}
		}).catch((error: any): string => {
			console.error(`LoadAssetError: Failed to fetch data: ${error}`);
			
			return null;
		});
	}
	
	/**
	 * Load the asset (image/audio file) for rendering
	 * @param string filename File name of the asset
	 * @param string key Key of the asset
	 * @param ASSET_TYPE type Type of the asset
	 */
	static loadAsset(
		filename: string,
		key: string,
		type: Definition.AssetType
	): Promise<Definition.Assets> {
		return new Promise(async (resolve: any) => {
			let asset: string = null;

			if (type === Definition.AssetType.Image) {
				// Image type
				asset = await this.loadBlob(`${Definition.IMAGES_DIR}${filename}`);
			} else if (type === Definition.AssetType.Audio) {
				// Audio type
				asset = await this.loadBlob(`${Definition.AUDIOS_DIR}${filename}`);
			} else if (type === Definition.AssetType.JSON) {
				// JSON type
				asset = await this.loadJSON(`${Definition.JSON_DIR}${filename}`);
			}
			
			resolve({
				key: key,
				type: type,
				asset: asset,
			});
		});
	}
	
	/**
	 * Set the position of x and y depends on the size of the block
	 * @param HTMLElement elm HTML Element of the screen
	 * @param number x x-axis of the target point
	 * @param number y y-axis of the target point
	 */
	static setScreenPos(elm, x, y): { x: number, y: number } {
		const width: number = elm.clientWidth - 1;
		const height: number = elm.clientHeight - 1;

		// Calculate the block position based on block size of the object
		const posX: number = Math.floor(x / (width / Definition.OBJECT_STEP_X));
		const posY: number = Math.floor(y / (height / Definition.OBJECT_STEP_Y));
		
		return {
			x: posX,
			y: posY,
		};
	}
	
	/**
	 * Find the clickable boundary for the character
	 * @param HTMLElement elm HTML Element of the screen
	 * @param number offsetX x-axis of the target point
	 * @param number offsetY y-axis of the target point
	 */
	static allowByClickBoundary(elm: HTMLElement, offsetX: number, offsetY: number): boolean {
		const { x, y } = this.setScreenPos(elm, offsetX, offsetY) as { x: number, y: number };
		
		if (
			// X axis
			x < Definition.ClickBoundary.X1 || x > Definition.ClickBoundary.X2
			||
			// Y axis
			y < Definition.ClickBoundary.Y1 || y > Definition.ClickBoundary.Y2
		) {
			return false;
		}

		return true;
	}
	
	/**
	 * Create style attribute used from MyProfile component
	 */
	static createMyProfileStyle(images: Definition.BGImage): Definition.CSSProperties {
		let mainScreenStyle: Definition.CSSProperties = {} as Definition.CSSProperties;
		
		// Main background image
		if (images.Background !== null) {
			mainScreenStyle["--background-image"] = `url("${images.Background}")`;
		}

		// Background image of the numeric
		if (images.Numeric !== null) {
			mainScreenStyle["--numeric-image"] = `url("${images.Numeric}")`;
		}

		// Background image of the alphabet
		if (images.Alphabet !== null) {
			mainScreenStyle["--alphabet-image"] = `url("${images.Alphabet}")`;
		}

		// Background image of the symbol
		if (images.Symbol !== null) {
			mainScreenStyle["--symbol-image"] = `url("${images.Symbol}")`;
		}

		// TODO
		// Background image of the hiragana
		// if (images.Hiragana !== null) {
		// 	mainScreenStyle["--hiragana-image"] = `url("${images.Hiragana}")`;
		// }

		// TODO
		// Background image of the katakana
		// if (images.Katakana !== null) {
		// 	mainScreenStyle["--katakana-image"] = `url("${images.Katakana}")`;
		// }

		// TODO
		// Background image of the kanji
		// if (images.Kanji !== null) {
		// 	mainScreenStyle["--kanji-image"] = `url("${images.Kanji}")`;
		// }
		
		return mainScreenStyle;
	}
}
