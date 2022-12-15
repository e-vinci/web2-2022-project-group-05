import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import '@babylonjs/loaders';
import '@babylonjs/inspector';
import '@babylonjs/materials';
import { clearPage } from '../../utils/render';

class GradientRectangle extends GUI.Rectangle {
  constructor(name) {
    super(name);
    this._gradientStart = 'black';
    this._gradientEnd = 'white';
    this._gradientVertical = true;
  }

  set gradientStart(value) {
    this._gradientStart = value;
  }

  get gradientStart() {
    return this._gradientStart;
  }

  set gradientEnd(value) {
    this._gradientEnd = value;
  }

  get gradientEnd() {
    return this._gradientEnd;
  }

  set gradientVertical(value) {
    this._gradientVertical = !!value;
  }

  get gradientVertical() {
    return this._gradientVertical;
  }

  _localDraw(context /*: CanvasRenderingContext2D */) {
    context.save();

    if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
      context.shadowColor = this.shadowColor;
      context.shadowBlur = this.shadowBlur;
      context.shadowOffsetX = this.shadowOffsetX;
      context.shadowOffsetY = this.shadowOffsetY;
    }

    if (this._gradientStart && this._gradientEnd) {
      if (this._gradientVertical) {
        this._gradient = context.createLinearGradient(
          0,
          this._currentMeasure.top,
          0,
          this._currentMeasure.top + this._currentMeasure.height,
        );
      } else {
        this._gradient = context.createLinearGradient(
          this._currentMeasure.left,
          0,
          this._currentMeasure.left + this._currentMeasure.width,
          0,
        );
      }

      this._gradient.addColorStop(0, this._gradientStart);
      this._gradient.addColorStop(1, this._gradientEnd);

      context.fillStyle = this._gradient;

      if (this._cornerRadius) {
        this._drawRoundedRect(context, this._thickness / 2);
        context.fill();
      } else {
        context.fillRect(
          this._currentMeasure.left,
          this._currentMeasure.top,
          this._currentMeasure.width,
          this._currentMeasure.height,
        );
      }
    }

    if (this._thickness) {
      if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
        context.shadowBlur = 0;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
      }

      if (this.color) {
        context.strokeStyle = this.color;
      }
      context.lineWidth = this._thickness;

      if (this._cornerRadius) {
        this._drawRoundedRect(context, this._thickness / 2);
        context.stroke();
      } else {
        context.strokeRect(
          this._currentMeasure.left + this._thickness / 2,
          this._currentMeasure.top + this._thickness / 2,
          this._currentMeasure.width - this._thickness,
          this._currentMeasure.height - this._thickness,
        );
      }
    }

    context.restore();
  }
}

const createScene = async () => {
  const game = document.querySelector('#game');
  const newCanvas = document.createElement('canvas');
  newCanvas.id = 'renderCanvas';
  game.appendChild(newCanvas);
  const canvas = document.getElementById('renderCanvas');
  const engine = new BABYLON.Engine(canvas, true);
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera(
    'Camera',
    -Math.PI / 2,
    Math.PI / 3,
    25,
    BABYLON.Vector3.Zero(),
    scene,
  );
  camera.attachControl(canvas, true);

  // var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
  // light.intensity = 0.7;

  // Create advance texture
  const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', true, scene);
  advancedTexture.idealWidth = 1600;
  advancedTexture.renderAtIdealSize = true;
  if (window.innerWidth < 500) {
    await advancedTexture.parseFromSnippetAsync('E92W52');
    return scene;
  }

  await advancedTexture.parseFromSnippetAsync('I59XFB#11');

  let currentIndex = 4;
  const captions = [
    '"Baby don\'t hurt me"',
    '"An existentially sad dog"',
    '"Help, I did my makeup wrong"',
    '"Sharkbait OooHaHa"',
    '"An uncomfortable position"',
  ];

  const titles = ['What is Love?', 'Meow', 'Colors of the Wind', 'Sharkbait', 'Tightrope'];

  // Create gradient background
  const rect1 = new GradientRectangle();
  rect1.gradientVertical = true;
  rect1.gradientStart = 'white';
  rect1.gradientEnd = '#BBB';
  advancedTexture.addControl(rect1);

  const { children } = advancedTexture.getChildren()[0];
  const title = children.filter((control) => control.name === 'Title')[0];
  const caption = children.filter((control) => control.name === 'Caption')[0];

  const nextButton = children.filter((control) => control.name === 'Next')[0];
  const backButton = children.filter((control) => control.name === 'Back')[0];
  const mainPainting = children.filter((control) => control.name === 'MainPainting')[0];
  const paintings = children.filter((control) => control.name === 'Painting');
  const background = children.filter((control) => control.name === 'Background')[0];

  for (let i = 0; i < paintings.length; ++i) {
    // eslint-disable-next-line no-loop-func
    paintings[i].onPointerClickObservable.add(() => {
      addShadow(paintings[currentIndex], 0);
      currentIndex = i;
      caption.text = captions[currentIndex];
      title.text = titles[currentIndex];
      mainPainting.source = paintings[currentIndex].source;
      addShadow(paintings[currentIndex], 5);
      resetZoom();
    });
  }

  const view = children.filter((control) => control.name === 'View')[0];
  caption.text = captions[currentIndex];

  function addShadow(painting, value) {
    painting.shadowOffsetX = value;
    painting.shadowOffsetY = value;
    painting.shadowBlur = value;
  }
  nextButton.onPointerClickObservable.add((evt) => {
    addShadow(paintings[currentIndex], 0);
    currentIndex++;
    if (currentIndex >= captions.length) currentIndex = 0;
    caption.text = captions[currentIndex];
    title.text = titles[currentIndex];
    mainPainting.source = paintings[currentIndex].source;
    addShadow(paintings[currentIndex], 5);
    resetZoom();
  });

  backButton.onPointerClickObservable.add((evt) => {
    addShadow(paintings[currentIndex], 0);
    currentIndex--;
    if (currentIndex < 0) currentIndex = captions.length - 1;
    caption.text = captions[currentIndex];
    title.text = titles[currentIndex];
    mainPainting.source = paintings[currentIndex].source;
    addShadow(paintings[currentIndex], 5);
    resetZoom();
  });

  background.onPointerClickObservable.add((evt) => {
    resetZoom();
  });

  const defaultPosX = mainPainting.leftInPixels;
  const defaultPosY = mainPainting.topInPixels;
  view.onPointerClickObservable.add((evt) => {
    mainPainting.scaleX = 0.35;
    mainPainting.scaleY = 0.35;
    mainPainting.zIndex = 5;
    mainPainting.leftInPixels = 0;
    mainPainting.topInPixels = 0;
    mainPainting.shadowBlur = 500;
    background.background = 'black';
    background.zIndex = 3;
    background.alpha = 0.3;
  });

  function resetZoom() {
    mainPainting.scaleX = 0.15;
    mainPainting.scaleY = 0.15;
    mainPainting.leftInPixels = defaultPosX;
    mainPainting.topInPixels = defaultPosY;
    mainPainting.shadowBlur = 0;
    background.alpha = 0.0;
    background.zIndex = 0;
  }
  return scene;
};

const StorePage = async () => {
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

export default StorePage;
