import { inject, injectable } from "inversify";
import { Assessment } from "../entities/Assessment";
import { AssessmentRepository } from "../interfaces/AssessmentRepository";
import { ASSESSMENT_SYMBOLS } from "../symbols/Assessment";
import { Page } from "@/lib/utils";

@injectable()
export class AssessmentService {
    constructor(
        @inject(ASSESSMENT_SYMBOLS.REPOSITORY)
        private repository: AssessmentRepository
    ) { }

    create(assessment: Assessment): Promise<Assessment> {
        return this.repository.create(assessment);
    }

    list(page: number, limit: number, studentId?: string): Promise<Page<Assessment>> {
        return this.repository.list(page, limit, studentId);
    }

    update(assessment: Assessment): Promise<Assessment> {
        return this.repository.update(assessment);
    }

    delete(id: number): Promise<void> {
        return this.repository.delete(id);
    }
}
