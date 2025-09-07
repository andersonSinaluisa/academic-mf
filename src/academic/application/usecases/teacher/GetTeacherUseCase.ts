import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Teacher } from "@/academic/domain/entities/Teacher";
import { TeacherService } from "@/academic/domain/services/TeacherService";
import { TEACHER_SYMBOLS } from "@/academic/domain/symbols/Teacher";

export class GetTeacherCommand implements UseCaseCommand {
    constructor(
        public readonly id: number
    ) { }
}

@injectable()
export class GetTeacherUseCase implements UseCase<Teacher | null, GetTeacherCommand> {
    constructor(
        @inject(TEACHER_SYMBOLS.SERVICE)
        private service: TeacherService
    ) { }

    async execute(command: GetTeacherCommand): Promise<Either<AbstractFailure[], Teacher | null | undefined>> {
        try {
            const teacher = await this.service.getById(command.id);
            return Right(teacher);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
