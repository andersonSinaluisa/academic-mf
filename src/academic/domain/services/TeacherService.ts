import { Teacher } from "../entities/Teacher";
import { TeacherRepository } from "../interfaces/TeacherRepository";
import { inject, injectable } from "inversify";
import { TEACHER_SYMBOLS } from "../symbols/Teacher";

@injectable()
export class TeacherService {

    constructor(
        @inject(TEACHER_SYMBOLS.REPOSITORY)
        private teacherRepository: TeacherRepository
    ) {}

    async listTeachers({
        page, limit, firstName, lastName, identification
    }:{
        page: number, 
        limit: number, 
        firstName?: string, 
        lastName?: string, 
        identification?: string
    }): Promise<Teacher[]> {
        return this.teacherRepository.list(page, limit, firstName, lastName, identification);
    }

    async createTeacher(teacher: Teacher): Promise<Teacher> {
        return this.teacherRepository.create(teacher);
    }

    async updateTeacher(teacher: Teacher): Promise<Teacher> {
        return this.teacherRepository.update(teacher);
    }

    async deleteTeacher(id: number): Promise<void> {
        return this.teacherRepository.delete(id);
    }

}