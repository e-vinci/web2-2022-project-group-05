/* eslint-disable no-use-before-define */
/* eslint-disable no-const-assign */
// Babylon imports
import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import '@babylonjs/loaders';
import '@babylonjs/inspector';
import '@babylonjs/materials';

// utils imports
import { Material, StandardMaterial, Texture } from '@babylonjs/core';
import { AdvancedDynamicTexture } from '@babylonjs/gui';
import { clearPage } from '../../utils/render';

// assets imports
import leftArrow from '../../assets/img/left_arrow.png';
import rightArrow from '../../assets/img/right_arrow.png';
import sealAsset from '../../assets/3Dmodels/seal_animated.glb';
import pandaImport from '../../assets/texture/Seal_ColorMap_Panda.png';
import tigerImport from '../../assets/texture/Seal_ColorMap_Tiger.png';
import baseImport from '../../assets/texture/Seal_ColorMap_Base.png'
import guiButtonsStore from '../../assets/guiStoreButtons.json';

// TODO get current user texture

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
  clearPage();
  game.appendChild(newCanvas);
  const engine = new BABYLON.Engine(newCanvas, true);
  const newScene = new BABYLON.Scene(engine);


let currentTexture = 'seal'
const tigerSkin = new Texture(tigerImport,newScene)
const pandaSkin = new Texture(pandaImport,newScene)
const baseSkin = new Texture(baseImport,newScene)
tigerSkin.uAng= Math.PI
pandaSkin.uAng= Math.PI
baseSkin.uAng= Math.PI

const tiger = new StandardMaterial('tiger',newScene)
const panda = new StandardMaterial('panda',newScene)
const seal = new StandardMaterial('seal',newScene)
tiger.backFaceCulling =false;
panda.backFaceCulling =false;
seal.backFaceCulling =false;
tiger.lightmapTexture = tigerSkin
panda.lightmapTexture = pandaSkin
seal.lightmapTexture = baseSkin
const materialArray = [seal, panda, tiger];


  // This creates and positions a free camera (non-mesh)
  const camera = new BABYLON.ArcRotateCamera(
    'camera',
    0,
    Math.PI / 2,
    10,
    BABYLON.Vector3.Zero(),
    newScene,
  );

  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  // This attaches the camera to the canvas
  camera.attachControl(newCanvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), newScene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Seal
  const sealMeshImport = await BABYLON.SceneLoader.ImportMeshAsync(null, sealAsset, null, newScene);
  const sealMesh = sealMeshImport.meshes[1];
  sealMesh.parent = null;
  sealMesh.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
  // set skin to current skin
  sealMesh.material = materialArray[materialArray.findIndex((material)=>material.name===currentTexture)] 
  console.log('seal 1',sealMesh);


  const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('GUI', true, newScene);
  const loadedGui = advancedTexture.parseSerializedObject(guiButtonsStore, true);
  advancedTexture.addControl(loadedGui);
  
  // next skin 
  console.log('descendant', advancedTexture.getDescendants());
  const nextSkin = advancedTexture.getControlByName('nextSkin');
  nextSkin.onPointerClickObservable.add(()=>{
      console.log('nextSkin');
      console.log('currentTexture', currentTexture);
      const currentTextureIndex = materialArray.findIndex((material)=>material.name===currentTexture);
      console.log('currentTextureIndex', currentTextureIndex);
      const nextTextureIndex = (currentTextureIndex + 1) % materialArray.length;
      console.log('nextTextureIndex', nextTextureIndex);
      sealMesh.material = materialArray[nextTextureIndex];
      currentTexture = sealMesh.material.name;
    }
  );

  // previous skin
  const previousSkin = advancedTexture.getControlByName('previousSkin');
  previousSkin.onPointerClickObservable.add(() => {
      console.log('previousSkin');
      const currentTextureIndex = materialArray.findIndex((material)=>material.name===currentTexture);
      console.log('currentTextureIndex', currentTextureIndex);
      const previousTextureIndex =(currentTextureIndex - 1 < 0 ? materialArray.length-1 : currentTextureIndex-1);
      console.log('prevTextureIndex', previousTextureIndex);
      sealMesh.material = materialArray[previousTextureIndex];
      currentTexture = sealMesh.material.name;
  });

  // buttons images
  const nextSkinImage = nextSkin.children[0];
  nextSkinImage.source = rightArrow;
  const previousSkinImage = previousSkin.children[0];
  previousSkinImage.source = leftArrow;
  // Shift to enable inspector
  window.addEventListener('keydown', (ev) => {
    console.log(ev);
    if (ev.shiftKey) {
      if (newScene.debugLayer.isVisible()) {
        newScene.debugLayer.hide();
      } else {
        newScene.debugLayer.show();
      }
    }
  });
  return newScene;
};


async function getSkins() {
  const response = await fetch('/api/skins');
  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  const skins = await response.json();
  console.log(skins);
  return skins;
}

// const options = {
  //   method: 'POST',
  //   body: JSON.stringify({
    //     username,
    //     password,
  //   }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // };





const StorePage = async () => {

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
