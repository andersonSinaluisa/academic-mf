import { inject, injectable } from "inversify";
import { TeacherAssignmentRepository } from "../interfaces/TeacherAssignmentRepository";
import { TEACHER_ASSIGNMENT_SYMBOLS } from "../symbols/TeacherAssignment";
import { TeacherAssignment } from "../entities/TeacherAssignment";

@injectable()
export class TeacherAssignmentService {
    constructor(
        @inject(TEACHER_ASSIGNMENT_SYMBOLS.REPOSITORY)
        private repository: TeacherAssignmentRepository
    ) { }

    async create(assignment: TeacherAssignment): Promise<TeacherAssignment> {
        return this.repository.create(assignment);
    }

    async getById(id: number): Promise<TeacherAssignment | null> {
        return this.repository.getById(id);
    }

    async list(teacherId?: number, courseId?: number): Promise<TeacherAssignment[]> {
        return this.repository.list(teacherId, courseId);
    }
}
