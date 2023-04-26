export class DuplicateAddressError extends Error {
    constructor() {
        super('Duplicate address record');
    }
}