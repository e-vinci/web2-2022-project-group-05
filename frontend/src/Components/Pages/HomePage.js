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
NodeMaterial
} from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import '@babylonjs/loaders';

import { clearPage } from '../../utils/render';
import { isAuthenticated, getAuthenticatedUser } from '../../utils/auths';

import '@babylonjs/inspector';
import '@babylonjs/materials';
import '@babylonjs/post-processes';
import '@babylonjs/serializers';
import '@babylonjs/procedural-textures';

import * as tools from '../../utils/tools';

// assets
import water from '../../assets/3Dmodels/test3.glb';
import vague from '../../assets/vague.json'
import seal from '../../assets/3Dmodels/seal_animated.glb';
import money from '../../assets/3Dmodels/fishMoney.glb';
import importedWaterParticles from '../../assets/waterParticles.json';
import waterTexture from '../../assets/texture/flare.png';
import gameOverMenuURL from '../../assets/img/GameOver.json'

// eslint-disable-next-line camelcase
import sky_px from '../../assets/img/Skybox/Daylight_Box_Pieces/Daylight_Box_px.bmp';
// eslint-disable-next-line camelcase
import sky_py from '../../assets/img/Skybox/Daylight_Box_Pieces/Daylight_Box_py.bmp';
// eslint-disable-next-line camelcase
import sky_pz from '../../assets/img/Skybox/Daylight_Box_Pieces/Daylight_Box_pz.bmp';
// eslint-disable-next-line camelcase
import sky_nx from '../../assets/img/Skybox/Daylight_Box_Pieces/Daylight_Box_nx.bmp';
// eslint-disable-next-line camelcase
import sky_ny from '../../assets/img/Skybox/Daylight_Box_Pieces/Daylight_Box_ny.bmp';
// eslint-disable-next-line camelcase
import sky_nz from '../../assets/img/Skybox/Daylight_Box_Pieces/Daylight_Box_nz.bmp';

let startGame;

