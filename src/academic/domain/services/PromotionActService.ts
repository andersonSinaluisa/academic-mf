import { inject, injectable } from "inversify";
import { PROMOTION_ACT_SYMBOLS } from "../symbols/PromotionAct";
import { PromotionActRepository } from "../interfaces/PromotionActRepository";
import { PromotionAct } from "../entities/PromotionAct";
import { Page } from "@/lib/utils";

@injectable()
export class PromotionActService {
    constructor(
        @inject(PROMOTION_ACT_SYMBOLS.REPOSITORY)
        private repository: PromotionActRepository
    ) { }

    create(courseId: string, academicYearId: string, generatedBy: number): Promise<PromotionAct> {
        return this.repository.create(courseId, academicYearId, generatedBy);
    }

    getById(id: number): Promise<PromotionAct> {
        return this.repository.getById(id);
    }

    list(courseId: string, academicYearId: string, page: number, limit: number): Promise<Page<PromotionAct>> {
        return this.repository.list(courseId, academicYearId, page, limit);
    }

    delete(id: number): Promise<void> {
        return this.repository.delete(id);
    }
}
