import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Teacher } from "@/academic/domain/entities/Teacher";
import { TeacherService } from "@/academic/domain/services/TeacherService";
import { TEACHER_SYMBOLS } from "@/academic/domain/symbols/Teacher";

export class CreateTeacherCommand implements UseCaseCommand {
    constructor(
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly phone?: string,
        public readonly birthDate?: string,
        public readonly uuidUser?: string,
        public readonly address?: string,
        public readonly identification?: string,
        public readonly nationality?: string,
        public readonly gender?: string,
        public readonly image?: string
    ) { }
}

@injectable()
export class CreateTeacherUseCase implements UseCase<Teacher, CreateTeacherCommand> {
    constructor(
        @inject(TEACHER_SYMBOLS.SERVICE)
        private service: TeacherService
    ) { }

    async execute(command: CreateTeacherCommand): Promise<Either<AbstractFailure[], Teacher | undefined>> {
        try {
            const teacher = new Teacher(
                0,
                command.firstName,
                command.lastName,
                command.phone,
                command.birthDate,
                command.uuidUser,
                command.address,
                command.identification,
                command.nationality,
                command.gender,
                command.image
            );
            const created = await this.service.create(teacher);
            return Right(created);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
