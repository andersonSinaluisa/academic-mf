import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { RepresentativeService } from "@/academic/domain/services/RepresentativeService";
import { REPRESENTATIVE_SYMBOLS } from "@/academic/domain/symbols/Representative";

export class DeleteRepresentativeCommand implements UseCaseCommand {
    constructor(
        public readonly id: number
    ) { }
}

@injectable()
export class DeleteRepresentativeUseCase implements UseCase<void, DeleteRepresentativeCommand> {
    constructor(
        @inject(REPRESENTATIVE_SYMBOLS.SERVICE)
        private service: RepresentativeService
    ) { }

    async execute(command: DeleteRepresentativeCommand): Promise<Either<AbstractFailure[], void>> {
        try {
            await this.service.delete(command.id);
            return Right(undefined);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
