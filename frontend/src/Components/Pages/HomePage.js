/* eslint-disable */
/* eslint-disable no-return-assign */
/* eslint-disable default-case */

// Todo : filter imports and remove useless ones
import * as BABYLON from 'babylonjs';
// import { Vector3 } from "@babylonjs/core/Maths/math";
// import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
// import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
// import { Mesh } from "@babylonjs/core/Meshes/mesh";
// import { GridMaterial } from '@babylonjs/materials/Grid';
// import { AsciiArtPostProcess } from '@babylonjs/post-processes/asciiArt';
// import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
// // import { FireProceduralTexture } from '@babylonjs/procedural-textures/fireProceduralTexture';
// import { GLTF2Export } from '@babylonjs/serializers/glTF';
import { AdvancedDynamicTexture } from '@babylonjs/gui/2D';
// import "@babylonjs/loaders/glTF";
// import "@babylonjs/core/Debug/debugLayer";
// import "@babylonjs/inspector";

const HomePage = () => {
    const canvas = document.querySelector('canvas');
    const engine = new BABYLON.Engine(canvas);
    const scene = new BABYLON.Scene(engine);
    createScene(canvas, engine, scene);
};

/**
 * get a random int between 0 and max not included
 * @param {*} max
 * @returns int
 */
 function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 * get a random int between min and max both included
 * @param {*} min
 * @param {*} max
 * @returns
 */
function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


