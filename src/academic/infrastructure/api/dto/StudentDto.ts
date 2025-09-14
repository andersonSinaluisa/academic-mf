
export interface StudentInputDto {
    firstName: string;
    lastName: string;
    phone: string;
    birthDate: string;
    uuidUser: string;
    address: string;
    identification: string;
    nationality: string;
    gender: string;
    image: string;
    uuidCurrentSchoolYear: string;
    uuidCurrentSection: string;
    uuidParallel: string;
}

export interface StudentOutputDto extends StudentInputDto {
    id: number;
}
