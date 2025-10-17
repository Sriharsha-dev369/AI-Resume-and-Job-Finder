interface BasicInfo {
    name: string;
    phone: string;
    linkedin: string;
    email: string;
    github: string;
    website: string;
    address: string;
}
function basicInfoHandler(basicInfo: BasicInfo) {
    // Process the basic information
    const name = basicInfo.name || "N/A";
    const phone = basicInfo.phone || "N/A";
    const linkedin = basicInfo.linkedin || "N/A";    
    const email = basicInfo.email || "N/A";
    const github = basicInfo.github || "N/A";
    const website = basicInfo.website || "N/A";
    const address = basicInfo.address || "N/A"; 
    return {
        name: basicInfo.name,
        contact: {
            phone: basicInfo.phone,
            email: basicInfo.email,
            linkedin: basicInfo.linkedin,
            github: basicInfo.github,
            website: basicInfo.website,
            address: basicInfo.address
        }
    };
}

module.exports = { basicInfoHandler };
