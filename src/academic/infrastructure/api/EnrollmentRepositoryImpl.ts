import { EnrollmentRepository } from "@/academic/domain/interfaces/EnrollmentRepository";
import { Enrollment } from "@/academic/domain/entities/Enrollment";
import { ApiInstance } from "./Api";
import { EnrollmentOutputDto } from "./dto/EnrollmentDto";
import { EnrollmentMapper } from "./mappers/EnrollmentMapper";

export class EnrollmentRepositoryImpl implements EnrollmentRepository {
    async create(enrollment: Enrollment): Promise<Enrollment> {
        const res = await ApiInstance.post<EnrollmentOutputDto>(
            '/enrollments',
            EnrollmentMapper.toDto(enrollment)
        );
        return EnrollmentMapper.toDomain(res.data);
    }

    async list(): Promise<Enrollment[]> {
        const res = await ApiInstance.get<EnrollmentOutputDto[]>('/enrollments');
        return res.data.map(EnrollmentMapper.toDomain);
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
