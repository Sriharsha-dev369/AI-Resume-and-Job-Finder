interface ParsedResume {
  name: string;
  email: string;
  phone: string;
  experience: string;
  education: string;
  skills: string;
}

class ResumeParser {
  
  // Extract email using regex
  private extractEmail(text: string): string {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const match = text.match(emailRegex);
    return match ? match[0] : '';
  }

  // Extract phone number using regex
  private extractPhone(text: string): string {
    const phoneRegex = /(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\d{10}/;
    const match = text.match(phoneRegex);
    return match ? match[0].replace(/\D/g, '') : '';
  }

  // Extract name (assumes first line or first 100 chars contain name)
  private extractName(text: string): string {
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    const firstLine = lines[0]?.trim() || '';
    
    // Remove email and phone if present in first line
    return firstLine
      .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '')
      .replace(/(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g, '')
      .trim();
  }

  // Extract section content based on common headers
  private extractSection(text: string, sectionNames: string[]): string {
    const lines:string[] = text.split('\n');
    let inSection = false;
    let sectionContent: string[] = [];
    
    // Common section headers that would end the current section
    const allHeaders = [
      'experience', 'work experience', 'employment', 'professional experience',
      'education', 'academic background', 'qualifications',
      'skills', 'technical skills', 'core competencies', 'expertise',
      'projects', 'certifications', 'achievements', 'summary', 
      'contact', 'awards', 'languages'
    ];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]!.trim().toLowerCase();
      
      // Check if we've hit our target section
      if (sectionNames.some(name => line?.includes(name.toLowerCase()))) {
        inSection = true;
        continue;
      }
      
      // Check if we've hit a different section (end current section)
      if (inSection && allHeaders.some(header => 
        line === header || line?.startsWith(header + ':') || line?.startsWith(header + ' ')
      )) {
        if (!sectionNames.some(name => line?.includes(name.toLowerCase()))) {
          break;
        }
      }
      
      // Collect content if we're in the section
      if (inSection && line && line.length > 0) {
        sectionContent.push(line);
      }
    }
    
    return sectionContent.join(' ').trim();
  }

  // Main parsing functionl
  parse(rawText: string): ParsedResume {
    const parsedData: ParsedResume = {
      name: this.extractName(rawText),
      email: this.extractEmail(rawText),
      phone: this.extractPhone(rawText),
      experience: this.extractSection(rawText, [
        'experience', 'work experience', 'employment', 'professional experience'
      ]),
      education: this.extractSection(rawText, [
        'education', 'academic background', 'qualifications'
      ]),
      skills: this.extractSection(rawText, [
        'skills', 'technical skills', 'core competencies', 'expertise'
      ])
    };

    return parsedData;
  }
}

async function parseResume(rawText: string): Promise<ParsedResume> {
  const parser = new ResumeParser();
  return parser.parse(rawText);
}

// For CommonJS compatibility
module.exports = { parseResume };