interface ParsedReumse {
      name:string;
      email:string;
      phone:string;
      skills:string;
      experience:string;
      education:string;
}

class ResumeParser {
      private extractSections(text:string,sectionNames:string[]):string{
            const lines = text.split('\n');
            
      }
}

async function parseResume(rawText:string) {

}

module.exports = { parseResume };



