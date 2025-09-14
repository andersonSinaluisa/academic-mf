import { PromotionActRepository } from "@/academic/domain/interfaces/PromotionActRepository";
import { PromotionAct } from "@/academic/domain/entities/PromotionAct";
import { ApiInstance } from "./Api";
import { PromotionActOutputDto } from "./dto/PromotionActDto";
import { PromotionActMapper } from "./mappers/PromotionActMapper";
import { Page } from "@/lib/utils";

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

    async list(courseId: string, academicYearId: string, page: number, limit: number): Promise<Page<PromotionAct>> {
        const params = new URLSearchParams();
        params.append('courseId', courseId);
        params.append('academicYearId', academicYearId);
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        const res = await ApiInstance.get<Page<PromotionActOutputDto>>(
            '/promotion-acts',
            { params }
        );
        return {
            ...res.data,
            content: res.data.content.map(PromotionActMapper.toDomain)
        };
    }

    async delete(id: number): Promise<void> {
        await ApiInstance.delete(`/promotion-acts/${id}`);
    }
}
