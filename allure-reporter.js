export class Reporter {

    constructor(allure) {
        this.allure = allure;
    }

    set description(description) {
        this.allure.setDescription(description);
        return this;
    }

    feature(feature) {
        this.addLabel('feature', feature);
        return this;
    }

    addAttachment(name, buffer, type) {
        !!this.allure.getCurrentSuite() && this.allure.addAttachment(name, buffer, type);
        return this;
    }

    addLabel(name, string) {
        this.allure.getCurrentTest().addLabel(name, value);
        return this;
    };
}
