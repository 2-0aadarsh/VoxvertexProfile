// routes/availabilityRoutes.js
import { Router } from "express";
import { ensureAuthenticated } from "../middleware/ensureAuth.js";
import { 
  addAvailability,
  getExpertAvailabilities,
  updateAvailability,
  deleteAvailability,
  getAvailabilityById
} from "../controllers/availabilityController.js";

const router = Router();

// Protect all routes
router.use(ensureAuthenticated);

// Add availability
router.post("/", addAvailability);

// Get expert's availabilities
router.get("/", getExpertAvailabilities);

// Get availability by ID
router.get("/:availabilityId", getAvailabilityById);

// Update availability
router.put("/:availabilityId", updateAvailability);

// Delete availability
router.delete("/:availabilityId", deleteAvailability);

export default router;