import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Representative } from "@/academic/domain/entities/Representative";
import { RepresentativeService } from "@/academic/domain/services/RepresentativeService";
import { REPRESENTATIVE_SYMBOLS } from "@/academic/domain/symbols/Representative";

export class GetRepresentativeCommand implements UseCaseCommand {
    constructor(
        public readonly id: number
    ) { }
}

@injectable()
export class GetRepresentativeUseCase implements UseCase<Representative | null, GetRepresentativeCommand> {
    constructor(
        @inject(REPRESENTATIVE_SYMBOLS.SERVICE)
        private service: RepresentativeService
    ) { }

    async execute(command: GetRepresentativeCommand): Promise<Either<AbstractFailure[], Representative | null | undefined>> {
        try {
            const rep = await this.service.getById(command.id);
            return Right(rep);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
