export interface RepresentativeInputDto {
    firstName: string;
    lastName: string;
}

export interface RepresentativeOutputDto extends RepresentativeInputDto {
    id: number;
}
