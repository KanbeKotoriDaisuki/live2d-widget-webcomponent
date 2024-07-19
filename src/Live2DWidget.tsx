import "./live2d/live2d.min.js";

import { Application } from "@pixi/app";
import { Ticker } from "@pixi/core";
import { Live2DModel } from "pixi-live2d-display/cubism2";
import { createEffect, createResource, createSignal } from "solid-js";
import { customElement } from "solid-element";

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

  try {
    const parsedConfig: Live2DWidgetConfig = JSON.parse(config);

    const [models] = createResource(
      () =>
        Promise.all(
          parsedConfig.models.map(async ({ src, ...model }) => ({
            ...model,
            live2d: await Live2DModel.from(src, {
              autoFocus: false,
              ticker: Ticker.shared,
            }),
          }))
        ),
      { initialValue: [] }
    );

    const [loaded, setLoaded] = createSignal(false);

    const app = new Application({
      view: ref,
      autoStart: true,
      backgroundAlpha: 0,
      width: 2500,
      height: 2500,
      antialias: true,
    });

    createEffect(() => {
      if (models().length === 0 || loaded()) return;
      models().forEach((model) => app.stage.addChild(model.live2d));
      models().forEach((model) => {
        model.live2d.x = model.pos?.x ?? 0;
        model.live2d.y = model.pos?.y ?? 0;
        model.scale &&
          model.live2d.scale.set(model.scale.x ?? 1, model.scale.y ?? 1);
        model.expression && model.live2d.expression(model.expression);
        model.motion && model.live2d.motion(model.motion);
      });
      setLoaded(true);
    });
  } catch (error) {
    console.error("Invalid config: `", config, "`");
  }

  return <canvas ref={ref} style={{ width: "100%", height: "100%" }} />;
};

customElement("live2d-widget", { config: '{"models":[]}' }, Live2DWidget);
