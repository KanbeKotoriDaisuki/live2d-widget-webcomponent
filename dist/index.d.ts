/**
 * Config format for `<live2d-widget>` component. Please remember that this should be passed the
 * config as JSON.
 */
export declare type Live2DWidgetConfig = {
    /**
     * The width property of the underlying `<canvas>`.
     */
    width?: number;
    /**
     * The height property of the underlying `<canvas>`.
     */
    height?: number;
    /**
     * The Live2D models to be loaded by the widget.
     */
    models: [
        {
        /**
         * Link to the `.model.json` file.
         */
        src: string;
        /**
         * The position of the model in the widget. By default, the model would be placed at (0, 0).
         */
        pos?: {
            /**
             * Horizontal position
             */
            x?: number;
            /**
             * Vertical position
             */
            y?: number;
        };
        /**
         * The scale of the model in the widget. By default, the model would not be scaled.
         */
        scale?: {
            /**
             * Horizontal position
             */
            x?: number;
            /**
             * Vertical position
             */
            y?: number;
        };
        /**
         * The defined name of the expression that the model should be presenting.
         */
        expression?: string;
        /**
         * The defined name of the motion that the model should be performing.
         */
        motion?: string;
    }
    ];
};

export { }
