import { Representative } from "@/academic/domain/entities/Representative";
import { RepresentativeRepository } from "@/academic/domain/interfaces/RepresentativeRepository";
import { ApiInstance } from "./Api";
import { RepresentativeOutputDto } from "./dto/RepresentativeDto";
import { RepresentativeMapper } from "./mappers/RepresentativeMapper";
import { Page } from "@/lib/utils";

export class RepresentativeRepositoryImpl implements RepresentativeRepository {
    async create(rep: Representative): Promise<Representative> {
        const res = await ApiInstance.post<RepresentativeOutputDto>("/representative", RepresentativeMapper.toDto(rep));
        return RepresentativeMapper.toDomain(res.data);
    }

    async list(page: number, limit: number, search?: string): Promise<Page<Representative>> {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (search) params.append("search", search);
        const res = await ApiInstance.get<Page<RepresentativeOutputDto>>("/representative", { params });
        return {
            ...res.data,
            content: res.data.content.map(RepresentativeMapper.toDomain),
        };
    }

    async getById(id: number): Promise<Representative | null> {
        const res = await ApiInstance.get<RepresentativeOutputDto>(`/representative/${id}`);
        return res.data ? RepresentativeMapper.toDomain(res.data) : null;
    }

    async update(rep: Representative): Promise<Representative> {
        const res = await ApiInstance.patch<RepresentativeOutputDto>(`/representative/${rep.id}`, RepresentativeMapper.toDto(rep));
        return RepresentativeMapper.toDomain(res.data);
    }

    async delete(id: number): Promise<void> {
        await ApiInstance.delete(`/representative/${id}`);
    }
}
