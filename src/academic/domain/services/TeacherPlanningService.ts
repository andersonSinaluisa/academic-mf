import { inject, injectable } from "inversify";
import { TeacherPlanningRepository } from "../interfaces/TeacherPlanningRepository";
import { TEACHER_PLANNING_SYMBOLS } from "../symbols/TeacherPlanning";
import { TeacherPlanning } from "../entities/TeacherPlanning";

@injectable()
export class TeacherPlanningService {
    constructor(
        @inject(TEACHER_PLANNING_SYMBOLS.REPOSITORY)
        private repository: TeacherPlanningRepository
    ) { }

    async create(planning: TeacherPlanning): Promise<TeacherPlanning> {
        return this.repository.create(planning);
    }

    async getById(id: number): Promise<TeacherPlanning | null> {
        return this.repository.getById(id);
    }

    async list(teacherId?: number, subjectId?: number, courseId?: number): Promise<TeacherPlanning[]> {
        return this.repository.list(teacherId, subjectId, courseId);
    }
}
