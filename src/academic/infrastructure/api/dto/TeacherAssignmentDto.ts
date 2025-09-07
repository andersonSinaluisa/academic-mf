export interface TeacherAssignmentInputDto {
    teacherId: number;
    courseId: number;
    subjectId: number;
    schoolYearId: string;
}

export interface TeacherAssignmentOutputDto extends TeacherAssignmentInputDto {
    id: number;
    createdAt: string;
}
