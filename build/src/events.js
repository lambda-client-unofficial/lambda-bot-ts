"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventsLoader_1 = require("./eventsLoader");
const resgisterEvents = (client) => {
    [/*'client', */ 'guild'].map((x) => (0, eventsLoader_1.scanEvents)(client, x));
};
exports.default = resgisterEvents;
//# sourceMappingURL=events.js.map