const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');

// Đường dẫn lưu file log
const logFilePath = path.join(__dirname, 'rate_limit_log.txt');

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 5, // Mỗi IP có thể gửi tối đa 5 yêu cầu mỗi phút
    standardHeaders: true, // Thêm header RateLimit-* vào response
    legacyHeaders: false, // Bỏ các header X-RateLimit-* cũ
    message: "Too many requests, please try again later.",
    handler: (req, res, next, options) => {
        const blockedIp = req.ip;
        const timestamp = new Date().toISOString();
        const logMessage = `IP ${blockedIp} was blocked at ${timestamp}\n`;

        // Ghi IP bị giới hạn vào file
        fs.appendFile(logFilePath, logMessage, (err) => {
            if (err) {
                console.error("Failed to write to log file:", err);
            }
        });

        // Gửi phản hồi tới client
        res.status(options.statusCode).send(options.message);
    }
});

module.exports = limiter;
