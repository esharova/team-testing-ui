export class Reporter {

    constructor(allure) {
        this.allure = allure;
        this.labels = {};
    }
    set description(description) {
        this.allure.setDescription(description);
        return this;
    }

    feature(feature) {
        this.addLabel('feature', feature);
        return this;
    }

    story(story) {
        this.addLabel('story', story);
        return this;
    }

    epic(epic) {
        this.addLabel('epic', epic);
        return this;
    }

    addAttachment(name, buffer, type) {
        !!this.allure.getCurrentSuite() && this.allure.addAttachment(name, buffer, type);
        return this;
    }

    addLabel(name, value) {
        if (this.allure.getCurrentSuite() && !this.allure.getCurrentTest()) {
            this.allure.getCurrentSuite().addLabel(name, value);
            return this;
        }
        if( this.allure.getCurrentSuite() && this.allure.getCurrentTest()) {
            this.allure.getCurrentTest().addLabel(name, value);
            return this;
        }
        this.labels = {
            ...this.labels,
            [name]: value
        };

        return this;
    };
}
