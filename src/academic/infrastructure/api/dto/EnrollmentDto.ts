export interface EnrollmentInputDto {
    studentId: number;
    courseId: string;
}

export interface EnrollmentOutputDto extends EnrollmentInputDto {
    id: number;
}
