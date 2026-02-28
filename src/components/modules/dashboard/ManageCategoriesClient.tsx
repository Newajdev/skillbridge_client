"use client";

import React, { useState } from 'react';
import { TopDesign } from "@/components/ui/topDesign";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Layers, Plus, Pencil, Trash2, Search, Loader2, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { createCategoryAction, updateCategoryAction, deleteCategoryAction } from "@/actions/admin.actions";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface ManageCategoriesClientProps {
    initialCategories: any[];
}

export default function ManageCategoriesClient({ initialCategories }: ManageCategoriesClientProps) {
    const [categories, setCategories] = useState(initialCategories);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [categoryName, setCategoryName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const filteredCategories = categories.filter((cat: any) =>
        cat.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreate = async () => {
        if (!categoryName.trim()) {
            toast.error("Category name is required");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await createCategoryAction(categoryName);
            if (!res.error) {
                toast.success("Category created successfully");
                setCategories([...categories, res.data]);
                setIsAddOpen(false);
                setCategoryName("");
            } else {
                toast.error(res.error.message || "Failed to create category");
            }
        } catch (error) {
            toast.error("Unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdate = async () => {
        if (!categoryName.trim()) {
            toast.error("Category name is required");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await updateCategoryAction(selectedCategory.id, categoryName);
            if (!res.error) {
                toast.success("Category updated successfully");
                setCategories(categories.map((c: any) => c.id === selectedCategory.id ? res.data : c));
                setIsEditOpen(false);
                setSelectedCategory(null);
                setCategoryName("");
            } else {
                toast.error(res.error.message || "Failed to update category");
            }
        } catch (error) {
            toast.error("Unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        setIsSubmitting(true);
        try {
            const res = await deleteCategoryAction(selectedCategory.id);
            if (!res.error) {
                toast.success("Category deleted successfully");
                setCategories(categories.filter((c: any) => c.id !== selectedCategory.id));
                setIsDeleteOpen(false);
                setSelectedCategory(null);
            } else {
                toast.error(res.error.message || "Failed to delete category");
            }
        } catch (error) {
            toast.error("Unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    const openEdit = (category: any) => {
        setSelectedCategory(category);
        setCategoryName(category.name);
        setIsEditOpen(true);
    };

    const openDelete = (category: any) => {
        setSelectedCategory(category);
        setIsDeleteOpen(true);
    };

    const openAdd = () => {
        setCategoryName("");
        setIsAddOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc]/50">
            <TopDesign />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 pb-20 relative z-20 space-y-8 animate-in fade-in duration-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-[#173e72] text-white rounded-[2rem] shadow-2xl shadow-blue-900/20">
                            <Layers className="h-8 w-8" />
                        </div>
                        <div className="text-white">
                            <h1 className="text-3xl font-black tracking-tight">Category Ontology</h1>
                            <p className="text-white/60 font-medium">Manage subject classifications.</p>
                        </div>
                    </div>
                </div>

                <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-2xl rounded-[3rem] overflow-hidden">
                    <CardHeader className="p-10 pb-0 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="relative w-full md:max-w-md group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#173e72] transition-colors" />
                            <Input
                                placeholder="Search dimensions..."
                                className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all shadow-sm font-bold text-[#173e72]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button
                            className="bg-[#173e72] hover:bg-black text-white rounded-2xl h-14 font-black px-8 shadow-xl transition-all active:scale-95 flex items-center gap-2"
                            onClick={openAdd}
                        >
                            <Plus className="h-5 w-5" /> DEFINE NEW CATEGORY
                        </Button>
                    </CardHeader>
                    <CardContent className="p-10">
                        <div className="rounded-[2.5rem] border border-slate-50 overflow-hidden shadow-sm">
                            <Table>
                                <TableHeader className="bg-slate-50/50">
                                    <TableRow className="border-slate-100">
                                        <TableHead className="font-black text-[#173e72] pl-8 py-5 uppercase tracking-[0.2em] text-[10px]">Taxonomy Identifier</TableHead>
                                        <TableHead className="font-black text-[#173e72] py-5 uppercase tracking-[0.2em] text-[10px]">Creation Vector</TableHead>
                                        <TableHead className="text-right pr-8 py-5 uppercase tracking-[0.2em] text-[10px]">Interactions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredCategories.map((cat: any) => (
                                        <TableRow key={cat.id} className="group hover:bg-white transition-all duration-300 border-slate-50">
                                            <TableCell className="pl-8 py-6">
                                                <span className="font-black text-[#173e72] text-lg leading-tight">{cat.name}</span>
                                            </TableCell>
                                            <TableCell className="text-sm font-bold text-slate-500">
                                                {new Date(cat.createdAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right pr-8">
                                                <div className="flex items-center justify-end gap-3">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-10 w-10 rounded-full hover:bg-slate-100 text-slate-400 group/edit"
                                                        onClick={() => openEdit(cat)}
                                                    >
                                                        <Pencil className="h-4 w-4 group-hover/edit:text-[#173e72]" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-10 w-10 rounded-full hover:bg-rose-50 text-rose-500 hover:text-rose-600"
                                                        onClick={() => openDelete(cat)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {filteredCategories.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center py-10 font-bold text-slate-400">
                                                No specific taxonomy defined.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ADD CATEGORY MODAL */}
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogContent className="rounded-[2.5rem] border-none shadow-[0_0_100px_rgba(0,0,0,0.1)] p-8 max-w-md bg-white text-[#173e72]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black tracking-tighter uppercase">Define Taxonomy</DialogTitle>
                        <DialogDescription className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">
                            Initialize a new learning category
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-6 space-y-4">
                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Nomenclature</Label>
                        <Input
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="e.g. Advanced Physics"
                            className="h-14 font-black text-[#173e72] text-lg bg-slate-50/50 border-slate-100 rounded-2xl"
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={handleCreate}
                            disabled={isSubmitting}
                            className="w-full bg-[#173e72] hover:bg-black text-white h-14 rounded-2xl font-black tracking-widest uppercase transition-all shadow-xl"
                        >
                            {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Commit Category"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* EDIT CATEGORY MODAL */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="rounded-[2.5rem] border-none shadow-[0_0_100px_rgba(0,0,0,0.1)] p-8 max-w-md bg-white text-[#173e72]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black tracking-tighter uppercase">Modify Nomenclature</DialogTitle>
                        <DialogDescription className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">
                            Update tracking identifier
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-6 space-y-4">
                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Nomenclature</Label>
                        <Input
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="e.g. Advanced Physics"
                            className="h-14 font-black text-[#173e72] text-lg bg-slate-50/50 border-slate-100 rounded-2xl"
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={handleUpdate}
                            disabled={isSubmitting}
                            className="w-full bg-[#173e72] hover:bg-black text-white h-14 rounded-2xl font-black tracking-widest uppercase transition-all shadow-xl"
                        >
                            {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Authorize Modification"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* DELETE CATEGORY MODAL */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="rounded-[2.5rem] border-none shadow-[0_0_100px_rgba(0,0,0,0.1)] p-8 max-w-md bg-white text-[#173e72]">
                    <div className="mx-auto w-16 h-16 bg-rose-50 text-rose-500 rounded-[1.5rem] flex items-center justify-center mb-6">
                        <AlertTriangle className="h-8 w-8" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black tracking-tighter text-center uppercase">Confirm Termination</DialogTitle>
                    </DialogHeader>
                    <div className="text-center py-6">
                        <p className="text-sm font-bold text-slate-500">
                            Delete category <span className="font-black text-[#173e72]">"{selectedCategory?.name}"</span>? Proceed with caution, operation is non-reversible.
                        </p>
                    </div>
                    <DialogFooter className="flex flex-col sm:flex-row gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteOpen(false)}
                            className="flex-1 h-14 rounded-2xl font-black tracking-widest border-slate-200 text-slate-400 hover:text-slate-500"
                        >
                            ABORT
                        </Button>
                        <Button
                            onClick={handleDelete}
                            disabled={isSubmitting}
                            className="flex-1 bg-rose-500 hover:bg-rose-600 text-white h-14 rounded-2xl font-black tracking-widest uppercase transition-all shadow-rose-200 shadow-xl"
                        >
                            {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "TERMINATE"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
}
