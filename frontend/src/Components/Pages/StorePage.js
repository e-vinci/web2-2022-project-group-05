/* eslint-disable no-use-before-define */
/* eslint-disable no-const-assign */
// Babylon imports
import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import '@babylonjs/loaders';
import '@babylonjs/inspector';
import '@babylonjs/materials';

// utils imports
import { StandardMaterial, Texture } from '@babylonjs/core';
import { clearPage, renderHomeButton } from '../../utils/render';
import { isAuthenticated, getAuthenticatedUser } from '../../utils/auths';

// assets imports
import leftArrow from '../../assets/img/left_arrow.png';
import rightArrow from '../../assets/img/right_arrow.png';
import sealAsset from '../../assets/3Dmodels/seal_animated.glb';
import pandaImport from '../../assets/texture/Seal_ColorMap_Panda.png';
import tigerImport from '../../assets/texture/Seal_ColorMap_Tiger.png';
import baseImport from '../../assets/texture/Seal_ColorMap_Base.png';
import guiButtonsStore from '../../assets/img/storeGUI.json';
import moneyBag from '../../assets/img/moneybagstore.png';
import Navigate from '../Router/Navigate';

const createScene = async () => {
  // get current user
  const currentUser = await getCurrentUser();
  // get current skin from the connected user
  const currentSkinFromCurrentUser = await getCurrentSkinFromUser(currentUser);
  console.log('CURRENT SKIN', currentSkinFromCurrentUser);
  let currentTexture = currentSkinFromCurrentUser.name;
  
  // create Page elements
  clearPage();

  const game = document.querySelector('main');
  
  const button = renderHomeButton();
  
  game.innerHTML += button;

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

  game.appendChild(newCanvas);

  // add event listeners
  const homeButton = document.querySelector('#home-button');
  homeButton.addEventListener('click', () => {
    Navigate('/');
  });

  const engine = new BABYLON.Engine(newCanvas, true);
  const newScene = new BABYLON.Scene(engine);

  const tigerSkin = new Texture(tigerImport, newScene);
  const pandaSkin = new Texture(pandaImport, newScene);
  const baseSkin = new Texture(baseImport, newScene);
  tigerSkin.uAng = Math.PI;
  pandaSkin.uAng = Math.PI;
  baseSkin.uAng = Math.PI;

  const tiger = new StandardMaterial('tiger', newScene);
  const panda = new StandardMaterial('panda', newScene);
  const seal = new StandardMaterial('seal', newScene);
  tiger.backFaceCulling = false;
  panda.backFaceCulling = false;
  seal.backFaceCulling = false;
  tiger.lightmapTexture = tigerSkin;
  panda.lightmapTexture = pandaSkin;
  seal.lightmapTexture = baseSkin;
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
  sealMesh.material =
    materialArray[materialArray.findIndex((material) => material.name === currentTexture)];

  const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('GUI', true, newScene);
  const loadedGui = advancedTexture.parseSerializedObject(guiButtonsStore, true);
  advancedTexture.addControl(loadedGui);
console.log('LOADED GUI', advancedTexture.getDescendants());
  // current skin name
  const skinName = advancedTexture.getControlByName('skinName');
  skinName.text = currentSkinFromCurrentUser.name.substring(0, 1).toUpperCase() + currentSkinFromCurrentUser.name.substring(1);

  // buy button
  const buyBtn = advancedTexture.getControlByName('buyButton');
  buyBtn.children[0].source = moneyBag;
  buyBtn.children[1].text = 'Owned';
  buyBtn.onPointerClickObservable.add(() => {
    if (!isAuthenticated()) Navigate('/login');
    if (currentSkinFromCurrentUser.name !== currentTexture){
      if(buySkin(currentUser, currentTexture)) {
        buyBtn.children[1].text = 'Owned';
        balance.text = currentUser.balance;
      };
    };
  });

  // user balance
  const balance = advancedTexture.getControlByName('Textblock');
  balance.text = isAuthenticated() ? `Balance : ${currentUser.balance}` : `Balance : 0`;

  // next skin
  console.log('descendant', advancedTexture.getDescendants());
  const nextSkin = advancedTexture.getControlByName('nextSkin');
  nextSkin.onPointerClickObservable.add(async () => {
    const currentTextureIndex = materialArray.findIndex(
      (material) => material.name === currentTexture,
    );
    const nextTextureIndex = (currentTextureIndex + 1) % materialArray.length;

    sealMesh.material = materialArray[nextTextureIndex];
    currentTexture = sealMesh.material.name;

    skinName.text = (currentTexture.substring(0, 1).toUpperCase() + currentTexture.substring(1));
    if (currentUser.skins.includes(currentTexture)){
      buyBtn.children[1].text = 'Owned';
      buyBtn.disabled = true;
    } 
    else {
      const price = await getSkinPrice(currentTexture);
      buyBtn.children[1].text = `${price}`;
    }
  });

  // previous skin
  const previousSkin = advancedTexture.getControlByName('previousSkin');
  previousSkin.onPointerClickObservable.add(async () => {
    const currentTextureIndex = materialArray.findIndex(
      (material) => material.name === currentTexture,
    );

    const previousTextureIndex =
      currentTextureIndex - 1 < 0 ? materialArray.length - 1 : currentTextureIndex - 1;

    sealMesh.material = materialArray[previousTextureIndex];
    currentTexture = sealMesh.material.name;

    skinName.text = currentTexture;
    if (currentUser.skins.includes(currentTexture)) buyBtn.children[1].text = 'Owned';
    else {
      const price = await getSkinPrice(currentTexture);
      buyBtn.children[1].text = `${price}`;
    }
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

// get connected user
async function getCurrentUser() {
  const user = getAuthenticatedUser();
  const responseUser = await fetch(
    `${process.env.API_BASE_URL}/users/user?username=${user.username}`,
  );
  const userData = await responseUser.json();

  return userData;
}

async function getCurrentSkinFromUser(user) {
  const responseSkin = await fetch(
    `${process.env.API_BASE_URL}/skins/skinName?name=${user.currentSkin}`,
  );
  if (!responseSkin.ok)
    throw new Error(`fetch error : ${responseSkin.status} : ${responseSkin.statusText}`);
  const skin = responseSkin.json();
  return skin;
}

async function getSkinPrice(name) {
  const responseSkin = await fetch(`${process.env.API_BASE_URL}/skins/skinName?name=${name}`);
  if (!responseSkin.ok)
    throw new Error(`fetch error : ${responseSkin.status} : ${responseSkin.statusText}`);
  const skin = await responseSkin.json();
  return skin.price;
}

/* async function getSkins() {
  const response = await fetch('${process.env.API_BASE_URL}/skins');
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
 */

async function buySkin(user, skinName) {
  // get skin to buy
  const responseSkinToBuy = await fetch(
    `${process.env.API_BASE_URL}/skins/skinName?name=${skinName}`,
  );
  if (!responseSkinToBuy.ok)
    throw new Error(`fetch error : ${responseSkinToBuy.status} : ${responseSkinToBuy.statusText}`);

  const skinToBuy = await responseSkinToBuy.json();

  // verify if the user have enough money
  if (user.balance < skinToBuy.price) return false;

  
 await addSkinToUser(user,skinToBuy);
 await updateUserBalance(user,skinToBuy);
 await changeCurrentSkin(user,skinToBuy);

 return true;
}

// add skin tu user skin list
async function addSkinToUser(user, skinToBuy){
  const responseAddingSkinToUser = await fetch(
    `${process.env.API_BASE_URL}/users/skins?username=${user.username}`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        name: skinToBuy.name,
      }),
      credentials: 'include',
      mode:'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!responseAddingSkinToUser.ok)
    throw new Error(`fetch error : ${responseAddingSkinToUser.status} : ${responseAddingSkinToUser.statusText}`);
}

// remove money to user balance
async function updateUserBalance(user,skinToBuy){
 const response = await fetch(
  `${process.env.API_BASE_URL}/users/balance?username=${user.username}`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        balance: skinToBuy.price,
        operator:"-"
      }),
      credentials: 'include',
      mode:'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok)
  throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
}

// change current skin to the new one
async function changeCurrentSkin(user, skin){
  const response = await fetch(
    `${process.env.API_BASE_URL}/users/currentSkin?username=${user.username}`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        name: skin.name,
      }),
      credentials: 'include',
      mode:'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok)
    throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

}

// render page 
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
