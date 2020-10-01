import {
    By,
    element
} from "protractor";

import { WELCOME_MESSAGE_NAME } from "./home-page.constants";

import * as ExpectationHelpers from "../../components/expectation-helpers";

export class HomePage {
    static readonly welcomeMessage =
        element(By.css("span.welcome-msg"));

    static async verifyPageIsOpened() {
        await ExpectationHelpers.verifyDisplayStatus(this.welcomeMessage,
            WELCOME_MESSAGE_NAME);
    }
}
