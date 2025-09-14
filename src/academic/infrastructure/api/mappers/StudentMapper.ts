import { Student } from "@/academic/domain/entities/Student";
import { StudentInputDto, StudentOutputDto } from "../dto/StudentDto";

export class StudentMapper {
    static toDomain(raw: StudentOutputDto): Student {
        return new Student(
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
            raw.uuidCurrentSchoolYear,
            raw.uuidCurrentSection,
            raw.uuidParallel
        );
    }

    static toDto(entity: Student): StudentInputDto {
        return {
            firstName: entity.firstName,
            lastName: entity.lastName,
            uuidParallel: entity.uuidParallel,
            phone: entity.phone,
            birthDate: entity.birthDate,
            uuidUser: entity.uuidUser,
            address: entity.address,
            identification: entity.identification,
            nationality: entity.nationality,
            gender: entity.gender,
            image: entity.image,
            uuidCurrentSchoolYear: entity.uuidCurrentSchoolYear,
            uuidCurrentSection: entity.uuidCurrentSection
        };
    }
}
