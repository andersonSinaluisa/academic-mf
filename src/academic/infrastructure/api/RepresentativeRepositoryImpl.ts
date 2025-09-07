import { Representative } from "@/academic/domain/entities/Representative";
import { RepresentativeRepository } from "@/academic/domain/interfaces/RepresentativeRepository";
import { ApiInstance } from "./Api";
import { RepresentativeOutputDto } from "./dto/RepresentativeDto";
import { RepresentativeMapper } from "./mappers/RepresentativeMapper";

export class RepresentativeRepositoryImpl implements RepresentativeRepository {
    async create(rep: Representative): Promise<Representative> {
        const res = await ApiInstance.post<RepresentativeOutputDto>("/representative", RepresentativeMapper.toDto(rep));
        return RepresentativeMapper.toDomain(res.data);
    }

    async list(page: number, limit: number): Promise<Representative[]> {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        const res = await ApiInstance.get<RepresentativeOutputDto[]>("/representative", { params });
        return res.data.map(RepresentativeMapper.toDomain);
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
