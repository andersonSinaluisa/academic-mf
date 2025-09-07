import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Enrollment } from "@/academic/domain/entities/Enrollment";
import { EnrollmentService } from "@/academic/domain/services/EnrollmentService";
import { ENROLLMENT_SYMBOLS } from "@/academic/domain/symbols/Enrollment";

export class UpdateEnrollmentCommand implements UseCaseCommand {
    constructor(
        public readonly id: number,
        public readonly courseId: string
    ) { }
}

@injectable()
export class UpdateEnrollmentUseCase implements UseCase<Enrollment, UpdateEnrollmentCommand> {
    constructor(
        @inject(ENROLLMENT_SYMBOLS.SERVICE)
        private service: EnrollmentService
    ) { }

    async execute(command: UpdateEnrollmentCommand): Promise<Either<AbstractFailure[], Enrollment | undefined>> {
        try {
            const enrollment = new Enrollment(command.id, 0, command.courseId);
            const updated = await this.service.update(enrollment);
            return Right(updated);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
