
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
