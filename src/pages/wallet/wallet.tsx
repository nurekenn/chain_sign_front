import './wallet.css';

function Wallet() {
    return (
        <div className="wallet-page">
            <div className="wallet-card">
                <h2 className="wallet-title">Cüzdan Bağlantısı</h2>
                <p className="wallet-subtitle">Lütfen Starknet cüzdanınızı bağlayın</p>

                <div className="wallet-box">
                    <div className="wallet-icon"></div>
                    <div>
                        <p className="wallet-box-title">ArgentX Cüzdan</p>
                        <p className="wallet-box-desc">Starknet blokzinciri için popüler cüzdan</p>
                    </div>
                </div>

                <button className="btn-connect">ArgentX’i Bağla</button>

                <p className="wallet-info-text">
                    Cüzdan bağlantısı, belge imzalama ve onaylama işlemleri için gereklidir. Cüzdanınız yoksa, önce{' '}
                    <a href="https://www.argent.xyz/argent-x/" target="_blank" rel="noopener noreferrer">
                        ArgentX
                    </a>{' '}
                    cüzdanını yüklemeniz gerekecektir.
                </p>
            </div>
        </div>
    );
}

export default Wallet;
