import {Presenter} from "../../../ui/Presenter";

export abstract class CreationHandler {

    protected nextHandler : CreationHandler
    private type : string;

    protected constructor(type : string) {
        this.type = type;
    }

    setNext(handler : CreationHandler) {
        this.nextHandler = handler;
    }

    public handle(type : string) : Presenter<any> {
        if(type == this.type) {
            return this.doCreate();
        } else if(this.nextHandler != null) {
            return this.nextHandler.handle(type);
        }

        return null;
    }

    protected abstract doCreate() : Presenter<any>;

}