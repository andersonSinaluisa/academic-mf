import { inject, injectable } from "inversify";
import { STATISTICS_SYMBOLS } from "@/academic/domain/symbols/Statistics";
import { StatisticsService } from "@/academic/domain/services/StatisticsService";
import { AttendanceStatistics } from "@/academic/domain/entities/Statistics";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";

export class GetAttendanceStatisticsCommand implements UseCaseCommand {
    constructor(
        public readonly courseId: string,
        public readonly academicYearId: string,
    ) { }
}

@injectable()
export class GetAttendanceStatisticsUseCase implements UseCase<AttendanceStatistics, GetAttendanceStatisticsCommand> {
    constructor(
        @inject(STATISTICS_SYMBOLS.SERVICE)
        private service: StatisticsService
    ) { }

    async execute(command: GetAttendanceStatisticsCommand): Promise<Either<AbstractFailure[], AttendanceStatistics | undefined>> {
        try {
            const stats = await this.service.getAttendance(command.courseId, command.academicYearId);
            return Right(stats);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
