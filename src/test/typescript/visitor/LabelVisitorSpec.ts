import "mocha"
import { expect } from "chai";
import jsdom = require('jsdom');
import {LabelVisitor} from "../../../main/typescript/animatedcharts/visitor/LabelVisitor";
import {NodeLabelStylingDecorator} from "../../../main/typescript/animatedcharts/decorator/NodeLabelStylingDecorator";
import {ButtonComponent} from "../../../main/typescript/animatedcharts/ui/button/ButtonComponent";
import {AnimationComponent} from "../../../main/typescript/animatedcharts/ui/animation/AnimationComponent";
import {ChartComponent} from "../../../main/typescript/animatedcharts/ui/chart/ChartComponent";
import {Animation} from "../../../main/typescript/animatedcharts/animation/Animation";
var document = new jsdom.JSDOM(`<!DOCTYPE html><html></html>`).window.document;
var window = document.defaultView;

global.window = window
global.$ = require('jquery');
global.documet = document;

describe("LabelVisitor", () => {

    let labelVisitor : LabelVisitor;

    beforeEach( () => {
        labelVisitor = new LabelVisitor();
    });

    describe("addDecorator", () => {
        it("should add a the decorator", () => {
            // given
            let labelVisitor = new LabelVisitor();
            let decorator = new NodeLabelStylingDecorator("a")

            // when
            labelVisitor.addDecorator(decorator);

            // then
            expect(labelVisitor.getLabelStyling()).to.be.eq(decorator);
            let expectedDecoratorA = (<NodeLabelStylingDecorator>labelVisitor.getLabelStyling());
            expect(expectedDecoratorA.getLabelStyling()).to.be.null;
        });

        it("should throw error when decorator already exists", () => {
            // given
            let labelVisitor = new LabelVisitor();
            let decoratorA = new NodeLabelStylingDecorator("a");
            let decoratorB = new NodeLabelStylingDecorator("b");
            labelVisitor.addDecorator(decoratorA);
            labelVisitor.addDecorator(decoratorB);

            // then
            expect(() => labelVisitor.addDecorator(decoratorA)).to.throw("Decorator already exists");
        });

        it("should add a the decorator on top of other decorators", () => {
            // given
            let labelVisitor = new LabelVisitor();
            let decoratorA = new NodeLabelStylingDecorator("a")
            let decoratorB = new NodeLabelStylingDecorator("b")

            // when
            labelVisitor.addDecorator(decoratorA);
            labelVisitor.addDecorator(decoratorB);

            // then
            expect(labelVisitor.getLabelStyling()).to.be.eq(decoratorB);
            let expectedDecoratorB = <NodeLabelStylingDecorator>labelVisitor.getLabelStyling();
            expect(expectedDecoratorB.getLabelStyling()).to.be.eq(decoratorA);
            let expectedDecoratorA =<NodeLabelStylingDecorator> (<NodeLabelStylingDecorator>labelVisitor.getLabelStyling()).getLabelStyling();
            expect(expectedDecoratorA.getLabelStyling()).to.be.null;
        });
    });

    describe("removeDecorator", () => {
        it("should remove decorator", () => {
            // given
            let labelVisitor = new LabelVisitor();
            let decorator = new NodeLabelStylingDecorator("a")
            labelVisitor.addDecorator(decorator);

            // when
            labelVisitor.removeDecorator(decorator);

            // then
            expect(labelVisitor.getLabelStyling()).to.be.null;
            expect(decorator.getLabelStyling()).to.be.null;
        });

        it("should do nothing when decorator not existing", () => {
            // given
            let labelVisitor = new LabelVisitor();
            let decorator = new NodeLabelStylingDecorator("a")
            labelVisitor.addDecorator(decorator);

            // when
            labelVisitor.removeDecorator(new NodeLabelStylingDecorator("b"));

            // then
            expect(labelVisitor.getLabelStyling()).to.be.eq(decorator);
            expect((<NodeLabelStylingDecorator>labelVisitor.getLabelStyling()).getLabelStyling()).to.be.null;
        });

        it("should have correct structure when removing decorator in between two decorators", () => {
            // given
            let labelVisitor = new LabelVisitor();
            let decoratorA = new NodeLabelStylingDecorator("a");
            let decoratorB = new NodeLabelStylingDecorator("b");
            let decoratorC = new NodeLabelStylingDecorator("c");
            labelVisitor.addDecorator(decoratorA);
            labelVisitor.addDecorator(decoratorB);
            labelVisitor.addDecorator(decoratorC);

            // when
            labelVisitor.removeDecorator(decoratorB);

            // then
            expect(labelVisitor.getLabelStyling()).to.be.eq(decoratorC);
            let expectedDecoratorC = <NodeLabelStylingDecorator> labelVisitor.getLabelStyling();
            expect(expectedDecoratorC.getLabelStyling()).to.be.eq(decoratorA);
            let expectedDecoratorA = <NodeLabelStylingDecorator> expectedDecoratorC.getLabelStyling();
            expect(expectedDecoratorA.getLabelStyling()).to.be.null;
        });

        it("should have correct structure when removing first decorator", () => {
            // given
            let labelVisitor = new LabelVisitor();
            let decoratorA = new NodeLabelStylingDecorator("a");
            let decoratorB = new NodeLabelStylingDecorator("b");
            let decoratorC = new NodeLabelStylingDecorator("c");
            labelVisitor.addDecorator(decoratorA);
            labelVisitor.addDecorator(decoratorB);
            labelVisitor.addDecorator(decoratorC);

            // when
            labelVisitor.removeDecorator(decoratorC);

            // then
            expect(labelVisitor.getLabelStyling()).to.be.eq(decoratorB);
            let expectedDecoratorB = <NodeLabelStylingDecorator> labelVisitor.getLabelStyling();
            expect(expectedDecoratorB.getLabelStyling()).to.be.eq(decoratorA);
            let expectedDecoratorA = <NodeLabelStylingDecorator> expectedDecoratorB.getLabelStyling();
            expect(expectedDecoratorA.getLabelStyling()).to.be.null;
        });

        it("should have correct structure when removing last decorator", () => {
            // given
            let labelVisitor = new LabelVisitor();
            let decoratorA = new NodeLabelStylingDecorator("a");
            let decoratorB = new NodeLabelStylingDecorator("b");
            let decoratorC = new NodeLabelStylingDecorator("c");
            labelVisitor.addDecorator(decoratorA);
            labelVisitor.addDecorator(decoratorB);
            labelVisitor.addDecorator(decoratorC);

            // when
            labelVisitor.removeDecorator(decoratorA);

            // then
            expect(labelVisitor.getLabelStyling()).to.be.eq(decoratorC);
            let expectedDecoratorC = <NodeLabelStylingDecorator> labelVisitor.getLabelStyling();
            expect(expectedDecoratorC.getLabelStyling()).to.be.eq(decoratorB);
            let expectedDecoratorB = <NodeLabelStylingDecorator> expectedDecoratorC.getLabelStyling();
            expect(expectedDecoratorB.getLabelStyling()).to.be.null;
        });
    }); describe("hasDecorator", () => {
        it("should have decorator when added", () => {
            // given
            let labelVisitor = new LabelVisitor();
            let decorator = new NodeLabelStylingDecorator("a")
            labelVisitor.addDecorator(decorator);

            // when
            let has = labelVisitor.hasDecorator(decorator);

            // then
            expect(has).to.be.true;
        });

        it("should not have decorator when not added", () => {
            // given
            let labelVisitor = new LabelVisitor();
            let decorator = new NodeLabelStylingDecorator("a")

            // when
            let has = labelVisitor.hasDecorator(decorator);

            // then
            expect(has).to.be.false;
        });
    });

    describe("visitButton", () => {

        it("should not decorator when decorator is null", () => {
            // given
            const button = new ButtonComponent("", "Label", null);
            labelVisitor = new LabelVisitor();

            // when
            labelVisitor.visitButton(button);

            //then
            expect(button.getJQueryElement().text()).to.be.eq("Label");
        })

        it("should apply decorator", () => {
            // given
            const button = new ButtonComponent("", "Label", null);
            labelVisitor = new LabelVisitor();
            labelVisitor.addDecorator(new NodeLabelStylingDecorator("a"));

            // when
            labelVisitor.visitButton(button);

            //then
            expect(button.getJQueryElement().html()).to.be.eq("<a>Label</a>")
        })

        it("should apply multiple decorators", () => {
            // given
            const button = new ButtonComponent("", "Label", null);
            labelVisitor = new LabelVisitor();
            labelVisitor.addDecorator(new NodeLabelStylingDecorator("a"));
            labelVisitor.addDecorator(new NodeLabelStylingDecorator("b"));

            // when
            labelVisitor.visitButton(button);

            //then
            expect(button.getJQueryElement().html()).to.be.eq("<a><b>Label</b></a>")
        })

        it("should remove decorator from label when decorator was applied before", () => {
            // given
            const button = new ButtonComponent("", "Label", null);
            const labelVisitor = new LabelVisitor();
            const decorator = new NodeLabelStylingDecorator("a");
            labelVisitor.addDecorator(decorator);
            labelVisitor.visitButton(button);
            labelVisitor.removeDecorator(decorator);

            // when
            labelVisitor.visitButton(button);

            //then
            expect(button.getJQueryElement().html()).to.be.eq("Label")
        })

        it("should throw an error if there are multiple leaf nodes", () => {
            //TODO
        })
    });

    describe("visitAnimationUI", () => {
        it("should apply decorators", () => {
            // given
            const animationUI = new AnimationComponent("animationUI", "title");
            labelVisitor = new LabelVisitor();
            labelVisitor.addDecorator(new NodeLabelStylingDecorator("a"));
            labelVisitor.addDecorator(new NodeLabelStylingDecorator("b"));
            const title = animationUI.getTitleElement().html();
            const checkLabel = animationUI.getPropertyElement().html();

            // when
            labelVisitor.visitAnimationUI(animationUI);

            // then
            expect(animationUI.getTitleElement().html()).to.be.eq(`<a><b>${title}</b></a>`);
            expect(animationUI.getPropertyElement().html()).to.be.eq(`<a><b>${checkLabel}</b></a>`);
        });
    });

    describe("visitAnimationChartUI", () => {
        it("should apply decorators", () => {
            // given
            const animationChartUI = new ChartComponent("animationChartUI", "bar", new Animation(null));
            labelVisitor = new LabelVisitor();
            labelVisitor.addDecorator(new NodeLabelStylingDecorator("a"));
            labelVisitor.addDecorator(new NodeLabelStylingDecorator("b"));
            const selectLabel = animationChartUI.getSelectLabelElement().html();
            const checkLabel = animationChartUI.getCheckLabelElement().html();

            // when
            labelVisitor.visitAnimationCharUI(animationChartUI);

            // then
            expect(animationChartUI.getSelectLabelElement().html()).to.be.eq(`<a><b>${selectLabel}</b></a>`);
            expect(animationChartUI.getCheckLabelElement().html()).to.be.eq(`<a><b>${checkLabel}</b></a>`);
        });
    });
});