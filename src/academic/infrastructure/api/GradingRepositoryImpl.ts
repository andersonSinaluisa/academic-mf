import { GradingRepository } from "@/academic/domain/interfaces/GradingRepository";
import { FinalGrade } from "@/academic/domain/entities/FinalGrade";
import { ApiInstance } from "./Api";
import { FinalGradeOutputDto } from "./dto/FinalGradeDto";
import { FinalGradeMapper } from "./mappers/FinalGradeMapper";

export class GradingRepositoryImpl implements GradingRepository {
    async calculateFinalGrade(studentId: number, subjectId: number, schoolYearId: string): Promise<FinalGrade> {
        const params = new URLSearchParams();
        params.append('studentId', studentId.toString());
        params.append('subjectId', subjectId.toString());
        params.append('schoolYearId', schoolYearId);
        const res = await ApiInstance.post<FinalGradeOutputDto>(
            '/grading/final',
            null,
            { params }
        );
        return FinalGradeMapper.toDomain(res.data);
    }
}
