import { PromotionAct } from "../entities/PromotionAct";

export interface PromotionActRepository {
    create(courseId: string, academicYearId: string, generatedBy: number): Promise<PromotionAct>;
    getById(id: number): Promise<PromotionAct>;
    list(courseId: string, academicYearId: string): Promise<PromotionAct[]>;
    delete(id: number): Promise<void>;
}
