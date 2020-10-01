import { DialogPage } from "./dialog-page.po";

export async function verifyDialogIsDisplayedAndContainsText(expectedText: string) {
    await DialogPage.verifyDialogIsDisplayed();
    await DialogPage.verifyDialogContainsText(expectedText);
}

