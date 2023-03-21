import userService from '../service/userService'

const userRegisterFunc = async (req, res) => {
    try {

        //console.log('req user register body: ', req.body)
        let data = await userService.userRegister(req.body)
        //console.log('req data register: ', data)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
}
const userLoginFunc = async (req, res) => {
    try {

        //console.log('req body login: ', req.body)
        let data = await userService.userLogin(req.body)
        //console.log('req data register: ', data)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }

}


module.exports = {
    userRegisterFunc, userLoginFunc
}