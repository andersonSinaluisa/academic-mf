import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { BehaviorReport } from "@/academic/domain/entities/BehaviorReport";
import { BehaviorReportService } from "@/academic/domain/services/BehaviorReportService";
import { BEHAVIOR_REPORT_SYMBOLS } from "@/academic/domain/symbols/BehaviorReport";

export class UpdateBehaviorReportCommand implements UseCaseCommand {
    constructor(
        public readonly id: number,
        public readonly description: string
    ) { }
}

@injectable()
export class UpdateBehaviorReportUseCase implements UseCase<BehaviorReport, UpdateBehaviorReportCommand> {
    constructor(
        @inject(BEHAVIOR_REPORT_SYMBOLS.SERVICE)
        private service: BehaviorReportService
    ) { }

    async execute(command: UpdateBehaviorReportCommand): Promise<Either<AbstractFailure[], BehaviorReport | undefined>> {
        try {
            const report = new BehaviorReport(command.id, 0, command.description);
            const updated = await this.service.update(report);
            return Right(updated);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
