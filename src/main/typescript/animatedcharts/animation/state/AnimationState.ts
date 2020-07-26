export interface AnimationState {
    start() : void;
    stop() : void;
    pause() : void;
    resume(): void;
    update(): void;
}
