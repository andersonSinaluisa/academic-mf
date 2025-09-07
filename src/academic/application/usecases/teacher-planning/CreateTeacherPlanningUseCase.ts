import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { TeacherPlanning } from "@/academic/domain/entities/TeacherPlanning";
import { TeacherPlanningService } from "@/academic/domain/services/TeacherPlanningService";
import { TEACHER_PLANNING_SYMBOLS } from "@/academic/domain/symbols/TeacherPlanning";

export class CreateTeacherPlanningCommand implements UseCaseCommand {
    constructor(
        public readonly teacherId: number,
        public readonly subjectId: number,
        public readonly courseId: number,
        public readonly schoolYearId: string,
        public readonly topic: string,
        public readonly description: string,
        public readonly week: number
    ) { }
}

@injectable()
export class CreateTeacherPlanningUseCase implements UseCase<TeacherPlanning, CreateTeacherPlanningCommand> {
    constructor(
        @inject(TEACHER_PLANNING_SYMBOLS.SERVICE)
        private service: TeacherPlanningService
    ) { }

    async execute(command: CreateTeacherPlanningCommand): Promise<Either<AbstractFailure[], TeacherPlanning | undefined>> {
        try {
            const planning = new TeacherPlanning(
                0,
                command.teacherId,
                command.subjectId,
                command.courseId,
                command.schoolYearId,
                command.topic,
                command.description,
                command.week
            );
            const created = await this.service.create(planning);
            return Right(created);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
