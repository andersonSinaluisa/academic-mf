import { inject, injectable } from "inversify";
import { TeacherAssignmentRepository } from "../interfaces/TeacherAssignmentRepository";
import { TEACHER_ASSIGNMENT_SYMBOLS } from "../symbols/TeacherAssignment";
import { TeacherAssignment } from "../entities/TeacherAssignment";
import { Page } from "@/lib/utils";

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

    async list(page: number, limit: number, teacherId?: number, courseId?: number): Promise<Page<TeacherAssignment>> {
        return this.repository.list(page, limit, teacherId, courseId);
    }
}
