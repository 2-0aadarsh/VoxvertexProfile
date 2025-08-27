import Profile from "../models/speakerProfile.js";

// Helper function to get or create profile
const getOrCreateProfile = async (userId) => {
  let profile = await Profile.findOne({ user: userId });
  if (!profile) {
    profile = new Profile({ user: userId });
    await profile.save();
  }
  return profile;
};


// get a profile
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
};

// Update bio
export const updateBio = async (req, res) => {
  try {
    const { bio } = req.body;
    const profile = await getOrCreateProfile(req.user._id);
    profile.bio = bio;
    await profile.save();
    res.status(200).json({ message: "Bio updated", profile });
  } catch (error) {
    res.status(500).json({ message: "Error updating bio", error: error.message });
  }
};

// Update profile image
export const updateProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }
    const profile = await getOrCreateProfile(req.user._id);
    profile.profileImage = {
      data: req.file.buffer,
      contentType: req.file.mimetype
    };
    await profile.save();
    res.status(200).json({ message: "Profile image updated", profile });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile image", error: error.message });
  }
};

// Update about section
export const updateAbout = async (req, res) => {
  try {
    const { about } = req.body;
    const profile = await getOrCreateProfile(req.user._id);
    profile.about = about;
    await profile.save();
    res.status(200).json({ message: "About section updated", profile });
  } catch (error) {
    res.status(500).json({ message: "Error updating about section", error: error.message });
  }
};

// Add skill
export const addSkill = async (req, res) => {
  try {
    const { skill } = req.body;
    if (!skill) {
      return res.status(400).json({ message: "Skill is required" });
    }
    const profile = await getOrCreateProfile(req.user._id);
    if (!profile.skills.includes(skill)) {
      profile.skills.push(skill);
      await profile.save();
    }
    else {
      return res.status(400).json({ message: "Skill already exists" });
    }
    res.status(200).json({ message: "Skill added", profile });
  } catch (error) {
    res.status(500).json({ message: "Error adding skill", error: error.message });
  }
};

// Remove skill
export const removeSkill = async (req, res) => {
  try {
    const { skill } = req.params;
    const profile = await getOrCreateProfile(req.user._id);
    if (profile.skills.includes(skill) === false) {
      return res.status(404).json({ message: "Skill not found" });
    }
    profile.skills = profile.skills.filter(s => s !== skill);
    await profile.save();
    res.status(200).json({ message: "Skill removed", profile });
  } catch (error) {
    res.status(500).json({ message: "Error removing skill", error: error.message });
  }
};

// Add experience
export const addExperience = async (req, res) => {
  try {
    const { title, organization, start, end } = req.body;
    if (!title || !organization || !start || !end) {
      return res.status(400).json({ message: "All experience fields are required" });
    }
    const profile = await getOrCreateProfile(req.user._id);
    profile.experience.push({ title, organization, start, end });
    await profile.save();
    res.status(201).json({ message: "Experience added", profile });
  } catch (error) {
    res.status(500).json({ message: "Error adding experience", error: error.message });
  }
};

// Update experience
export const updateExperience = async (req, res) => {
  try {
    const { expId } = req.params;
    const { title, organization, start, end } = req.body;
    const profile = await getOrCreateProfile(req.user._id);
    const expIndex = profile.experience.findIndex(exp => exp._id.toString() === expId);
    if (expIndex === -1) {
      return res.status(404).json({ message: "Experience not found" });
    }
    if (title) profile.experience[expIndex].title = title;
    if (organization) profile.experience[expIndex].organization = organization;
    if (start) profile.experience[expIndex].start = start;
    if (end) profile.experience[expIndex].end = end;
    await profile.save();
    res.status(200).json({ message: "Experience updated", profile });
  } catch (error) {
    res.status(500).json({ message: "Error updating experience", error: error.message });
  }
};

// Remove experience
export const removeExperience = async (req, res) => {
  try {
    const { expId } = req.params;
    const profile = await getOrCreateProfile(req.user._id);
    profile.experience = profile.experience.filter(exp => exp._id.toString() !== expId);
    await profile.save();
    res.status(200).json({ message: "Experience removed", profile });
  } catch (error) {
    res.status(500).json({ message: "Error removing experience", error: error.message });
  }
};

// Add education
export const addEducation = async (req, res) => {
  try {
    const { levelOfEducation, organization, start, end } = req.body;
    if (!levelOfEducation || !organization || !start || !end) {
      return res.status(400).json({ message: "All education fields are required" });
    }
    const profile = await getOrCreateProfile(req.user._id);
    profile.education.push({ levelOfEducation, organization, start, end });
    await profile.save();
    res.status(201).json({ message: "Education added", profile });
  } catch (error) {
    res.status(500).json({ message: "Error adding education", error: error.message });
  }
};

// Update education
export const updateEducation = async (req, res) => {
  try {
    const { eduId } = req.params;
    const { levelOfEducation, organization, start, end } = req.body;
    const profile = await getOrCreateProfile(req.user._id);
    const eduIndex = profile.education.findIndex(edu => edu._id.toString() === eduId);
    if (eduIndex === -1) {
      return res.status(404).json({ message: "Education not found" });
    }
    if (levelOfEducation) profile.education[eduIndex].levelOfEducation = levelOfEducation;
    if (organization) profile.education[eduIndex].organization = organization;
    if (start) profile.education[eduIndex].start = start;
    if (end) profile.education[eduIndex].end = end;
    await profile.save();
    res.status(200).json({ message: "Education updated", profile });
  } catch (error) {
    res.status(500).json({ message: "Error updating education", error: error.message });
  }
};

// Remove education
export const removeEducation = async (req, res) => {
  try {
    const { eduId } = req.params;
    const profile = await getOrCreateProfile(req.user._id);
    profile.education = profile.education.filter(edu => edu._id.toString() !== eduId);
    await profile.save();
    res.status(200).json({ message: "Education removed", profile });
  } catch (error) {
    res.status(500).json({ message: "Error removing education", error: error.message });
  }
};

// Add award
export const addAward = async (req, res) => {
  try {
    const { title, organization, year } = req.body;
    if (!title || !organization || !year) {
      return res.status(400).json({ message: "All award fields are required" });
    }
    const profile = await getOrCreateProfile(req.user._id);
    profile.awards.push({ title, organization, year });
    await profile.save();
    res.status(201).json({ message: "Award added", profile });
  } catch (error) {
    res.status(500).json({ message: "Error adding award", error: error.message });
  }
};

// Update award
export const updateAward = async (req, res) => {
  try {
    const { awardId } = req.params;
    const { title, organization, year } = req.body;
    const profile = await getOrCreateProfile(req.user._id);
    const awardIndex = profile.awards.findIndex(award => award._id.toString() === awardId);
    if (awardIndex === -1) {
      return res.status(404).json({ message: "Award not found" });
    }
    if (title) profile.awards[awardIndex].title = title;
    if (organization) profile.awards[awardIndex].organization = organization;
    if (year) profile.awards[awardIndex].year = year;
    await profile.save();
    res.status(200).json({ message: "Award updated", profile });
  } catch (error) {
    res.status(500).json({ message: "Error updating award", error: error.message });
  }
};

// Remove award
export const removeAward = async (req, res) => {
  try {
    const { awardId } = req.params;
    const profile = await getOrCreateProfile(req.user._id);
    profile.awards = profile.awards.filter(award => award._id.toString() !== awardId);
    await profile.save();
    res.status(200).json({ message: "Award removed", profile });
  } catch (error) {
    res.status(500).json({ message: "Error removing award", error: error.message });
  }
};