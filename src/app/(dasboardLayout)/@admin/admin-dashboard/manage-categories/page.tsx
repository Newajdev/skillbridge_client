import React from 'react';
import ManageCategoriesClient from "@/components/modules/dashboard/ManageCategoriesClient";
import { categoryService } from "@/services/categories.service";

export default async function ManageCategoriesPage() {
    const { data: categoriesResponse } = await categoryService.getAllCategories();

    // API typically wraps actual data array in a `data` property
    const categoriesList = categoriesResponse?.data || categoriesResponse || [];

    return (
        <ManageCategoriesClient initialCategories={Array.isArray(categoriesList) ? categoriesList : []} />
    );
}
