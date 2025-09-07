import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Enrollment } from "@/academic/domain/entities/Enrollment";
import { EnrollmentService } from "@/academic/domain/services/EnrollmentService";
import { ENROLLMENT_SYMBOLS } from "@/academic/domain/symbols/Enrollment";

export class CreateEnrollmentCommand implements UseCaseCommand {
    constructor(
        public readonly studentId: number,
        public readonly courseId: string
    ) { }
}

@injectable()
export class CreateEnrollmentUseCase implements UseCase<Enrollment, CreateEnrollmentCommand> {
    constructor(
        @inject(ENROLLMENT_SYMBOLS.SERVICE)
        private service: EnrollmentService
    ) { }

    async execute(command: CreateEnrollmentCommand): Promise<Either<AbstractFailure[], Enrollment | undefined>> {
        try {
            const enrollment = new Enrollment(0, command.studentId, command.courseId);
            const created = await this.service.create(enrollment);
            return Right(created);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
