import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Attendance, AttendanceStatus } from "@/academic/domain/entities/Attendance";
import { AttendanceService } from "@/academic/domain/services/AttendanceService";
import { ATTENDANCE_SYMBOLS } from "@/academic/domain/symbols/Attendance";

export class UpdateAttendanceCommand implements UseCaseCommand {
    constructor(
        public readonly id: number,
        public readonly status: AttendanceStatus
    ) { }
}

@injectable()
export class UpdateAttendanceUseCase implements UseCase<Attendance, UpdateAttendanceCommand> {
    constructor(
        @inject(ATTENDANCE_SYMBOLS.SERVICE)
        private service: AttendanceService
    ) { }

    async execute(command: UpdateAttendanceCommand): Promise<Either<AbstractFailure[], Attendance | undefined>> {
        try {
            const attendance = new Attendance(command.id, 0, '', command.status);
            const updated = await this.service.update(attendance);
            return Right(updated);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
