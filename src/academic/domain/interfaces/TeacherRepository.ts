import { Teacher } from "../entities/Teacher";


export interface TeacherRepository {
    create(teacher: Teacher): Promise<Teacher>;
    list(page: number, limit: number, firstName?: string, lastName?: string, identification?: string): Promise<Teacher[]>;
    getById(id: number): Promise<Teacher | null>;
    update(teacher: Teacher): Promise<Teacher>;
    delete(id: number): Promise<void>;
}