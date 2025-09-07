import { AcademicHistoryRepository } from "@/academic/domain/interfaces/AcademicHistoryRepository";
import { AcademicHistory } from "@/academic/domain/entities/AcademicHistory";
import { ApiInstance } from "./Api";
import { AcademicHistoryDto } from "./dto/AcademicHistoryDto";
import { AcademicHistoryMapper } from "./mappers/AcademicHistoryMapper";

export class AcademicHistoryRepositoryImpl implements AcademicHistoryRepository {
    async getByStudentId(studentId: number): Promise<AcademicHistory> {
        const res = await ApiInstance.get<AcademicHistoryDto>(`/academic-history/${studentId}`);
        return AcademicHistoryMapper.toDomain(res.data);
    }
}
