import { Page } from "@/lib/utils";
import { Teacher } from "../entities/Teacher";

export interface TeacherRepository {
    create(teacher: Teacher): Promise<Teacher>;
    list(page: number, limit: number, firstName?: string, lastName?: string, identification?: string, gender?: string): Promise<Page<Teacher>>;
    getById(id: number): Promise<Teacher | null>;
    update(teacher: Teacher): Promise<Teacher>;
    delete(id: number): Promise<void>;
}
