import { Student } from "../entities/Student";

export interface StudentRepository {
    create(student: Student): Promise<Student>;
    list(page: number, limit: number, uuidParallel?: string): Promise<Student[]>;
    getById(id: number): Promise<Student | null>;
    update(student: Student): Promise<Student>;
    delete(id: number): Promise<void>;
}
