import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


import './Category.scss'
import { fetchAllCategory } from '../../service/adminService'
import { deleteCategory } from '../../service/adminService'
import ModalDelete from "./ModalDelete";
import ModalProduct from "./ModalProduct";


const Category = () => {
    const [listCategory, setListCategory] = useState([])
    const [action, setAction] = useState('Create')
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [isShowModalCreate, setIsShowModalCreate] = useState(false)
    const [dataModalDelete, setDataModalDelete] = useState()
    const [dataEdit, setDataEdit] = useState('')
    useEffect(() => {

        fetchCategory()

    }, [])

    const fetchCategory = async () => {
        let res = await fetchAllCategory()
        console.log('fetch Category: ', res.data)

        if (res && res.data.DT) {
            setListCategory(res.data.DT)
        }
    }
    console.log('list category: ', listCategory)
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
        let response = await deleteCategory(dataModalDelete)
        if (response && response.data.EC === 0) {
            toast.success(response.data.EM)
            //fetchUsers()
            fetchCategory()
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
            <h3>Table category</h3>
            <div className="action">
                <button>Refresh</button>
                <button onClick={handleShowModalCreate}>Add new category</button>
            </div>
            <div>
                <table>
                    <thead>

                        <tr>
                            <th>Stt</th>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listCategory && listCategory.length > 0 ?
                            <>
                                {
                                    listCategory.map((item, index) => {
                                        return (
                                            <tr key={`row ${index}`} >
                                                <td>{index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
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
                fetchCategory={fetchCategory}
            />
        </div>
    )
}
export default Category