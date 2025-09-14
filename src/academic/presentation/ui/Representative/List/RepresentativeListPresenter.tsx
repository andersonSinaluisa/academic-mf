"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus } from "lucide-react";
import { Representative } from "@/academic/domain/entities/Representative";
import { Skeleton } from "@/components/ui/skeleton";

interface RepresentativeListPresenterProps {
    representatives: Representative[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
    onSearchChange: (term: string) => void;
    onAddRepresentative: () => void;
}

export function RepresentativeListPresenter({
    representatives,
    loading,
    error,
    searchTerm,
    onSearchChange,
    onAddRepresentative,
}: RepresentativeListPresenterProps) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold">Representantes</CardTitle>
                        <Button onClick={onAddRepresentative} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Agregar Representante
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2 mb-6">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar representantes..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {loading && <Skeleton className="h-24 w-full col-span-full" />}
                        {error && (
                            <div className="text-destructive text-center col-span-full">{error}</div>
                        )}
                        {representatives.map((rep) => (
                            <Card key={rep.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage
                                                src="/placeholder.svg"
                                                alt={`${rep.firstName} ${rep.lastName}`}
                                            />
                                            <AvatarFallback>
                                                {rep.firstName[0]}
                                                {rep.lastName[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-sm truncate">
                                                {rep.firstName} {rep.lastName}
                                            </h3>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {representatives.length === 0 && !loading && !error && (
                        <div className="text-center py-8 text-muted-foreground">
                            No se encontraron representantes
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

