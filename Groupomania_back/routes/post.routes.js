const router = require("express").Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer();
const postAuth = require("../middleware/auth.middleware");

router.post("/", upload.single("file"), postController.createPost);
router.get("/", postController.readPost);
router.put("/:id", postAuth.isPostAuth, postController.updatePost);
router.put("/update-image/:id", [postAuth.isPostAuth, upload.single("file")], postController.updateImage);
router.delete("/:id", postAuth.isPostAuth, postController.deletePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);

module.exports = router;
