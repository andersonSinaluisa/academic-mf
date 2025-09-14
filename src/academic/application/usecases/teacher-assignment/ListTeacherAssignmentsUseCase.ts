import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { TeacherAssignment } from "@/academic/domain/entities/TeacherAssignment";
import { TeacherAssignmentService } from "@/academic/domain/services/TeacherAssignmentService";
import { TEACHER_ASSIGNMENT_SYMBOLS } from "@/academic/domain/symbols/TeacherAssignment";
import { Page } from "@/lib/utils";

export class ListTeacherAssignmentsCommand implements UseCaseCommand {
    constructor(
        public readonly page: number,
        public readonly limit: number,
        public readonly teacherId?: number,
        public readonly courseId?: number
    ) { }
}

@injectable()
export class ListTeacherAssignmentsUseCase implements UseCase<Page<TeacherAssignment>, ListTeacherAssignmentsCommand> {
    constructor(
        @inject(TEACHER_ASSIGNMENT_SYMBOLS.SERVICE)
        private service: TeacherAssignmentService
    ) { }

    async execute(command: ListTeacherAssignmentsCommand): Promise<Either<AbstractFailure[], Page<TeacherAssignment> | undefined>> {
        try {
            const result = await this.service.list(command.page, command.limit, command.teacherId, command.courseId);
            return Right(result);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
