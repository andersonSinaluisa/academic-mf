import { Teacher } from "@/academic/domain/entities/Teacher";
import { TeacherInputDto, TeacherOutputDto } from "../dto/TeacherDto";

export class TeacherMapper {
    static toDomain(raw: TeacherOutputDto): Teacher {
        return new Teacher(
            raw.id,
            raw.firstName,
            raw.lastName,
            raw.phone,
            raw.birthDate,
            raw.uuidUser,
            raw.address,
            raw.identification,
            raw.nationality,
            raw.gender,
            raw.image,
            raw.createdAt
        );
    }

    static toDto(entity: Teacher): TeacherInputDto {
        return {
            firstName: entity.firstName,
            lastName: entity.lastName,
            phone: entity.phone,
            birthDate: entity.birthDate,
            uuidUser: entity.uuidUser,
            address: entity.address,
            identification: entity.identification,
            nationality: entity.nationality,
            gender: entity.gender,
            image: entity.image
        };
    }
}
