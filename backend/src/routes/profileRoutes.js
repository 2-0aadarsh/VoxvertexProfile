// routes/profileRoutes.js
import { Router } from "express";
import { ensureAuthenticated } from "../middleware/ensureAuth.js";
import upload from "../middleware/upload.js";
import {
  getProfile,
  updateBio,
  updateProfileImage,
  updateAbout,
  addSkill,
  removeSkill,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
  addAward,
  updateAward,
  removeAward,
  addVideo,
  updateVideo,
  deleteVideo,
  deleteExperienceCertificate,
  deleteEducationCertificate,
  deleteAwardCertificate,
  deleteVideoThumbnail,
  addMutualReview,
  getMutualReviews
} from "../controllers/profileController.js";

const router = Router();

// Get full profile
router.get("/", ensureAuthenticated, getProfile);

// Bio routes
router.put("/bio", ensureAuthenticated, updateBio);

// Profile image routes
router.put("/image", ensureAuthenticated, upload.single('image'), updateProfileImage);

// About routes
router.put("/about", ensureAuthenticated, updateAbout);

// Skills routes
router.post("/skills", ensureAuthenticated, addSkill);
router.delete("/skills/:skill", ensureAuthenticated, removeSkill);

// Experience routes
router.post("/experience", ensureAuthenticated, upload.single('certificate'), addExperience);
router.put("/experience/:expId", ensureAuthenticated, upload.single('certificate'), updateExperience);
router.delete("/experience/:expId", ensureAuthenticated, removeExperience);
router.delete("/experience/:expId/certificate", ensureAuthenticated, deleteExperienceCertificate);


// Education routes
router.post("/education", ensureAuthenticated, upload.single('certificate'), addEducation);
router.put("/education/:eduId", ensureAuthenticated, upload.single('certificate'), updateEducation);
router.delete("/education/:eduId", ensureAuthenticated, removeEducation);
router.delete("/education/:eduId/certificate", ensureAuthenticated, deleteEducationCertificate);

// Awards routes
router.post("/awards", ensureAuthenticated, upload.single('certificate'), addAward);
router.put("/awards/:awardId", ensureAuthenticated, upload.single('certificate'), updateAward);
router.delete("/awards/:awardId", ensureAuthenticated, removeAward);
router.delete("/awards/:awardId/certificate", ensureAuthenticated, deleteAwardCertificate);

// Video routes
router.post("/videos", ensureAuthenticated, upload.single('image'), addVideo);
router.put("/videos/:videoId", ensureAuthenticated, upload.single('image'), updateVideo);
router.delete("/videos/:videoId", ensureAuthenticated, deleteVideo);
router.delete("/videos/:videoId/thumbnail", ensureAuthenticated, deleteVideoThumbnail);

// Mutual reviews routes
router.post('/:profileId/mutual-reviews', ensureAuthenticated, addMutualReview);
router.get('/:profileId/mutual-reviews', getMutualReviews);

export default router;
