import { Teacher } from "@/academic/domain/entities/Teacher";
import { TeacherInputDto, TeacherOutputDto } from "../dto/TeacherDto";


export class TeacherMapper {


    static toDomain(raw: TeacherOutputDto): Teacher {
        return new Teacher(
            raw.id,
            raw.fistName,
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

    static toPersistence(teacher: Teacher): TeacherInputDto {
        return {
            fistName: teacher.firstName,
            lastName: teacher.lastName,
            phone: teacher.phone,
            birthDate: teacher.birthDate,
            uuidUser: teacher.uuidUser,
            address: teacher.address,
            identification: teacher.identification,
            nacionality: teacher.nationality,
            gender: teacher.gender,
            image: teacher.image,
        };
    }
}