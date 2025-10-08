import { basicInfoHandler } from './sectionHandlers/basicInfoHandler';
import { experienceHandler } from './sectionHandlers/experienceHandler';
import { educationHandler } from './sectionHandlers/educationHandler';
import { skillsHandler } from './sectionHandlers/skillsHandler';
import { projectsHandler } from './sectionHandlers/projectsHandler';


export  async function parseResume(rawText:string) {
    try {
      
      // Segregate into sections
      const sections = segregateIntoSections(rawText);

      // Process each section through dedicated handlers
      const processedData = await processSections(sections);

      return processedData;
    } catch (error: any) {
      throw new Error(`PDF parsing failed: ${error.message}`);
    }
  }

  function segregateIntoSections(rawText: string): SectionMap {
    const sections: SectionMap = {
      basicInfo: '',
      experience: '',
      education: '',
      skills: '',
      projects: '',
      summary: ''
    };

    const lines: string[] = rawText.split('\n');
    let currentSection: string = 'basicInfo';

    for (let i = 0; i < lines.length; i++) {
      const line = (lines[i] ?? '').trim();
      
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

  function detectSection(line: string): string | null {
    const sectionPatterns = {
      basicInfo: /^(name|contact|personal|info|information|linkedIn|github|website|email|phone|address)/i,
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

  async function processSections(sections: SectionMap): Promise<ParsedResume> {
    return {
      basicInfo: await basicInfoHandler.process(sections.basicInfo),
      experience: await experienceHandler.process(sections.experience),
      education: await educationHandler.process(sections.education),
      skills: await skillsHandler.process(sections.skills),
      projects: await projectsHandler.process(sections.projects),
      summary: sections.summary
    };
  }


export interface SectionMap {
  basicInfo: string;
  experience: string;
  education: string;
  skills: string;
  projects: string;
  summary: string;
  [key: string]: string; // Allow string indexing
}

// export interface ParsedResume {
//   basicInfo: BasicInfo;
//   experience: Experience[];
//   education: Education[];
//   skills: Skills;
//   projects: Project[];
//   summary: string;
// }



