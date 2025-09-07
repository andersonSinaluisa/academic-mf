import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { FinalGrade } from "@/academic/domain/entities/FinalGrade";
import { GradingService } from "@/academic/domain/services/GradingService";
import { GRADING_SYMBOLS } from "@/academic/domain/symbols/Grading";

export class GetFinalGradeCommand implements UseCaseCommand {
    constructor(
        public readonly studentId: number,
        public readonly subjectId: number,
        public readonly schoolYearId: string
    ) { }
}

@injectable()
export class GetFinalGradeUseCase implements UseCase<FinalGrade, GetFinalGradeCommand> {
    constructor(
        @inject(GRADING_SYMBOLS.SERVICE)
        private service: GradingService
    ) { }

    async execute(command: GetFinalGradeCommand): Promise<Either<AbstractFailure[], FinalGrade | undefined>> {
        try {
            const grade = await this.service.calculateFinalGrade(command.studentId, command.subjectId, command.schoolYearId);
            return Right(grade);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
