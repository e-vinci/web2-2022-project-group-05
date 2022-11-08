import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Vector3 } from "@babylonjs/core/Maths/math";

import '@babylonjs/core/Materials/standardMaterial';

const HomePage = () => {
  const canvas = document.querySelector("canvas");
  const engine = new Engine(canvas, true);

  const scene = new Scene(engine);

  const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);

  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  const box = MeshBuilder.CreateBox("box", {}, scene);

  engine.runRenderLoop(() => {
    scene.render();
  });
};

export default HomePage;
