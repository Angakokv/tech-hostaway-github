import {
    By,
    element,
    ElementFinder
} from "protractor";

import { PROPERTIES_LIST_NAME } from "./common-page.constants";

import * as ElementHelpers from "../../components/element-helpers";
import * as TextBoxHelpers from "../../components/textbox-helpers";
import * as ExpectationHelpers from "../../components/expectation-helpers";
import * as CommonPageHelpers from "../../page-objects/common/common-page.helpers";

export class CommonPage {
    // Search bar controls
    static readonly checkinField =
        element(By.css("input#startDate"));
    static readonly checkoutField =
        element(By.css("input#endDate"));
    static readonly guestsField =
        element(By.css("input[name=\"numberOfGuests\"]"));
    static readonly searchButton =
        element(By.css("button.search-bar__input"));
    static readonly spinnerIcon =
        element(By.css("i.fa-spinner"));

    // Listings controls
    static readonly listingsContainer =
        element(By.css("div.listings-container"));
    static readonly allListingsCards =
        element.all(By.css("div.listing.paper"));
    static readonly listingMainInfo =
        element(By.css("div.main-info"));
    static readonly listingName =
        element(By.css("div.main-info > label"));
    static readonly listingPrice =
        element(By.css("div.price"));

    // Buttons
    static readonly closeButton =
        element(By.buttonText("Close"));

    static async getListingCardsQuantity() {
        return await this.allListingsCards.count();
    }

    static async inputGuests(quantity: string) {
        await TextBoxHelpers.sendKeys(this.guestsField, quantity);
    }

    static async verifyGuestsValue(expectedValue: string) {
        await ExpectationHelpers.verifyTextBoxValueEquality(this.guestsField, expectedValue);
    }

    static async clickSearch() {
        await ElementHelpers.click(this.searchButton);
    }

    static async verifyPropertiesListIsDisplayed(expectedState = true) {
        await ExpectationHelpers.verifyDisplayStatus(this.listingsContainer,
            PROPERTIES_LIST_NAME, expectedState);
    }

    static async verifyPropertyHaveNonEmptyAttributes(listingCard: ElementFinder) {
        await CommonPageHelpers.verifyElementTextIsntEmpty(listingCard.element(CommonPage.listingName.locator()),
            "Property name");
        const propertyAddress = (await ElementHelpers.getText(
            listingCard.element(CommonPage.listingMainInfo.locator()))).split("\n")[1];
        await ExpectationHelpers.verifyValueEquality(propertyAddress,
            "Property address", false);
        await CommonPageHelpers.verifyElementTextIsntEmpty(listingCard.element(CommonPage.listingPrice.locator()),
            "Property price");
    }
}
