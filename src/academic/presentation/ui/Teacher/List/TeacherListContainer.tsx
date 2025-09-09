import { ListTeachersCommand, ListTeachersUseCase } from "@/academic/application/usecases/teacher/ListTeachersUseCase"
import { TeacherListPresenter } from "./TeacherListPresenter"

import { 
    useInjection
} from 'inversify-react'
import { TEACHER_SYMBOLS } from "@/academic/domain/symbols/Teacher"
import { useCallback, useEffect } from "react"
export const TeacherListContainer = () => {

    const listUsecase = useInjection<ListTeachersUseCase>(TEACHER_SYMBOLS.LIST_USE_CASE);

     

    const fetchTeachers = useCallback(async()=>{
        const res = await listUsecase.execute(new ListTeachersCommand(1,10));
        console.log(res);
    },[])

    useEffect(()=>{
        fetchTeachers();
    },[fetchTeachers])

    return <TeacherListPresenter
        teachers={[]}
        error={null}
        loading={false}
        onAddTeacher={()=>{}}
        onSearchChange={()=>{}}
        searchTerm=""
    />

}