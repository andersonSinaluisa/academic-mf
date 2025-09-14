import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Representative } from "@/academic/domain/entities/Representative";
import { RepresentativeService } from "@/academic/domain/services/RepresentativeService";
import { REPRESENTATIVE_SYMBOLS } from "@/academic/domain/symbols/Representative";

export class CreateRepresentativeCommand implements UseCaseCommand {
    constructor(
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly phone?: string,
        public readonly birthDate?: string,
        public readonly uuidUser?: string,
        public readonly address?: string,
        public readonly identification?: string,
        public readonly nacionality?: string,
        public readonly gender?: string,
        public readonly image?: string,
    ) { }
}

@injectable()
export class CreateRepresentativeUseCase implements UseCase<Representative, CreateRepresentativeCommand> {
    constructor(
        @inject(REPRESENTATIVE_SYMBOLS.SERVICE)
        private service: RepresentativeService
    ) { }

    async execute(command: CreateRepresentativeCommand): Promise<Either<AbstractFailure[], Representative | undefined>> {
        try {
            const rep = new Representative(
                0,
                command.firstName,
                command.lastName,
                command.phone,
                command.birthDate,
                command.uuidUser,
                command.address,
                command.identification,
                command.nacionality,
                command.gender,
                command.image,
            );
            const created = await this.service.create(rep);
            return Right(created);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
