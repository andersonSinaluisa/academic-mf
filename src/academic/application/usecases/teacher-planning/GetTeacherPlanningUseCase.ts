import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { TeacherPlanning } from "@/academic/domain/entities/TeacherPlanning";
import { TeacherPlanningService } from "@/academic/domain/services/TeacherPlanningService";
import { TEACHER_PLANNING_SYMBOLS } from "@/academic/domain/symbols/TeacherPlanning";

export class GetTeacherPlanningCommand implements UseCaseCommand {
    constructor(
        public readonly id: number
    ) { }
}

@injectable()
export class GetTeacherPlanningUseCase implements UseCase<TeacherPlanning | null, GetTeacherPlanningCommand> {
    constructor(
        @inject(TEACHER_PLANNING_SYMBOLS.SERVICE)
        private service: TeacherPlanningService
    ) { }

    async execute(command: GetTeacherPlanningCommand): Promise<Either<AbstractFailure[], TeacherPlanning | null | undefined>> {
        try {
            const result = await this.service.getById(command.id);
            return Right(result);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
