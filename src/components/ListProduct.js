import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
// import './ListProduct.scss'
import '../pages/Category/Category.scss'


import '../service/productService'
import { fetchAllProduct } from '../service/productService'
import { deleteProduct } from '../service/adminService'
import ModalDelete from "./ModalDelete";
import ModalProduct from "./ModalProduct";

const ListProduct = () => {
    const [action, setAction] = useState('Create')
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [isShowModalCreate, setIsShowModalCreate] = useState(false)
    const [dataModalDelete, setDataModalDelete] = useState()
    const [dataEdit, setDataEdit] = useState('')
    const [listProduct, setListProduct] = useState('')

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        let res = await fetchAllProduct()

        if (res && res.data.DT) {
            setListProduct(res.data.DT)
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
    const handleCloseModalDelete = () => {
        setIsShowModalDelete(false)
    }
    const handleShowModalDelete = () => {
        setIsShowModalDelete(true)
    }
    const confirmDelete = async () => {
        let response = await deleteProduct(dataModalDelete)
        if (response && response.data.EC === 0) {
            toast.success(response.data.EM)
            fetchProducts()
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

        // <!-- start product Area -->
        <div className="ql-products">
            <h3>Table product</h3>
            <div className="action mb-3">
                <button className="btn btn-success">Refresh</button>
                <button onClick={handleShowModalCreate} className="btn btn-primary ml-3">Add new product</button>
            </div>
            <div>
                <table>
                    <thead>

                        <tr>
                            <th>Stt</th>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Price Old</th>
                            <th>Status</th>
                            <th>Category Id</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listProduct && listProduct.length > 0 ?
                            <>
                                {
                                    listProduct.map((item, index) => {
                                        return (
                                            <tr key={`row ${index}`} >
                                                <td>{index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td><img src={item.image} /></td>
                                                <td>{item.price}</td>
                                                <td>{item.priceOld}</td>
                                                <td>{item.status}</td>
                                                <td>{item.categoryId}</td>

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
                fetchProducts={fetchProducts}
            />
        </div>


    )
}
export default ListProduct