import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Representative } from "@/academic/domain/entities/Representative";
import { RepresentativeService } from "@/academic/domain/services/RepresentativeService";
import { REPRESENTATIVE_SYMBOLS } from "@/academic/domain/symbols/Representative";

export class UpdateRepresentativeCommand implements UseCaseCommand {
    constructor(
        public readonly id: number,
        public readonly firstName?: string,
        public readonly lastName?: string
    ) { }
}

@injectable()
export class UpdateRepresentativeUseCase implements UseCase<Representative, UpdateRepresentativeCommand> {
    constructor(
        @inject(REPRESENTATIVE_SYMBOLS.SERVICE)
        private service: RepresentativeService
    ) { }

    async execute(command: UpdateRepresentativeCommand): Promise<Either<AbstractFailure[], Representative | undefined>> {
        try {
            const rep = new Representative(command.id, command.firstName ?? "", command.lastName ?? "");
            const updated = await this.service.update(rep);
            return Right(updated);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
