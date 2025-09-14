import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Assessment } from "@/academic/domain/entities/Assessment";
import { AssessmentService } from "@/academic/domain/services/AssessmentService";
import { ASSESSMENT_SYMBOLS } from "@/academic/domain/symbols/Assessment";
import { Page } from "@/lib/utils";

export class ListAssessmentsCommand implements UseCaseCommand {
    constructor(
        public readonly page: number,
        public readonly limit: number,
        public readonly studentId?: string
    ) { }
}

@injectable()
export class ListAssessmentsUseCase implements UseCase<Page<Assessment>, ListAssessmentsCommand> {
    constructor(
        @inject(ASSESSMENT_SYMBOLS.SERVICE)
        private service: AssessmentService
    ) { }

    async execute(command: ListAssessmentsCommand): Promise<Either<AbstractFailure[], Page<Assessment> | undefined>> {
        try {
            const assessments = await this.service.list(command.page, command.limit, command.studentId);
            return Right(assessments);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
