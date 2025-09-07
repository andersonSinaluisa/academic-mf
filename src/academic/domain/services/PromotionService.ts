import { inject, injectable } from "inversify";
import { PromotionRepository } from "../interfaces/PromotionRepository";
import { PROMOTION_SYMBOLS } from "../symbols/Promotion";
import { Promotion } from "../entities/Promotion";

@injectable()
export class PromotionService {
    constructor(
        @inject(PROMOTION_SYMBOLS.REPOSITORY)
        private repository: PromotionRepository
    ) { }

    async promote(studentId: number, academicYearId: string): Promise<Promotion> {
        return this.repository.promote(studentId, academicYearId);
    }
}
