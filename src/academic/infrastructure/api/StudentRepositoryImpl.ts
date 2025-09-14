import { StudentRepository } from "@/academic/domain/interfaces/StudentRepository";
import { Student } from "@/academic/domain/entities/Student";
import { ApiInstance } from "./Api";
import { StudentOutputDto } from "./dto/StudentDto";
import { StudentMapper } from "./mappers/StudentMapper";
import { Page } from "@/lib/utils";

export class StudentRepositoryImpl implements StudentRepository {
    async create(student: Student): Promise<Student> {
        const res = await ApiInstance.post<StudentOutputDto>(
            '/students',
            StudentMapper.toDto(student)
        );
        return StudentMapper.toDomain(res.data);
    }

    async list(page: number, limit: number, uuidParallel?: string, search?: string): Promise<Page<Student>> {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        if (uuidParallel) params.append('uuidParallel', uuidParallel);
        if (search) params.append('search', search);
        const res = await ApiInstance.get<Page<StudentOutputDto>>('/students', { params });
        return {
            ...res.data,
            content: res.data.content.map(StudentMapper.toDomain)
        };
    }

    async getById(id: number): Promise<Student | null> {
        const res = await ApiInstance.get<StudentOutputDto>(`/students/${id}`);
        return res.data ? StudentMapper.toDomain(res.data) : null;
    }

    async update(student: Student): Promise<Student> {
        const res = await ApiInstance.patch<StudentOutputDto>(
            `/students/${student.id}`,
            StudentMapper.toDto(student)
        );
        return StudentMapper.toDomain(res.data);
    }

    async delete(id: number): Promise<void> {
        await ApiInstance.delete(`/students/${id}`);
    }
}
