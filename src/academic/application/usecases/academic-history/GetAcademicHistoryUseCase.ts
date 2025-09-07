import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { AcademicHistory } from "@/academic/domain/entities/AcademicHistory";
import { AcademicHistoryService } from "@/academic/domain/services/AcademicHistoryService";
import { ACADEMIC_HISTORY_SYMBOLS } from "@/academic/domain/symbols/AcademicHistory";

export class GetAcademicHistoryCommand implements UseCaseCommand {
    constructor(public readonly studentId: number) { }
}

@injectable()
export class GetAcademicHistoryUseCase implements UseCase<AcademicHistory, GetAcademicHistoryCommand> {
    constructor(
        @inject(ACADEMIC_HISTORY_SYMBOLS.SERVICE)
        private service: AcademicHistoryService
    ) { }

    async execute(command: GetAcademicHistoryCommand): Promise<Either<AbstractFailure[], AcademicHistory | undefined>> {
        try {
            const history = await this.service.getByStudentId(command.studentId);
            return Right(history);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
