import { inject, injectable } from "inversify";
import { STATISTICS_SYMBOLS } from "@/academic/domain/symbols/Statistics";
import { StatisticsService } from "@/academic/domain/services/StatisticsService";
import { PerformanceStatistics } from "@/academic/domain/entities/Statistics";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";

export class GetPerformanceStatisticsCommand implements UseCaseCommand {
    constructor(
        public readonly courseId: string,
        public readonly subjectId: string,
        public readonly academicYearId: string,
    ) { }
}

@injectable()
export class GetPerformanceStatisticsUseCase implements UseCase<PerformanceStatistics, GetPerformanceStatisticsCommand> {
    constructor(
        @inject(STATISTICS_SYMBOLS.SERVICE)
        private service: StatisticsService
    ) { }

    async execute(command: GetPerformanceStatisticsCommand): Promise<Either<AbstractFailure[], PerformanceStatistics | undefined>> {
        try {
            const stats = await this.service.getPerformance(command.courseId, command.subjectId, command.academicYearId);
            return Right(stats);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
