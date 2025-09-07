import { Promotion } from "@/academic/domain/entities/Promotion";
import { PromotionOutputDto } from "../dto/PromotionDto";

export class PromotionMapper {
    static toDomain(raw: PromotionOutputDto): Promotion {
        return new Promotion(
            raw.studentId,
            raw.academicYearId,
            raw.finalAverage,
            raw.status,
            raw.generatedAt
        );
    }
}
