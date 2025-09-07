import { inject, injectable } from "inversify";
import { PROMOTION_ACT_SYMBOLS } from "@/academic/domain/symbols/PromotionAct";
import { PromotionActService } from "@/academic/domain/services/PromotionActService";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";

export class DeletePromotionActCommand implements UseCaseCommand {
    constructor(public readonly id: number) { }
}

@injectable()
export class DeletePromotionActUseCase implements UseCase<void, DeletePromotionActCommand> {
    constructor(
        @inject(PROMOTION_ACT_SYMBOLS.SERVICE)
        private service: PromotionActService
    ) { }

    async execute(command: DeletePromotionActCommand): Promise<Either<AbstractFailure[], void | undefined>> {
        try {
            await this.service.delete(command.id);
            return Right(undefined);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
