"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This class represent the tuit that is been posted by users.
 */
class Tuit {
    constructor() {
        this.tuit = '';
        this.postedOn = new Date();
        this.postBy = null;
    }
}
exports.default = Tuit;
