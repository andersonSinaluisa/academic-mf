import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Representative } from "@/academic/domain/entities/Representative";
import { RepresentativeService } from "@/academic/domain/services/RepresentativeService";
import { REPRESENTATIVE_SYMBOLS } from "@/academic/domain/symbols/Representative";

export class ListRepresentativesCommand implements UseCaseCommand {
    constructor(
        public readonly page: number,
        public readonly limit: number
    ) { }
}

@injectable()
export class ListRepresentativesUseCase implements UseCase<Representative[], ListRepresentativesCommand> {
    constructor(
        @inject(REPRESENTATIVE_SYMBOLS.SERVICE)
        private service: RepresentativeService
    ) { }

    async execute(command: ListRepresentativesCommand): Promise<Either<AbstractFailure[], Representative[] | undefined>> {
        try {
            const reps = await this.service.list(command.page, command.limit);
            return Right(reps);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
