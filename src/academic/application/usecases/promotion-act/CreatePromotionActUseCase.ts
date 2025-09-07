import { inject, injectable } from "inversify";
import { PROMOTION_ACT_SYMBOLS } from "@/academic/domain/symbols/PromotionAct";
import { PromotionActService } from "@/academic/domain/services/PromotionActService";
import { PromotionAct } from "@/academic/domain/entities/PromotionAct";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";

export class CreatePromotionActCommand implements UseCaseCommand {
    constructor(
        public readonly courseId: string,
        public readonly academicYearId: string,
        public readonly generatedBy: number
    ) { }
}

@injectable()
export class CreatePromotionActUseCase implements UseCase<PromotionAct, CreatePromotionActCommand> {
    constructor(
        @inject(PROMOTION_ACT_SYMBOLS.SERVICE)
        private service: PromotionActService
    ) { }

    async execute(command: CreatePromotionActCommand): Promise<Either<AbstractFailure[], PromotionAct | undefined>> {
        try {
            const act = await this.service.create(command.courseId, command.academicYearId, command.generatedBy);
            return Right(act);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
