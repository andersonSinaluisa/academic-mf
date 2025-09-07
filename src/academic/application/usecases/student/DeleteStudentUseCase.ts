import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { StudentService } from "@/academic/domain/services/StudentService";
import { STUDENT_SYMBOLS } from "@/academic/domain/symbols/Student";

export class DeleteStudentCommand implements UseCaseCommand {
    constructor(public readonly id: number) { }
}

@injectable()
export class DeleteStudentUseCase implements UseCase<void, DeleteStudentCommand> {
    constructor(
        @inject(STUDENT_SYMBOLS.SERVICE)
        private service: StudentService
    ) { }

    async execute(command: DeleteStudentCommand): Promise<Either<AbstractFailure[], void | undefined>> {
        try {
            await this.service.delete(command.id);
            return Right(undefined);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
