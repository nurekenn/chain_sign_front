import React, { useState, useEffect } from 'react';
// Assuming 'Upload' is an icon component like react-icons/faUpload or a custom SVG
// import { FaUpload as Upload } from 'react-icons/fa'; // Example icon

// Define your document types
const documentTypes = [
    {
        value: '',
        label: 'Belge Türü Seçin...', // Select Document Type...
        accept: '', // Initially allow nothing or a broad default if preferred
        extensionsDisplay: 'Lütfen bir belge türü seçin', // Please select a document type
    },
    {
        value: 'pdf',
        label: 'PDF Belgesi', // PDF Document
        accept: 'application/pdf,.pdf',
        extensionsDisplay: 'PDF',
    },
    {
        value: 'word',
        label: 'Word Belgesi', // Word Document
        accept: '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        extensionsDisplay: 'DOC, DOCX',
    },
    {
        value: 'excel',
        label: 'Excel Dosyası', // Excel File
        accept: '.xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        extensionsDisplay: 'XLS, XLSX',
    },
    {
        value: 'image',
        label: 'Resim Dosyası (PNG, JPG)', // Image File
        accept: 'image/png,image/jpeg,.png,.jpg,.jpeg',
        extensionsDisplay: 'PNG, JPG, JPEG',
    },
    {
        value: 'mixed',
        label: 'Genel Doküman (PDF, Word, Resim)', // General Document
        accept: 'application/pdf,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/png,image/jpeg,.png,.jpg,.jpeg',
        extensionsDisplay: 'PDF, DOC, DOCX, PNG, JPG',
    }
];

// Helper to get current type config
const getCurrentTypeConfig = (value) => {
    return documentTypes.find(dt => dt.value === value) || documentTypes[0];
};

// --- Your Modal Component ---
// Assuming setShowCreateModal and handleSubmit are passed as props or defined in a parent
// function CreateDocumentModal({ setShowCreateModal, onSubmit }) { // Example props
function CreateDocumentModal({ setShowCreateModal }) { // Using the provided props structure

    const [docTitle, setDocTitle] = useState('');
    const [selectedDocType, setSelectedDocType] = useState(documentTypes[0].value); // Default to 'Select...'
    const [docFile, setDocFile] = useState(null);
    const [currentTypeConfig, setCurrentTypeConfig] = useState(getCurrentTypeConfig(selectedDocType));

    // Effect to update config when selectedDocType changes
    useEffect(() => {
        setCurrentTypeConfig(getCurrentTypeConfig(selectedDocType));
        setDocFile(null); // Reset file if type changes
        // If you have a ref to the file input, you might want to reset its value too:
        // fileInputRef.current.value = null;
    }, [selectedDocType]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setDocFile(file);
            console.log(file); // For debugging
        } else {
            setDocFile(null);
        }
    };

    const handleSubmit = () => {
        // Basic validation
        if (!docTitle.trim()) {
            alert('Lütfen belge başlığını girin.');
            return;
        }
        if (!selectedDocType) {
            alert('Lütfen belge türünü seçin.');
            return;
        }
        if (!docFile) {
            alert('Lütfen bir dosya yükleyin.');
            return;
        }
        console.log('Submitting:', { title: docTitle, type: selectedDocType, file: docFile });
        // Call the actual submit logic, e.g., onSubmit({ title: docTitle, type: selectedDocType, file: docFile });
        // Then close modal
        // setShowCreateModal(false);
        alert('Belge gönderme simülasyonu yapıldı. Sonraki adım: İmzacıları Seç (konsolu kontrol edin).');
        // setShowCreateModal(false); // Keep modal open for demonstration
    };

    // Ref for file input if you need to programmatically clear it
    // const fileInputRef = React.useRef(null);

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h3 className="text-lg font-medium">Yeni Belge Oluştur</h3>
                    <button
                        type="button"
                        onClick={() => setShowCreateModal(false)}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6">
                    {/* Document Title */}
                    <div className="mb-4">
                        <label htmlFor="docTitle" className="block text-sm font-medium text-gray-700 mb-1">
                            Belge Başlığı
                        </label>
                        <input
                            id="docTitle"
                            type="text"
                            value={docTitle}
                            onChange={(e) => setDocTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Belge için başlık girin"
                        />
                    </div>

                    {/* Document Type Selection */}
                    <div className="mb-4">
                        <label htmlFor="docType" className="block text-sm font-medium text-gray-700 mb-1">
                            Belge Türü
                        </label>
                        <select
                            id="docType"
                            value={selectedDocType}
                            onChange={(e) => setSelectedDocType(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            {documentTypes.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* File Upload */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Belge Yükle
                        </label>
                        <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${selectedDocType ? 'border-gray-300' : 'border-gray-200 bg-gray-50'} border-dashed rounded-md`}>
                            <div className="space-y-1 text-center">
                                <Upload className={`mx-auto h-12 w-12 ${selectedDocType ? 'text-gray-400' : 'text-gray-300'}`} />
                                <div className="flex text-sm text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className={`relative cursor-pointer bg-white rounded-md font-medium ${selectedDocType ? 'text-indigo-600 hover:text-indigo-500' : 'text-gray-400 cursor-not-allowed'} focus-within:outline-none`}
                                    >
                                        <span>{docFile ? docFile.name : 'Dosya yükle'}</span>
                                        <input
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            // ref={fileInputRef} // Assign ref if you need to clear it
                                            className="sr-only"
                                            accept={currentTypeConfig.accept}
                                            onChange={handleFileChange}
                                            disabled={!selectedDocType} // Disable if no type is selected
                                        />
                                    </label>
                                    {selectedDocType && <p className="pl-1">veya sürükle bırak</p>}
                                </div>
                                <p className={`text-xs ${selectedDocType ? 'text-gray-500' : 'text-gray-400'}`}>
                                    {currentTypeConfig.extensionsDisplay}
                                </p>
                                {!selectedDocType && (
                                     <p className="text-xs text-red-500 pt-1">Dosya yüklemek için önce belge türünü seçin.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Submit or Cancel */}
                    <div className="pt-4 border-t flex justify-end">
                        <button
                            type="button"
                            onClick={() => setShowCreateModal(false)}
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3"
                        >
                            İptal
                        </button>
                        <button
                            type="button"
                            className="btn_choose_signer py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white" // Assuming btn_choose_signer has background color
                            onClick={handleSubmit}
                        >
                            Sonraki: İmzacıları Seç
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateDocumentModal; // So you can use it elsewhere