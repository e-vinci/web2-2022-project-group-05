/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
// import * as BABYLON from '@babylonjs/core';
import {
  Engine,
  Scene,
  Vector3,
  Color3,
  Color4,
  Mesh,
  Texture,
  ArcRotateCamera,
  TransformNode,
  Space,
  Animation,
  AnimationGroup,
  SceneLoader,
  Axis,
  StandardMaterial,
  HemisphericLight,
  MeshBuilder,
  ParticleSystem,
  CubeTexture,
  KeyboardEventTypes,
  KeyboardInfo,
  ActionManager,
  ExecuteCodeAction,
  PointerEventTypes,
  PointerInfo,
  ActionEvent,
  DefaultLoadingScreen,
  SceneOptimizer,
  SceneOptimizerOptions,
  NodeMaterial,
} from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import '@babylonjs/loaders';

// eslint-disable-next-line import/no-extraneous-dependencies
import lottie from 'lottie-web';
import Navigate from '../Router/Navigate';

import { clearPage } from '../../utils/render';
import { isAuthenticated, getAuthenticatedUser } from '../../utils/auths';
import * as tools from '../../utils/tools';

import '@babylonjs/inspector';
import '@babylonjs/materials';
import '@babylonjs/post-processes';
import '@babylonjs/serializers';
import '@babylonjs/procedural-textures';

// assets
import water from '../../assets/3Dmodels/test3.glb';
import vague from '../../assets/vague.json';
import seal from '../../assets/3Dmodels/seal_animated.glb';
import money from '../../assets/3Dmodels/fishMoney.glb';
import importedWaterParticles from '../../assets/waterParticles.json';
import waterTexture from '../../assets/texture/flare.png';
import gameOverMenuURL from '../../assets/img/gameOver.json';
import playIcon from '../../assets/img/play-icon.png';
import restartIcon from '../../assets/img/restart-icon.png';
import homeIcon from '../../assets/img/home-icon.png';
import pauseMenuURL from '../../assets/img/menuPause.json';
import moneyIcon from '../../assets/img/money-icon.png';
import tigerTextureURL from '../../assets/texture/Seal_ColorMap_Tiger.png';
import loadSealURL from '../../assets/img/seal load.json';
import bottleImportUrl from '../../assets/3Dmodels/waterBottle.glb';
import barelImportUrl from '../../assets/3Dmodels/metalBarel.glb';
import iceImportUrl from '../../assets/3Dmodels/ice.glb';
import fishIcon from '../../assets/img/poisson.png';
import moneyJSON from '../../assets/img/moneyInGame.json';

// eslint-disable-next-line camelcase
import sky_px from '../../assets/img/Skybox/SkyboxCut/skybox_px.png';
// eslint-disable-next-line camelcase
import sky_py from '../../assets/img/Skybox/SkyboxCut/skybox_py.png';
// eslint-disable-next-line camelcase
import sky_pz from '../../assets/img/Skybox/SkyboxCut/skybox_pz.png';
// eslint-disable-next-line camelcase
import sky_nx from '../../assets/img/Skybox/SkyboxCut/skybox_nx.png';
// eslint-disable-next-line camelcase
import sky_ny from '../../assets/img/Skybox/SkyboxCut/skybox_ny.png';
// eslint-disable-next-line camelcase
import sky_nz from '../../assets/img/Skybox/SkyboxCut/skybox_nz.png';

import s from '../../assets/store.json'

let startGame;

