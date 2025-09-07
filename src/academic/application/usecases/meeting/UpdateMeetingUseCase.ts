import { inject, injectable } from "inversify";
import { UseCase, UseCaseCommand } from "../UseCase";
import { Either, Left, Right } from "purify-ts/Either";
import { AbstractFailure } from "@/academic/domain/entities/failure";
import { Meeting } from "@/academic/domain/entities/Meeting";
import { MeetingService } from "@/academic/domain/services/MeetingService";
import { MEETING_SYMBOLS } from "@/academic/domain/symbols/Meeting";

export class UpdateMeetingCommand implements UseCaseCommand {
    constructor(
        public readonly id: number,
        public readonly topic: string
    ) { }
}

@injectable()
export class UpdateMeetingUseCase implements UseCase<Meeting, UpdateMeetingCommand> {
    constructor(
        @inject(MEETING_SYMBOLS.SERVICE)
        private service: MeetingService
    ) { }

    async execute(command: UpdateMeetingCommand): Promise<Either<AbstractFailure[], Meeting | undefined>> {
        try {
            const meeting = new Meeting(command.id, command.topic, '');
            const updated = await this.service.update(meeting);
            return Right(updated);
        } catch (error) {
            return Left([AbstractFailure.fromError(error)]);
        }
    }
}
