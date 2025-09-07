import { inject, injectable } from "inversify";
import { EXPORT_SYMBOLS } from "@/academic/domain/symbols/Export";
import { ExportService } from "@/academic/domain/services/ExportService";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";

export class ExportReportCardCommand implements UseCaseCommand {
    constructor(
        public readonly studentId: number,
        public readonly academicYearId: string,
        public readonly format: string,
    ) { }
}

@injectable()
export class ExportReportCardUseCase implements UseCase<Blob, ExportReportCardCommand> {
    constructor(
        @inject(EXPORT_SYMBOLS.SERVICE)
        private service: ExportService
    ) { }

    async execute(command: ExportReportCardCommand) {
        try {
            const blob = await this.service.exportReportCard(command.studentId, command.academicYearId, command.format);
            return Right(blob) as Either<AbstractFailure[], Blob>;
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
