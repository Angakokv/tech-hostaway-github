export function getDisplayedValidationText(name: string) {
    return `"${name}" should be displayed`;
}

export function getNotDisplayedValidationText(name: string) {
    return `"${name}" should not be displayed`;
}

export function getPresentedValidationText(name: string) {
    return `"${name}" should be presented`;
}

export function getNotPresentedValidationText(name: string) {
    return `"${name}" shouldn't be presented`;
}

export function getEnabledValidationText(name: string) {
    return `"${name}" should be enabled`;
}

export function getNotEnabledValidationText(name: string) {
    return `"${name}" shouldn't be enabled`;
}

export function getContainsValidationText(object: any, element: any) {
    return `"${object}" should contain "${element}"`;
}

export function getDoesntContainValidationText(object: any, element: any) {
    return `"${object}" shouldn't contain "${element}"`;
}

export function getEqualToValidationText(actualValue: any, expectedValue: any, message = "") {
    return message === "" ?
        `"${actualValue}" should be equal to "${expectedValue}"` :
        `"${message}" (${actualValue}) should be equal to "${expectedValue}"`;
}

export function getNotEqualToValidationText(actualValue: any, expectedValue: any, message = "") {
    return message === "" ?
        `"${actualValue}" shouldn't be equal to "${expectedValue}"` :
        `"${message}" (${actualValue}) shouldn't be equal to "${expectedValue}"`;
}
