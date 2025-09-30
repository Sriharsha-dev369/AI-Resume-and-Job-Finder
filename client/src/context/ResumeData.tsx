'use client'
import {useState , createContext , useContext} from "react";

interface BasicInfo {
    name: string;
    phone: string;
    linkedin: string;
    email: string;
}

interface ResumeContext {
    basicInfo : BasicInfo;
    setBasicInfo: React.Dispatch<React.SetStateAction<BasicInfo>>;
    EducationInfo?: string[];
    Experianceinfo?: string[];
    SkillsInfo?: string[];
}

const ResumeContext = createContext<ResumeContext | null>(null);

const ResumeProvider: React.FC<{children : React.ReactNode}> = ({children})=>{
    const[basicInfo,setBasicInfo] = useState<BasicInfo>(
        {name:"",
        phone:"",
        linkedin:"",
        email:"",}
    );

    
    return(<div>
        <ResumeContext.Provider value={{basicInfo,setBasicInfo}}>{children}</ResumeContext.Provider>
    </div>)
}

export default ResumeProvider;

export const useResumeContext = ()=>{
    const context = useContext(ResumeContext);
    if(!context){
        throw new Error('useResumeContext must be used within ResumeProvider')
    }
    return context;
}
