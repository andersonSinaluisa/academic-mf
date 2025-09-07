import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { TeacherAssignment } from "@/academic/domain/entities/TeacherAssignment";
import { TeacherAssignmentService } from "@/academic/domain/services/TeacherAssignmentService";
import { TEACHER_ASSIGNMENT_SYMBOLS } from "@/academic/domain/symbols/TeacherAssignment";

export class GetTeacherAssignmentCommand implements UseCaseCommand {
    constructor(
        public readonly id: number
    ) { }
}

@injectable()
export class GetTeacherAssignmentUseCase implements UseCase<TeacherAssignment | null, GetTeacherAssignmentCommand> {
    constructor(
        @inject(TEACHER_ASSIGNMENT_SYMBOLS.SERVICE)
        private service: TeacherAssignmentService
    ) { }

    async execute(command: GetTeacherAssignmentCommand): Promise<Either<AbstractFailure[], TeacherAssignment | null | undefined>> {
        try {
            const result = await this.service.getById(command.id);
            return Right(result);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
