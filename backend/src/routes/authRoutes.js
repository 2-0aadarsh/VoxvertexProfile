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
}, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error('Passport authentication error:', err);
      return res.status(500).json({ 
        success: false,
        message: "Internal server error during authentication" 
      });
    }
    
    if (!user) {
      console.log('Authentication failed:', info?.message || 'Unknown error');
      return res.status(401).json({ 
        success: false,
        message: info?.message || "Invalid email or password. Please check your credentials and try again." 
      });
    }
    
    req.login(user, (err) => {
      if (err) {
        console.error('Login session error:', err);
        return res.status(500).json({ 
          success: false,
          message: "Failed to create session. Please try again." 
        });
      }
      
      // Call the signIn controller
      return signIn(req, res);
    });
  })(req, res, next);
});

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