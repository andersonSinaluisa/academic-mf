import { Enrollment } from "../entities/Enrollment";
import { Page } from "@/lib/utils";

export interface EnrollmentRepository {
    create(enrollment: Enrollment): Promise<Enrollment>;
    list(page: number, limit: number, search?: string): Promise<Page<Enrollment>>;
    update(enrollment: Enrollment): Promise<Enrollment>;
    delete(id: number): Promise<void>;
}
