import { inject, injectable } from "inversify";
import { PROMOTION_ACT_SYMBOLS } from "@/academic/domain/symbols/PromotionAct";
import { PromotionActService } from "@/academic/domain/services/PromotionActService";
import { PromotionAct } from "@/academic/domain/entities/PromotionAct";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Page } from "@/lib/utils";

export class ListPromotionActsCommand implements UseCaseCommand {
    constructor(
        public readonly courseId: string,
        public readonly academicYearId: string,
        public readonly page: number,
        public readonly limit: number
    ) { }
}

@injectable()
export class ListPromotionActsUseCase implements UseCase<Page<PromotionAct>, ListPromotionActsCommand> {
    constructor(
        @inject(PROMOTION_ACT_SYMBOLS.SERVICE)
        private service: PromotionActService
    ) { }

    async execute(command: ListPromotionActsCommand): Promise<Either<AbstractFailure[], Page<PromotionAct> | undefined>> {
        try {
            const acts = await this.service.list(command.courseId, command.academicYearId, command.page, command.limit);
            return Right(acts);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
