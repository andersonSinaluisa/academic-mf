import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { BehaviorReport } from "@/academic/domain/entities/BehaviorReport";
import { BehaviorReportService } from "@/academic/domain/services/BehaviorReportService";
import { BEHAVIOR_REPORT_SYMBOLS } from "@/academic/domain/symbols/BehaviorReport";

export class CreateBehaviorReportCommand implements UseCaseCommand {
    constructor(
        public readonly studentId: number,
        public readonly description: string
    ) { }
}

@injectable()
export class CreateBehaviorReportUseCase implements UseCase<BehaviorReport, CreateBehaviorReportCommand> {
    constructor(
        @inject(BEHAVIOR_REPORT_SYMBOLS.SERVICE)
        private service: BehaviorReportService
    ) { }

    async execute(command: CreateBehaviorReportCommand): Promise<Either<AbstractFailure[], BehaviorReport | undefined>> {
        try {
            const report = new BehaviorReport(0, command.studentId, command.description);
            const created = await this.service.create(report);
            return Right(created);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
