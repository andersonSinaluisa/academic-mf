import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Enrollment } from "@/academic/domain/entities/Enrollment";
import { EnrollmentService } from "@/academic/domain/services/EnrollmentService";
import { ENROLLMENT_SYMBOLS } from "@/academic/domain/symbols/Enrollment";
import { Page } from "@/lib/utils";

export class ListEnrollmentsCommand implements UseCaseCommand {
    constructor(
        public page: number,
        public limit: number,
        public search?: string
    ) { }
}

@injectable()
export class ListEnrollmentsUseCase implements UseCase<Page<Enrollment>, ListEnrollmentsCommand> {
    constructor(
        @inject(ENROLLMENT_SYMBOLS.SERVICE)
        private service: EnrollmentService
    ) { }

    async execute(command: ListEnrollmentsCommand): Promise<Either<AbstractFailure[], Page<Enrollment> | undefined>> {
        try {
            const enrollments = await this.service.list(command.page, command.limit, command.search);
            return Right(enrollments);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
