import { useState, useEffect } from "react";
import './homepage.css';
//import Footer from "../../layouts/footer/footer";       
import { useNavigate } from 'react-router-dom';
import { 
    FileCheck, 
    Upload, 
    Clock, 
    CheckCircle, 
    Search, 
    AlertCircle, 
    FileText, 
    Users, 
    LogOut, 
    Plus,
    ChevronDown,
    Calendar,
    ArrowLeft,
    Download,
    Share2,
    Check,
    X
} from "lucide-react";

type Document = {
    id: string;
    title: string;
    owner: string;
    timestamp: string;
    status: string;
    currentSignatory: string;
    isPublic: boolean;
    ipfsHash: string;
    signatures: number;
    totalSignatories: number;
    signatories?: Signatory[];
};

type Signatory = {
    id: string;
    name: string;
    role: string;
    email: string;
    status: "pending" | "signed" | "rejected";
    signDate?: string;
};

type User = {
    name: string;
    email: string;
    role: string;
    signLevel: number;
    walletAddress: string;
    avatarUrl: string;
};

function Homepage() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [activeTab, setActiveTab] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

    useEffect(() => {
        const mockDocuments: Document[] = [
        {
            id: "DOC-001",
            title: "Q1 Performans Raporu 2025",
            owner: "Ahmet Yılmaz",
            timestamp: "14 Mayıs 2025",
            status: "waiting_signature",
            currentSignatory: "Mehmet Öz",
            isPublic: true,
            ipfsHash: "QmXR56jd...",
            signatures: 2,
            totalSignatories: 4,
            signatories: [
                { 
                    id: "SIG-001", 
                    name: "Ahmet Yılmaz", 
                    role: "Departman Müdürü", 
                    email: "ahmet@sirket.com", 
                    status: "signed" as "signed", 
                    signDate: "14 Mayıs 2025" 
                },
                { 
                    id: "SIG-002", 
                    name: "Ayşe Kaya", 
                    role: "İK Uzmanı", 
                    email: "ayse@sirket.com", 
                    status: "signed" as "signed", 
                    signDate: "15 Mayıs 2025" 
                },
                { 
                    id: "SIG-003", 
                    name: "Mehmet Öz", 
                    role: "Genel Müdür", 
                    email: "mehmet@sirket.com", 
                    status: "pending" as "pending" 
                },
                { 
                    id: "SIG-004", 
                    name: "Fatma Şahin", 
                    role: "Yönetim Kurulu Üyesi", 
                    email: "fatma@sirket.com", 
                    status: "pending" as "pending" 
                }
            ]
        },
        {
            id: "DOC-002",
            title: "İş Ortaklığı Anlaşması",
            owner: "Ayşe Demir",
            timestamp: "10 Mayıs 2025",
            status: "signed",
            currentSignatory: "",
            isPublic: false,
            ipfsHash: "QmTR86hg...",
            signatures: 5,
            totalSignatories: 5,
            signatories: [
                { 
                    id: "SIG-005", 
                    name: "Ayşe Demir", 
                    role: "Satış Direktörü", 
                    email: "ayse.demir@sirket.com", 
                    status: "signed" as "signed", 
                    signDate: "10 Mayıs 2025" 
                },
                { 
                    id: "SIG-006", 
                    name: "Murat Can", 
                    role: "Hukuk Müşaviri", 
                    email: "murat@sirket.com", 
                    status: "signed" as "signed", 
                    signDate: "11 Mayıs 2025" 
                },
                { 
                    id: "SIG-007", 
                    name: "Deniz Aslan", 
                    role: "Partner Şirket CEO", 
                    email: "deniz@partner.com", 
                    status: "signed" as "signed", 
                    signDate: "12 Mayıs 2025" 
                },
                { 
                    id: "SIG-008", 
                    name: "Selim Kara", 
                    role: "Partner Şirket CFO", 
                    email: "selim@partner.com", 
                    status: "signed" as "signed", 
                    signDate: "13 Mayıs 2025" 
                },
                { 
                    id: "SIG-009", 
                    name: "Elif Yaman", 
                    role: "Partner Şirket COO", 
                    email: "elif@partner.com", 
                    status: "signed" as "signed", 
                    signDate: "14 Mayıs 2025" 
                }
            ]
        },
        {
            id: "DOC-003",
            title: "Müşteri Hizmetleri Protokolü",
            owner: "Can Bilir",
            timestamp: "8 Mayıs 2025",
            status: "approved",
            currentSignatory: "",
            isPublic: true,
            ipfsHash: "QmYU78kl...",
            signatures: 3,
            totalSignatories: 3,
            signatories: [
                { 
                    id: "SIG-010", 
                    name: "Can Bilir", 
                    role: "Müşteri Hizmetleri Müdürü", 
                    email: "can@sirket.com", 
                    status: "signed" as "signed", 
                    signDate: "8 Mayıs 2025" 
                },
                { 
                    id: "SIG-011", 
                    name: "Selin Koç", 
                    role: "Operasyon Direktörü", 
                    email: "selin@sirket.com", 
                    status: "signed" as "signed", 
                    signDate: "9 Mayıs 2025" 
                },
                { 
                    id: "SIG-012", 
                    name: "Kerem Aksoy", 
                    role: "Genel Müdür", 
                    email: "kerem@sirket.com", 
                    status: "signed" as "signed", 
                    signDate: "10 Mayıs 2025" 
                }
            ]
        },
        {
            id: "DOC-004",
            title: "Tedarikçi Sözleşmesi 2025",
            owner: "Deniz Yıldız",
            timestamp: "5 Mayıs 2025",
            status: "created",
            currentSignatory: "Deniz Yıldız",
            isPublic: true,
            ipfsHash: "QmNB45rt...",
            signatures: 0,
            totalSignatories: 3,
            signatories: [
                { 
                    id: "SIG-013", 
                    name: "Deniz Yıldız", 
                    role: "Satınalma Müdürü", 
                    email: "deniz@sirket.com", 
                    status: "pending" as "pending"
                },
                { 
                    id: "SIG-014", 
                    name: "Ali Vural", 
                    role: "Finans Direktörü", 
                    email: "ali@sirket.com", 
                    status: "pending" as "pending"
                },
                { 
                    id: "SIG-015", 
                    name: "Canan Öztürk", 
                    role: "Tedarik Zinciri Yöneticisi", 
                    email: "canan@sirket.com", 
                    status: "pending" as "pending"
                }
            ]
        }
        ];
        setDocuments(mockDocuments);

        setCurrentUser({
        name: "Zeynep Kaya",
        email: "zeynep.kaya@sirket.com",
        role: "İK Direktörü",
        signLevel: 5,
        walletAddress: "0x1a2b...3c4d",
        avatarUrl: "/api/placeholder/40/40"
        });
    }, []);

    const connectWallet = () => {
        setIsWalletConnected(true);
    };

    const navigate = useNavigate(); 

    type DocumentStatus = "created" | "waiting_signature" | "signed" | "approved";

    const getStatusBadge = (status: DocumentStatus) => {
        switch (status) {
        case "created":
            return <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">Oluşturuldu</span>;
        case "waiting_signature":
            return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">İmza Bekliyor</span>;
        case "signed":
            return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">İmzalandı</span>;
        case "approved":
            return <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">Onaylandı</span>;
        default:
            return null;
        }
    };

    const getStatusIcon = (status: DocumentStatus) => {
        switch (status) {
        case "created":
            return <FileText className="h-5 w-5 text-gray-500" />;
        case "waiting_signature":
            return <Clock className="h-5 w-5 text-blue-500" />;
        case "signed":
            return <FileCheck className="h-5 w-5 text-green-500" />;
        case "approved":
            return <CheckCircle className="h-5 w-5 text-purple-500" />;
        default:
            return null;
        }
    };

    const getSignatoryStatusBadge = (status: "pending" | "signed" | "rejected") => {
        switch (status) {
        case "pending":
            return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Bekliyor</span>;
        case "signed":
            return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">İmzalandı</span>;
        case "rejected":
            return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">Reddedildi</span>;
        default:
            return null;
        }
    };

    const getSignatoryStatusIcon = (status: "pending" | "signed" | "rejected") => {
        switch (status) {
        case "pending":
            return <Clock className="h-4 w-4 text-yellow-500" />;
        case "signed":
            return <Check className="h-4 w-4 text-green-500" />;
        case "rejected":
            return <X className="h-4 w-4 text-red-500" />;
        default:
            return null;
        }
    };

    const filteredDocuments = documents.filter(doc => {
        if (activeTab !== "all" && doc.status !== activeTab) return false;
        
        if (searchTerm && !doc.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        
        return true;
    });

    const handleViewDocument = (document: Document) => {
        setSelectedDocument(document);
    };

    const handleSubmit = async () => {
        navigate(`/chooseSigner`);
    };

    const handleBackToList = () => {
        setSelectedDocument(null);
    };

    return (
        <div className="d-flex flex-column gap-5 h-screen bg-gray-50">
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="bg-white shadow">
            <div className="px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                    {selectedDocument ? 'Belge Görüntüleme' : 'Belge Yönetimi'}
                </h2>
                
                {!selectedDocument && (
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <input 
                            type="text" 
                            placeholder="Belge ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                        
                        <button 
                            type="button"
                            onClick={() => setShowCreateModal(true)}
                            className="new-btn text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Yeni Belge
                        </button>
                    </div>
                )}
            </div>

            {/* Tabs - only show when not viewing a document */}
            {!selectedDocument && (
                <div className="px-6 py-2 border-b flex space-x-8">
                    <button 
                    type="button" 
                    onClick={() => setActiveTab("all")}
                    className={`pb-2 text-sm font-medium ${activeTab === "all" ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-500 hover:text-gray-700"}`}
                    >
                    Tümü
                    </button>
                    <button 
                    type="button" 
                    onClick={() => setActiveTab("created")}
                    className={`pb-2 text-sm font-medium ${activeTab === "created" ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-500 hover:text-gray-700"}`}
                    >
                    Oluşturulan
                    </button>
                    <button 
                    type="button"
                    onClick={() => setActiveTab("waiting_signature")}
                    className={`pb-2 text-sm font-medium ${activeTab === "waiting_signature" ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-500 hover:text-gray-700"}`}
                    >
                    İmza Bekleyen
                    </button>
                    <button 
                    type="button" 
                    onClick={() => setActiveTab("signed")}
                    className={`pb-2 text-sm font-medium ${activeTab === "signed" ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-500 hover:text-gray-700"}`}
                    >
                    İmzalanan
                    </button>
                    <button 
                    type="button"
                    onClick={() => setActiveTab("approved")}
                    className={`pb-2 text-sm font-medium ${activeTab === "approved" ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-500 hover:text-gray-700"}`}
                    >
                    Onaylanan
                    </button>
                </div>
            )}
            </header>

            {/* Document list or document detail view */}
            <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                {selectedDocument ? (
                    // Document Detail View
                    <div className="bg-white rounded-lg shadow">
                        {/* Document Header */}
                        <div className="border-b p-4">
                            <button 
                                onClick={handleBackToList}
                                className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 mb-4"
                            >
                                <ArrowLeft className="h-4 w-4 mr-1" />
                                Belge Listesine Dön
                            </button>
                            
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center">
                                        {getStatusIcon(selectedDocument.status as DocumentStatus)}
                                        <h3 className="text-xl font-medium ml-2">{selectedDocument.title}</h3>
                                    </div>
                                    <div className="mt-2 flex items-center">
                                        {getStatusBadge(selectedDocument.status as DocumentStatus)}
                                        <span className="ml-3 text-sm text-gray-500">ID: {selectedDocument.id}</span>
                                        <span className="ml-3 text-sm text-gray-500">Oluşturan: {selectedDocument.owner}</span>
                                        <span className="ml-3 text-sm text-gray-500 flex items-center">
                                            <Calendar className="h-3 w-3 mr-1" />
                                            {selectedDocument.timestamp}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Document Content Layout */}
                        <div className="p-4 flex">
                            {/* Document Preview (Left) */}
                            <div className="flex-1 border rounded-md p-4 mr-4 min-h-96">
                                <div className="flex justify-center items-center h-full">
                                    <img 
                                        src="/public/image.png" 
                                        alt="Belge Önizleme" 
                                        className="max-h-full border shadow"
                                    />
                                </div>
                            </div>
                            
                            {/* Signatories Panel (Right) */}
                            <div className="w-80">
                                <div className="border rounded-md shadow-sm">
                                    <div className="bg-gray-50 px-4 py-3 border-b">
                                        <h4 className="font-medium">İmzacılar</h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {selectedDocument.signatures}/{selectedDocument.totalSignatories} imza tamamlandı
                                        </p>
                                        <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                                            <div 
                                                className="h-full bg-indigo-500 rounded-full" 
                                                style={{ width: `${(selectedDocument.signatures / selectedDocument.totalSignatories) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    
                                    <ul className="divide-y divide-gray-200">
                                        {selectedDocument.signatories?.map((signatory) => (
                                            <li key={signatory.id} className="px-4 py-3">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="font-medium text-gray-800">{signatory.name}</p>
                                                        <p className="text-xs text-gray-500">{signatory.role}</p>
                                                        <p className="text-xs text-gray-500">{signatory.email}</p>
                                                        {signatory.signDate && (
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                İmza Tarihi: {signatory.signDate}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center">
                                                        {getSignatoryStatusIcon(signatory.status)}
                                                        <span className="ml-2">
                                                            {getSignatoryStatusBadge(signatory.status)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                {/* Transaction Info */}
                                <div className="mt-4 border rounded-md shadow-sm p-4">
                                    <h4 className="font-medium mb-2">Blockchain Bilgileri</h4>
                                    <div className="text-sm">
                                        <p className="flex justify-between py-1">
                                            <span className="text-gray-500">IPFS Hash:</span>
                                            <span className="font-mono text-gray-800">{selectedDocument.ipfsHash}</span>
                                        </p>
                                        <p className="flex justify-between py-1">
                                            <span className="text-gray-500">Belge Durumu:</span>
                                            <span>
                                                {selectedDocument.status === "signed" || selectedDocument.status === "approved" ? "Doğrulandı" : "Doğrulanmadı"}
                                            </span>
                                        </p>
                                        <p className="flex justify-between py-1">
                                            <span className="text-gray-500">Son İşlem:</span>
                                            <span>{selectedDocument.timestamp}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Document List View
                    <div className="bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="text-lg font-medium">Belgeler ({filteredDocuments.length})</h3>
                            <button type="button" className="text-sm text-gray-500 flex items-center">
                                Sırala: Son Güncellenen
                                <ChevronDown className="h-4 w-4 ml-1" />
                            </button>
                        </div>

                        {filteredDocuments.length === 0 ? (
                            <div className="p-8 text-center">
                                <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">Belge Bulunamadı</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Seçilen filtrelere uygun belge bulunmamaktadır.
                                </p>
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {filteredDocuments.map((doc) => (
                                <li 
                                    key={doc.id} 
                                    className="p-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                                    onClick={() => handleViewDocument(doc)}
                                >
                                    <div className="flex items-center justify-between">
                                    <div className="flex items-center min-w-0">
                                        <div className="mr-4">
                                        {getStatusIcon(doc.status as DocumentStatus)}
                                        </div>
                                        <div className="min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{doc.title}</p>
                                        <div className="flex items-center mt-1">
                                            <p className="text-xs text-gray-500 mr-3">ID: {doc.id}</p>
                                            <p className="text-xs text-gray-500 mr-3">Sahibi: {doc.owner}</p>
                                            <div className="flex items-center text-xs text-gray-500">
                                            <Calendar className="h-3 w-3 mr-1" />
                                            {doc.timestamp}
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center ml-4">
                                        {doc.status === "waiting_signature" && (
                                        <div className="mr-4 text-right">
                                            <p className="text-xs text-gray-500">İmzalayan:</p>
                                            <p className="text-sm font-medium">{doc.currentSignatory}</p>
                                        </div>
                                        )}
                                        
                                        <div className="mr-4 flex items-center">
                                        <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                                            <div 
                                            className="h-full bg-indigo-500" 
                                            style={{ width: `${(doc.signatures / doc.totalSignatories) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="ml-2 text-xs text-gray-500">
                                            {doc.signatures}/{doc.totalSignatories}
                                        </span>
                                        </div>
                                    </div>
                                    </div>
                                </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </main>
        </div>

        {/* Create Document Modal (simplified) */}
        {showCreateModal && (
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
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Belge Başlığı
                    </label>
                    <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Belge için başlık girin"
                    />
                </div>                
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Belge Yükle
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                            <span>Dosya yükle</span>
                            <input 
                            type="file" 
                            className="sr-only" 
                            onChange={(e) => console.log(e.target.files)} 
                            />
                        </label>
                        <p className="pl-1">veya sürükle bırak</p>
                        </div>
                        <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX, XLS, XLSX, PNG veya JPG
                        </p>
                    </div>
                    </div>
                </div>
                
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
                    className="btn_choose_signer py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white"
                    onClick={() => {
                        handleSubmit();
                    }}
                    >
                    Sonraki: İmzacıları Seç
                    </button>
                </div>
                </div>
            </div>
            </div>
        )}
            {/* <Footer/> */}
        </div>
    );
}

export default Homepage;