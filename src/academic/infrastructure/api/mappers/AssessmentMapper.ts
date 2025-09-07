import { Assessment } from "@/academic/domain/entities/Assessment";
import { AssessmentInputDto, AssessmentOutputDto } from "../dto/AssessmentDto";

export class AssessmentMapper {
    static toDomain(dto: AssessmentOutputDto): Assessment {
        return new Assessment(dto.id, dto.studentId, dto.subjectId, dto.score);
    }

    static toDto(assessment: Assessment): AssessmentInputDto {
        return {
            studentId: assessment.studentId,
            subjectId: assessment.subjectId,
            score: assessment.score
        };
    }
}
