/*public class StudentInputDto {
    public String fistName;
    public String lastName;
    public String phone;
    public LocalDate birthDate;
    public String uuidUser;
    public String address;
    public String identification;
    public String nacionality;
    public String gender;
    public String image;
    public String uuidCurrentParallel;
    public String uuidCurrentSchoolYear;
    public String uuidCurrentSection;
}*/
export class Student {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public phone: string,
        public birthDate: string,
        public uuidUser: string,
        public address: string,
        public identification: string,
        public nationality: string,
        public gender: string,
        public image: string,
        public uuidCurrentSchoolYear: string,
        public uuidCurrentSection: string,
        public uuidParallel: string
    ) { }
}
