import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '../../service/adminService'
// import { inserUserToCart } from '../service/cartService'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import './Login.scss'
// import { useDispatch } from 'react-redux'
// import {
//     FETCH_DATA_LOGIN,
//     FETCH_DATA_SUCCESS,
//     FETCH_DATA_ERROR,
// } from "../redux/actions/action";

const Login = () => {
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get("redirect");
    const redirect = redirectInUrl ? redirectInUrl : "/home";
    console.log(search)
    const navigate = useNavigate()
    // const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        // dispatch(FETCH_DATA_LOGIN());
        let res = await userLogin({ username, password })

        if (res && res.data && +res.data.EC === 1) {

            let data = {
                isAuthenticated: true,
                token: "fake token",
            };
            let idAccount = res.data.DT
            // let resadd = await inserUserToCart({ idAccount })
            // console.log('res add: ', resadd)

            localStorage.setItem("token", data.token);
            // id user se xem cart của người đó
            sessionStorage.setItem("idAccount", idAccount);
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("account", JSON.stringify(data));
            // dispatch(FETCH_DATA_SUCCESS(idAccount, username, data.token));
            toast.success(res.data.EM)
            navigate(redirect || "/home");
            //navigate("/")
        }
        else {
            toast.error(res.data.EM)
            // dispatch(FETCH_DATA_ERROR());
        }
    }
    return (
        <>
            <section className="banner-area organic-breadcrumb">
                <div className="container">
                    <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                        <div className="col-first">
                            <h1>Login/Register</h1>
                            <nav className="d-flex align-items-center">
                                <a href="index.html">Home<span className="lnr lnr-arrow-right"></span></a>
                                <a href="category.html">Login/Register</a>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End Banner Area --> */}

            {/* <!--================Login Box Area =================--> */}
            <section className="login_box_area section_gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="login_box_img">
                                <img className="img-fluid" src={require('../../assets/img/login.jpg')} alt="" />
                                <div className="hover">
                                    <h4>New to our website?</h4>
                                    <p>There are advances being made in science and technology everyday, and a good example of this is the</p>
                                    <Link className="primary-btn" to="/register">Create an Account</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="login_form_inner">
                                <h3>Log in to enter</h3>
                                <form className="row login_form" action="" method="post" id="contactForm" novalidate="novalidate">
                                    <div className="col-md-12 form-group">
                                        <input type="text" className="form-control" id="name" name="name" placeholder="Username" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Username or Email'" onChange={(e) => setUsername(e.target.value)} value={username} />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input type="password" className="form-control" id="name" name="name" placeholder="Password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'" onChange={(e) => setPassword(e.target.value)} value={password} />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        {/* <div className="creat_account">
                                            <input type="checkbox" id="f-option2" name="selector" />
                                            <label for="f-option2">Keep me logged in</label>
                                        </div> */}
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <button type="submit" value="submit" className="primary-btn" onClick={(e) => handleLogin(e)}>Log In</button>
                                        <a href="#">Forgot Password?</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section></>
    )
}
export default Login