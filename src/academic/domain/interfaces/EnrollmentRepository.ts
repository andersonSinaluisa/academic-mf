import { Enrollment } from "../entities/Enrollment";

export interface EnrollmentRepository {
    create(enrollment: Enrollment): Promise<Enrollment>;
    list(): Promise<Enrollment[]>;
    update(enrollment: Enrollment): Promise<Enrollment>;
    delete(id: number): Promise<void>;
}