const createScene = async (scene) => {

  // TODO: rearrange mesh axes
  // Game Assets
  const waterMeshImport = await SceneLoader.ImportMeshAsync(null, water, null, scene);
  console.log('waterMeshImport', waterMeshImport);
  // waterMeshImport.meshes[2].dispose();
  const waterMesh = waterMeshImport.meshes[1];
  waterMesh.scaling = new Vector3(3, 3, 1.2);

  // waterMeshImport.dispose()

  console.log('here', waterMesh);
  // waterMesh.position = new BABYLON.Vector3(0, 0, 0);
  // waterMesh.rotate(Axis.Y, -Math.PI / 2, Space.WORLD);
  // waterMesh.isVisible = true;
  // waterMesh.isPickable = true;
  // waterMesh.checkCollisions = true;
  // waterMesh.receiveShadows = true;
  // waterMesh.name = 'water';
  // waterMesh.material = new BABYLON.StandardMaterial('water', scene);
  // waterMesh.material.diffuseColor = new BABYLON.Color3(0, 0, 1);
  // waterMesh.material.specularColor = new BABYLON.Color3(0, 0, 1);
  // waterMesh.material.emissiveColor = new BABYLON.Color3(0, 0, 1);
  // waterMesh.material.ambientColor = new BABYLON.Color3(0, 0, 1);
  // waterMesh.material.alpha = 0.3;
  // waterMesh.material.backFaceCulling = false;
  // waterMesh.material.freeze();
  // waterMesh.freezeWorldMatrix();
  // waterMesh.freezeNormals();
  // waterMesh.freeze();
  // waterMesh.isPickable = true;
  // const direction=waterMesh.getDirection()
  // console.log("direction",direction);
  
  // const waterMaterial = NodeMaterial.Parse(vague,scene);
  // console.log("waterMaterial",waterMaterial);
  // waterMesh.material=waterMaterial;

  const sealMeshImport = await SceneLoader.ImportMeshAsync(null, seal, null, scene);
  const sealMesh = sealMeshImport.meshes[1];
  sealMesh.parent = null;
  sealMesh.scaling = new Vector3(0.5, 0.5, 0.5);
  console.log(sealMesh);

  const moneyImport = await SceneLoader.ImportMeshAsync(null,money,null,scene)
  const moneyMesh = moneyImport.meshes[1];
  moneyMesh.parent = null;
  moneyMesh.scaling = new Vector3(0.5, 0.5, 0.5);
  console.log(moneyMesh);

  const waterParticles = ParticleSystem.Parse(importedWaterParticles, scene, '');
  waterParticles.particleTexture = new Texture(waterTexture);
  waterParticles.emitter = sealMesh;

  

  // scene.beginAnimation(sealMesh.skeleton, 0, 100, true, 1.0);
  // sealMesh.rotate(BABYLON.Axis.Y, -Math.PI/2, BABYLON.Space.WORLD);
  // sealMesh.position = new BABYLON.Vector3(0, 0, 0);
  // sealMesh.scaling = new BABYLON.Vector3(1, 1, 1);
  // sealMesh.rotation = new BABYLON.Vector3(0, 0, 0);
  // sealMesh.isVisible = true;
  // sealMesh.isPickable = true;
  // sealMesh.checkCollisions = true;
  // sealMesh.receiveShadows = true;
  // sealMesh.name = 'seal';
  // sealMesh.material = new BABYLON.StandardMaterial('seal', scene);
  // sealMesh.material.diffuseColor = new BABYLON.Color3(0, 0, 1);
  // sealMesh.material.specularColor = new BABYLON.Color3(0, 0, 1);
  // sealMesh.material.emissiveColor = new BABYLON.Color3(0, 0, 1);
  // sealMesh.material.ambientColor = new BABYLON.Color3(0, 0, 1);
  // sealMesh.material.alpha = 0.5;
  // sealMesh.material.backFaceCulling = false;
  // sealMesh.material.freeze();
  // sealMesh.freezeWorldMatrix();
  // sealMesh.freezeNormals();
  // sealMesh.freeze();
  // sealMesh.isPickable = true;

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

  // Create GUI Elements dor score
  const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('scoreUi');

  const UiPanel = new GUI.StackPanel();
  UiPanel.width = '220px';
  UiPanel.fontSize = '14px';
  UiPanel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  UiPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
  advancedTexture.addControl(UiPanel);

  // button
  const buttonScore = GUI.Button.CreateSimpleButton('scoreButton');
  buttonScore.textBlock.text = `Score : ${score}`;
  buttonScore.paddingTop = '10px';
  buttonScore.width = '100px';
  buttonScore.height = '50px';
  buttonScore.color = 'white';
  buttonScore.background = 'grey';
  UiPanel.addControl(buttonScore);

  // Camera
  // eslint-disable-next-line no-unused-vars
  const camera = new ArcRotateCamera(
    'Camera',
    -Math.PI / 2,
    (2 * Math.PI) / 5,
    cameraOffset,
    new Vector3(0, 0, 0),
    scene,
  );
  camera.attachControl('canvas', true);

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
    sealMesh.position.y = 1/2;

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
      value: -1/2,
    };
    const kf2 = {
      frame: 0.4 * frameRate,
      value: 7,
    };
    const kf3 = {
      frame: 1.5 * frameRate,
      value: 1/2,
    };
    const keyFrames = [kf1, kf2, kf3];

    ySlide.setKeys(keyFrames);

    // AnimationGroup
    const jump = new AnimationGroup('jump');
    jump.addTargetedAnimation(ySlide, sealMesh);

    //  Sphere mouvement
    let isMoving = false;
    scene.onKeyboardObservable.add((kbInfo) => {
      if (isMoving) return;
      switch (kbInfo.type) {
        case KeyboardEventTypes.KEYDOWN:
          switch (kbInfo.event.key) {
            case 'd':
            case 'D':
            case 'ArrowRight':
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
            case 'z':
            case 'Z':
            case 'ArrowUp':
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
          break;
        default:
          break;
      }
    });
    
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
    const obs1 = MeshBuilder.CreateBox('box', { size: 1 }, scene);
    obs1.visibility = false;
    obs1.position.y = 100;
    const obs2 = MeshBuilder.CreateGeodesic('poly', { size: 1 }, scene);
    obs2.visibility = false;
    obs2.position.y = 100;
    const obs3 = MeshBuilder.CreateTorusKnot('torus', { radius: 0.3 }, scene);
    obs3.visibility = false;
    obs3.position.y = 100;
    
    obstacles.push(obs1, obs2, obs3);
    
    // Money
    moneyMesh.visibility = false;
    moneyMesh.position.y = 100;


    // Handle obstacles spawn
    let obstacle;
    const obstacleTargets = [];
    const obstaclesSpawn = setInterval(spawnObstacle, 800, obstacle);

    // Handle money spawn
    const money = new Mesh();
    const moneyTargets = [];
    const moneySpawn = setInterval(spawnMoney, 1000, money);

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
      Animation.CreateAndStartAnimation(
        'ani',
        target,
        'rotation',
        30,
        100,
        Vector3.Zero(),
        new Vector3(0, 2 * Math.PI, 0),
        Animation.ANIMATIONLOOPMODE_CONSTANT,
        );
        // animation spawn
      Animation.CreateAndStartAnimation(
        'ani',
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
      target = obstacles[tools.getRandomInt(spawns.length)].clone('target');

      // adjust target parameters
      target.position = startPosition;
      target.visibility = true;
      // add to targets
      obstacleTargets.push(target);

      // animation spawn
      Animation.CreateAndStartAnimation(
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

            if (isAuthenticated()){
              // update user score
              console.log("user logged");
              scoreLoggedPlayer(score);
              // add money to user balance
              addMoneyToBalance(moneyCollected);
            } 
            else console.log("no user logged in");

            // display game over menu
            getGameOverMenu(scene,score,getAuthenticatedUser());
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
            buttonScore.textBlock.text = `Score : ${score}`;
          },
        ),
      );
    }
      //   setTimeout(() => {
      //     scene.freezeActiveMeshes(true);
      //     const f = new Scene();
      //     f.animationsEnabled=false;
      
      //   }, 3000);
      // };
  };
  return scene;
};

