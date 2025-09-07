import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { TeacherAssignment } from "@/academic/domain/entities/TeacherAssignment";
import { TeacherAssignmentService } from "@/academic/domain/services/TeacherAssignmentService";
import { TEACHER_ASSIGNMENT_SYMBOLS } from "@/academic/domain/symbols/TeacherAssignment";

export class CreateTeacherAssignmentCommand implements UseCaseCommand {
    constructor(
        public readonly teacherId: number,
        public readonly courseId: number,
        public readonly subjectId: number,
        public readonly schoolYearId: string
    ) { }
}

@injectable()
export class CreateTeacherAssignmentUseCase implements UseCase<TeacherAssignment, CreateTeacherAssignmentCommand> {
    constructor(
        @inject(TEACHER_ASSIGNMENT_SYMBOLS.SERVICE)
        private service: TeacherAssignmentService
    ) { }

    async execute(command: CreateTeacherAssignmentCommand): Promise<Either<AbstractFailure[], TeacherAssignment | undefined>> {
        try {
            const assignment = new TeacherAssignment(
                0,
                command.teacherId,
                command.courseId,
                command.subjectId,
                command.schoolYearId
            );
            const created = await this.service.create(assignment);
            return Right(created);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
