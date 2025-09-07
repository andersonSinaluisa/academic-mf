import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Student } from "@/academic/domain/entities/Student";
import { StudentService } from "@/academic/domain/services/StudentService";
import { STUDENT_SYMBOLS } from "@/academic/domain/symbols/Student";

export class UpdateStudentCommand implements UseCaseCommand {
    constructor(
        public readonly id: number,
        public readonly firstName?: string,
        public readonly lastName?: string,
        public readonly uuidParallel?: string
    ) { }
}

@injectable()
export class UpdateStudentUseCase implements UseCase<Student, UpdateStudentCommand> {
    constructor(
        @inject(STUDENT_SYMBOLS.SERVICE)
        private service: StudentService
    ) { }

    async execute(command: UpdateStudentCommand): Promise<Either<AbstractFailure[], Student | undefined>> {
        try {
            const student = new Student(
                command.id,
                command.firstName ?? "",
                command.lastName ?? "",
                command.uuidParallel ?? ""
            );
            const updated = await this.service.update(student);
            return Right(updated);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
