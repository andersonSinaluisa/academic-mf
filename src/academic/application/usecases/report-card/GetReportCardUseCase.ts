import { inject, injectable } from "inversify";
import { REPORT_CARD_SYMBOLS } from "@/academic/domain/symbols/ReportCard";
import { ReportCardService } from "@/academic/domain/services/ReportCardService";
import { ReportCard } from "@/academic/domain/entities/ReportCard";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";

export class GetReportCardCommand implements UseCaseCommand {
    constructor(
        public readonly studentId: number,
        public readonly academicYearId: string
    ) { }
}

@injectable()
export class GetReportCardUseCase implements UseCase<ReportCard, GetReportCardCommand> {
    constructor(
        @inject(REPORT_CARD_SYMBOLS.SERVICE)
        private service: ReportCardService
    ) { }

    async execute(command: GetReportCardCommand): Promise<Either<AbstractFailure[], ReportCard | undefined>> {
        try {
            const rc = await this.service.getReportCard(command.studentId, command.academicYearId);
            return Right(rc);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}

