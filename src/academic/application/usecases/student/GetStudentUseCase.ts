import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Student } from "@/academic/domain/entities/Student";
import { StudentService } from "@/academic/domain/services/StudentService";
import { STUDENT_SYMBOLS } from "@/academic/domain/symbols/Student";

export class GetStudentCommand implements UseCaseCommand {
    constructor(public readonly id: number) { }
}

@injectable()
export class GetStudentUseCase implements UseCase<Student | null, GetStudentCommand> {
    constructor(
        @inject(STUDENT_SYMBOLS.SERVICE)
        private service: StudentService
    ) { }

    async execute(command: GetStudentCommand): Promise<Either<AbstractFailure[], Student | null | undefined>> {
        try {
            const student = await this.service.getById(command.id);
            return Right(student);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
