import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Attendance } from "@/academic/domain/entities/Attendance";
import { AttendanceService } from "@/academic/domain/services/AttendanceService";
import { ATTENDANCE_SYMBOLS } from "@/academic/domain/symbols/Attendance";

export class ListAttendanceCommand implements UseCaseCommand { }

@injectable()
export class ListAttendanceUseCase implements UseCase<Attendance[], ListAttendanceCommand> {
    constructor(
        @inject(ATTENDANCE_SYMBOLS.SERVICE)
        private service: AttendanceService
    ) { }

    async execute(_: ListAttendanceCommand): Promise<Either<AbstractFailure[], Attendance[] | undefined>> {
        try {
            const list = await this.service.list();
            return Right(list);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
