export function checkObjectEmptyProperties(object: any): boolean {

    for (const property in object) {
        if (object.hasOwnProperty(property) && object[property]) {
            return false;
        }
    }
    return true;

}