const createScene = async (scene) => {
  // TODO: rearrange mesh axes
  // Game Assets
  const waterMeshImport = await SceneLoader.ImportMeshAsync(null, water);
  console.log('waterMeshImport', waterMeshImport);

  const waterMesh = waterMeshImport.meshes[1];
  waterMesh.scaling = new Vector3(3, 3, 1.2);

  console.log('here', waterMesh);

  const sealMeshImport = await SceneLoader.ImportMeshAsync(null, seal);
  const sealMesh = sealMeshImport.meshes[1];
  sealMesh.scaling = new Vector3(0.5, 0.5, 0.5);
  sealMesh.parent = null;
  console.log(sealMesh);

  const sealSkin = new StandardMaterial('panda', scene);
  sealSkin.backFaceCulling = false;
  const sealTexture = new Texture(tigerTextureURL, scene);
  sealTexture.uAng = Math.PI;
  sealSkin.lightmapTexture = sealTexture;
  sealMesh.material = sealSkin;

  const moneyImport = await SceneLoader.ImportMeshAsync(null, money, null, scene);
  const moneyMesh = moneyImport.meshes[1];
  moneyMesh.parent = null;
  moneyMesh.scaling = new Vector3(0.3, 0.3, 0.3);
  console.log(moneyMesh);

  const waterParticles = ParticleSystem.Parse(importedWaterParticles, scene, '');
  waterParticles.particleTexture = new Texture(waterTexture);
  waterParticles.emitter = sealMesh;

  const bottleImport = await SceneLoader.ImportMeshAsync(null, bottleImportUrl);
  console.log('bottleImport', bottleImport);
  const bottle = bottleImport.meshes[1];
  bottle.parent = null;
  // bottle.isVisible = false;
  bottle.position.y = 100;

  const barrelImport = await SceneLoader.ImportMeshAsync(null, barelImportUrl);
  console.log('barrelImport', barrelImport);
  const barrel = barrelImport.meshes[1];
  barrel.parent = null;
  // barrel.isVisible = false;
  barrel.position.y = 100;
  barrel.scaling = new Vector3(0.75, 0.75, 0.75);

  const iceImport = await SceneLoader.ImportMeshAsync(null, iceImportUrl);
  console.log('iceImport', iceImport);
  const ice = iceImport.meshes[1];
  ice.scaling = new Vector3(2, 2, 1.8);
  ice.parent = null;
  ice.position.y = 100;

  // Game Variables
  const numberCols = 3;
  const widthCols = 10;
  const sceneWidth = numberCols * widthCols;
  const cameraOffset = 30;
  const spawnStartZ = 20;
  const spawnEndZ = -10;
  let score = 0;
  const maxJumpHeight = 4;
  let moneyCollected = 0;
  let paused = false;
  let dead = false;
  // Create GUI Elements dor score
  const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('scoreUi');

  const UiPanel = new GUI.StackPanel();
  UiPanel.width = '220px';
  UiPanel.fontSize = '14px';
  UiPanel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  UiPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
  advancedTexture.addControl(UiPanel);

  // money + icon + score
  const moneyTexture = advancedTexture.parseSerializedObject(moneyJSON, true);
  UiPanel.addControl(moneyTexture);
  const fishImg = advancedTexture.getControlByName('fish');
  fishImg.source = fishIcon;

  const buttonScore = advancedTexture.getControlByName('score');
  const moneyCount = advancedTexture.getControlByName('money');
  
  // Camera
  // eslint-disable-next-line no-unused-vars
  const camera = new ArcRotateCamera(
    'Camera',
    (3 * -Math.PI) / 5,
    (2 * Math.PI) / 5,
    cameraOffset,
    new Vector3(0, 0, 0),
    scene,
  );
  // camera.attachControl('canvas', true);

  // Light
  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;
  // fonction starting the game

  // skybox
  const skybox = MeshBuilder.CreateBox('skyBox', { size: 1000.0 }, scene);
  const skyboxMaterial = new StandardMaterial('skyBox', scene);
  skyboxMaterial.backFaceCulling = false;
  // eslint-disable-next-line camelcase
  skyboxMaterial.reflectionTexture = new CubeTexture('', scene, null, null, [
    // eslint-disable-next-line camelcase
    sky_px,
    // eslint-disable-next-line camelcase
    sky_py,
    // eslint-disable-next-line camelcase
    sky_pz,
    // eslint-disable-next-line camelcase
    sky_nx,
    // eslint-disable-next-line camelcase
    sky_ny,
    // eslint-disable-next-line camelcase
    sky_nz,
  ]);
  skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
  skyboxMaterial.specularColor = new Color3(0, 0, 0);
  skybox.material = skyboxMaterial;

  // Move the seal upward 1/2 its height
  console.log(sealMesh);
  sealMesh.position.y = 1 / 2;

  // ScoreZone
  const scoreZone = MeshBuilder.CreatePlane('scoreZone', {
    size: sceneWidth,
    updatable: false,
    sideOrientation: Mesh.DOUBLESIDE,
  });
  scoreZone.position.z -= sealMesh.absoluteScaling.z;
  scoreZone.isVisible = false;
  startGame = () => {
    // TODO extract animation from StartGame function
    // TODO extract input logic from StartGame function
    // Spawn Animations
    // Jump
    const frameRate = 10;

    const ySlide = new Animation(
      'ySlide',
      'position.y',
      frameRate,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CONSTANT,
    );

    const kf1 = {
      frame: 0.1 * frameRate,
      value: -1 / 2,
    };
    const kf2 = {
      frame: 0.4 * frameRate,
      value: -7,
    };
    const kf3 = {
      frame: 1.5 * frameRate,
      value: 1 / 2,
    };
    const keyFrames = [kf1, kf2, kf3];

    ySlide.setKeys(keyFrames);

    // AnimationGroup
    const jump = new AnimationGroup('jump');
    jump.addTargetedAnimation(ySlide, sealMesh);

    // Spawns
    const spawns = [];
    const spawn1 = new Vector3(-widthCols, 1, spawnStartZ);
    const spawn2 = new Vector3(0, 1, spawnStartZ);
    const spawn3 = new Vector3(widthCols, 1, spawnStartZ);
    // used to avoid money and target to spaxn at the same place
    let lastUsedSpawn;
    spawns.push(spawn1, spawn2, spawn3);

    // Obstacles
    const obstacles = [];

    obstacles.push(barrel, bottle, ice);

    // Money
    moneyMesh.visibility = false;
    moneyMesh.position.y = 100;

    const currentAnimsRunning = [];

    // Handle obstacles spawn
    let obstacle;
    const obstacleTargets = [];
    let obstaclesSpawn = setInterval(spawnObstacle, 800, obstacle);

    // Handle money spawn
    const money = new Mesh();
    const moneyTargets = [];
    let moneySpawn = setInterval(spawnMoney, 1000, money);

    function spawnMoney(target) {
      // set a random spawn position as startPosition
      let startPosition = spawns[tools.getRandomInt(spawns.length)];
      // avoid money to spawn at the same place as the last obstacle
      while (startPosition === lastUsedSpawn) {
        startPosition = spawns[tools.getRandomInt(spawns.length)];
      }
      // endPosition = startPoition with different z index
      const endPosition = startPosition.clone();
      endPosition.z = spawnEndZ;

      // create a clone of a the moneyMesh as target
      target = moneyMesh.clone('target');
      moneyTargets.push(target);
      // adjust target parameters
      target.position = startPosition;
      target.visibility = true;
      // add to targets

      // animation rotation aleatoire

      const animRotate = Animation.CreateAndStartAnimation(
        'ani',
        target,
        'rotation',
        30,
        100,
        Vector3.Zero(),
        new Vector3(0, 2 * Math.PI, 0),
        Animation.ANIMATIONLOOPMODE_CONSTANT,
      );

      currentAnimsRunning.push(animRotate);
      // animation spawn
      const animMoney = Animation.CreateAndStartAnimation(
        'anim',
        target,
        'position',
        30,
        100,
        startPosition,
        endPosition,
        Animation.ANIMATIONLOOPMODE_CONSTANT,
        null,
        // on animation end
        () => {
          // detruit le target
          target.dispose();
        },
      );
      currentAnimsRunning.push(animMoney);
      // on Seal collide
      target.actionManager = new ActionManager();
      target.actionManager.registerAction(
        new ExecuteCodeAction(
          {
            trigger: ActionManager.OnIntersectionEnterTrigger,
            parameter: sealMesh,
            usePreciseIntersection: false,
          },
          () => {
            moneyCollected++;
            moneyCount.text = `${moneyCollected}`;
            target.dispose();
          },
        ),
      );
    }

    function spawnObstacle(target) {
      // set a random spawn position as startPosition
      const startPosition = spawns[tools.getRandomInt(spawns.length)];
      lastUsedSpawn = startPosition;
      // endPosition = startPoition with different z index
      const endPosition = startPosition.clone();
      endPosition.z = spawnEndZ;

      // create a clone of a random obstacle as target
      target = obstacles[tools.getRandomInt(obstacles.length)].clone('target');

      // adjust target parameters
      // let x = new Scene();
      target.position = startPosition;
      target.position.y = target.absoluteScaling.y / 2;
      target.visibility = true;
      // add to targets
      obstacleTargets.push(target);

      // animation spawn
      const obstacleAnim = Animation.CreateAndStartAnimation(
        'anim',
        target,
        'position',
        30,
        100,
        startPosition,
        endPosition,
        Animation.ANIMATIONLOOPMODE_CONSTANT,
        null,
        // on animation end
        () => {
          // detruit le target
          target.dispose();
        },
      );
      currentAnimsRunning.push(obstacleAnim);

      // on seal collide
      target.actionManager = new ActionManager();
      target.actionManager.registerAction(
        new ExecuteCodeAction(
          {
            trigger: ActionManager.OnIntersectionEnterTrigger,
            parameter: sealMesh,
            usePreciseIntersection: true,
          },
          () => {
            // stop obstacles spawn
            dead = true;
            clearInterval(obstaclesSpawn);
            clearInterval(moneySpawn);
            // destroy every other obstacle
            for (let i = 0; i < obstacleTargets.length; i++) {
              obstacleTargets[i]?.dispose();
            }
            for (let i = 0; i < moneyTargets.length; i++) {
              moneyTargets[i]?.dispose();
            }
            // seal dispose
            sealMesh.dispose();

            if (isAuthenticated()) {
              // update user score
              console.log('user logged');
              scoreLoggedPlayer(score);
              // add money to user balance
              addMoneyToBalance(moneyCollected);
            } else console.log('no user logged in');

            // display game over menu
            getGameOverMenu(scene, score, getAuthenticatedUser());
          },
        ),
      );

      // quand scoreZone toucher...
      target.actionManager.registerAction(
        new ExecuteCodeAction(
          {
            trigger: ActionManager.OnIntersectionExitTrigger,
            parameter: scoreZone,
            usePreciseIntersection: true,
          },
          () => {
            score++;
            buttonScore.text = `Score : ${score}`;
          },
        ),
      );
    }
    //  Sphere mouvement
    let isMoving = false;
    // Create the pause GUI menu
    let pauseCanvas;

    scene.onKeyboardObservable.add((kbInfo) => {
      if (isMoving) return;
      if (!dead) {
        switch (kbInfo.type) {
          case KeyboardEventTypes.KEYDOWN:
            switch (kbInfo.event.key) {
              case 'Escape':
                if (!paused) {
                  paused = true;
                  pauseCanvas = getPausedMenu(scene);
                  for (let i = 0; i < currentAnimsRunning.length; i++) {
                    currentAnimsRunning[i]?.pause();
                  }
                  clearInterval(obstaclesSpawn);
                  clearInterval(moneySpawn);
                  waterParticles.stop();
                } else {
                  paused = false;
                  pauseCanvas.dispose();
                  for (let i = 0; i < currentAnimsRunning.length; i++) {
                    scene?.dispose();
                    currentAnimsRunning[i]?.restart();
                  }
                  waterParticles.start();
                  console.log(obstaclesSpawn);
                  console.log(moneySpawn);
                  obstaclesSpawn = setInterval(spawnObstacle, 800, obstacle);
                  moneySpawn = setInterval(spawnMoney, 1000, money);
                }

                console.log(paused);
                break;
              default:
                break;
            }
            if (!paused) {
              switch (kbInfo.event.key) {
                case 'd':
                case 'D':
                case 'ArrowRight':
                  kbInfo.event.preventDefault();
                  if (sealMesh.position.x !== widthCols) {
                    isMoving = true;
                    Animation.CreateAndStartAnimation(
                      'slideRight',
                      sealMesh,
                      'position.x',
                      10,
                      2,
                      sealMesh.position.x,
                      sealMesh.position.x + widthCols,
                      Animation.ANIMATIONLOOPMODE_CONSTANT,
                      null,
                      () => (isMoving = false),
                    );
                  }
                  break;
                case 'q':
                case 'Q':
                case 'ArrowLeft':
                  kbInfo.event.preventDefault();
                  if (sealMesh.position.x !== -widthCols) {
                    isMoving = true;
                    Animation.CreateAndStartAnimation(
                      'slideLeft',
                      sealMesh,
                      'position.x',
                      10,
                      2,
                      sealMesh.position.x,
                      sealMesh.position.x - widthCols,
                      Animation.ANIMATIONLOOPMODE_CONSTANT,
                      null,
                      () => (isMoving = false),
                    );
                  }
                  break;
                case 's':
                case 'S':
                case 'ArrowDown':
                  kbInfo.event.preventDefault();
                  if (sealMesh.position.y < maxJumpHeight) {
                    waterParticles.stop();
                    isMoving = true;
                    // start animation
                    jump.play().onAnimationGroupEndObservable.add(() => {
                      isMoving = false;
                      waterParticles.start();
                    });
                  }
                  break;
                default:
                  break;
              }
            }
            break;
          default:
            break;
        }
      }
    });
  };
  return scene;
};

