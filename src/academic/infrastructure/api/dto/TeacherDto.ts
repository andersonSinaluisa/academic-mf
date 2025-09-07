
export interface TeacherOutputDto {

    id: number;
    fistName: string;
    lastName: string;
    phone: string;
    birthDate: string;
    uuidUser: string;
    address: string;
    identification: string;
    nacionality: string;
    gender: string;
    image: string;
}


export type TeacherInputDto = Omit<TeacherOutputDto, 'id'>;