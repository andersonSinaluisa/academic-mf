import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { AssessmentService } from "@/academic/domain/services/AssessmentService";
import { ASSESSMENT_SYMBOLS } from "@/academic/domain/symbols/Assessment";

export class DeleteAssessmentCommand implements UseCaseCommand {
    constructor(public readonly id: number) { }
}

@injectable()
export class DeleteAssessmentUseCase implements UseCase<void, DeleteAssessmentCommand> {
    constructor(
        @inject(ASSESSMENT_SYMBOLS.SERVICE)
        private service: AssessmentService
    ) { }

    async execute(command: DeleteAssessmentCommand): Promise<Either<AbstractFailure[], void>> {
        try {
            await this.service.delete(command.id);
            return Right(undefined);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
