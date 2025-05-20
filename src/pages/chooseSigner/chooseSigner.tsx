import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { 
    FileText, 
    Users, 
    ArrowLeft, 
    Search, 
    X, 
    Info,
    AlertCircle,
    ChevronDown,
    Clock,
    GripVertical
} from "lucide-react";
import "./chooseSigner.css";

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
    avatarUrl: string;
};

type SelectedUser = {
    user: User;
    signOrder: number;
    deadline?: string;
    notifyMethod: "email" | "sms" | "both";
};

function ChooseSigner() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<SelectedUser[]>([]);
    const [departments, setDepartments] = useState<string[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
    const [showDeadlineModal, setShowDeadlineModal] = useState(false);
    const [currentEditUser, setCurrentEditUser] = useState<SelectedUser | null>(null);
    const [documentTitle, setDocumentTitle] = useState("İş Ortaklığı Anlaşması"); // Varsayılan belge başlığı
    

    const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
    const [dragOverItemIndex, setDragOverItemIndex] = useState<number | null>(null);
    

    useEffect(() => {
        const mockUsers: User[] = [
            {
                id: "user-1",
                name: "Ahmet Yılmaz",
                email: "ahmet.yilmaz@sirket.com",
                role: "CEO",
                department: "Yönetim",
                avatarUrl: "/api/placeholder/40/40"
            },
            {
                id: "user-2",
                name: "Ayşe Demir",
                email: "ayse.demir@sirket.com",
                role: "Finans Direktörü",
                department: "Finans",
                avatarUrl: "/api/placeholder/40/40"
            },
            {
                id: "user-3",
                name: "Mustafa Kaya",
                email: "mustafa.kaya@sirket.com",
                role: "Hukuk Müşaviri",
                department: "Hukuk",
                avatarUrl: "/api/placeholder/40/40"
            },
            {
                id: "user-4",
                name: "Zeynep Kaya",
                email: "zeynep.kaya@sirket.com",
                role: "İK Direktörü",
                department: "İnsan Kaynakları",
                avatarUrl: "/api/placeholder/40/40"
            },
            {
                id: "user-5",
                name: "Mehmet Öz",
                email: "mehmet.oz@sirket.com",
                role: "Satış Müdürü",
                department: "Satış",
                avatarUrl: "/api/placeholder/40/40"
            },
            {
                id: "user-6",
                name: "Can Bilir",
                email: "can.bilir@sirket.com",
                role: "Pazarlama Uzmanı",
                department: "Pazarlama",
                avatarUrl: "/api/placeholder/40/40"
            },
            {
                id: "user-7",
                name: "Deniz Yıldız",
                email: "deniz.yildiz@sirket.com",
                role: "Ürün Müdürü",
                department: "Ürün",
                avatarUrl: "/api/placeholder/40/40"
            },
            {
                id: "user-8",
                name: "Elif Şahin",
                email: "elif.sahin@sirket.com",
                role: "CTO",
                department: "Teknoloji",
                avatarUrl: "/api/placeholder/40/40"
            }
        ];
        
        setUsers(mockUsers);
        
        // Departmanları topla
        const allDepartments = Array.from(new Set(mockUsers.map(user => user.department)));
        setDepartments(allDepartments);
    }, []);

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    user.role.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesDepartment = selectedDepartment === "all" || user.department === selectedDepartment;
        
        const isNotSelected = !selectedUsers.some(selectedUser => selectedUser.user.id === user.id);
        
        return matchesSearch && matchesDepartment && isNotSelected;
    });

    const addUser = (user: User) => {
        setSelectedUsers([...selectedUsers, {
            user,
            signOrder: selectedUsers.length + 1,
            notifyMethod: "email"
        }]);
    };

    const removeUser = (userId: string) => {
        const newSelectedUsers = selectedUsers
            .filter(selectedUser => selectedUser.user.id !== userId)
            .map((selectedUser, index) => ({
                ...selectedUser,
                signOrder: index + 1
            }));
        setSelectedUsers(newSelectedUsers);
    };

    const openDeadlineModal = (selectedUser: SelectedUser) => {
        setCurrentEditUser(selectedUser);
        setShowDeadlineModal(true);
    };

    //imza suresi belirlendikten sonra kullaniciya sure gecerse bildirim gonderilecek 
    const saveDeadlineSettings = (deadline: string) => {
        if (currentEditUser) {
            const updatedUsers = selectedUsers.map(user => {
                if (user.user.id === currentEditUser.user.id) {
                    return {
                        ...user,
                        deadline
                    };
                }
                return user;
            });
            setSelectedUsers(updatedUsers);
        }
        setShowDeadlineModal(false);
        setCurrentEditUser(null);
    };

    const handleDragStart = (index: number) => {
        setDraggedItemIndex(index);
    };

    const handleDragEnter = (index: number) => {
        if (draggedItemIndex === null) return;
        if (draggedItemIndex === index) return;
        setDragOverItemIndex(index);
    };

    const handleDragEnd = () => {
        if (draggedItemIndex === null || dragOverItemIndex === null) {
            setDraggedItemIndex(null);
            setDragOverItemIndex(null);
            return;
        }

        // Sürüklenen öğelerin sırasını değiştir
        const items = [...selectedUsers];
        const draggedItem = items[draggedItemIndex];
        
        // Elemanı kaldır ve hedef pozisyona ekle
        items.splice(draggedItemIndex, 1);
        items.splice(dragOverItemIndex, 0, draggedItem);
        
        // İmza sıralamasını güncelle
        const reorderedUsers = items.map((item, index) => ({
            ...item,
            signOrder: index + 1
        }));
        
        setSelectedUsers(reorderedUsers);
        setDraggedItemIndex(null);
        setDragOverItemIndex(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleSubmit = () => {
        // Burada imzacıları onaylama işlemi yapılacak
        console.log("İmzacılar onaylandı:", selectedUsers);
        navigate('/home'); 
    };

    // Sidebar bileşeni
    const Sidebar = () => (
        <div className="sidebar w-64 text-white p-4 flex flex-col">
            <div className="mb-10">
                <h1 className="text-xl font-bold mb-1">ChainSign</h1>
                <p className="text-xs text-indigo-200">Blockchain Belge Yönetimi</p>
            </div>

            <nav className="space-y-1 flex-1">
                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md">
                    <FileText className="mr-3 h-5 w-5" />
                    Belgelerim
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md">
                    <Clock className="mr-3 h-5 w-5" />
                    İmza Bekleyenler
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md">
                    <Users className="mr-3 h-5 w-5" />
                    Tamamlananlar
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md">
                    <Users className="mr-3 h-5 w-5" />
                    Organizasyon
                </a>
            </nav>

            <div className="pt-4 border-t border-indigo-600 mt-4">
                <div className="flex items-center">
                    <div className="ml-3">
                        <p className="text-sm font-medium">Zeynep Kaya</p>
                        <p className="text-xs text-indigo-300">İK Direktörü</p>
                    </div>
                </div>
                <button 
                    type="button"
                    className="mt-4 flex items-center text-indigo-200 hover:text-white text-sm"
                >
                    <span className="mr-2">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </span>
                    Çıkış Yap
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow">
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <button 
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="mr-4 text-gray-500 hover:text-gray-700"
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                </button>
                                <h2 className="text-xl font-semibold text-gray-800">İmzacıları Seç</h2>
                            </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <FileText className="h-4 w-4 mr-1" />
                            <span>Belge: {documentTitle}</span>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1 bg-white rounded-lg shadow">
                            <div className="p-4 border-b flex justify-between items-center">
                                <h3 className="font-medium">Kişileri Seç</h3>
                                <span className="text-xs text-gray-500">{filteredUsers.length} kişi</span>
                            </div>
                            
                            <div className="p-4 border-b">
                                <div className="flex space-x-2">
                                    <div className="relative flex-1">
                                        <input 
                                            type="text" 
                                            placeholder="Kişi ara..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    </div>
                                    
                                    <div className="relative">
                                        <select
                                            value={selectedDepartment}
                                            onChange={(e) => setSelectedDepartment(e.target.value)}
                                            className="appearance-none px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            <option value="all">Tüm Departmanlar</option>
                                            {departments.map(department => (
                                                <option key={department} value={department}>{department}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 320px)" }}>
                                {filteredUsers.length === 0 ? (
                                    <div className="p-8 text-center">
                                        <AlertCircle className="mx-auto h-10 w-10 text-gray-400" />
                                        <p className="mt-2 text-sm text-gray-500">Kişi bulunamadı</p>
                                    </div>
                                ) : (
                                    <ul className="divide-y divide-gray-200">
                                        {filteredUsers.map((user) => (
                                            <li key={user.id} className="px-4 py-3 hover:bg-gray-50">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                            <div className="flex items-center">
                                                                <p className="text-xs text-gray-500">{user.role}</p>
                                                                <span className="mx-1 text-gray-300">•</span>
                                                                <p className="text-xs text-gray-500">{user.department}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => addUser(user)}
                                                        className="btn-add-user"
                                                    >
                                                        Ekle
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        
                        <div className="lg:col-span-2 bg-white rounded-lg shadow">
                            <div className="p-4 border-b flex justify-between items-center">
                                <div>
                                    <h3 className="font-medium">İmza Sırası</h3>
                                    <p className="text-xs text-gray-500 mt-1">İmzacıların sırasını belirleyin (sürükle-bırak ile)</p>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-500 mr-2">Seçili: {selectedUsers.length}</span>
                                    <Info className="h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                            
                            {selectedUsers.length === 0 ? (
                                <div className="p-12 text-center">
                                    <Users className="mx-auto h-12 w-12 text-gray-300" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">İmzacı Seçilmedi</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Sol panelden imzacıları seçerek eklemeye başlayın.
                                    </p>
                                </div>
                            ) : (
                                <ul className="divide-y divide-gray-200">
                                    {selectedUsers.map((selectedUser, index) => (
                                        <li 
                                            key={selectedUser.user.id}
                                            className={`px-4 py-3 draggable-item ${draggedItemIndex === index ? 'dragging' : ''} ${dragOverItemIndex === index ? 'drag-over' : ''}`}
                                            draggable
                                            onDragStart={() => handleDragStart(index)}
                                            onDragEnter={() => handleDragEnter(index)}
                                            onDragEnd={handleDragEnd}
                                            onDragOver={handleDragOver}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="mr-2 cursor-move text-gray-400 drag-handle">
                                                        <GripVertical className="h-5 w-5" />
                                                    </div>
                                                    <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium">
                                                        {selectedUser.signOrder}
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-gray-900">{selectedUser.user.name}</p>
                                                        <div className="flex items-center">
                                                            <p className="text-xs text-gray-500">{selectedUser.user.role}</p>
                                                            <span className="mx-1 text-gray-300">•</span>
                                                            <p className="text-xs text-gray-500">{selectedUser.user.email}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    {selectedUser.deadline && (
                                                        <div className="mr-4 flex items-center text-xs text-gray-500">
                                                            <Clock className="h-3 w-3 mr-1" />
                                                            {selectedUser.deadline}
                                                        </div>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() => openDeadlineModal(selectedUser)}
                                                        className="mr-2 text-xs text-indigo-600 hover:text-indigo-800"
                                                    >
                                                        {selectedUser.deadline ? "Süreyi Düzenle" : "Süre Belirle"}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeUser(selectedUser.user.id)}
                                                        className="text-gray-400 hover:text-gray-600"
                                                    >
                                                        <X className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            
                            <div className="p-4 border-t">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm">
                                        <p className="font-medium">İmzalama Sırası:</p>
                                        <p className="text-gray-500">İmzacılar belirtilen sırayla imzalama isteği alacaktır.</p>
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => navigate(-1)}
                                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                                        >
                                            İptal
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            className="btn-confirm-signers"
                                            disabled={selectedUsers.length === 0}
                                        >
                                            İmzacıları Onayla
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Süre Belirleme Modalı */}
            {showDeadlineModal && currentEditUser && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex justify-between items-center px-6 py-4 border-b">
                            <h3 className="text-lg font-medium">İmza Süresi Belirle</h3>
                            <button 
                                type="button"
                                onClick={() => setShowDeadlineModal(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        
                        <div className="p-6">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    İmzacı
                                </label>
                                <div className="flex items-center p-2 bg-gray-50 rounded-md">
                                    <div className="ml-3">
                                        <p className="text-sm font-medium">{currentEditUser.user.name}</p>
                                        <p className="text-xs text-gray-500">{currentEditUser.user.email}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Son İmzalama Tarihi
                                </label>
                                <input 
                                    type="date"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    defaultValue={currentEditUser.deadline || ""}
                                />
                            </div>
                            <div className="pt-4 border-t flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowDeadlineModal(false)}
                                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3"
                                >
                                    İptal
                                </button>
                                <button
                                    type="button"
                                    className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700"
                                    onClick={() => saveDeadlineSettings("2025-06-01")}
                                >
                                    Kaydet
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChooseSigner;