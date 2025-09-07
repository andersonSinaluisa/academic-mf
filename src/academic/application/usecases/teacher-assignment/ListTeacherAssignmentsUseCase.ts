import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { TeacherAssignment } from "@/academic/domain/entities/TeacherAssignment";
import { TeacherAssignmentService } from "@/academic/domain/services/TeacherAssignmentService";
import { TEACHER_ASSIGNMENT_SYMBOLS } from "@/academic/domain/symbols/TeacherAssignment";

export class ListTeacherAssignmentsCommand implements UseCaseCommand {
    constructor(
        public readonly teacherId?: number,
        public readonly courseId?: number
    ) { }
}

@injectable()
export class ListTeacherAssignmentsUseCase implements UseCase<TeacherAssignment[], ListTeacherAssignmentsCommand> {
    constructor(
        @inject(TEACHER_ASSIGNMENT_SYMBOLS.SERVICE)
        private service: TeacherAssignmentService
    ) { }

    async execute(command: ListTeacherAssignmentsCommand): Promise<Either<AbstractFailure[], TeacherAssignment[] | undefined>> {
        try {
            const result = await this.service.list(command.teacherId, command.courseId);
            return Right(result);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
