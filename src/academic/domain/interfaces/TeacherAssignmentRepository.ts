import { TeacherAssignment } from "../entities/TeacherAssignment";
import { Page } from "@/lib/utils";

export interface TeacherAssignmentRepository {
    create(assignment: TeacherAssignment): Promise<TeacherAssignment>;
    getById(id: number): Promise<TeacherAssignment | null>;
    list(page: number, limit: number, teacherId?: number, courseId?: number): Promise<Page<TeacherAssignment>>;
}
