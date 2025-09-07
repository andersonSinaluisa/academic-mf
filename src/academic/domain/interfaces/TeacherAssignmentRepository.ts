import { TeacherAssignment } from "../entities/TeacherAssignment";

export interface TeacherAssignmentRepository {
    create(assignment: TeacherAssignment): Promise<TeacherAssignment>;
    getById(id: number): Promise<TeacherAssignment | null>;
    list(teacherId?: number, courseId?: number): Promise<TeacherAssignment[]>;
}
