import auth from '../middleware/auth';
import { Router } from "express";
import * as Asterisk from "../controllers/asterisk.controller";

const router = Router();

router.post("/StatusAsterisk", auth, Asterisk.StatusApiBase);
router.post("/llamar", auth, Asterisk.amiDial);
export default router;