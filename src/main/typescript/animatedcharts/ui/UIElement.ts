export abstract class UIElement {
    protected static id: number = 0;

    protected abstract html() : string;
    protected abstract events() : void;

    protected id: number
    protected $element: JQuery;

   protected constructor(){
        this.id = UIElement.id++;
        this.$element = $(this.html());
        this.events();
    }


    abstract getJQueryElement() : JQuery;
}