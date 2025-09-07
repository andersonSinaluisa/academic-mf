import { inject, injectable } from "inversify";
import { Student } from "../entities/Student";
import { StudentRepository } from "../interfaces/StudentRepository";
import { STUDENT_SYMBOLS } from "../symbols/Student";

@injectable()
export class StudentService {
    constructor(
        @inject(STUDENT_SYMBOLS.REPOSITORY)
        private repository: StudentRepository
    ) { }

    async create(student: Student): Promise<Student> {
        return this.repository.create(student);
    }

    async list(page: number, limit: number, uuidParallel?: string): Promise<Student[]> {
        return this.repository.list(page, limit, uuidParallel);
    }

    async getById(id: number): Promise<Student | null> {
        return this.repository.getById(id);
    }

    async update(student: Student): Promise<Student> {
        return this.repository.update(student);
    }

    async delete(id: number): Promise<void> {
        return this.repository.delete(id);
    }
}
