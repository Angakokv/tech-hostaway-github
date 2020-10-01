import {
    By,
    element
} from "protractor";

import {
    PROPERTY_VIEW_NAME,
    THUMBNAIL_IMAGE_XPATH_SELECTOR,
    CURRENT_THUMBNAIL_IMAGE_XPATH_SELECTOR
} from "./property-page.constants";

import * as ElementHelpers from "../../components/element-helpers";
import * as ExpectationHelpers from "../../components/expectation-helpers";
import * as CommonPageHelpers from "../common/common-page.helpers";

/* tslint:disable:member-ordering*/
export class PropertyPage {
    // Containers
    static readonly mainContainer =
        element(By.css("div.listing-view"));

    // Images controls
    static readonly leftImage =
        element(By.css("div.image-gallery-slide.left img"));
    static readonly currentImage =
        element(By.css("div.image-gallery-slide.center img"));
    static readonly rightImage =
        element(By.css("div.image-gallery-slide.right img"));
    static readonly previousThumbnailImage =
        element(By.xpath(
            `(//${CURRENT_THUMBNAIL_IMAGE_XPATH_SELECTOR}/preceding::${THUMBNAIL_IMAGE_XPATH_SELECTOR})[1]`));
    static readonly currentThumbnailImage =
        element(By.xpath(CURRENT_THUMBNAIL_IMAGE_XPATH_SELECTOR));
    static readonly nextThumbnailImage =
        element(By.xpath(
            `(//${CURRENT_THUMBNAIL_IMAGE_XPATH_SELECTOR}/following::${THUMBNAIL_IMAGE_XPATH_SELECTOR})[1]`));
    static readonly previousSlideButton =
        element(By.css("button[aria-label=\"Previous Slide\"]"));
    static readonly nextSlideButton =
        element(By.css("button[aria-label=\"Next Slide\"]"));

    // Listing controls
    static readonly listingContainer =
        element(By.css("div.listing-view-info"));
    static readonly listingMainInfo =
        element(By.css("div.listing-main-info"));
    static readonly listingNameAndAddress =
        PropertyPage.listingMainInfo.element(By.css("div"));
    static readonly listingName =
        PropertyPage.listingMainInfo.element(By.css("label"));
    static readonly listingDescription =
        PropertyPage.listingContainer.element(By.css("div.listing-description > p"));

    // Images methods
    static async clickPreviousSlide() {
        await ElementHelpers.click(this.previousSlideButton);
    }

    static async clickNextSlide() {
        await ElementHelpers.click(this.nextSlideButton);
    }

    static async getCurrentImageSource() {
        return await ElementHelpers.getImageSource(this.currentImage);
    }

    static async getPreviousThumbnailImageSource() {
        return await ElementHelpers.getImageSource(this.previousThumbnailImage);
    }

    static async getCurrentThumbnailImageSource() {
        return await ElementHelpers.getImageSource(this.currentThumbnailImage);
    }

    static async getNextThumbnailImageSource() {
        return await ElementHelpers.getImageSource(this.nextThumbnailImage);
    }

    // General methods
    static async verifyPageIsOpened() {
        await ExpectationHelpers.verifyDisplayStatus(this.mainContainer,
            PROPERTY_VIEW_NAME);
    }

    static async verifyPropertyHaveNonEmptyAttributes() {
        await CommonPageHelpers.verifyElementTextIsntEmpty(this.listingName,
            "Property name");
        const propertyAddress = (await ElementHelpers.getText(
            this.listingNameAndAddress)).split("\n")[1];
        await ExpectationHelpers.verifyValueEquality(propertyAddress,
            "Property address", false);
        await CommonPageHelpers.verifyElementTextIsntEmpty(this.listingDescription,
            "Property description");
    }
}
