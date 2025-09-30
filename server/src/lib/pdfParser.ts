import {default as pdfparse} from 'pdf-parse'; // as the lib is exported in commonjs format
import fs from 'fs';


async function extractTextFromPdf(filepath: string):Promise<string>{
    const dataBuffer = fs.readFileSync(filepath);
    const data = await pdfparse(dataBuffer);
    return data.text;
}

function generateJsonData(text: string): Array<object> {
    const lines = text.split('\n');
    const jsonData: Array<object> = [];

    lines.forEach((line) => {
        const [key, value] = line.split(': ');
        if (key && value) {
            jsonData.push({ [key]: value });
        }
    });

    return jsonData;
}

async function convertPdfToJson(filePath: string): Promise<Array<object>> {
    const text = await extractTextFromPdf(filePath);
    const jsonData = generateJsonData(text);
    return jsonData;
}

// Example usage
convertPdfToJson('path/to/your/file.pdf').then(json => {
    console.log(JSON.stringify(json, null, 2));
});
