import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Grid,
    Avatar,
    styled
} from '@mui/material';

export interface CustomerInfoDialogProps {
    open: boolean;
    onClose: () => void;
    customer: {
        id: number;
        firstName: string;
        lastName: string;
        maidenName: string;
        age: number;
        gender: string;
        email: string;
        phone: string;
        username: string;
        birthDate: string;
        image: string;
        bloodGroup: string;
        height: number;
        weight: number;
        eyeColor: string;
        hair: {
            color: string;
            type: string;
        };
        ip: string;
        address: {
            address: string;
            city: string;
            state: string;
            stateCode: string;
            postalCode: string;
            coordinates: {
                lat: number;
                lng: number;
            };
            country: string;
        };
        macAddress: string;
        university: string;
        bank: {
            cardExpire: string;
            cardNumber: string;
            cardType: string;
            currency: string;
            iban: string;
        };
        company: {
            department: string;
            name: string;
            title: string;
            address: {
                address: string;
                city: string;
                state: string;
                stateCode: string;
                postalCode: string;
                coordinates: {
                    lat: number;
                    lng: number;
                };
                country: string;
            };
        };
        ein: string;
        ssn: string;
        userAgent: string;
        crypto: {
            coin: string;
            wallet: string;
            network: string;
        };
        role: string;
    }  | null;
}

const CustomerInfoDialog: React.FC<CustomerInfoDialogProps> = ({ open, onClose, customer }) => {
    if (!customer) return null;
    return (
        <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Thông tin khách hàng</DialogTitle>
            <StyledDialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Avatar
                            src={customer?.image}
                            alt={`${customer?.firstName} ${customer?.lastName}`}
                            sx={{ width: 128, height: 128 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <StyledDialogContentText>
                            <strong>Tên:</strong> {customer?.firstName} {customer?.lastName}
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                            <strong>Tên thời con gái:</strong> {customer?.maidenName}
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                            <strong>Tuổi:</strong> {customer?.age}
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                            <strong>Giới tính:</strong> {customer?.gender}
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                            <strong>Email:</strong> {customer?.email}
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                            <strong>Số điện thoại:</strong> {customer?.phone}
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                            <strong>Tên đăng nhập:</strong> {customer?.username}
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                            <strong>Ngày sinh:</strong>{' '}
                            {new Date(customer?.birthDate).toLocaleDateString() || '123'}
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                            <strong>Nhóm máu:</strong> {customer?.bloodGroup}
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                            <strong>Chiều cao:</strong> {customer?.height} cm
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                            <strong>Cân nặng:</strong> {customer?.weight} kg
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                            <strong>Màu mắt:</strong> {customer?.eyeColor}
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                            <strong>Màu tóc:</strong> {customer?.hair.color}
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                            <strong>Kiểu tóc:</strong> {customer?.hair.type}
                        </StyledDialogContentText>
                    </Grid>
                    <Grid item xs={12}>
                        <StyledDialogContentText>
                            <strong>Địa chỉ:</strong> {customer?.address.address}, {customer?.address.city},{' '}
                            {customer?.address.state}, {customer?.address.country} (
                            {customer?.address.postalCode})
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                            <strong>IP:</strong> {customer?.ip}
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                            <strong>MAC Address:</strong> {customer?.macAddress}
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                            <strong>Đại học:</strong> {customer?.university}
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                            <strong>Công ty:</strong> {customer?.company.name} ({customer?.company.department}{' '}
                            - {customer?.company.title})
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                            <strong>Địa chỉ công ty:</strong> {customer?.company.address.address},{' '}
                            {customer?.company.address.city}, {customer?.company.address.state},{' '}
                            {customer?.company.address.country} ({customer?.company.address.postalCode})
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                            <strong>Ngân hàng:</strong> {customer?.bank.cardType} -{' '}
                            {customer?.bank.cardNumber} (Hết hạn: {customer?.bank.cardExpire})
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                            <strong>IBAN:</strong> {customer?.bank.iban}
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                            <strong>Tiền điện tử:</strong> {customer?.crypto.coin} - {customer?.crypto.wallet}{' '}
                            ({customer?.crypto.network})
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                            <strong>SSN:</strong> {customer?.ssn}
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                            <strong>Agent:</strong> {customer?.userAgent}
                        </StyledDialogContentText>
                        <StyledDialogContentText>
                            <strong>Vai trò:</strong> {customer?.role}
                        </StyledDialogContentText>
                    </Grid>
                </Grid>
            </StyledDialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Đóng
                </Button>
            </DialogActions>
        </StyledDialog>
    );
};

export default CustomerInfoDialog;

const StyledDialogContentText = styled(DialogContentText)({
    marginBottom: 20
});

const StyledDialog = styled(Dialog)({
    '& .MuiPaper-root': {
        border: '2px solid #FFFFFF',
        borderRadius: '30px',
        maxHeight: '80vh',
        maxWidth: '80vw',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

c
