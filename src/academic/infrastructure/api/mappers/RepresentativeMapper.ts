import { Representative } from "@/academic/domain/entities/Representative";
import { RepresentativeInputDto, RepresentativeOutputDto } from "../dto/RepresentativeDto";

export class RepresentativeMapper {
    static toDomain(raw: RepresentativeOutputDto): Representative {
        return new Representative(
            raw.id,
            raw.firstName,
            raw.lastName,
            raw.phone,
            raw.birthDate,
            raw.uuidUser,
            raw.address,
            raw.identification,
            raw.nacionality,
            raw.gender,
            raw.image,
        );
    }

    static toDto(entity: Representative): RepresentativeInputDto {
        return {
            firstName: entity.firstName,
            lastName: entity.lastName,
            phone: entity.phone,
            birthDate: entity.birthDate,
            uuidUser: entity.uuidUser,
            address: entity.address,
            identification: entity.identification,
            nacionality: entity.nacionality,
            gender: entity.gender,
            image: entity.image,
        };
    }
}
