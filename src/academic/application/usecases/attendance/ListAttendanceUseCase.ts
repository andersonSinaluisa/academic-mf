import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Attendance } from "@/academic/domain/entities/Attendance";
import { AttendanceService } from "@/academic/domain/services/AttendanceService";
import { ATTENDANCE_SYMBOLS } from "@/academic/domain/symbols/Attendance";
import { Page } from "@/lib/utils";

export class ListAttendanceCommand implements UseCaseCommand {
    constructor(
        public page: number,
        public limit: number,
        public search?: string
    ) { }
}

@injectable()
export class ListAttendanceUseCase implements UseCase<Page<Attendance>, ListAttendanceCommand> {
    constructor(
        @inject(ATTENDANCE_SYMBOLS.SERVICE)
        private service: AttendanceService
    ) { }

    async execute(command: ListAttendanceCommand): Promise<Either<AbstractFailure[], Page<Attendance> | undefined>> {
        try {
            const list = await this.service.list(command.page, command.limit, command.search);
            return Right(list);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
