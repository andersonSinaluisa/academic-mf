import { inject, injectable } from "inversify";
import { OFFICIAL_RECORD_SYMBOLS } from "@/academic/domain/symbols/OfficialRecord";
import { OfficialRecordService } from "@/academic/domain/services/OfficialRecordService";
import { OfficialRecord } from "@/academic/domain/entities/OfficialRecord";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";

export class GetOfficialRecordCommand implements UseCaseCommand {
    constructor(
        public readonly studentId: number,
    ) { }
}

@injectable()
export class GetOfficialRecordUseCase implements UseCase<OfficialRecord, GetOfficialRecordCommand> {
    constructor(
        @inject(OFFICIAL_RECORD_SYMBOLS.SERVICE)
        private service: OfficialRecordService
    ) { }

    async execute(command: GetOfficialRecordCommand): Promise<Either<AbstractFailure[], OfficialRecord | undefined>> {
        try {
            const record = await this.service.getOfficialRecord(command.studentId);
            return Right(record);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
