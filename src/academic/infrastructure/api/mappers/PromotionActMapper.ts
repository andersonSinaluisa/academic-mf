import { PromotionAct } from "@/academic/domain/entities/PromotionAct";
import { PromotionActOutputDto } from "../dto/PromotionActDto";

export class PromotionActMapper {
    static toDomain(raw: PromotionActOutputDto): PromotionAct {
        return new PromotionAct(
            raw.id,
            raw.courseId,
            raw.academicYearId,
            raw.generatedBy,
            raw.generatedAt
        );
    }
}
