import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Input} from "@/shared/ui/Input";

interface Props {
    open: boolean;
    onClose: (success?: boolean) => void;
}

export const CreateProduct: React.FC<Props> = ({ open, onClose }) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onClose(true);
    };

    return (
        <Dialog open={open} onClose={() => onClose()} fullWidth>
            <DialogTitle>Добавление товара</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} id="subscription-form">
                    <Input type="text" label="Наименование" name="title" />
                    <Input type="text" label="Цена" name="price" />
                    <Input type="text" label="Вендор" name="brand" />
                    <Input type="text" label="Артикул" name="scu" />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()}>Cancel</Button>
                <Button type="submit" form="subscription-form">
                    Создать
                </Button>
            </DialogActions>
        </Dialog>
    );
}