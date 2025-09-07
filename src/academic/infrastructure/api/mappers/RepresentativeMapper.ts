import { Representative } from "@/academic/domain/entities/Representative";
import { RepresentativeInputDto, RepresentativeOutputDto } from "../dto/RepresentativeDto";

export class RepresentativeMapper {
    static toDomain(raw: RepresentativeOutputDto): Representative {
        return new Representative(raw.id, raw.firstName, raw.lastName);
    }

    static toDto(entity: Representative): RepresentativeInputDto {
        return {
            firstName: entity.firstName,
            lastName: entity.lastName
        };
    }
}
