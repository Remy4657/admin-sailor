import { Link } from 'react-router-dom'

import './Sidebar.scss'


const Sidebar = () => {
    return (
        <>
            <ul className="Sidebar">
                <li><Link to="/home">Quản lý sản phẩm</Link></li>
                <li><Link to="/blog">Quản lý blog</Link></li>
                <li><Link to="/category">Quản lý danh mục</Link></li>
                <li><Link to="/payment">Quản lý thanh toán</Link></li>
                <li><Link to="/shipping">Quản lý vận chuyển</Link></li>
                <li><Link to="/order">Quản lý đơn hàng</Link></li>

            </ul>
        </>
    )
}
export default Sidebar