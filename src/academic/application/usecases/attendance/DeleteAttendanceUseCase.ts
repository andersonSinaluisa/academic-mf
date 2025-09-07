import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { AttendanceService } from "@/academic/domain/services/AttendanceService";
import { ATTENDANCE_SYMBOLS } from "@/academic/domain/symbols/Attendance";

export class DeleteAttendanceCommand implements UseCaseCommand {
    constructor(public readonly id: number) { }
}

@injectable()
export class DeleteAttendanceUseCase implements UseCase<void, DeleteAttendanceCommand> {
    constructor(
        @inject(ATTENDANCE_SYMBOLS.SERVICE)
        private service: AttendanceService
    ) { }

    async execute(command: DeleteAttendanceCommand): Promise<Either<AbstractFailure[], void>> {
        try {
            await this.service.delete(command.id);
            return Right(undefined);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
