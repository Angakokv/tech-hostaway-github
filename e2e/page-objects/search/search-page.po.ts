import { browser } from "protractor";

import * as ExpectationHelpers from "../../components/expectation-helpers";

export class SearchPage {
    static async verifyPageIsOpened() {
        const currentUrl = await browser.getCurrentUrl();
        await ExpectationHelpers.verifyObjectContains(currentUrl, "search");
    }
}
