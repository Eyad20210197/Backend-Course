import { Router } from "express";
import { successResponse } from "../../common/utils/SuccessResponse.js";
import {
    createPost,
    deletePost,
    getPostsDetails,
    getPostsCommentsCount
} from "./posts.service.js";


const router = Router();

router.post("/", async (req, res) => {

    const data = await createPost(req.body);

    return successResponse({ res, data, status: 201, message: "Post created successfully" });

});

router.delete("/:postId", async (req, res) => {

    const data = await deletePost({ ...req.params, ...req.body });

    return successResponse({ res, data, status: 200, message: "Post deleted" });

});

router.get("/details", async (req, res) => {

    const data = await getPostsDetails();

    return successResponse({ res, data, status: 200 });

});

router.get("/comment-count", async (req, res) => {

    const data = await getPostsCommentsCount();

    return successResponse({ res, data, status: 200 });

});

export default router;
