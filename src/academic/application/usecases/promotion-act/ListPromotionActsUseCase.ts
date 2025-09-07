import { inject, injectable } from "inversify";
import { PROMOTION_ACT_SYMBOLS } from "@/academic/domain/symbols/PromotionAct";
import { PromotionActService } from "@/academic/domain/services/PromotionActService";
import { PromotionAct } from "@/academic/domain/entities/PromotionAct";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";

export class ListPromotionActsCommand implements UseCaseCommand {
    constructor(
        public readonly courseId: string,
        public readonly academicYearId: string
    ) { }
}

@injectable()
export class ListPromotionActsUseCase implements UseCase<PromotionAct[], ListPromotionActsCommand> {
    constructor(
        @inject(PROMOTION_ACT_SYMBOLS.SERVICE)
        private service: PromotionActService
    ) { }

    async execute(command: ListPromotionActsCommand): Promise<Either<AbstractFailure[], PromotionAct[] | undefined>> {
        try {
            const acts = await this.service.list(command.courseId, command.academicYearId);
            return Right(acts);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
