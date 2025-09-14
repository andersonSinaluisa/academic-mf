"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, CalendarX } from "lucide-react";
import { Meeting } from "@/academic/domain/entities/Meeting";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Page } from "@/lib/utils";

interface Props {
  meetings: Page<Meeting>;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  onSearchChange: (t: string) => void;
  onAddMeeting: () => void;
}

export const MeetingListPresenter = ({ meetings, loading, error, searchTerm, onSearchChange, onAddMeeting }: Props) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Reuniones</CardTitle>
          <Button onClick={onAddMeeting} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Nueva
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-6">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por tema"
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading && <Skeleton role="status" className="h-24 w-full col-span-full" />}
          {error && <div className="text-destructive text-center col-span-full">{error}</div>}
          {meetings.content.map(m => (
            <Card key={m.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <p className="font-semibold">{m.topic}</p>
                <p className="text-sm text-muted-foreground">{m.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {meetings.content.length === 0 && !loading && !error && (
          <div className="col-span-3 text-center py-8 text-muted-foreground w-full flex flex-col items-center space-y-4">
            <CalendarX className="h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">
              {searchTerm
                ? `No encontramos resultados para "${searchTerm}".`
                : "No hay reuniones registradas aún."}
            </p>
            {!searchTerm && <Button onClick={onAddMeeting}>Nueva</Button>}
          </div>
        )}

        <Pagination className="col-span-full justify-center">
          <PaginationPrevious className="bg-background" />
          {meetings.totalPage > 1 &&
            Array.from({ length: meetings.totalPage }).map((_, index) => (
              <PaginationLink
                key={`page-${index + 1}`}
                href={`/reuniones?page=${index + 1}${searchTerm ? `&filter=${searchTerm}` : ""}`}
                isActive={index === meetings.page}
                className="bg-background"
              >
                {index + 1}
              </PaginationLink>
            ))}
          <PaginationNext className="bg-background" />
        </Pagination>
        <div className="col-span-full text-center text-sm text-muted-foreground">
          Página {meetings.page} de {meetings.totalPage} - Total de reuniones: {meetings.total}
        </div>
      </CardContent>
    </Card>
  </div>
);
