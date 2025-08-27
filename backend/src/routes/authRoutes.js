import { Router } from "express";
import { signUp, signIn, checkAuthStatus, logOut, setExpertDetails, verifyEmail, setOrganizerDetails, testUser, setParticipantDetails } from "../controllers/authController.js";
import passport from "passport";
import { ensureAuthenticated } from "../middleware/ensureAuth.js";
// import upload from "../middleware/upload.js";

const router = Router();

router.post("/register", signUp);

router.post("/login", (req, res, next) => {
  console.log("Login Request Body:", req.body);
  next();
}, passport.authenticate("local"), signIn);

router.get("/authStatus", checkAuthStatus);

router.post("/logout",ensureAuthenticated, logOut);

// router.post("/register-expert", upload.single("organisationIdImage"), setExpertDetails);
router.post("/register-expert", ensureAuthenticated, setExpertDetails);

router.post("/register-organizer", ensureAuthenticated, setOrganizerDetails);

router.post("/register-participant", ensureAuthenticated, setParticipantDetails);

router.post("/verify-email", ensureAuthenticated, verifyEmail);

//router.post("/resetPass");

router.get("/test-user", testUser);

export default router;