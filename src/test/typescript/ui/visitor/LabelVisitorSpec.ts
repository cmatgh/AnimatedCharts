import "mocha"
import { expect } from "chai";
import jsdom = require('jsdom');
import {LabelVisitor} from "../../../../main/typescript/animatedcharts/ui/visitor/LabelVisitor";
import {UIButton} from "../../../../main/typescript/animatedcharts/ui/UIButton";
import {AnimationUI} from "../../../../main/typescript/animatedcharts/ui/AnimationUI";
import {AnimationChartUI} from "../../../../main/typescript/animatedcharts/ui/AnimationChartUI";
import {Animation} from "../../../../main/typescript/animatedcharts/animation/Animation";
var document = new jsdom.JSDOM(`<!DOCTYPE html><html></html>`).window.document;
var window = document.defaultView;

global.window = window
global.$ = require('jquery');
global.documet = document;

describe("FontDecoratorVisitor", () => {

    let fontDecoratorVisitor : LabelVisitor;

    beforeEach( () => {
        fontDecoratorVisitor = new LabelVisitor(new Set<string>());
    });

    describe("constructor", () => {
        it("adds all classes", () => {
            // when
            fontDecoratorVisitor = new LabelVisitor(new Set<string>(["class1", "class2", "class3"]));

            // then
            expect(fontDecoratorVisitor.getClasses().length).to.be.eq(3);
            expect(fontDecoratorVisitor.getClasses()).contains("class1");
            expect(fontDecoratorVisitor.getClasses()).contains("class2");
            expect(fontDecoratorVisitor.getClasses()).contains("class3");
        });

        it("should not add a the same class twice", () => {
            // given
            fontDecoratorVisitor.addClass("class");

            // when
            fontDecoratorVisitor.addClass("class");

            // then
            expect(fontDecoratorVisitor.getClasses().length).to.be.eq(1);
            expect(fontDecoratorVisitor.getClasses()[0]).to.be.eq("class");
        });
    });

    describe("addClass", () => {
        it("should add a class", () => {
            // when
            fontDecoratorVisitor.addClass("class");

            // then
            expect(fontDecoratorVisitor.getClasses().length).to.be.eq(1);
            expect(fontDecoratorVisitor.getClasses()[0]).to.be.eq("class");
        });

        it("should not add a the same class twice", () => {
            // given
            fontDecoratorVisitor.addClass("class");

            // when
            fontDecoratorVisitor.addClass("class");

            // then
            expect(fontDecoratorVisitor.getClasses().length).to.be.eq(1);
            expect(fontDecoratorVisitor.getClasses()[0]).to.be.eq("class");
        });
    });

    describe("removeClass", () => {
        it("should remove class", () => {
            fontDecoratorVisitor = new LabelVisitor(new Set<string>(["class"]));

            // when
            fontDecoratorVisitor.removeClass("class");

            // then
            expect(fontDecoratorVisitor.getClasses().length).to.be.eq(0);
        });

        it("should do nothing when not existing", () => {
            // when
            fontDecoratorVisitor.removeClass("class");

            // then
            expect(fontDecoratorVisitor.getClasses().length).to.be.eq(0);
        });
    });


    describe("clearClasses", () => {
        it("should remove all classes", () => {
            fontDecoratorVisitor = new LabelVisitor(new Set<string>(["class1", "class2", "class3"]));

            // when
            fontDecoratorVisitor.clearClasses();

            // then
            expect(fontDecoratorVisitor.getClasses().length).to.be.eq(0);
        });
    });

    describe("visitButton", () => {
        it("should not apply any classes when no classes specified", () => {
            // given
            const button = new UIButton("", "Label", null);
            button.getJQueryElement().addClass("testClass")
            const classesBefore = button.getJQueryElement().attr("class");

            // when
            fontDecoratorVisitor.visitButton(button);

            //then
            expect(button.getJQueryElement().attr("class")).to.be.eq(classesBefore);
        });

        it("should apply decoratorClasses attribute to button element when no classes specified", () => {
            // given
            const button = new UIButton("", "Label", null);

            // when
            fontDecoratorVisitor.visitButton(button);

            //then
            expect(button.getJQueryElement().attr("decoratorClasses")).to.be.eq("");
        })

        it("should apply all classes", () => {
            // given
            const button = new UIButton("", "Label", null);
            fontDecoratorVisitor = new LabelVisitor(new Set<string>(["class1", "class2"]));

            // when
            fontDecoratorVisitor.visitButton(button);

            //then
            expect(button.getJQueryElement().attr("decoratorClasses")).to.be.eq("class1 class2");
            expect(button.getJQueryElement().attr("class")).to.contain("class1");
            expect(button.getJQueryElement().attr("class")).to.contain("class2");
        })

        it("should remove all classes that are no longer specified without removing classes that the visitor has not set", () => {
            // given
            const button = new UIButton("", "Label", null);
            const classesBefore = button.getJQueryElement().attr("class");
            fontDecoratorVisitor = new LabelVisitor(new Set<string>(["class1", "class2"]));
            fontDecoratorVisitor.clearClasses();

            // when
            fontDecoratorVisitor.visitButton(button);

            //then
            expect(button.getJQueryElement().attr("class")).to.not.contain("class1");
            expect(button.getJQueryElement().attr("class")).to.not.contain("class2");
            expect(button.getJQueryElement().attr("class")).to.contain(classesBefore);
        })
    });

    describe("visitAnimationUI", () => {
        it("sets classes to the correct fields", () => {
            // given
            const animationUI = new AnimationUI("", "title");
            fontDecoratorVisitor.addClass("decoratorClass");

            // when
            fontDecoratorVisitor.visitAnimationUI(animationUI);

            //then
            expect(animationUI.getJQueryElement().find(`#property_${animationUI.getId()}`).attr("class")).to.contain("decoratorClass");
            expect(animationUI.getJQueryElement().find(`#title_${animationUI.getId()}`).attr("class")).to.contain("decoratorClass");
        });
    });

    describe("visitAnimationChartUI", () => {
        it("sets classes to the correct fields", () => {
            // given
            const animationChartUI = new AnimationChartUI("", "bar", new Animation(global.window));
            fontDecoratorVisitor.addClass("decoratorClass");

            // when
            fontDecoratorVisitor.visitAnimationCharUI(animationChartUI);

            //then
            expect(animationChartUI.getJQueryElement().find(`#chart-sort-check-label_${animationChartUI.getId()}`).attr("class")).to.contain("decoratorClass");
            expect(animationChartUI.getJQueryElement().find(`#chart-sort-select_${animationChartUI.getId()}`).attr("class")).to.contain("decoratorClass");
        });
    });
});