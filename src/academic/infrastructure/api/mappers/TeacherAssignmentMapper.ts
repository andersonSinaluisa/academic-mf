import { TeacherAssignment } from "@/academic/domain/entities/TeacherAssignment";
import { TeacherAssignmentInputDto, TeacherAssignmentOutputDto } from "../dto/TeacherAssignmentDto";

export class TeacherAssignmentMapper {
    static toDomain(raw: TeacherAssignmentOutputDto): TeacherAssignment {
        return new TeacherAssignment(
            raw.id,
            raw.teacherId,
            raw.courseId,
            raw.subjectId,
            raw.schoolYearId,
            raw.createdAt
        );
    }

    static toDto(entity: TeacherAssignment): TeacherAssignmentInputDto {
        return {
            teacherId: entity.teacherId,
            courseId: entity.courseId,
            subjectId: entity.subjectId,
            schoolYearId: entity.schoolYearId
        };
    }
}
