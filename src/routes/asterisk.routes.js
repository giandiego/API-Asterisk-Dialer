import auth from '../middleware/auth';
import { Router } from "express";
import * as Asterisk from "../controllers/asterisk.controller";

const router = Router();

router.post("/Call", auth, Asterisk.OriginateCall);
router.get("/Channels", auth, Asterisk.GetCoreShowChannels);
router.post("/bulkCalls", auth, Asterisk.BulkCalls);

export default router;