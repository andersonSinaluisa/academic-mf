export interface AssessmentInputDto {
    studentId: number;
    subjectId: number;
    score: number;
}

export interface AssessmentOutputDto extends AssessmentInputDto {
    id: number;
}
