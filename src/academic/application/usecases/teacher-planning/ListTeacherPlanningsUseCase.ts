import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { TeacherPlanning } from "@/academic/domain/entities/TeacherPlanning";
import { TeacherPlanningService } from "@/academic/domain/services/TeacherPlanningService";
import { TEACHER_PLANNING_SYMBOLS } from "@/academic/domain/symbols/TeacherPlanning";
import { Page } from "@/lib/utils";

export class ListTeacherPlanningsCommand implements UseCaseCommand {
    constructor(
        public readonly page: number,
        public readonly limit: number,
        public readonly teacherId?: number,
        public readonly subjectId?: number,
        public readonly courseId?: number,
        public readonly topic?: string
    ) { }
}

@injectable()
export class ListTeacherPlanningsUseCase implements UseCase<Page<TeacherPlanning>, ListTeacherPlanningsCommand> {
    constructor(
        @inject(TEACHER_PLANNING_SYMBOLS.SERVICE)
        private service: TeacherPlanningService
    ) { }

    async execute(command: ListTeacherPlanningsCommand): Promise<Either<AbstractFailure[], Page<TeacherPlanning> | undefined>> {
        try {
            const result = await this.service.list(command.page, command.limit, command.teacherId, command.subjectId, command.courseId, command.topic);
            return Right(result);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
