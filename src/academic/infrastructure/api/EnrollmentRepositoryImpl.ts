import { EnrollmentRepository } from "@/academic/domain/interfaces/EnrollmentRepository";
import { Enrollment } from "@/academic/domain/entities/Enrollment";
import { ApiInstance } from "./Api";
import { EnrollmentOutputDto } from "./dto/EnrollmentDto";
import { EnrollmentMapper } from "./mappers/EnrollmentMapper";
import { Page } from "@/lib/utils";

export class EnrollmentRepositoryImpl implements EnrollmentRepository {
    async create(enrollment: Enrollment): Promise<Enrollment> {
        const res = await ApiInstance.post<EnrollmentOutputDto>(
            '/enrollments',
            EnrollmentMapper.toDto(enrollment)
        );
        return EnrollmentMapper.toDomain(res.data);
    }

    async list(page: number, limit: number, search?: string): Promise<Page<Enrollment>> {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        if (search) params.append('search', search);
        const res = await ApiInstance.get<Page<EnrollmentOutputDto>>('/enrollments', { params });
        return {
            ...res.data,
            content: res.data.content.map(EnrollmentMapper.toDomain)
        };
    }

    async update(enrollment: Enrollment): Promise<Enrollment> {
        const res = await ApiInstance.put<EnrollmentOutputDto>(
            `/enrollments/${enrollment.id}`,
            { courseId: enrollment.courseId }
        );
        return EnrollmentMapper.toDomain(res.data);
    }

    async delete(id: number): Promise<void> {
        await ApiInstance.delete(`/enrollments/${id}`);
    }
}
