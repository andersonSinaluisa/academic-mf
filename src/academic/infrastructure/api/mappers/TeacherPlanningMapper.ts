import { TeacherPlanning } from "@/academic/domain/entities/TeacherPlanning";
import { TeacherPlanningInputDto, TeacherPlanningOutputDto } from "../dto/TeacherPlanningDto";

export class TeacherPlanningMapper {
    static toDomain(raw: TeacherPlanningOutputDto): TeacherPlanning {
        return new TeacherPlanning(
            raw.id,
            raw.teacherId,
            raw.subjectId,
            raw.courseId,
            raw.schoolYearId,
            raw.topic,
            raw.description,
            raw.week,
            raw.createdAt
        );
    }

    static toDto(entity: TeacherPlanning): TeacherPlanningInputDto {
        return {
            teacherId: entity.teacherId,
            subjectId: entity.subjectId,
            courseId: entity.courseId,
            schoolYearId: entity.schoolYearId,
            topic: entity.topic,
            description: entity.description,
            week: entity.week
        };
    }
}
