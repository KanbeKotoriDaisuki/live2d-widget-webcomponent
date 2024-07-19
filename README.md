## Usage

1. Load Live2D Cubism SDK 2.1 (i.e. `live2d.min.js`) which this project depends.
2. Create an element `<live2d-widget>` with an optional string attribute `config` which consumes a JSON string with type `Live2DWidgetConfig`.
3. Load `live2d-widget.umd.js` (or `live2d-widget.es.js` at your choice) in `dist` folder.

See the document of `Live2DWidgetConfig` for more details.

### Example Usage

```html
<div class="widget-container">
  <live2d-widget
    config='{"width":1280,"height":1380,"models":[{"src":"https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/shizuku/shizuku.model.json"}]}'
  />
</div>
```

## Build

Run in terminal

```bash
# NPM
npm run build
# Bun
bun run build
```
