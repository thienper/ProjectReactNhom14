import "./MenuHomeProduct.css";

function MenuHomeProduct() {
    return (

        <div className="menu-container">
            <ul className="list-group">
                <li className="list-group-item">
                    <div className="menu-item">
                        <span>Giày bán chạy</span>
                        <span>📌</span>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="menu-item">
                        <span>Giày nam</span>
                        <span>🛒</span>
                    </div>
                    <ul className="submenu">
                        <li>Giày tây</li>
                        <li>Giày sandal</li>
                        <li>Giày giày thể thao</li>
                    </ul>
                </li>
                <li className="list-group-item position-relative">
                    <div className="menu-item">
                        <span>Giày nữ</span>
                        <span>📬</span>
                    </div>
                    <ul className="submenu">
                        <li>Giày cao gót</li>
                        <li>Giày sandal</li>
                        <li>Giày giày thể thao</li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}
export default MenuHomeProduct;