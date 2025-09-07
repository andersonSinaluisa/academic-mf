import { inject, injectable } from "inversify";
import { Enrollment } from "../entities/Enrollment";
import { EnrollmentRepository } from "../interfaces/EnrollmentRepository";
import { ENROLLMENT_SYMBOLS } from "../symbols/Enrollment";

@injectable()
export class EnrollmentService {
    constructor(
        @inject(ENROLLMENT_SYMBOLS.REPOSITORY)
        private repository: EnrollmentRepository
    ) { }

    create(enrollment: Enrollment): Promise<Enrollment> {
        return this.repository.create(enrollment);
    }

    list(): Promise<Enrollment[]> {
        return this.repository.list();
    }

    update(enrollment: Enrollment): Promise<Enrollment> {
        return this.repository.update(enrollment);
    }

    delete(id: number): Promise<void> {
        return this.repository.delete(id);
    }
}
