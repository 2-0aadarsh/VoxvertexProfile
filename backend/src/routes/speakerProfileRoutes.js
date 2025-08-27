import { Router } from 'express';
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
    removeAward
} from '../controllers/speakerProfileController.js';
import { ensureAuthenticated } from '../middleware/ensureAuth.js';

const router = Router();

// All speaker profile routes require authentication
router.use(ensureAuthenticated);

// Profile CRUD operations
router.get('/', getProfile);                    // Get speaker profile

// Profile sections
router.put('/bio', updateBio);                 // Update bio
router.put('/image', updateProfileImage);      // Update profile image
router.put('/about', updateAbout);             // Update about

// Skills management
router.post('/skills', addSkill);              // Add skill
router.delete('/skills/:skillId', removeSkill); // Remove skill

// Experience management
router.post('/experience', addExperience);      // Add experience
router.put('/experience/:expId', updateExperience); // Update experience
router.delete('/experience/:expId', removeExperience); // Remove experience

// Education management
router.post('/education', addEducation);        // Add education
router.put('/education/:eduId', updateEducation); // Update education
router.delete('/education/:eduId', removeEducation); // Remove education

// Awards management
router.post('/awards', addAward);              // Add award
router.put('/awards/:awardId', updateAward);   // Update award
router.delete('/awards/:awardId', removeAward); // Remove award

export default router;
