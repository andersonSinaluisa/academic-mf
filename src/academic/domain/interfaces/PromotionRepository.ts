import { Promotion } from "../entities/Promotion";

export interface PromotionRepository {
    promote(studentId: number, academicYearId: string): Promise<Promotion>;
}
