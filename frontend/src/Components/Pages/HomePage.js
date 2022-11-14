/* eslint-disable */
/* eslint-disable no-return-assign */
/* eslint-disable default-case */

// TODO : filter imports and remove useless ones
import * as BABYLON from "@babylonjs/core"
import * as GUI from "@babylonjs/gui"
import menu from "../../assets/guiTexture.json"
import "@babylonjs/loaders"

// TODO:verifier forme import dans les docs respectives et ajuster en consequence
import "@babylonjs/inspector"
import "@babylonjs/materials"
import "@babylonjs/post-processes"
import "@babylonjs/serializers"
import "@babylonjs/procedural-textures"


const createScene = () => {
    const canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);

    //Game Assets
    BABYLON.SceneLoader.ImportMesh("waterMesh","./../../assets/3Dmodels", "water.obj", scene);
    // Game Variables
    const numberCols = 3;
    const widthCols = 4;
    const sceneWidth = numberCols*widthCols;
    const cameraOffset = 30;
    const spawnStartZ = 20;
    const spawnEndZ = -10;
    let score=0;
    const maxJumpHeight = 4;  

    // Create GUI Elements
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    
    //Ajout menu
    let boutonStart = new GUI.Button(); //new utile que a avoir des suggestions
    advancedTexture.parseSerializedObject(menu,true)

    boutonStart=advancedTexture.getControlByName('B Start');
    console.log(boutonStart);

    boutonStart.onPointerClickObservable.add(()=>{
        advancedTexture.dispose()
        startGame();
    })

    var UiPanel = new GUI.StackPanel();
    UiPanel.width = "220px";
    UiPanel.fontSize = "14px";
    UiPanel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    UiPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    advancedTexture.addControl(UiPanel);
        
    var scoreText = new GUI.TextBlock();
    scoreText.text = "Score: " + score;
    scoreText.color = "white";
    scoreText.height = "30px";
    UiPanel.addControl(scoreText);

    // button 
    var buttonScore = 
    GUI.Button.CreateSimpleButton("scoreButton");
    buttonScore.textBlock.text = `Score : ${score}`;
    buttonScore.paddingTop = "10px";
    buttonScore.width = "100px";
    buttonScore.height = "50px";
    buttonScore.color = "white";
    buttonScore.background = "grey";
    UiPanel.addControl(buttonScore);

    // This creates and positions a free camera (non-mesh)
    const camera = new BABYLON.ArcRotateCamera(
       "Camera",
       -Math.PI / 2,
       (2 * Math.PI) / 5,
      cameraOffset,
       new BABYLON.Vector3(0, 0, 0),
       scene
   );
    // camera.attachControl("canvas",true)
    //fonction starting the game
    const startGame = () => {
    // Sphere
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
    // Material
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
    const ySlide = new BABYLON.Animation(
        "ySlide", 
        "position.y", 
        frameRate, 
        BABYLON.Animation.ANIMATIONTYPE_FLOAT, 
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    
    const kf1 ={
        frame:0*frameRate,
        value:1
    }
    const kf2={
        frame:0.4*frameRate,
        value:7
    }
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
    function spawnObstacle(target) {
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
        
        //animation spawn
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
            //quand l'animation est terminer
            function(){  
                //detruit le target
                target.dispose();
                //BUG : limiter la taille de runninganimation[] en suppriment l'animation qui n'est plus sur le terrain ameliorerai les perf mais cela ne marche pas comme prevu ...
                //runningAnimations.shift()
            }
        );


        // quand sphere touché...
        target.actionManager = new BABYLON.ActionManager();
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
            target.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                {
                    trigger:BABYLON.ActionManager.OnIntersectionExitTrigger,
                    parameter:scoreZone,
                    usePreciseIntersection: true
                }, 
                function() {
                score++;
                scoreText.text = "Score : "+score.toString();
                buttonScore.textBlock.text = `Score : ${score}`;
                }
            )
        );
    }
    }
    return scene
}

const HomePage = () => {
    const scene = createScene();
    const engine = scene.getEngine();
    engine.runRenderLoop(() => {
        scene.render();
    });
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

export default HomePage;
