////////////////////////////////////////////////////////////////////////////////
// Component of loading screen                                                //
////////////////////////////////////////////////////////////////////////////////

// ReactJS
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// React implementation of Redux
import { useDispatch, useSelector, } from "react-dom";

// Assets reducers (Set state methods)
import {
	setImageAsset,
	setAudioAsset,
	setJsonAsset,
} from "../utils/assetsSlice";

// Reducers (Set state methods)
import { setLoadedAssetsCount } from "../utils/systemSlice";

// Definition class for this project
import * as Definition from "../classes/Definition";

// Method class for this project
import Methods from "../classes/Methods";

/**
 * Component of loading screen
 */
export default function LoadingScreen(): ReactDOM.Element {
	// Constant declarations
	const allAssets: Array<Definition.Assets> = Methods.getAllAssets();
	const totalAssetsCount: number = Methods.getAllAssetsCount();
	
	// ReactJS useState hooks
	const [loadingScreenShown, setLoadingScreenShown] = useState(true);
	const [loadAsset, setLoadAsset] = useState(null);
	
	// This is to get the state from Redux
	const system: any = useSelector(state => state.system);
	
	// This is like setState or something
	const dispatch: any = useDispatch();
	
	// Number of loaded assets
	const loadedAssetsCount: number = system.loadedAssetsCount;
	
	// Load the assets
	const loadAllAssets = (): void => {
		for (let i: number = 0; i < totalAssetsCount; i++) {
			const key: string = allAssets[i].key;
			const url: string = allAssets[i].url;
			const type: Definition.AssetType = allAssets[i].type;
			const asset: Promise<Definition.Assets> = Methods.loadAsset(url, key, type);
			
			asset.then(result => {
				if (result === null) {
					return result;
				}
				
				setLoadAsset(result);
			});
		}
	};
	
	// Process the preloaded data
	const processPreload = (result: Definition.Assets): void => {
		if (result === null) {
			return;
		}
		
		const { key, type, asset } = result;
		
		if (type === Definition.AssetType.Image) {
			dispatch(setImageAsset({ key: key, value: asset }));
		} else if (type === Definition.AssetType.Audio) {
			dispatch(setAudioAsset({ key: key, value: asset }));
		} else if (type === Definition.AssetType.JSON) {
			dispatch(setJsonAsset({ key: key, value: asset }));
		}

		dispatch(setLoadedAssetsCount({ count: loadedAssetsCount + 1 }));
	};
	
	// ReactJS useEffect hook for initialization
	useEffect(() => {
		Methods.log("GAME INITIALIZED");
		Methods.log(`Number of assets to load: ${totalAssetsCount}`);
		Methods.log(`Image files: ${Object.keys(Definition.IMAGES).length}`);
		Methods.log(`Audio files: ${Object.keys(Definition.AUDIOS).length}`);
		Methods.log(`JSON files: ${Object.keys(Definition.JSON_MAP).length}`);
		
		loadAllAssets();
	}, []);
	
	useEffect(() => {
		processPreload(loadAsset);
	}, [loadAsset]);
	
	if (!loadingScreenShown) {
		// Do not show if load is complete
		
		return null;
	}
	
	// Percentage of loaded assets (Used for progress bar)
	const loadPercentage: number =
		Math.floor(loadedAssetsCount / totalAssetsCount * 100);

	// Class name to add while Fading-out
	const fadeOutClassName: string = "loading-screen-fade-out"
	
	// Default class name
	let loadingScreenClassName: string = "loading-screen";
	
	if (loadedAssetsCount >= totalAssetsCount) {
		loadingScreenClassName += ` ${fadeOutClassName}`;
	}
	
	// Render
	return (
		<div
			className={loadingScreenClassName}
			style={{
				"--value": `${loadPercentage}%`
			} as Definition.CSSProperties}
			onClick={(evt: React.MouseEvent): void => {
				evt.stopPropagation();
			}}
			onAnimationEnd={(evt: React.AnimationEvent): void => {
				if (evt.animationName === fadeOutClassName) {
					setLoadingScreenShown(false);
				}
			}}>
			<div className="progress"></div>
		</div>
	);
}

