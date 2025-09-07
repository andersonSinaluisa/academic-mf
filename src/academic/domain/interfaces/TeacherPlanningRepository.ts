import { TeacherPlanning } from "../entities/TeacherPlanning";

export interface TeacherPlanningRepository {
    create(planning: TeacherPlanning): Promise<TeacherPlanning>;
    getById(id: number): Promise<TeacherPlanning | null>;
    list(teacherId?: number, subjectId?: number, courseId?: number): Promise<TeacherPlanning[]>;
}
