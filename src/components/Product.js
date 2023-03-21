
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'

// import { ADD_TO_CART } from "../redux/actions/action"
// import { addToCart } from "../service/cartService"

const Product = (props) => {

    const { item } = props
    // let idAccount = sessionStorage.getItem("idAccount")
    // let cart = useSelector((state) => state.user.cart)
    // let lengthCart = cart.length

    const addCart = async (e) => {
        // const existItem = cart.find((x) => x.Products.id === item.id);
        // const qty = existItem ? existItem.Products.Cart_Detail.qty + 1 : 1;

        e.preventDefault()
        //dispatch(ADD_TO_CART(item, qty))

        //let res = await addToCart({ ...item, idAccount: idAccount, lengCartAll: lengthCart })
        //console.log('res add product: ', res)
        toast.success('Add product to cart success!')

    }
    return (
        <div class="col-lg-3 col-md-6">
            <div class="single-product">
                <img class="img-fluid" src={item.image} alt="" />
                <div class="product-details">
                    <h6>{item.name}</h6>
                    <div class="price">
                        <h6>{item.price}</h6>
                        <h6 class="l-through">{item.priceOld}</h6>
                    </div>
                    <div class="prd-bottom">
                        <a href="" class="social-info" onClick={(e) => addCart(e)}>
                            <span class="ti-bag"><i class="fa-solid fa-cart-shopping"></i></span>
                            <p class="hover-text">add to bag</p>
                        </a>
                        <a href="" class="social-info">
                            <span class="lnr lnr-heart"><i class="fa-regular fa-heart"></i></span>
                            <p class="hover-text">Wishlist</p>
                        </a>
                        <a href="" class="social-info">
                            <span class="lnr lnr-sync"><i class="fa-solid fa-arrows-rotate"></i></span>
                            <p class="hover-text">compare</p>
                        </a>
                        <a href="" class="social-info">
                            <span class="lnr lnr-move"><i class="fa-solid fa-info"></i></span>
                            <p class="hover-text"><Link to={`/product/detail/${item.id}`}>view more</Link></p>
                        </a>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Product