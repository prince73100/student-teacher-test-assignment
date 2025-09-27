import { Router } from 'express';
import { getUserinfo, handleSignIn, handleSignUp, refreshAccessToken } from '../contoller/auth.controller.js';
import { authorize, protect } from '../middleware/authentication.js';
import { createAssignment, getAssignments } from '../contoller/teacher.controller.js';

const router = Router();

router.route('/signUp').post(handleSignUp);
router.route('/signIn').post(handleSignIn);
router.route('/refresh-token').post(refreshAccessToken)
router.route('/get-user-info').get(protect,getUserinfo)
router.route('/create-assignment').post(protect,authorize('teacher'),createAssignment)
router.route('/get-assigmnMent').get(protect,authorize('student'),getAssignments)
export default router;
