import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Attendance, AttendanceStatus } from "@/academic/domain/entities/Attendance";
import { AttendanceService } from "@/academic/domain/services/AttendanceService";
import { ATTENDANCE_SYMBOLS } from "@/academic/domain/symbols/Attendance";

export class CreateAttendanceCommand implements UseCaseCommand {
    constructor(
        public readonly studentId: number,
        public readonly date: string,
        public readonly status: AttendanceStatus
    ) { }
}

@injectable()
export class CreateAttendanceUseCase implements UseCase<Attendance, CreateAttendanceCommand> {
    constructor(
        @inject(ATTENDANCE_SYMBOLS.SERVICE)
        private service: AttendanceService
    ) { }

    async execute(command: CreateAttendanceCommand): Promise<Either<AbstractFailure[], Attendance | undefined>> {
        try {
            const attendance = new Attendance(0, command.studentId, command.date, command.status);
            const created = await this.service.create(attendance);
            return Right(created);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
