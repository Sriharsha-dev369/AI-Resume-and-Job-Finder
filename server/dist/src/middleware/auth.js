"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
function requireAuth(req, res, next) {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token)
        return res.status(401).json({ message: 'Not logged in' });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET || '');
        next();
    }
    catch {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
module.exports = requireAuth;
//# sourceMappingURL=auth.js.map