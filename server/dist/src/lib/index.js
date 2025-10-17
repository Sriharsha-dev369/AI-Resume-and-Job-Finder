"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { basicInfoHandler } = require('./sectionHandlers/basicInfoHandler');
const { experienceHandler } = require('./sectionHandlers/experienceHandler');
const { educationHandler } = require('./sectionHandlers/educationHandler');
const { skillsHandler } = require('./sectionHandlers/skillsHandler');
const { projectsHandler } = require('./sectionHandlers/projectsHandler');
async function parseResume(rawText) {
    try {
        // Segregate into sections
        const sections = segregateIntoSections(rawText);
        // Process each section through dedicated handlers
        const processedData = await processSections(sections);
        return processedData;
    }
    catch (error) {
        throw new Error(`PDF parsing failed: ${error.message}`);
    }
}
function segregateIntoSections(rawText) {
    var _a;
    const sections = {
        basicInfo: '',
        experience: '',
        education: '',
        skills: '',
        projects: '',
        summary: ''
    };
    const lines = rawText.split('\n');
    let currentSection = 'basicInfo';
    for (let i = 0; i < lines.length; i++) {
        const line = ((_a = lines[i]) !== null && _a !== void 0 ? _a : '').trim();
        // Detect section headers
        const section = detectSection(line);
        if (section) {
            currentSection = section;
            continue;
        }
        // Add content to current section
        if (line && sections[currentSection] !== undefined) {
            sections[currentSection] += line + '\n';
        }
    }
    return sections;
}
function detectSection(line) {
    const sectionPatterns = {
        basicInfo: /^(name|contact|linkedIn|github|website|email|phone|address)/i,
        experience: /^(work|experience|employment|professional)/i,
        education: /^(education|academic)/i,
        skills: /^(skills|technical|technologies)/i,
        projects: /^(projects|portfolio)/i,
        summary: /^(summary|objective)/i
    };
    for (const [section, pattern] of Object.entries(sectionPatterns)) {
        if (pattern.test(line) && line.length < 50) {
            return section;
        }
    }
    return null;
}
async function processSections(sections) {
    return {
        basicInfo: await basicInfoHandler.process(sections.basicInfo),
        experience: await experienceHandler.process(sections.experience),
        education: await educationHandler.process(sections.education),
        skills: await skillsHandler.process(sections.skills),
        projects: await projectsHandler.process(sections.projects),
        summary: sections.summary
    };
}
// export interface ParsedResume {
//   basicInfo: BasicInfo;
//   experience: Experience[];
//   education: Education[];
//   skills: Skills;
//   projects: Project[];
//   summary: string;
// }
module.exports = { parseResume };
//# sourceMappingURL=index.js.map