"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0)
        return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / 1024 ** i)} ${sizes[i]}`;
}
exports.default = bytesToSize;
//# sourceMappingURL=bytes.js.map