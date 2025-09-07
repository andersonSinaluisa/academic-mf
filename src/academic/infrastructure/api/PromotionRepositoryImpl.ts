import { PromotionRepository } from "@/academic/domain/interfaces/PromotionRepository";
import { Promotion } from "@/academic/domain/entities/Promotion";
import { ApiInstance } from "./Api";
import { PromotionOutputDto } from "./dto/PromotionDto";
import { PromotionMapper } from "./mappers/PromotionMapper";

export class PromotionRepositoryImpl implements PromotionRepository {
    async promote(studentId: number, academicYearId: string): Promise<Promotion> {
        const res = await ApiInstance.post<PromotionOutputDto>(
            '/promotions',
            { studentId, academicYearId }
        );
        return PromotionMapper.toDomain(res.data);
    }
}
