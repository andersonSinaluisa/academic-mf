import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Meeting } from "@/academic/domain/entities/Meeting";
import { MeetingService } from "@/academic/domain/services/MeetingService";
import { MEETING_SYMBOLS } from "@/academic/domain/symbols/Meeting";

export class ListMeetingsCommand implements UseCaseCommand { }

@injectable()
export class ListMeetingsUseCase implements UseCase<Meeting[], ListMeetingsCommand> {
    constructor(
        @inject(MEETING_SYMBOLS.SERVICE)
        private service: MeetingService
    ) { }

    async execute(_: ListMeetingsCommand): Promise<Either<AbstractFailure[], Meeting[] | undefined>> {
        try {
            const meetings = await this.service.list();
            return Right(meetings);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
