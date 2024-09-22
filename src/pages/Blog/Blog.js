import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


import './Blog.css'
import { fetchAllBlog } from '../../service/adminService'
import { deleteBlog } from '../../service/adminService'
import ModalDelete from "./ModalDelete";
import ModalProduct from "./ModalProduct";


const Blog = () => {
    const [listBlog, setListBlog] = useState([])
    const [action, setAction] = useState('Create')
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [isShowModalCreate, setIsShowModalCreate] = useState(false)
    const [dataModalDelete, setDataModalDelete] = useState()
    const [dataEdit, setDataEdit] = useState('')
    useEffect(() => {

        fetchBlogs()

    }, [])

    const fetchBlogs = async () => {
        let res = await fetchAllBlog()
        console.log('fetch blog: ', res.data)

        if (res && res.data.DT) {
            setListBlog(res.data.DT)
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
        let response = await deleteBlog(dataModalDelete)
        if (response && response.data.EC === 0) {
            toast.success(response.data.EM)
            //fetchUsers()
            fetchBlogs()
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
            <h3>Table blog</h3>
            <div className="action mb-3">
                <button className="btn btn-success">Refresh</button>
                <button onClick={handleShowModalCreate} className="btn btn-primary">Add new blog</button>
            </div>
            <div>
                <table>
                    <thead>

                        <tr>
                            <th>Stt</th>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Content</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listBlog && listBlog.length > 0 ?
                            <>
                                {
                                    listBlog.map((item, index) => {
                                        return (
                                            <tr key={`row ${index}`} >
                                                <td>{index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td><img src={item.image} /></td>
                                                <td>{item.content}</td>


                                                <td className='d-flex'>
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
                fetchBlogs={fetchBlogs}
            />
        </div>
    )
}
export default Blog