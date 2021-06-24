export interface PatientImage {
    id:string;
    lastEditDate?:string;
    createdDate?:string;
    patientId?:string;
    Date?:Date;
    path?:string;
    selected?:boolean;
}
export interface PatientImageGet{
    date:Date;
    patientImage:PatientImage[]; 
}