const GamePage = async () => {
  clearPage();
  const game = document.querySelector('main');
  const canvas = document.createElement('canvas');
  canvas.id = 'renderCanvas';
  game.appendChild(canvas);
  let engine = new Engine(canvas, true, null, true);
  let scene = new Scene(engine);
  scene.detachControl();
  const loadingCanvas = document.createElement('div');
  loadingCanvas.id = 'loadingCanvas';
  const text = 'Loading...';
  const bgColor = `rgb(${tools.getRandomIntBetween(0, 255)},${tools.getRandomIntBetween(
    0,
    255,
  )},${tools.getRandomIntBetween(0, 255)})`;
  const loadingScreen = new CustomLoadingScreen(loadingCanvas, text, bgColor);
  // TODO chercher info sur ca ...bon pour perf?
  scene.useDelayedTextureLoading = true;
  loadingScreen.displayLoadingUI();
  scene = await createScene(scene);
  SceneOptimizer.OptimizeAsync(scene, SceneOptimizerOptions.ModerateDegradationAllowed());
  scene.executeWhenReady(() => {
    loadingScreen.hideLoadingUI();
    scene.attachControl();
    canvas.focus();
    startGame();
  }, true);

  engine = scene.getEngine();

  engine.runRenderLoop(() => {
    scene.render();
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
  window.addEventListener('resize', () => {
    engine.resize();
  });
};

async function scoreLoggedPlayer(score) {
  const user = getAuthenticatedUser();
  console.log(`Updating score for ${user.username}:${score} (if higher than highscore)`);

  const res = await fetch(`${process.env.API_BASE_URL}/users/highscore?username=${user.username}`, {
    method: 'PATCH',
    body: JSON.stringify({
      highscore: score,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error(`fetch error : ${res.status} : ${res.statusText}`);
}

async function addMoneyToBalance(money) {
  const user = getAuthenticatedUser();
  console.log(`adding money to ${user.username}'s balance :${money}`);

  const res = await fetch(`${process.env.API_BASE_URL}/users/balance?username=${user.username}`, {
    method: 'PATCH',
    body: JSON.stringify({
      balance: money,
      operator: '+',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error(`fetch error : ${res.status} : ${res.statusText}`);
}

// create GUI element for end game
async function getGameOverMenu(scene, score, user = undefined) {
  console.log(gameOverMenuURL);
  const gameOverMenu = GUI.AdvancedDynamicTexture.CreateFullscreenUI('GUI', true, scene);
  gameOverMenu.parseSerializedObject(gameOverMenuURL, true);

  const currentScore = gameOverMenu.getControlByName('YourScoreData');
  currentScore.text = `${score}`;

  const highscore = gameOverMenu.getControlByName('Highscore');
  const highscoreData = gameOverMenu.getControlByName('HighscoreData');

  if (isAuthenticated()) {
    try {
      highscore.text = 'Highest score :';
      const res = await fetch(
        `${process.env.API_BASE_URL}/users/user?username=${getAuthenticatedUser().username}`,
      );
      if (!res.ok) throw new Error(`fetch error : ${res.status} : ${res.statusText}`);
      const user = await res.json();

      user.then((a) => (highscoreData.text = a.highscore));
    } catch (err) {
      console.error('GET Highscore error :', err);
    }
  } else {
    highscore.text = 'Log in to get your highest score !';
    highscoreData.text = '';
  }

  const storeImg = gameOverMenu.getControlByName('Image');
  storeImg.source = moneyIcon;
  storeImg.parent.onPointerClickObservable.add(() => {
    scene?.dispose();
    Navigate('/ranking'); // store doesn't exist ?
  });

  const tryAgain = gameOverMenu.getControlByName('TryAgain');
  tryAgain.onPointerClickObservable.add(() => {
    scene?.dispose();
    GamePage();
  });

  const goBackHome = gameOverMenu.getControlByName('GoBackHome');
  goBackHome.onPointerClickObservable.add(() => {
    scene?.dispose();
    Navigate('/');
  });

  // const endGamePanel = adt.getControlByName('endGamePanel');
  // const endGameButton = adt.getControlByName('endGameButton');
  // endGameButton.onPointerClickObservable.add(()=>{
  //   endGamePanel.isVisible = false;
  //   scene.dispose();
  //   scene.getEngine().dispose();
  //   createScene();
  // })
  return gameOverMenu;
}

// create GUI element for pause game
function getPausedMenu(scene) {
  console.log(pauseMenuURL);
  const pauseMenu = GUI.AdvancedDynamicTexture.CreateFullscreenUI('GUI', true, scene);

  pauseMenu.parseSerializedObject(pauseMenuURL, true);
  const restartBtn = pauseMenu.getControlByName('ButtonRestart');
  restartBtn.children[0].source = restartIcon;
  restartBtn.onPointerClickObservable.add(() => {
    scene?.dispose();
    GamePage();
  });

  const homeBtn = pauseMenu.getControlByName('ButtonHome');
  homeBtn.children[0].source = homeIcon;
  homeBtn.onPointerClickObservable.add(() => {
    scene.dispose();
    Navigate('/');
  });

  const resumeBtn = pauseMenu.getControlByName('ButtonResume');
  resumeBtn.children[0].source = playIcon;
  resumeBtn.onPointerClickObservable.add(() => {
    // cringe
  });

  // const endGamePanel = adt.getControlByName('endGamePanel');
  // const endGameButton = adt.getControlByName('endGameButton');
  // endGameButton.onPointerClickObservable.add(()=>{
  //   endGamePanel.isVisible = false;
  //   scene.dispose();
  //   scene.getEngine().dispose();
  //   createScene();
  // })
  return pauseMenu;
}

function CustomLoadingScreen(container, text, color) {
  this.loadingUIText = text;
  this.loadingUIBackgroundColor = color;
  this.loadingUIContainer = container;
}
// CustomLoadingScreen.prototype.displayLoadingUI = () => {
//   alert(this.loadingUIText);
// };

CustomLoadingScreen.prototype.displayLoadingUI = function() {
  this.loadingUIContainer.innerHTML = `
  <div id="loadingAnimationDiv">
  </div> 
  <div id="loadingText">
  ${this.loadingUIText}
  </div>`;
  // TODO change to tailwind
  this.loadingUIContainer.style = `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${this.loadingUIBackgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  font-size: 50px;
  font-family: Arial;
`;
  document.body.appendChild(this.loadingUIContainer);
  const loadingAnimation = lottie.loadAnimation({
    container: document.getElementById('loadingAnimationDiv'),
    renderer: 'svg',
    animationData: loadSealURL,
  });
  // start the animation after the DOM correctly charged
  loadingAnimation.addEventListener('DOMLoaded', () => {
    loadingAnimation.play();
  });

  // eslint-disable-next-line func-names
  // alert("add")
};

// eslint-disable-next-line func-names
CustomLoadingScreen.prototype.hideLoadingUI = function() {
  // alert("remove")
  document.getElementById(this.loadingUIContainer.id).remove();
};
export default GamePage;
