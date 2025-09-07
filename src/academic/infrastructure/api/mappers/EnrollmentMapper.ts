import { Enrollment } from "@/academic/domain/entities/Enrollment";
import { EnrollmentInputDto, EnrollmentOutputDto } from "../dto/EnrollmentDto";

export class EnrollmentMapper {
    static toDomain(dto: EnrollmentOutputDto): Enrollment {
        return new Enrollment(dto.id, dto.studentId, dto.courseId);
    }

    static toDto(enrollment: Enrollment): EnrollmentInputDto {
        return {
            studentId: enrollment.studentId,
            courseId: enrollment.courseId
        };
    }
}
