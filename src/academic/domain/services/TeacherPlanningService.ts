import { inject, injectable } from "inversify";
import { TeacherPlanningRepository } from "../interfaces/TeacherPlanningRepository";
import { TEACHER_PLANNING_SYMBOLS } from "../symbols/TeacherPlanning";
import { TeacherPlanning } from "../entities/TeacherPlanning";
import { Page } from "@/lib/utils";

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

    async list(page: number, limit: number, teacherId?: number, subjectId?: number, courseId?: number, topic?: string): Promise<Page<TeacherPlanning>> {
        return this.repository.list(page, limit, teacherId, subjectId, courseId, topic);
    }
}
