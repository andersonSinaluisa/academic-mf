import { Container } from 'inversify';
import { TEACHER_SYMBOLS } from '../domain/symbols/Teacher';
import { TeacherRepositoryImpl } from '../infrastructure/api/TeacherRepositoryImpl';
import { TeacherService } from '../domain/services/TeacherService';


export const container = new Container()

container.bind(TEACHER_SYMBOLS.REPOSITORY).to(TeacherRepositoryImpl);
container.bind(TEACHER_SYMBOLS.SERVICE).to(TeacherService);


