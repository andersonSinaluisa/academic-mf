import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { BehaviorReportService } from "@/academic/domain/services/BehaviorReportService";
import { BEHAVIOR_REPORT_SYMBOLS } from "@/academic/domain/symbols/BehaviorReport";

export class DeleteBehaviorReportCommand implements UseCaseCommand {
    constructor(public readonly id: number) { }
}

@injectable()
export class DeleteBehaviorReportUseCase implements UseCase<void, DeleteBehaviorReportCommand> {
    constructor(
        @inject(BEHAVIOR_REPORT_SYMBOLS.SERVICE)
        private service: BehaviorReportService
    ) { }

    async execute(command: DeleteBehaviorReportCommand): Promise<Either<AbstractFailure[], void>> {
        try {
            await this.service.delete(command.id);
            return Right(undefined);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
