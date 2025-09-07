import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { BehaviorReport } from "@/academic/domain/entities/BehaviorReport";
import { BehaviorReportService } from "@/academic/domain/services/BehaviorReportService";
import { BEHAVIOR_REPORT_SYMBOLS } from "@/academic/domain/symbols/BehaviorReport";

export class ListBehaviorReportsCommand implements UseCaseCommand { }

@injectable()
export class ListBehaviorReportsUseCase implements UseCase<BehaviorReport[], ListBehaviorReportsCommand> {
    constructor(
        @inject(BEHAVIOR_REPORT_SYMBOLS.SERVICE)
        private service: BehaviorReportService
    ) { }

    async execute(_: ListBehaviorReportsCommand): Promise<Either<AbstractFailure[], BehaviorReport[] | undefined>> {
        try {
            const reports = await this.service.list();
            return Right(reports);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
