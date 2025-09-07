export interface TeacherInputDto {
    firstName: string;
    lastName: string;
    phone?: string;
    birthDate?: string;
    uuidUser?: string;
    address?: string;
    identification?: string;
    nationality?: string;
    gender?: string;
    image?: string;
}

export interface TeacherOutputDto extends TeacherInputDto {
    id: number;
    createdAt?: string;
}
