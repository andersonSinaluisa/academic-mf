import { PromotionAct } from "../entities/PromotionAct";
import { Page } from "@/lib/utils";

export interface PromotionActRepository {
    create(courseId: string, academicYearId: string, generatedBy: number): Promise<PromotionAct>;
    getById(id: number): Promise<PromotionAct>;
    list(courseId: string, academicYearId: string, page: number, limit: number): Promise<Page<PromotionAct>>;
    delete(id: number): Promise<void>;
}
