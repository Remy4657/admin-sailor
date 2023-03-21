import express from "express";

import userController from '../controller/userController'

const router = express.Router();

// app: express app
const initApiRoutes = (app) => {
    // định nghĩa các routes được sử dụng


    router.post("/user/login",
        userController.userLoginFunc
    )

    return app.use("/api/v1", router);
};
export default initApiRoutes;
