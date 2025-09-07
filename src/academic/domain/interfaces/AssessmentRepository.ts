import { Assessment } from "../entities/Assessment";

export interface AssessmentRepository {
    create(assessment: Assessment): Promise<Assessment>;
    list(): Promise<Assessment[]>;
    update(assessment: Assessment): Promise<Assessment>;
    delete(id: number): Promise<void>;
}
