import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { MeetingService } from "@/academic/domain/services/MeetingService";
import { MEETING_SYMBOLS } from "@/academic/domain/symbols/Meeting";

export class DeleteMeetingCommand implements UseCaseCommand {
    constructor(public readonly id: number) { }
}

@injectable()
export class DeleteMeetingUseCase implements UseCase<void, DeleteMeetingCommand> {
    constructor(
        @inject(MEETING_SYMBOLS.SERVICE)
        private service: MeetingService
    ) { }

    async execute(command: DeleteMeetingCommand): Promise<Either<AbstractFailure[], void>> {
        try {
            await this.service.delete(command.id);
            return Right(undefined);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
