import { TeacherPlanning } from "../entities/TeacherPlanning";
import { Page } from "@/lib/utils";

export interface TeacherPlanningRepository {
    create(planning: TeacherPlanning): Promise<TeacherPlanning>;
    getById(id: number): Promise<TeacherPlanning | null>;
    list(page: number, limit: number, teacherId?: number, subjectId?: number, courseId?: number, topic?: string): Promise<Page<TeacherPlanning>>;
}
