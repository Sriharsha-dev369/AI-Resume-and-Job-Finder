const { callGroq } = require("../services/groq");

interface ParsedResume {
  basicInfo: {
    name: string;
    email: string;
    phone: string;
    linkedin?: string;
    github?: string;
    website?: string;
    address?: string;
  };
  experience: Array<{
    role: string;
    company: string;
    duration: string;
    description: string;
  }>;
  project: Array<{
    name: string;
    description: string;
    technologies?: string[];
    duration?: string;
    link?: string;
  }>;
  education: Array<{
    degree: string;
    major: string;
    institution: string;
    location: string;
    startDate: number;
    endDate: number;
    minor?: string;
    gpa?: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    relevance: string;
  }>;
  achievements: Array<{
    title: string;
    issuer?: string;
    date?: string;
    description?: string;
  }>;
  skills: string[];
  summary: string;
}

class ResumeParser {
  async parse(rawText: string): Promise<ParsedResume> {
    const prompt = `
You are a structured resume parser. 
Your job is to convert unstructured resume text into strictly valid JSON that matches this interface:

interface ParsedResume {
  basicInfo: {
    name: string;
    email: string;
    phone: string;
    linkedin?: string;
    github?: string;
    website?: string;
    address?: string;
  };
  experience: Array<{
    role: string;
    company: string;
    duration: string;
    description: string;
  }>;
  project: Array<{
    name: string;
    description: string;
    technologies?: string[];
    duration?: string;
    link?: string;
  }>;
  education: Array<{
    degree: string;
    major: string;
    institution: string;
    location: string;
    startDate: number;
    endDate: number;
    minor?: string;
    gpa?: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    relevance: string;
  }>;
  achievements: Array<{
    title: string;
    issuer?: string;
    date?: string;
    description?: string;
  }>;
  skills: string[];
  summary: string;
}

Important extraction rules:
1. **Projects**:
   - If description contains "Tech Used:", "Tools:", "Technologies:", or similar phrases,
     extract those as an array in \`technologies\`.
   - Keep only tech/tool names, not full sentences.
   - Example: "Tech Used: React, Node.js, MongoDB" → \`["React", "Node.js", "MongoDB"]\`.
2. Keep description clean (remove the tech line if you already extracted it).
3. If technologies are embedded inline (e.g., “Built with Python Flask and React”), 
   infer them intelligently.
4. Return **only JSON**, no markdown, no commentary.

Resume text:
${rawText}
`;

    const response = await callGroq(prompt);

    try {
      const jsonString = response
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      const parsed = JSON.parse(jsonString);
      // Optional: validate shape here (recommended for safety)
      return parsed as ParsedResume;
    } catch (e) {
      let message = "Failed to parse structured resume JSON.";
      if (e instanceof Error) {
        message += ` Reason: ${e.message}`;
      }
      console.error("JSON parse failed:", message);
      throw new Error(message); // 👈 Throw instead of returning invalid type
    }
  }
}

async function parseResume(rawText: string): Promise<ParsedResume> {
  console.log(rawText);
  const parser = new ResumeParser();
  return parser.parse(rawText);
}

// For CommonJS compatibility
module.exports = { parseResume };
