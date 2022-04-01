import { Application, BitmapFont, BitmapText, Ticker } from "pixi.js";
import { Button } from "./button";
import { LoaderScene } from "./Loader";
import { ParticleTest } from "./particle";
import { StageConfig } from "./StageConfig";
import { Test1 } from "./test1";
import { Test2 } from "./test2";

const app = new Application({
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  backgroundColor: 0x6495ed,
  resizeTo: window,
});

StageConfig.setDim({ width: app.screen.width, height: app.screen.height });

let fpsCounter: BitmapText;
let buttons: Array<Button>;

let currentTest: any;

app.stage.addChild(new LoaderScene(createEnv));

function createEnv(): void {
  app.stage.removeChildren();

  BitmapFont.from("comic 32", {
    fill: "#ffffff",
    fontFamily: "Comic Sans MS",
    fontSize: 32,
  });

  fpsCounter = new BitmapText("999", {
    fontName: "comic 32",
    fontSize: 32,
    tint: 0,
  });

  app.stage.addChild(fpsCounter);

  buttons = [];
  let btn: Button;
  let nextX = fpsCounter.width + 10;
  for (let index = 0; index < 3; index++) {
    btn = new Button(`Test ${index + 1}`);
    btn.x = nextX;
    buttons.push(btn);
    app.stage.addChild(btn);

    btn.on("pointertap", () => click(index));
    nextX += btn.width + 10;
  }
  buttons[0].activate();
  currentTest = new Test1();
  app.stage.addChild(currentTest);

  Ticker.shared.add(update);
}

function update(): void {
  fpsCounter.text = Math.ceil(Ticker.shared.FPS).toString();
}

function click(num: number): void {
  for (let index = 0; index < buttons.length; index++) {
    const element = buttons[index];

    num == index ? element.activate() : element.deactivate();
  }

  currentTest.discard();
  app.stage.removeChild(currentTest);
  currentTest.destroy();

  switch (num) {
    case 0:
      currentTest = new Test1();
      break;
    case 1:
      currentTest = new Test2();
      break;
    case 2:
      currentTest = new ParticleTest();
      break;
  }

  app.stage.addChild(currentTest);
}
