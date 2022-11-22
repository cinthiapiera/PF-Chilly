const { Router } = require("express");
const productRoute = require("./productRoute");
// const categoryRoute = require("./categoryRoute");
const inventoryRoute = require("./inventoryRoute");
const discountsRoute = require("./discountsRoute");
const detailsCategoryRoute = require("./detailsCategoryRoute");
const { hardCodeoInfo } = require("../controllers/hardCode");
const router = Router();

router.use("/Guillo", async (req, res, next) => {
  await hardCodeoInfo();
  console.log("ya termine");
  next();
});
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);}

router.use("/product", productRoute);
// router.use("/category", categoryRoute);
router.use("/discount", discountsRoute);
router.use("/inventory", inventoryRoute);
router.use("/categoryDetails", detailsCategoryRoute);

module.exports = router;
