/* eslint-disable no-const-assign */
// Babylon imports
import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import '@babylonjs/loaders';
import '@babylonjs/inspector';
import '@babylonjs/materials';

// utils imports
import { Material, Texture } from '@babylonjs/core';
import { AdvancedDynamicTexture } from '@babylonjs/gui';
import { clearPage } from '../../utils/render';

// assets imports
import leftArrow from '../../assets/img/left_arrow.png';
import rightArrow from '../../assets/img/right_arrow.png';
import sealAsset from '../../assets/3Dmodels/seal_animated.glb';
import pandaImport from '../../assets/texture/Seal_ColorMap_Panda.png';
import tigerImport from '../../assets/texture/fur.jpg';
import guiButtonsStore from '../../assets/guiStoreButtons.json';

const textureArray = [pandaImport, tigerImport];
const createScene = async () => {
  const game = document.getElementById('game');
  const newCanvas = document.createElement('canvas');
  newCanvas.id = 'renderCanvas';
  newCanvas.style = `
    width: 50%;
    height:50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;
  // newCanvas.innerHTML = `
  // <div id="guiStore" ">`
  game.appendChild(newCanvas);
  const canvas = document.getElementById('renderCanvas');
  const engine = new BABYLON.Engine(canvas, true);
  const scene = new BABYLON.Scene(engine);

  // This creates and positions a free camera (non-mesh)
  const camera = new BABYLON.ArcRotateCamera(
    'camera',
    0,
    Math.PI / 2,
    10,
    BABYLON.Vector3.Zero(),
    scene,
  );

  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  const sealMeshImport = await BABYLON.SceneLoader.ImportMeshAsync(null, sealAsset, null, scene);
  const seal = sealMeshImport.meshes[1];
  seal.parent = null;
  seal.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
  console.log(seal);

  const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('GUI', true, scene);
  const loadedGui = advancedTexture.parseSerializedObject(guiButtonsStore, true);
  advancedTexture.addControl(loadedGui);
  console.log('descendant', advancedTexture.getDescendants());
  const nextSkin = advancedTexture.getControlByName('nextSkin');
  nextSkin.onPointerClickObservable.add(()=>{
      console.log('nextSkin');
      const currentTexture = seal.material.getActiveTextures();
      console.log('currentTexture', currentTexture);
      const currentTextureIndex = textureArray.indexOf(currentTexture);
      console.log('currentTextureIndex', currentTextureIndex);
      const nextTextureIndex = (currentTextureIndex + 1) % textureArray.length;
      console.log('nextTextureIndex', nextTextureIndex);
      seal.material = textureArray[nextTextureIndex];
    }
  );

  const previousSkin = advancedTexture.getControlByName('previousSkin');
  previousSkin.onPointerClickObservable.add(() => {
      console.log('previousSkin');
      const currentTexture = seal.material.getActiveTextures();
      console.log('currentTexture', currentTexture);
      console.log('currentTexture0', currentTexture[0]);
      console.log('currentTexture0.name', currentTexture[0].name);
      const currentTextureIndex = textureArray.indexOf(currentTexture);
      console.log('currentTextureIndex', currentTextureIndex);
      const previousTextureIndex =
        (currentTextureIndex - 1 < 0 ? textureArray.length-1 : currentTexture-1) % textureArray.length;
      console.log('nextTextureIndex', previousTextureIndex);
      const prevSkin = new Material("prevSkin",scene)
      const nextTexture = new Texture(textureArray[previousTextureIndex],scene)
      prevSkin.diffuseTexture = nextTexture
      seal.material = prevSkin;
  });

  // Shift to enable inspector
  window.addEventListener('keydown', (ev) => {
    console.log(ev);
    if (ev.shiftKey) {
      if (scene.debugLayer.isVisible()) {
        scene.debugLayer.hide();
      } else {
        scene.debugLayer.show();
      }
    }
  });
  return scene;
};

const StorePage = async () => {
  clearPage();
  const scene = await createScene();
  const engine = scene.getEngine();
  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener('resize', () => {
    engine.resize();
  });
};

export default StorePage;
