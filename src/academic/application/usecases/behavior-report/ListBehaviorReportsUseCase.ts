import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { BehaviorReport } from "@/academic/domain/entities/BehaviorReport";
import { BehaviorReportService } from "@/academic/domain/services/BehaviorReportService";
import { BEHAVIOR_REPORT_SYMBOLS } from "@/academic/domain/symbols/BehaviorReport";
import { Page } from "@/lib/utils";

export class ListBehaviorReportsCommand implements UseCaseCommand {
    constructor(
        public readonly page: number,
        public readonly limit: number,
        public readonly search?: string
    ) { }
}

@injectable()
export class ListBehaviorReportsUseCase implements UseCase<Page<BehaviorReport>, ListBehaviorReportsCommand> {
    constructor(
        @inject(BEHAVIOR_REPORT_SYMBOLS.SERVICE)
        private service: BehaviorReportService
    ) { }

    async execute(command: ListBehaviorReportsCommand): Promise<Either<AbstractFailure[], Page<BehaviorReport> | undefined>> {
        try {
            const reports = await this.service.list(command.page, command.limit, command.search);
            return Right(reports);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
