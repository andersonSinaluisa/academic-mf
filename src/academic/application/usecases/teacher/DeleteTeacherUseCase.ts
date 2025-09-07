import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { TeacherService } from "@/academic/domain/services/TeacherService";
import { TEACHER_SYMBOLS } from "@/academic/domain/symbols/Teacher";

export class DeleteTeacherCommand implements UseCaseCommand {
    constructor(
        public readonly id: number
    ) { }
}

@injectable()
export class DeleteTeacherUseCase implements UseCase<void, DeleteTeacherCommand> {
    constructor(
        @inject(TEACHER_SYMBOLS.SERVICE)
        private service: TeacherService
    ) { }

    async execute(command: DeleteTeacherCommand): Promise<Either<AbstractFailure[], void>> {
        try {
            await this.service.delete(command.id);
            return Right(undefined);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
