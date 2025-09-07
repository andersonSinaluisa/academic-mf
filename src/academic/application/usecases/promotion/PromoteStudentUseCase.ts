import { inject, injectable } from "inversify";
import { PROMOTION_SYMBOLS } from "@/academic/domain/symbols/Promotion";
import { PromotionService } from "@/academic/domain/services/PromotionService";
import { Promotion } from "@/academic/domain/entities/Promotion";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";

export class PromoteStudentCommand implements UseCaseCommand {
    constructor(
        public readonly studentId: number,
        public readonly academicYearId: string
    ) { }
}

@injectable()
export class PromoteStudentUseCase implements UseCase<Promotion, PromoteStudentCommand> {
    constructor(
        @inject(PROMOTION_SYMBOLS.SERVICE)
        private service: PromotionService
    ) { }

    async execute(command: PromoteStudentCommand): Promise<Either<AbstractFailure[], Promotion | undefined>> {
        try {
            const promo = await this.service.promote(command.studentId, command.academicYearId);
            return Right(promo);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