const HomePage = async () => {
  clearPage();
  const game = document.querySelector('#game');
  const newCanvas = document.createElement('canvas');
  newCanvas.id = 'renderCanvas';
  game.appendChild(newCanvas);
  const canvas = document.getElementById('renderCanvas');
  let engine = new Engine(canvas, true,null,true);
  let scene = new Scene(engine);
  scene.detachControl();
  const loadingScreen = new DefaultLoadingScreen(newCanvas, "Loading ...");
  // TODO chercher info sur ca ...bon pour perf?
  scene.useDelayedTextureLoading = true;
  loadingScreen.displayLoadingUI();
  scene = await createScene(scene);
  SceneOptimizer.OptimizeAsync(scene,SceneOptimizerOptions.ModerateDegradationAllowed());

  scene.executeWhenReady(() => {
    loadingScreen.hideLoadingUI();
    scene.attachControl();
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

  const res = await fetch(`/api/users/highscore?username=${user.username}`, {
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

  const res = await fetch(`/api/users/balance?username=${user.username}`, {
    method: 'PATCH',
    body: JSON.stringify({
      balance: money,
      operator: '+'
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error(`fetch error : ${res.status} : ${res.statusText}`);
}

  // create GUI element for end game
  async function getGameOverMenu (scene,score,user=undefined) {
    console.log(gameOverMenuURL);
    const gameOverMenu = GUI.AdvancedDynamicTexture.CreateFullscreenUI("GUI", true, scene);
    gameOverMenu.parseSerializedObject(gameOverMenuURL,true)
    .then((adt)=>{
      console.log("adt",adt);
      // const endGamePanel = adt.getControlByName('endGamePanel');
      // const endGameButton = adt.getControlByName('endGameButton');
      // endGameButton.onPointerClickObservable.add(()=>{
      //   endGamePanel.isVisible = false;
      //   scene.dispose();
      //   scene.getEngine().dispose();
      //   createScene();
      // })
    })
    return gameOverMenu;
  }
export default HomePage;
