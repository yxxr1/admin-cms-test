import {useCallback, useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import type {GridColDef} from "@mui/x-data-grid";
import {IconButton, Snackbar} from "@mui/material";
import {Button} from "@/shared/ui/Button";
import {debounce} from "@/shared/helpers/debounce";
import {useProductsTableStore} from "./store/form";
import type {Product} from "./types";
import {getProducts} from "./api/products";
import {CreateProduct} from "./dialogs/createProduct";
import refreshIconUrl from "./assets/refresh.svg";

const columns: GridColDef<Product>[] = [
    {
        field: 'title',
        headerName: 'Наименование',
        width: 400,
        renderCell: (value) => (
            <div className="flex items-center h-full">
                <img className="h-10 w-10 rounded-md mr-4" src={value.row.thumbnail} alt={value.row.id.toString()} />
                <div className="flex flex-col leading-none justify-center h-full">
                    <b className="mb-1">{value.value}</b>
                    <span className="text-gray-400">{value.row.category}</span>
                </div>
            </div>
        )
    },
    { field: 'brand', headerName: 'Вендор', width: 220, renderCell: (value) => <b>{value.value}</b> },
    { field: 'sku', headerName: 'Артикул', width: 180 },
    {
        field: 'rating',
        headerName: 'Оценка',
        type: 'number',
        width: 110,
        renderCell: (value) => (
            value.value < 3.5 ? <><span className="text-red-500">{value.value}</span>/5</> : `${value.value}/5`
        ),
    },
    {
        field: 'price',
        headerName: 'Цена, ₽',
        type: 'number',
        width: 160,
        renderCell: (value) => {
            const [a, b] = value.value.toString().split('.');

            return <>{a}<span className="text-gray-400 text-xs">,{b}</span></>
        },
    }
];

export const Products = () => {
    const { products, setProducts, pagination, changePagination, productsCount, setProductsCount, sort, changeSort, search, setSearch, isLoading, toggleIsLoading } = useProductsTableStore();

    const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

    const loadData = useCallback(async () => {
        try {
            toggleIsLoading();
            const data = await getProducts({
                query: search,
                offset: pagination.page * pagination.pageSize,
                limit: pagination.pageSize,
                sortBy: sort[0]?.field,
                order: sort[0]?.sort
            });
            setProducts(data.products);
            setProductsCount(data.total);
        } catch (e) {
            setNotificationMessage((e as Error).message);
        } finally {
            toggleIsLoading();
        }
    }, [pagination, search, sort]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const onSearch = useCallback(debounce(setSearch, 1000), [setSearch]);
    const [isCreationFormOpen, setIsCreationFormOpen] = useState(false);

    return (
        <div>
            <div className="px-32 py-6 flex bg-white my-5">
                <h1 className="font-bold text-2xl absolute left-6">Товары</h1>
                <input
                    className={`h-10 w-256 border-1 rounded-md py-1 px-3 outline-none border-gray-200 focus:border-gray-400 bg-gray-100 m-auto`}
                    placeholder="Найти"
                    onChange={(e) => onSearch(e.target.value)}
                />
                <div></div>
            </div>
            <div className="bg-white px-6 pt-8">
                <div className="flex justify-between mb-8">
                    <h2 className="font-bold text-xl">Все позиции</h2>
                    <div className="flex items-center">
                        <IconButton onClick={loadData}>
                            <img src={refreshIconUrl} alt="refresh" />
                        </IconButton>
                        <Button onClick={() => setIsCreationFormOpen(true)}>Добавить</Button>
                    </div>
                </div>
                <DataGrid
                    rows={products}
                    columns={columns}
                    loading={isLoading}
                    paginationMode="server"
                    rowCount={productsCount}
                    paginationModel={pagination}
                    onPaginationModelChange={changePagination}
                    sortModel={sort}
                    onSortModelChange={changeSort}
                    checkboxSelection
                    sx={{ border: 0 }}
                />
            </div>
            <CreateProduct
                open={isCreationFormOpen}
                onClose={(success) => {
                    setIsCreationFormOpen(false);

                    if (success) {
                        setNotificationMessage('Товар создан');
                    }
                }}
            />
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={notificationMessage !== null}
                autoHideDuration={3000}
                onClose={() => setNotificationMessage(null)}
                message={notificationMessage}
            />
        </div>
    )
}
