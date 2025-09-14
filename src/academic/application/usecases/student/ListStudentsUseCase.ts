import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Student } from "@/academic/domain/entities/Student";
import { StudentService } from "@/academic/domain/services/StudentService";
import { STUDENT_SYMBOLS } from "@/academic/domain/symbols/Student";
import { Page } from "@/lib/utils";

export class ListStudentsCommand implements UseCaseCommand {
    constructor(
        public readonly page: number,
        public readonly limit: number,
        public readonly uuidParallel?: string,
        public readonly search?: string
    ) { }
}

@injectable()
export class ListStudentsUseCase implements UseCase<Page<Student>, ListStudentsCommand> {
    constructor(
        @inject(STUDENT_SYMBOLS.SERVICE)
        private service: StudentService
    ) { }

    async execute(command: ListStudentsCommand): Promise<Either<AbstractFailure[], Page<Student> | undefined>> {
        try {
            const students = await this.service.list(command.page, command.limit, command.uuidParallel, command.search);
            return Right(students);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
