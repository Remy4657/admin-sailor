import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


import './Order.scss'
import { fetchAllOrder } from '../../service/adminService'
import { deleteOrder } from '../../service/adminService'
import ModalDelete from "./ModalDelete";
import ModalProduct from "./ModalProduct";


const Order = () => {
    const [listOrder, setListOrder] = useState([])
    const [action, setAction] = useState('Create')
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [isShowModalCreate, setIsShowModalCreate] = useState(false)
    const [dataModalDelete, setDataModalDelete] = useState()
    const [dataEdit, setDataEdit] = useState('')
    useEffect(() => {

        fetchOrder()

    }, [])

    const fetchOrder = async () => {
        let res = await fetchAllOrder()
        console.log('fetch Order: ', res.data)

        if (res && res.data.DT) {
            setListOrder(res.data.DT)
        }
    }

    const handleEdit = (item) => {
        setAction('Update')
        setIsShowModalCreate(true)
        setDataEdit(item)
    }
    const handleDelete = (item) => {

        setDataModalDelete(item)
        setIsShowModalDelete(true)
    }
    //console.log('order id: ', dataModalDelete)
    const handleCloseModalDelete = () => {
        setIsShowModalDelete(false)
    }
    const handleShowModalDelete = () => {
        setIsShowModalDelete(true)
    }
    const confirmDelete = async () => {

        let response = await deleteOrder(dataModalDelete)
        if (response && response.data.EC === 0) {
            toast.success(response.data.EM)
            //fetchUsers()
            fetchOrder()
        }
        else {
            toast.error('error delete')
        }
        setIsShowModalDelete(false)
    }

    const handleShowModalCreate = () => {

        setAction('Create')

        setIsShowModalCreate(true)

    }
    const handleCloseModalCreate = () => {


        setIsShowModalCreate(false)
        // khi dong modal sưa thi set data edit bang rong de khong doc data khi add new ngay sau khi sua
        setDataEdit({})
        // them xong thi goi lai de fetch user
        // fetchUsers()

    }
    return (
        <div className="blog ql-products">
            <h3>Table order</h3>
            <div className="action mb-3">
                <button className="btn btn-success">Refresh</button>
                <button onClick={handleShowModalCreate} className="btn btn-primary">Add new Order</button>
            </div>
            <div>
                <table>
                    <thead>

                        <tr>
                            <th>Stt</th>
                            <th>Thông tin sản phẩm</th>
                            <th>Tổng tiền</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Địa chỉ</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {listOrder && listOrder.length > 0 ?
                            <>
                                {
                                    listOrder.map((item, index) => {
                                        return (
                                            <tr key={`row ${index}`} >
                                                <td>{index + 1}</td>
                                                {/* <td>{item.id}</td>
                                                <td>{item.Products.name}</td>
                                                <td>{item.Products.Cart_Detail.qty}</td> */}
                                                <td>{item.infoOrder}</td>
                                                <td>{item.totalMoney}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.email}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <button className="btn btn-warning mx-3" onClick={() => handleEdit(item)}>Edit</button>
                                                    <button className="btn btn-danger" onClick={() => handleDelete(item)}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                            </>
                            :
                            <>

                                <tr>
                                    <td>
                                        User not found
                                    </td>
                                </tr>
                            </>
                        }
                    </tbody>
                </table>
            </div>
            <ModalDelete
                dataModalDelete={dataModalDelete}
                handleCloseModalDelete={handleCloseModalDelete}
                isShowModalDelete={isShowModalDelete}
                handleShowModalDelete={handleShowModalDelete}
                confirmDelete={confirmDelete}
            />
            <ModalProduct
                action={action}
                isShowModalCreate={isShowModalCreate}
                handleShowModalCreate={handleShowModalCreate}
                handleCloseModalCreate={handleCloseModalCreate}
                dataEdit={dataEdit}
                fetchOrder={fetchOrder}
            />
        </div>
    )
}
export default Order