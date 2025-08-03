import React, { useState, useRef } from 'react';
import axios from 'axios';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import UserNavbar from './UserNavbar';

const Shipment = () => {
    const apiURL = import.meta.env.VITE_BACKEND_URL;
    const [files, setFiles] = useState({
        letterOfCredit: null,
        packingList: null,
        invoice: null,
        purchaseOrder: null,
    });
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [touched, setTouched] = useState({});
    const inputRefs = {
        letterOfCredit: useRef(),
        packingList: useRef(),
        invoice: useRef(),
        purchaseOrder: useRef(),    
    };

    const handleChange = (e, fileName) => {
        setFiles({ ...files, [fileName]: e.target.files[0] });
        setTouched((prev) => ({ ...prev, [fileName]: true }));
    };

    const handleDrop = (e, fileName) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFiles({ ...files, [fileName]: e.dataTransfer.files[0] });
            setTouched((prev) => ({ ...prev, [fileName]: true }));
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleBrowse = (fileName) => {
        inputRefs[fileName].current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        setError("");
        setSuccess(false);
        const formData = new FormData();
        formData.append('letterOfCredit', files.letterOfCredit);
        formData.append('packingList', files.packingList);
        formData.append('invoice', files.invoice);
        formData.append('purchaseOrder', files.purchaseOrder);
        try {
            await axios.post(`${apiURL}/shipment/uploads`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setSuccess(true);
        } catch (err) {
            setError("Upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const fileFields = [
        { key: 'letterOfCredit', label: 'Letter of Credit' },
        { key: 'packingList', label: 'Packing List' },
        { key: 'invoice', label: 'Invoice' },
        { key: 'purchaseOrder', label: 'Purchase Order' },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-2 font-serif">
            <UserNavbar/>
            <h1 className="text-2xl font-light tracking-wide text-black mb-2 text-center mt-8 underline underline-offset-4 ">Upload your shipment details and required documents to get started quickly and securely.</h1>
            <div className="w-full max-w-2xl bg-white rounded-md shadow-md border-2 border-gray-300 p-8 font-serif mt-8">
                <h1 className="text-4xl font-light tracking-wide text-black mb-2 text-center">Start a New Shipment</h1>
                <p className="text-gray-500 text-center mb-8">Upload all required documents to begin your shipment process.</p>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {fileFields.map(({ key, label }) => (
                            <div key={key}>
                                <label className="block text-lg font-light underline tracking-wide mb-2 text-gray-700">{label}</label>
                                <div
                                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 bg-gray-50 transition-all duration-200 cursor-pointer ${files[key] ? 'border-blue-400 bg-blue-50' : 'border-gray-300'} ${touched[key] && !files[key] ? 'border-red-400 bg-red-50' : ''}`}
                                    onDrop={(e) => handleDrop(e, key)}
                                    onDragOver={handleDragOver}
                                    onClick={() => handleBrowse(key)}
                                >
                                    <input
                                        type="file"
                                        ref={inputRefs[key]}
                                        className="hidden"
                                        onChange={(e) => handleChange(e, key)}
                                        accept="application/pdf,image/*"
                                    />
                                    <AiOutlineCloudUpload className="text-4xl text-blue-400 mb-2" />
                                    {files[key] ? (
                                        <span className="text-green-700 font-medium truncate max-w-[150px]">{files[key].name}</span>
                                    ) : (
                                        <span className="text-gray-400">Drag & drop or click to upload</span>
                                    )}
                                </div>
                                {touched[key] && !files[key] && (
                                    <span className="text-xs text-red-500">This document is required.</span>
                                )}
                            </div>
                        ))}
                    </div>
                    {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                    {success && <div className="text-green-600 text-center mb-4">Shipment started and files uploaded successfully!</div>}
                    <button
                        type="submit"
                        className="w-full py-3 mt-2 rounded-xl bg-blue-600 text-white font-bold text-lg shadow hover:bg-blue-700 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={uploading || Object.values(files).some(f => !f)}
                    >
                        {uploading ? 'Uploading...' : 'Start Shipment'}
                    </button>
                </form>
            </div>
        </div>
    );
}


export default Shipment;
