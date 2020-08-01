/**
 * State pattern interface for all concrete classes which handle the behavior when the animations internal state changes
 */
export interface AnimationState {
    start() : void;
    stop() : void;
    pause() : void;
    resume(): void;
    update(): void;
}
