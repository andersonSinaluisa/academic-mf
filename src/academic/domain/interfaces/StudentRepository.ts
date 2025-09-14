import { Student } from "../entities/Student";
import { Page } from "@/lib/utils";

export interface StudentRepository {
    create(student: Student): Promise<Student>;
    list(page: number, limit: number, uuidParallel?: string, search?: string): Promise<Page<Student>>;
    getById(id: number): Promise<Student | null>;
    update(student: Student): Promise<Student>;
    delete(id: number): Promise<void>;
}
