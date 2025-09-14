"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Meeting } from "@/academic/domain/entities/Meeting";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  meetings: Meeting[];
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
          <Input placeholder="Buscar por tema" value={searchTerm} onChange={e => onSearchChange(e.target.value)} className="max-w-sm" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading && <Skeleton className="h-24 w-full col-span-full" />}
          {error && <div className="text-destructive text-center col-span-full">{error}</div>}
          {meetings.map(m => (
            <Card key={m.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <p className="font-semibold">{m.topic}</p>
                <p className="text-sm text-muted-foreground">{m.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {meetings.length === 0 && !loading && !error && <div className="text-center py-8 text-muted-foreground">No se encontraron reuniones</div>}
      </CardContent>
    </Card>
  </div>
);
