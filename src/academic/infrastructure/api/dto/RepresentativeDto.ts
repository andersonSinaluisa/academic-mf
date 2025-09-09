export interface RepresentativeInputDto {
    firstName: string;
    lastName: string;
    phone?: string;
    birthDate?: string;
    uuidUser?: string;
    address?: string;
    identification?: string;
    nacionality?: string;
    gender?: string;
    image?: string;
}

export interface RepresentativeOutputDto extends RepresentativeInputDto {
    id: number;
}
