import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Enrollment } from "@/academic/domain/entities/Enrollment";
import { EnrollmentService } from "@/academic/domain/services/EnrollmentService";
import { ENROLLMENT_SYMBOLS } from "@/academic/domain/symbols/Enrollment";

export class ListEnrollmentsCommand implements UseCaseCommand { }

@injectable()
export class ListEnrollmentsUseCase implements UseCase<Enrollment[], ListEnrollmentsCommand> {
    constructor(
        @inject(ENROLLMENT_SYMBOLS.SERVICE)
        private service: EnrollmentService
    ) { }

    async execute(_: ListEnrollmentsCommand): Promise<Either<AbstractFailure[], Enrollment[] | undefined>> {
        try {
            const enrollments = await this.service.list();
            return Right(enrollments);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
