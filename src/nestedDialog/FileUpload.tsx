import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface FormValues {
    files: File[];
}

// Schema validation với Yup và custom test cho file PDF và độ dài tên file
const schema = Yup.object().shape({
    files: Yup.mixed<File[]>()
        .required("Please upload at least one PDF file")
        .test("fileType", "Only PDF files are allowed", (value) => {
            return (value ?? []).every((file: File) => file.type === 'application/pdf');
        })
        .test("fileCount", "You can only upload up to 5 files", (value) => {
            return (value ?? []).length <= 5;
        })
        .test("fileNameLength", "File name must be less than 255 characters", (value) => {
            return (value ?? []).every((file: File) => file.name.length <= 255);
        }),
});

const FileUpload: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // State để lưu danh sách file đã chọn
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    // Xử lý khi chọn file
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filesArray = Array.from(event.target.files || []);
        setSelectedFiles(filesArray);
    };

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log("Uploaded files:", selectedFiles);
    };

    // Xóa một file đã chọn
    const handleDelete = (indexToDelete: number) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToDelete));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="file"
                {...register("files")}
                multiple
                accept="application/pdf"
                onChange={handleFileChange} // Gọi hàm xử lý file thay đổi
            />
            {/* Hiển thị lỗi */}
            {errors.files && <p style={{ color: 'red' }}>{errors.files.message}</p>}

            {/* Hiển thị danh sách file đã chọn */}
            {selectedFiles.length > 0 && (
                <ul>
                    {selectedFiles.map((file, index) => (
                        <li key={index}>
                            {file.name} - {(file.size / 1024).toFixed(2)} KB
                            <button type="button" onClick={() => handleDelete(index)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <button type="submit">Upload</button>
        </form>
    );
};

export default FileUpload;
