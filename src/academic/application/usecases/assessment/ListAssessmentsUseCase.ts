import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Assessment } from "@/academic/domain/entities/Assessment";
import { AssessmentService } from "@/academic/domain/services/AssessmentService";
import { ASSESSMENT_SYMBOLS } from "@/academic/domain/symbols/Assessment";

export class ListAssessmentsCommand implements UseCaseCommand { }

@injectable()
export class ListAssessmentsUseCase implements UseCase<Assessment[], ListAssessmentsCommand> {
    constructor(
        @inject(ASSESSMENT_SYMBOLS.SERVICE)
        private service: AssessmentService
    ) { }

    async execute(_: ListAssessmentsCommand): Promise<Either<AbstractFailure[], Assessment[] | undefined>> {
        try {
            const assessments = await this.service.list();
            return Right(assessments);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
