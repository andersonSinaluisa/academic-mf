import { Assessment } from "../entities/Assessment";
import { Page } from "@/lib/utils";

export interface AssessmentRepository {
    create(assessment: Assessment): Promise<Assessment>;
    list(page: number, limit: number, studentId?: string): Promise<Page<Assessment>>;
    update(assessment: Assessment): Promise<Assessment>;
    delete(id: number): Promise<void>;
}
