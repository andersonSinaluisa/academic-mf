import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Meeting } from "@/academic/domain/entities/Meeting";
import { MeetingService } from "@/academic/domain/services/MeetingService";
import { MEETING_SYMBOLS } from "@/academic/domain/symbols/Meeting";

export class CreateMeetingCommand implements UseCaseCommand {
    constructor(
        public readonly topic: string,
        public readonly date: string
    ) { }
}

@injectable()
export class CreateMeetingUseCase implements UseCase<Meeting, CreateMeetingCommand> {
    constructor(
        @inject(MEETING_SYMBOLS.SERVICE)
        private service: MeetingService
    ) { }

    async execute(command: CreateMeetingCommand): Promise<Either<AbstractFailure[], Meeting | undefined>> {
        try {
            const meeting = new Meeting(0, command.topic, command.date);
            const created = await this.service.create(meeting);
            return Right(created);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
