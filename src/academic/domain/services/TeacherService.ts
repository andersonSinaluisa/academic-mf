import { inject, injectable } from "inversify";
import { Teacher } from "../entities/Teacher";
import { TeacherRepository } from "../interfaces/TeacherRepository";
import { TEACHER_SYMBOLS } from "../symbols/Teacher";
import { Page } from "@/lib/utils";

@injectable()
export class TeacherService {
    constructor(
        @inject(TEACHER_SYMBOLS.REPOSITORY)
        private repository: TeacherRepository
    ) { }

    async create(teacher: Teacher): Promise<Teacher> {
        return this.repository.create(teacher);
    }

    async list(page: number, limit: number, firstName?: string, lastName?: string, identification?: string, gender?: string): Promise<Page<Teacher>> {
        return this.repository.list(page, limit, firstName, lastName, identification, gender);
    }

    async getById(id: number): Promise<Teacher | null> {
        return this.repository.getById(id);
    }

    async update(teacher: Teacher): Promise<Teacher> {
        return this.repository.update(teacher);
    }

    async delete(id: number): Promise<void> {
        return this.repository.delete(id);
    }
}
