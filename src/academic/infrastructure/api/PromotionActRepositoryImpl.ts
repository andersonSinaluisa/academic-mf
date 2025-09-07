import { PromotionActRepository } from "@/academic/domain/interfaces/PromotionActRepository";
import { PromotionAct } from "@/academic/domain/entities/PromotionAct";
import { ApiInstance } from "./Api";
import { PromotionActOutputDto } from "./dto/PromotionActDto";
import { PromotionActMapper } from "./mappers/PromotionActMapper";

export class PromotionActRepositoryImpl implements PromotionActRepository {
    async create(courseId: string, academicYearId: string, generatedBy: number): Promise<PromotionAct> {
        const res = await ApiInstance.post<PromotionActOutputDto>(
            '/promotion-acts',
            { courseId, academicYearId, generatedBy }
        );
        return PromotionActMapper.toDomain(res.data);
    }

    async getById(id: number): Promise<PromotionAct> {
        const res = await ApiInstance.get<PromotionActOutputDto>(`/promotion-acts/${id}`);
        return PromotionActMapper.toDomain(res.data);
    }

    async list(courseId: string, academicYearId: string): Promise<PromotionAct[]> {
        const res = await ApiInstance.get<PromotionActOutputDto[]>(
            '/promotion-acts',
            { params: { courseId, academicYearId } }
        );
        return res.data.map(PromotionActMapper.toDomain);
    }

    async delete(id: number): Promise<void> {
        await ApiInstance.delete(`/promotion-acts/${id}`);
    }
}
