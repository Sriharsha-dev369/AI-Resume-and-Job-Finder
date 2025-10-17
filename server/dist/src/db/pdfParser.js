"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pdfparse = require('pdf-parse'); // as the lib is exported in commonjs format
const fs = require('fs');
async function extractTextFromPdf(filepath) {
    const dataBuffer = fs.readFileSync(filepath);
    const data = await pdfparse(dataBuffer);
    return data.text;
}
function generateJsonData(text) {
    const lines = text.split('\n');
    const jsonData = [];
    lines.forEach((line) => {
        const [key, value] = line.split(': ');
        if (key && value) {
            jsonData.push({ [key]: value });
        }
    });
    return jsonData;
}
async function convertPdfToJson(filePath) {
    const text = await extractTextFromPdf(filePath);
    const jsonData = generateJsonData(text);
    return jsonData;
}
// Example usage (commented out for server use)
// convertPdfToJson('path/to/your/file.pdf').then(json => {
//   console.log(JSON.stringify(json, null, 2));
// });
module.exports = { extractTextFromPdf, generateJsonData, convertPdfToJson };
//# sourceMappingURL=pdfParser.js.map