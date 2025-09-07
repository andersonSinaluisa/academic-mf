import { FinalGrade } from "@/academic/domain/entities/FinalGrade";
import { FinalGradeOutputDto } from "../dto/FinalGradeDto";

export class FinalGradeMapper {
    static toDomain(dto: FinalGradeOutputDto): FinalGrade {
        return new FinalGrade(dto.studentId, dto.subjectId, dto.finalScore);
    }
}
