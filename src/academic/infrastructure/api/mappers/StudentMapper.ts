import { Student } from "@/academic/domain/entities/Student";
import { StudentInputDto, StudentOutputDto } from "../dto/StudentDto";

export class StudentMapper {
    static toDomain(raw: StudentOutputDto): Student {
        return new Student(raw.id, raw.firstName, raw.lastName, raw.uuidParallel);
    }

    static toDto(entity: Student): StudentInputDto {
        return {
            firstName: entity.firstName,
            lastName: entity.lastName,
            uuidParallel: entity.uuidParallel
        };
    }
}
