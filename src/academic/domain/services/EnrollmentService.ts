import { inject, injectable } from "inversify";
import { Enrollment } from "../entities/Enrollment";
import { EnrollmentRepository } from "../interfaces/EnrollmentRepository";
import { ENROLLMENT_SYMBOLS } from "../symbols/Enrollment";
import { Page } from "@/lib/utils";

@injectable()
export class EnrollmentService {
    constructor(
        @inject(ENROLLMENT_SYMBOLS.REPOSITORY)
        private repository: EnrollmentRepository
    ) { }

    create(enrollment: Enrollment): Promise<Enrollment> {
        return this.repository.create(enrollment);
    }

    list(page: number, limit: number, search?: string): Promise<Page<Enrollment>> {
        return this.repository.list(page, limit, search);
    }

    update(enrollment: Enrollment): Promise<Enrollment> {
        return this.repository.update(enrollment);
    }

    delete(id: number): Promise<void> {
        return this.repository.delete(id);
    }
}
