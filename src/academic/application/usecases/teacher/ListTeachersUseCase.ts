import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Teacher } from "@/academic/domain/entities/Teacher";
import { TeacherService } from "@/academic/domain/services/TeacherService";
import { TEACHER_SYMBOLS } from "@/academic/domain/symbols/Teacher";

export class ListTeachersCommand implements UseCaseCommand {
    constructor(
        public readonly page: number,
        public readonly limit: number,
        public readonly firstName?: string,
        public readonly lastName?: string,
        public readonly identification?: string,
        public readonly gender?: string
    ) { }
}

@injectable()
export class ListTeachersUseCase implements UseCase<Teacher[], ListTeachersCommand> {
    constructor(
        @inject(TEACHER_SYMBOLS.SERVICE)
        private service: TeacherService
    ) { }

    async execute(command: ListTeachersCommand): Promise<Either<AbstractFailure[], Teacher[] | undefined>> {
        try {
            const teachers = await this.service.list(command.page, command.limit, command.firstName, command.lastName, command.identification, command.gender);
            return Right(teachers);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
