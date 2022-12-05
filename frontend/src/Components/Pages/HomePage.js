/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import '@babylonjs/loaders';

import menu from '../../assets/guiTexture.json';
import { clearPage } from '../../utils/render';
import { isAuthenticated, getAuthenticatedUser } from '../../utils/auths';

import '@babylonjs/inspector';
import '@babylonjs/materials';
import '@babylonjs/post-processes';
import '@babylonjs/serializers';
import '@babylonjs/procedural-textures';

import * as tools from '../../utils/tools';

// assets
import water from '../../assets/3Dmodels/test2.glb';
import seal from '../../assets/3Dmodels/seal_animated.glb';
import importedWaterParticles from '../../assets/waterParticles.json';
import waterTexture from '../../assets/texture/flare.png';

// eslint-disable-next-line camelcase
import sky_px from '../../assets/3Dmodels/skyTest/_px.png';
// eslint-disable-next-line camelcase
import sky_py from '../../assets/3Dmodels/skyTest/_py.png';
// eslint-disable-next-line camelcase
import sky_pz from '../../assets/3Dmodels/skyTest/_pz.png';
// eslint-disable-next-line camelcase
import sky_nx from '../../assets/3Dmodels/skyTest/_nx.png';
// eslint-disable-next-line camelcase
import sky_ny from '../../assets/3Dmodels/skyTest/_ny.png';
// eslint-disable-next-line camelcase
import sky_nz from '../../assets/3Dmodels/skyTest/_nz.png';

