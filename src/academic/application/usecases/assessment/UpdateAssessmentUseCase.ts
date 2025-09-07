import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Assessment } from "@/academic/domain/entities/Assessment";
import { AssessmentService } from "@/academic/domain/services/AssessmentService";
import { ASSESSMENT_SYMBOLS } from "@/academic/domain/symbols/Assessment";

export class UpdateAssessmentCommand implements UseCaseCommand {
    constructor(
        public readonly id: number,
        public readonly score: number
    ) { }
}

@injectable()
export class UpdateAssessmentUseCase implements UseCase<Assessment, UpdateAssessmentCommand> {
    constructor(
        @inject(ASSESSMENT_SYMBOLS.SERVICE)
        private service: AssessmentService
    ) { }

    async execute(command: UpdateAssessmentCommand): Promise<Either<AbstractFailure[], Assessment | undefined>> {
        try {
            const assessment = new Assessment(command.id, 0, 0, command.score);
            const updated = await this.service.update(assessment);
            return Right(updated);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
