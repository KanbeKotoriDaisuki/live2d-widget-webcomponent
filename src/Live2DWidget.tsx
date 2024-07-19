import { createEffect, createResource } from "solid-js";
import { customElement } from "solid-element";
import { Application } from "@pixi/app";
import { Ticker } from "@pixi/core";
import { Live2DModel } from "pixi-live2d-display/cubism2";

type Live2DWidgetProps = {
  config: string;
};

export type Live2DWidgetConfig = {
  width?: number;
  height?: number;
  models: [
    {
      src: string;
      pos?: {
        x?: number;
        y?: number;
      };
      scale?: {
        x?: number;
        y?: number;
      };
      expression?: string;
      motion?: string;
    }
  ];
};

const Live2DWidget = ({ config }: Live2DWidgetProps) => {
  let ref!: HTMLCanvasElement;
  let width!: number;
  let height!: number;
  let models!: Live2DWidgetConfig["models"];

  try {
    ({ width, height, models } = JSON.parse(config));
  } catch (error) {
    console.error("Invalid config: `", config, "`");
    return null;
  }

  const [loadedModels] = createResource(
    () =>
      Promise.all(
        models.map(async ({ src, ...model }) => ({
          ...model,
          live2d: await Live2DModel.from(src, {
            autoFocus: false,
            ticker: Ticker.shared,
          }),
        }))
      ),
    { initialValue: [] }
  );

  createEffect(() => {
    if (loadedModels().length === 0 || !ref) return;

    const app = new Application({
      view: ref,
      autoStart: true,
      backgroundAlpha: 0,
      width: width ?? 1000,
      height: height ?? 1000,
      antialias: true,
    });
    loadedModels().forEach(({ live2d, pos, scale, expression, motion }) => {
      app.stage.addChild(live2d);
      live2d.x = pos?.x!;
      live2d.y = pos?.y ?? 0;
      scale && live2d.scale.set(scale.x ?? 1, scale.y ?? 1);
      expression && live2d.expression(expression);
      motion && live2d.motion(motion);
    });
  });

  return (
    <canvas
      id="canvas"
      ref={ref}
      style={{ width: "100%", height: "100%", display: "flex" }}
    />
  );
};

customElement("live2d-widget", { config: '{"models":[]}' }, Live2DWidget);
