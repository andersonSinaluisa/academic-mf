import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Student } from "@/academic/domain/entities/Student";
import { StudentService } from "@/academic/domain/services/StudentService";
import { STUDENT_SYMBOLS } from "@/academic/domain/symbols/Student";

export class CreateStudentCommand implements UseCaseCommand {
    constructor(
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly uuidParallel: string
    ) { }
}

@injectable()
export class CreateStudentUseCase implements UseCase<Student, CreateStudentCommand> {
    constructor(
        @inject(STUDENT_SYMBOLS.SERVICE)
        private service: StudentService
    ) { }

    async execute(command: CreateStudentCommand): Promise<Either<AbstractFailure[], Student | undefined>> {
        try {
            const student = new Student(0, command.firstName, command.lastName, command.uuidParallel);
            const created = await this.service.create(student);
            return Right(created);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
