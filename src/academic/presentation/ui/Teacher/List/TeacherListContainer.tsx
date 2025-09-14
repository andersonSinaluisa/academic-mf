import { ListTeachersCommand, ListTeachersUseCase } from "@/academic/application/usecases/teacher/ListTeachersUseCase"
import { TeacherListPresenter } from "./TeacherListPresenter"
import { 
    useInjection
} from 'inversify-react'
import { TEACHER_SYMBOLS } from "@/academic/domain/symbols/Teacher"
import { useCallback, useEffect, useState } from "react"
import { Page } from "@/lib/utils"
import { Teacher } from "@/academic/domain/entities/Teacher"
import { toast } from "@/hooks/use-toast"
import { useNavigate, useSearchParams } from "react-router"
export const TeacherListContainer = () => {


    const navigation = useNavigate()
    const [searchParams] = useSearchParams();


    const page = Number(searchParams.get("page")) || 1;
    const filter = searchParams.get("filter") || "";


    const listUsecase = useInjection<ListTeachersUseCase>(TEACHER_SYMBOLS.LIST_USE_CASE);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Page<Teacher>>({
        content: [],
        page: 0,
        size: 10,
        total: 0,
        totalPage:0
    });

    


    const fetchTeachers = useCallback(async () => {
        setLoading(true);

        const res = await listUsecase.execute(new ListTeachersCommand(page, 10, filter));
        res.ifRight((teachers) => {
            if (!teachers) return;
            setData(teachers);
        }).ifLeft((errors) => {
                const msg = errors.map((e) => e.message).join(", ");
                toast({
                    title: "Error",
                    description: msg,
                    variant: "destructive",
                });
            })
            

        setLoading(false);
    }, [listUsecase, page, filter]);

    useEffect(()=>{
        fetchTeachers();
    },[fetchTeachers])

    const handleAddTeacher = () => {
        navigation("/docentes/nuevo")
    }

    const handleSearch = (term: string) => {
        navigation({
            pathname: "/docentes",
            search: `?page=1&filter=${term}`
        });
    }

    const handleEditTeacher = (id: string) => {
        navigation(`/docentes/${id}`);
    }

    return <TeacherListPresenter
        teachers={data}
        error={null}
        loading={loading}
        onEditTeacher={handleEditTeacher}
        onAddTeacher={handleAddTeacher}
        onSearchChange={handleSearch}
        searchTerm={filter}
    />

}