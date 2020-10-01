import { element, By } from "protractor";
import { CommonPage } from "../common-page.po";

import { DIALOG_NAME } from "./dialog-page.constants";

import * as ElementHelpers from "../../../components/element-helpers";
import * as ExpectationHelpers from "../../../components/expectation-helpers";

export class DialogPage {
    static readonly dialogContainer =
        element(By.css("div.modal-dialog"));
    static readonly closeButton =
        DialogPage.dialogContainer.element(CommonPage.closeButton.locator());

    static async closeDialog() {
        await ElementHelpers.click(this.closeButton);
    }

    static async verifyDialogIsDisplayed() {
        await ExpectationHelpers.verifyDisplayStatus(this.dialogContainer,
            DIALOG_NAME);
    }

    static async verifyDialogPresentStatus(expectedState = false) {
        await ExpectationHelpers.verifyPresentStatus(this.dialogContainer,
            DIALOG_NAME, expectedState);
    }

    static async verifyDialogContainsText(expectedText: string) {
        const actualText = await ElementHelpers.getText(this.dialogContainer);

        await ExpectationHelpers.verifyObjectContains(actualText, expectedText);
    }
}
