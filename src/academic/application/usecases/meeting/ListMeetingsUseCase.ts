import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Meeting } from "@/academic/domain/entities/Meeting";
import { MeetingService } from "@/academic/domain/services/MeetingService";
import { MEETING_SYMBOLS } from "@/academic/domain/symbols/Meeting";
import { Page } from "@/lib/utils";

export class ListMeetingsCommand implements UseCaseCommand {
    constructor(
        public readonly page: number,
        public readonly limit: number,
        public readonly topic?: string
    ) { }
}

@injectable()
export class ListMeetingsUseCase implements UseCase<Page<Meeting>, ListMeetingsCommand> {
    constructor(
        @inject(MEETING_SYMBOLS.SERVICE)
        private service: MeetingService
    ) { }

    async execute(command: ListMeetingsCommand): Promise<Either<AbstractFailure[], Page<Meeting> | undefined>> {
        try {
            const meetings = await this.service.list(command.page, command.limit, command.topic);
            return Right(meetings);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
