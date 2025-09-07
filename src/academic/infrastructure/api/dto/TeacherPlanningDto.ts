export interface TeacherPlanningInputDto {
    teacherId: number;
    subjectId: number;
    courseId: number;
    schoolYearId: string;
    topic: string;
    description: string;
    week: number;
}

export interface TeacherPlanningOutputDto extends TeacherPlanningInputDto {
    id: number;
    createdAt: string;
}