const createScene = async function (canvas, engine, scene) {
    // Game Variables
    const numberCols = 3;
    const widthCols = 2;
    const sceneWidth = numberCols*widthCols;
    const cameraOffset = 30;
    const spawnStartZ = 20;
    const spawnEndZ = -10;
    let score=0;
    const maxJumpHeight = 4;
    
    

    // Create GUI Elements

    const advancedTexture = new AdvancedDynamicTexture("UI", 10,10, scene);
    console.log(advancedTexture); // object exists
    // advancedTexture.CreateFullscreenUI("UI");
    // console.log(advancedTexture);
    // var UiPanel = new StackPanel();
    // UiPanel.width = "220px";
    // UiPanel.fontSize = "14px";
    // UiPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    // UiPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    // advancedTexture.addControl(UiPanel);
       
    //  button 
    // var buttonScore = BABYLON.GUI.Button.CreateSimpleButton("scoreButton", `Score : ${score.toString()}`);
    // buttonScore.paddingTop = "10px";
    // buttonScore.width = "100px";
    // buttonScore.height = "50px";
    // buttonScore.color = "white";
    // buttonScore.background = "grey";
    // UiPanel.addControl(buttonScore);

    // var scoreText = new BABYLON.GUI.TextBlock();
    // scoreText.text = "score : 0";
    // scoreText.color = "white";
    // scoreText.fontSize = 24;
    // scoreText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    // scoreText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    // advancedTexture.addControl(scoreText);


//     // This creates and positions a free camera (non-mesh)
   const camera = new BABYLON.ArcRotateCamera(
       "Camera",
       -Math.PI / 2,
       (2 * Math.PI) / 5,
      cameraOffset,
       new BABYLON.Vector3(0, 0, 0),
       scene
   );
    // camera.attachControl("canvas",true)
    
//     // Sphere
    const sphere = BABYLON.MeshBuilder.CreateSphere(
        "sphere",
        { diameter: 2, segments: 32 },
        scene
   );
  
    // Ground
    const ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        { width: widthCols*numberCols, height:100},
        scene
    );
    // material
    const groundMaterial = new BABYLON.StandardMaterial("Ground Material", scene);
    ground.material = groundMaterial;
    ground.material.diffuseColor = BABYLON.Color3.Random();

    // Light
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );
    light.intensity = 0.7;


    // Move the sphere upward 1/2 its height
    // TODO generalize for all sizes
    sphere.position.y = 1;

    // Spawn Animations
    // Jump
    const frameRate = 10;
    const ySlide = new BABYLON.Animation("ySlide", "position.y", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    
    // a 2 sec il saute
    const kf1 ={
        frame:0*frameRate,
        value:1
    }
    // a 2 sec il atteint le pic
    const kf2={
        frame:0.4*frameRate,
        value:7
    }
   // a 3 sec il est au sol
    const kf3={
        frame:1*frameRate,
        value:1
    }
    const keyFrames=[kf1,kf2,kf3]

    ySlide.setKeys(keyFrames)

    // AnimationGroup
    const jump = new BABYLON.AnimationGroup("jump")
    jump.addTargetedAnimation(ySlide,sphere)


    //  Sphere mouvement
    let isMoving=false;
    scene.onKeyboardObservable.add((kbInfo) => {
    if (isMoving)return;
    switch (kbInfo.type) {
      case BABYLON.KeyboardEventTypes.KEYDOWN:
        switch (kbInfo.event.key) {
          case "q":
          case "Q":
          case "ArrowLeft":
            if (sphere.position.x != -widthCols) {
                isMoving=true;
              BABYLON.Animation.CreateAndStartAnimation(
                  "slideRight",
                   sphere,
                   "position.x", 
                   10, 
                   2, 
                   sphere.position.x, 
                   sphere.position.x - widthCols, 
                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
                   null,
                   () => isMoving=false
                   );
            }
            break;
            case "d":
            case "D":
            case "ArrowRight":
            if (sphere.position.x !== widthCols) {
                isMoving=true;
                BABYLON.Animation.CreateAndStartAnimation(
                  "slideLeft",
                   sphere,
                   "position.x", 
                   10, 
                   2, 
                   sphere.position.x, 
                   sphere.position.x + widthCols, 
                   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
                   null,
                   () => isMoving=false
                   );
            }
            break;
            case "z":
            case "Z":
            case "ArrowUp":
            case " ":
            if (sphere.position.y < maxJumpHeight) {
                isMoving=true;
                // start animation
                jump.play()
                isMoving=false;
            }
            break;
        }
        break;
    }
  });

    // ScoreZone
    const scoreZone = BABYLON.MeshBuilder.CreatePlane("scoreZone",{size:10,updatable:true,sideOrientation:BABYLON.Mesh.DOUBLESIDE},)
    scoreZone.position.z -= sphere.absoluteScaling.z
    scoreZone.isVisible=false;

    // Obstacles
    const obstacles = [];
    const obs1 = BABYLON.MeshBuilder.CreateBox("box", { size: 1}, scene);
    obs1.visibility = false;
    obs1.position.y = 100;
    const obs2 = BABYLON.MeshBuilder.CreateGeodesic("poly", { size: 1 }, scene);
    obs2.visibility = false;
    obs2.position.y = 100
    const obs3 = BABYLON.MeshBuilder.CreateTorusKnot("torus",{ radius: 0.3 },scene);
    obs3.visibility = false;
    obs3.position.y = 100;

    obstacles.push(obs1, obs2, obs3);

    // Spawns
    const spawns = [];
    const spawn1 = new BABYLON.Vector3(-widthCols,1, spawnStartZ);
    const spawn2 = new BABYLON.Vector3(0, 1, spawnStartZ);
    const spawn3 = new BABYLON.Vector3(widthCols, 1, spawnStartZ);
    spawns.push(spawn1, spawn2, spawn3);

    // Handle obstacles spawn 
    let target;
    const targets=[]
    const boucleSpawn = setInterval(spawnObstacle,1000,[target]) ;
    function spawnObstacle() {
        // set a random spawn position as startPosition
        const startPosition = spawns[getRandomInt(spawns.length)];

        // endPosition = startPoition with different z index
        let endPosition = startPosition.clone();
        endPosition.z = spawnEndZ;

        // create a clone of a random obstacle as target 
        target = obstacles[getRandomInt(spawns.length)].clone("target");
        
        // adjust target parameters
        target.position = startPosition;
        target.visibility = true;
        // add to targets
        targets.push(target);
        
        // BUG Fait tilter la console ... creer l'animation, faire l'attribution et la lancer separement 
        // animation spawn
        BABYLON.Animation.CreateAndStartAnimation(
            "anim",
            target,
            "position",
            30,
            100,
            startPosition,
            endPosition,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
            null,
            function() //quand l'animation est terminer...
            {  
                //detruit le target
                target.dispose();
                //BUG : limiter la taille de runninganimation[] en suppriment l'animation qui n'est plus sur le terrain ameliorerai les perf mais cela ne marche pas comme prevu ...
                //runningAnimations.shift()
            },
            scene
        )


        // quand sphere touché...
        target.actionManager= new BABYLON.ActionManager(scene);
        target.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                {
                    trigger:BABYLON.ActionManager.OnIntersectionEnterTrigger,
                    parameter:sphere,
                    usePreciseIntersection: true
                }, 
                function() 
                {
                    //arrete de faire spawn les obstacle
                    clearInterval(boucleSpawn);
                    //elimine les obstacles encore en jeu
                    for(let i = 0 ;i<targets.length;i++) {
                    targets[i]?.dispose();
                    }
                    //detruit la sphere
                    sphere.dispose();
                }
            )
        );

        // quand scoreZone toucher...
        //     target.actionManager.registerAction(
        //     new BABYLON.ExecuteCodeAction(
        //         {
        //             trigger:BABYLON.ActionManager.OnIntersectionExitTrigger,
        //             parameter:scoreZone,
        //             usePreciseIntersection: true
        //         }, 
        //         function() //increment le score
        //         {
        //         score++;
        //         scoreText.text = "score : "+score.toString();
        //         }
        //     )
        // );
    }    
  engine.runRenderLoop(() => {
     scene.render();
  });
  return scene;
};

export default HomePage;
