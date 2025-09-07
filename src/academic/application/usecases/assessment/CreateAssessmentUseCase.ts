import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Assessment } from "@/academic/domain/entities/Assessment";
import { AssessmentService } from "@/academic/domain/services/AssessmentService";
import { ASSESSMENT_SYMBOLS } from "@/academic/domain/symbols/Assessment";

export class CreateAssessmentCommand implements UseCaseCommand {
    constructor(
        public readonly studentId: number,
        public readonly subjectId: number,
        public readonly score: number
    ) { }
}

@injectable()
export class CreateAssessmentUseCase implements UseCase<Assessment, CreateAssessmentCommand> {
    constructor(
        @inject(ASSESSMENT_SYMBOLS.SERVICE)
        private service: AssessmentService
    ) { }

    async execute(command: CreateAssessmentCommand): Promise<Either<AbstractFailure[], Assessment | undefined>> {
        try {
            const assessment = new Assessment(0, command.studentId, command.subjectId, command.score);
            const created = await this.service.create(assessment);
            return Right(created);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
