export interface StudentInputDto {
    firstName: string;
    lastName: string;
    uuidParallel: string;
}

export interface StudentOutputDto extends StudentInputDto {
    id: number;
}