const createScene = async () => {
  const game = document.querySelector('#game');
  const newCanvas = document.createElement('canvas');
  newCanvas.id = 'renderCanvas';
  game.appendChild(newCanvas);
  const canvas = document.getElementById('renderCanvas');
  const engine = new BABYLON.Engine(canvas, true);
  const scene = new BABYLON.Scene(engine);

  // TODO: rearrange mesh axes
  // Game Assets
  const waterMeshImport = await BABYLON.SceneLoader.ImportMeshAsync(null, water, null, scene);
  console.log('waterMeshImport', waterMeshImport);
  waterMeshImport.meshes[2].dispose();
  const waterMesh = waterMeshImport.meshes[1];
  waterMesh.scaling = new BABYLON.Vector3(3, 3, 1.2);

  // waterMeshImport.dispose()

  console.log('here', waterMesh);
  // waterMesh.position = new BABYLON.Vector3(0, 0, 0);
  waterMesh.scaling = new BABYLON.Vector3(10, 10, 1);
  waterMesh.rotate(BABYLON.Axis.Y, -Math.PI / 2, BABYLON.Space.WORLD);
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
  // waterMesh.material.alpha = 0.5;
  // waterMesh.material.backFaceCulling = false;
  // waterMesh.material.freeze();
  // waterMesh.freezeWorldMatrix();
  // waterMesh.freezeNormals();
  // waterMesh.freeze();
  // waterMesh.isPickable = true;
  // const direction=waterMesh.getDirection()
  // console.log("direction",direction);

  const sealMeshImport = await BABYLON.SceneLoader.ImportMeshAsync(null, seal, null, scene);
  const sealMesh = sealMeshImport.meshes[1];
  
  const waterParticles = BABYLON.ParticleSystem.Parse(importedWaterParticles, scene, '');
  waterParticles.particleTexture = new BABYLON.Texture(waterTexture);


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
  // eslint-disable-next-line no-unused-vars
  const sceneWidth = numberCols * widthCols;
  const cameraOffset = 30;
  const spawnStartZ = 20;
  const spawnEndZ = -10;
  let score = 0;
  const maxJumpHeight = 4;
  let moneyRecolted = 0;

  // Create GUI Elements
  const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

  // menu
  let boutonStart = new GUI.Button(); // new utile que a avoir des suggestions
  advancedTexture.parseSerializedObject(menu, true);

  boutonStart = advancedTexture.getControlByName('B Start');

  boutonStart.onPointerClickObservable.add(() => {
    advancedTexture.dispose();
    // eslint-disable-next-line no-use-before-define
    startGame();
  });

  const UiPanel = new GUI.StackPanel();
  UiPanel.width = '220px';
  UiPanel.fontSize = '14px';
  UiPanel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  UiPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
  advancedTexture.addControl(UiPanel);

  const scoreText = new GUI.TextBlock();
  scoreText.text = `Score: ${score}`;
  scoreText.color = 'white';
  scoreText.height = '30px';
  UiPanel.addControl(scoreText);

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
  const camera = new BABYLON.ArcRotateCamera(
    'Camera',
    -Math.PI / 2,
    (2 * Math.PI) / 5,
    cameraOffset,
    new BABYLON.Vector3(0, 0, 0),
    scene,
  );
  // camera.attachControl('canvas', true);

  // fonction starting the game
  const startGame = () => {
    // sealSwimmingAnimation.start();
    // Light
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // skybox
    const skybox = BABYLON.MeshBuilder.CreateBox('skyBox', { size: 1000.0 }, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial('skyBox', scene);
    skyboxMaterial.backFaceCulling = false;
    // eslint-disable-next-line camelcase
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('', scene, null, null, [
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
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
    // Move the seal upward 1/2 its height
    console.log(sealMesh);
    // sealMesh.position.y = 1;

    // Spawn Animations
    // Jump
    const frameRate = 10;
    const ySlide = new BABYLON.Animation(
      'ySlide',
      'position.y',
      frameRate,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
    );

    const kf1 = {
      frame: 0 * frameRate,
      value: 1,
    };
    const kf2 = {
      frame: 0.4 * frameRate,
      value: 7,
    };
    const kf3 = {
      frame: 1 * frameRate,
      value: 1,
    };
    const keyFrames = [kf1, kf2, kf3];

    ySlide.setKeys(keyFrames);

    // AnimationGroup
    const jump = new BABYLON.AnimationGroup('jump');
    jump.addTargetedAnimation(ySlide, sealMesh);

    //  Sphere mouvement
    let isMoving = false;
    scene.onKeyboardObservable.add((kbInfo) => {
      if (isMoving) return;
      switch (kbInfo.type) {
        case BABYLON.KeyboardEventTypes.KEYDOWN:
          switch (kbInfo.event.key) {
            case 'd':
            case 'D':
            case 'ArrowRight':
              if (sealMesh.position.x !== -widthCols) {
                isMoving = true;
                BABYLON.Animation.CreateAndStartAnimation(
                  'slideRight',
                  sealMesh,
                  'position.x',
                  10,
                  2,
                  sealMesh.position.x,
                  sealMesh.position.x - widthCols,
                  BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
                  null,
                  () => (isMoving = false),
                );
              }
              break;
            case 'q':
            case 'Q':
            case 'ArrowLeft':
              if (sealMesh.position.x !== widthCols) {
                isMoving = true;
                BABYLON.Animation.CreateAndStartAnimation(
                  'slideLeft',
                  sealMesh,
                  'position.x',
                  10,
                  2,
                  sealMesh.position.x,
                  sealMesh.position.x + widthCols,
                  BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
                  null,
                  () => (isMoving = false),
                );
              }
              break;
            case 'z':
            case 'Z':
            case 'ArrowUp':
            case ' ':
              if (sealMesh.position.y < maxJumpHeight) {
                isMoving = true;
                // start animation
                jump.play().onAnimationGroupEndObservable.add(() => (isMoving = false));
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

    // Money
    const mon1 = BABYLON.MeshBuilder.CreateBox('box', { size: 0.5 }, scene);
    mon1.visibility = false;
    mon1.position.y = 100;

    // ScoreZone
    const scoreZone = BABYLON.MeshBuilder.CreatePlane('scoreZone', {
      size: 10,
      updatable: true,
      sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    });
    scoreZone.position.z -= sealMesh.absoluteScaling.z;
    scoreZone.isVisible = false;

    // Obstacles
    const obstacles = [];
    const obs1 = BABYLON.MeshBuilder.CreateBox('box', { size: 1 }, scene);
    obs1.visibility = false;
    obs1.position.y = 100;
    const obs2 = BABYLON.MeshBuilder.CreateGeodesic('poly', { size: 1 }, scene);
    obs2.visibility = false;
    obs2.position.y = 100;
    const obs3 = BABYLON.MeshBuilder.CreateTorusKnot('torus', { radius: 0.3 }, scene);
    obs3.visibility = false;
    obs3.position.y = 100;

    obstacles.push(obs1, obs2, obs3);

    // Spawns
    const spawns = [];
    const spawn1 = new BABYLON.Vector3(-widthCols, 1, spawnStartZ);
    const spawn2 = new BABYLON.Vector3(0, 1, spawnStartZ);
    const spawn3 = new BABYLON.Vector3(widthCols, 1, spawnStartZ);
    spawns.push(spawn1, spawn2, spawn3);

    // Handle money spawn
    let money;
    const moneyTargets = [];
    const moneySpawn = setInterval(spawnMoney, 1000, [money]);

    function spawnMoney(target) {
      // set a random spawn position as startPosition
      const startPosition = spawns[tools.getRandomInt(spawns.length)];
      console.log(startPosition);
      // endPosition = startPoition with different z index
      const endPosition = startPosition.clone();
      endPosition.z = spawnEndZ;

      // create a clone of a random obstacle as target
      target = mon1.clone('target');
      moneyTargets.push(target);
      // adjust target parameters
      target.position = startPosition;
      target.visibility = true;
      // add to targets

      // animation spawn
      BABYLON.Animation.CreateAndStartAnimation(
        'anim',
        target,
        'position',
        30,
        100,
        startPosition,
        endPosition,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
        null,
        // on animation end
        () => {
          // detruit le target
          target.dispose();
          // BUG : limiter la taille de runninganimation[] en suppriment l'animation qui n'est plus sur le terrain ameliorerai les perf mais cela ne marche pas comme prevu ...
          // runningAnimations.shift()
        },
      );

      // on Seal collide
      target.actionManager = new BABYLON.ActionManager();
      target.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          {
            trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
            parameter: sealMesh,
            usePreciseIntersection: false,
          },
          () => {
            moneyRecolted++;
            target.dispose();
          },
        ),
      );
    }

    // Handle obstacles spawn
    let target;
    const targets = [];
    const boucleSpawn = setInterval(spawnObstacle, 1000, [target]);
    function spawnObstacle(target) {
      // set a random spawn position as startPosition
      const startPosition = spawns[tools.getRandomInt(spawns.length)];
      // endPosition = startPoition with different z index
      const endPosition = startPosition.clone();
      endPosition.z = spawnEndZ;

      // create a clone of a random obstacle as target
      target = obstacles[tools.getRandomInt(spawns.length)].clone('target');

      // adjust target parameters
      target.position = startPosition;
      target.visibility = true;
      // add to targets
      targets.push(target);

      // animation spawn
      BABYLON.Animation.CreateAndStartAnimation(
        'anim',
        target,
        'position',
        30,
        100,
        startPosition,
        endPosition,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
        null,
        // on animation end
        () => {
          // detruit le target
          target.dispose();
          // BUG : limiter la taille de runninganimation[] en suppriment l'animation qui n'est plus sur le terrain ameliorerai les perf mais cela ne marche pas comme prevu ...
          // runningAnimations.shift()
        },
      );

      // on seal collide
      target.actionManager = new BABYLON.ActionManager();
      target.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          {
            trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
            parameter: sealMesh,
            usePreciseIntersection: false,
          },
          () => {
            // stop obstacles spawn
            clearInterval(boucleSpawn);
            clearInterval(moneySpawn);
            // destroy every other obstacle
            for (let i = 0; i < targets.length; i++) {
              targets[i]?.dispose();
            }
            for (let i = 0; i < moneyTargets.length; i++) {
              moneyTargets[i]?.dispose();
            }
            // seal dispose
            sealMesh.dispose();

            // update user score
            if (isAuthenticated()){
              console.log("user logged");
              scoreLoggedPlayer(score);
            } 
              
            // TODO UPDATE NEW USER BALANCE
            console.log('MONEY = ');
            console.log(moneyRecolted);
          },
        ),
      );

      // quand scoreZone toucher...
      target.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          {
            trigger: BABYLON.ActionManager.OnIntersectionExitTrigger,
            parameter: scoreZone,
            usePreciseIntersection: true,
          },
          () => {
            score++;
            scoreText.text = `Score : ${score.toString()}`;
            buttonScore.textBlock.text = `Score : ${score}`;
          },
        ),
      );
    }
  };
  return scene;
};

const HomePage = async () => {
  await clearPage();
  const scene = await createScene();
  const engine = scene.getEngine();
  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener('resize', () => {
    engine.resize();
  });
};

async function scoreLoggedPlayer(score) {
  const user = getAuthenticatedUser();
  console.log(user);

  const res = await fetch(`/api/users/highscore/${user.username}`, {
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

export default HomePage;
