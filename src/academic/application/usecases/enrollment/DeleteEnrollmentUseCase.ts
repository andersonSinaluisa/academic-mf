import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { EnrollmentService } from "@/academic/domain/services/EnrollmentService";
import { ENROLLMENT_SYMBOLS } from "@/academic/domain/symbols/Enrollment";

export class DeleteEnrollmentCommand implements UseCaseCommand {
    constructor(public readonly id: number) { }
}

@injectable()
export class DeleteEnrollmentUseCase implements UseCase<void, DeleteEnrollmentCommand> {
    constructor(
        @inject(ENROLLMENT_SYMBOLS.SERVICE)
        private service: EnrollmentService
    ) { }

    async execute(command: DeleteEnrollmentCommand): Promise<Either<AbstractFailure[], void>> {
        try {
            await this.service.delete(command.id);
            return Right(undefined);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
