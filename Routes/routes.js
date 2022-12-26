const express = require("express");
const instructorController = require("../controller/InstructorController");
const adminController = require("../controller/AdminController");
const guestController = require("../controller/GuestController");
const individualTrainee = require("../controller/IndividualTraineeController");
const Administrator = require("../models/Users/Administrator");
const CorporateTrainee = require("../models/users/CorporateTrainee");
const IndividualTrainee = require("../models/users/IndividualTrainee");
const Instructor = require("../models/users/Instructor");
const Courses = require("../models/Courses");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/checkPurchasedCourse", async (req, res) => {
  const { courseTitle } = req.body;
  if(!req.session.user)
    return res.status(400).send("not logged in");
  const user = await (() => {
    if (req.session.user?.type == "individualTrainee")
      return IndividualTrainee.findOne({ username: req.session.user.username });

    if (req.session.user?.type == "corporateTrainee")
      return CorporateTrainee.findOne({ username: req.session.user.username });

    if(req.session.user?.type == "instructor")
      return Instructor.findOne({ username: req.session.user.username });

    throw "";
  })().catch(() => null);

  if (!user) return res.status(400).send("database exploded");
  
  const isPurchased = user.courses.includes(courseTitle);

  res.send(isPurchased);
});

router.get("/getCorporateTrainees", async (req, res) => {
  const corporateTrainees = await CorporateTrainee.find({}).exec();
  res.send(corporateTrainees);
});

router.get("/getCourses", async (req, res) => {
  const allCourses = await guestController.getCourses();
  res.send(allCourses);
});

router.get("/getMyCourses", async (req, res) => {
  const userCourses = await (() => {
    if (req.session.user?.type == "individualTrainee")
      return IndividualTrainee.findOne({ username: req.session.user.username });

    if (req.session.user?.type == "corporateTrainee")
      return CorporateTrainee.findOne({ username: req.session.user.username });

    throw "";
  })().catch(() => null);

  if (!userCourses) return res.status(400).send("database exploded");

  res.send(userCourses.courses);
});

router.get("/getType", async (req, res) => {
  if (req.session.user?.type) res.send(req.session.user.type);
  else {
    res.send("/");
  }
});

router.get("/getProfilePic", async (req, res) => {
  if (req.session.user?.profilePic) res.send(req.session.user.profilePic);
  else {
    res.send(
      "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
    );
  }
});

router.get("/getInstructorRating", async (req, res) => {
  if (req.session.user?.rating) res.send("" + req.session.user.rating);
  else {
    res.send("" + 0);
  }
});

router.post("/updateReportStatus", async (req, res) => {
  const { report, status } = req.body;
  const reportID = mongoose.Types.ObjectId(report.reportID);

  await Courses.updateOne(
    { "reports.reportID": reportID },
    {
      $set: {
        "reports.$.status": status,
      },
    }
  );
  res
    .status(200)
    .send("Pandemic is over, we are back to work, thank you for your patience");
});

router.post("/updateReportSeen", async (req, res) => {
  const { report } = req.body;
  const reportID = mongoose.Types.ObjectId(report.reportID);

  await Courses.updateOne(
    { "reports.reportID": reportID },
    {
      $set: {
        "reports.$.seen": true,
      },
    }
  );
  res
    .status(200)
    .send("Pandemic is over, we are back to work, thank you for your patience");
});

router.post("/filterCourses", async (req, res) => {
  const {
    rating,
    subject,
    minPrice,
    maxPrice,
    searchTerm,
    username,
    type,
    courseTitles,
  } = req.body;
  const realRating = [rating, 0];
  let courses;
  if (type == "instructor") {
    courses = await Courses.find({
      $and: [
        { givenBy: new RegExp("^" + username, "i") },
        { rating: { $gte: realRating } },
        { subject: { $in: subject } },
        { price: { $gte: minPrice } },
        { price: { $lte: maxPrice } },
        {
          $or: [
            { title: new RegExp(searchTerm, "i") },
            { subject: new RegExp(searchTerm, "i") },
            { givenBy: new RegExp(searchTerm, "i") },
          ],
        },
      ],
    })
      .exec()
      .catch(() => res.status(400).send("database exploded"));
  } else if (type == "corporateTrainee" || type == "individualTrainee") {
    courses = await Courses.find({
      $and: [
        { title: { $in: courseTitles } },
        { rating: { $gte: realRating } },
        { subject: { $in: subject } },
        { price: { $gte: minPrice } },
        { price: { $lte: maxPrice } },
        {
          $or: [
            { title: new RegExp(searchTerm, "i") },
            { subject: new RegExp(searchTerm, "i") },
            { givenBy: new RegExp(searchTerm, "i") },
          ],
        },
      ],
    })
      .exec()
      .catch(() => res.status(400).send("database exploded"));
  } else {
    courses = await Courses.find({
      $and: [
        { rating: { $gte: realRating } },
        { subject: { $in: subject } },
        { price: { $gte: minPrice } },
        { price: { $lte: maxPrice } },
        {
          $or: [
            { title: new RegExp(searchTerm, "i") },
            { subject: new RegExp(searchTerm, "i") },
            { givenBy: new RegExp(searchTerm, "i") },
          ],
        },
      ],
    })
      .exec()
      .catch(() => res.status(400).send("database exploded"));
  }
  if (courses) {
    res.send(courses);
  }
});

router.get("/getReports", async (req, res) => {
  const coursesReports = await Courses.find(
    { reports: { $exists: true, $type: "array" } },
    { title: 1, reports: 1 }
  ).exec();
  console.log(coursesReports);
  res.send(coursesReports);
});

router.post("/register", async (req, res) => {
  const input = req.body;
  console.log(input);

  try {
    const { username, password, type } = input;
    if (type == "Individual") {
      const { email, first_name, last_name, country } = input;

      const oldEmailUser = await IndividualTrainee.findOne({ email });

      if (oldEmailUser) {
        throw "Email Already Exist. Please Login";
      }

      const oldUser = await IndividualTrainee.findOne({ username });

      if (oldUser) {
        throw "Username Already Exist. Please Login";
      }

      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);

      // Create user in our database
      await IndividualTrainee.create({
        username,
        first_name,
        last_name,
        country,
        email: email.toLowerCase(),
        password: encryptedPassword,
        profilePic:
          "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
      });
    } else if (type == "Admin") {
      const oldUser = await Administrator.findOne({ username });

      if (oldUser) {
        throw "Username Already Exist. Please Login";
      }

      encryptedPassword = await bcrypt.hash(password, 10);

      await Administrator.create({
        username,
        password: encryptedPassword,
        profilePic:
          "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
      });
    } else if (type == "Corporate") {
      const oldUser = await CorporateTrainee.findOne({ username });

      if (oldUser) {
        throw "Username Already Exist. Please Login";
      }

      encryptedPassword = await bcrypt.hash(password, 10);

      await CorporateTrainee.create({
        username,
        password: encryptedPassword,
        profilePic:
          "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
      });
    } else if (type == "Instructor") {
      const oldUser = await Instructor.findOne({ username });

      if (oldUser) {
        throw "Username Already Exist. Please Login";
      }

      encryptedPassword = await bcrypt.hash(password, 10);

      await Instructor.create({
        username,
        password: encryptedPassword,
        profilePic:
          "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      return res.status(400).send("All input is required");
    }
    const admin = await Administrator.findOne({ username });
    const instructor = await Instructor.findOne({ username });
    const corporateTrainee = await CorporateTrainee.findOne({ username });
    const individualTrainee = await IndividualTrainee.findOne({ username });

    const user = admin || instructor || corporateTrainee || individualTrainee;

    let type = "NoOne";
    let rating = 0;

    if (admin) {
      type = "admin";
    } else if (instructor) {
      type = "instructor";
      instructor.rating.forEach((element) => {
        rating += element;
      });
      rating /= instructor.rating.length;
    } else if (corporateTrainee) {
      type = "corporateTrainee";
    } else if (individualTrainee) {
      type = "individualTrainee";
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = {
        user_id: user._id,
        username,
        type: type,
        rating: rating,
        profilePic: user.profilePic,
        country: user.country,
        email: user.email,
        bio: user.bio,
      };
      req.session.user = payload;
      res.send(type);
    } else {
      res.send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/logout", async (req, res) => {
  req.session.user = null;
  res.send("success");
});

router.post("/reset-password", async (req, res) => {
  return await adminController.sendEmail(req.body.email);
});

router.put("/addReview", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const reviewer = req.body.reviewer;
  const courseID = req.body.courseID;
  const profilePic = req.body.profilePic;
  const newReview = {
    title: title,
    description: description,
    reviewer: reviewer,
    profilePic: profilePic,
  };
  try {
    Courses.findByIdAndUpdate(
      courseID,
      { $push: { reviews: newReview } },
      function (error, success) {
        if (error) {
          console.log(error);
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
  res.send("success");
});

router.put("/addReport", async (req, res) => {
  console.log(req.body);
  const type = req.body.type;
  const description = req.body.description;
  const reporter = req.body.reporter;
  const courseID = req.body.courseID;
  const profilePic = req.body.profilePic;
  const status = req.body.status;
  const reportID = mongoose.Types.ObjectId();
  const newReport = {
    reportID: reportID,
    type: type,
    description: description,
    reporter: reporter,
    profilePic: profilePic,
    status: status,
    seen: false,
  };
  Courses.findByIdAndUpdate(
    courseID,
    { $push: { reports: newReport } },
    function (error, success) {
      if (error) {
        console.log("error");
      } else {
        console.log("success");
      }
    }
  );
  res.send("success");
});

router.put("/updateEmail", async (req, res) => {
  const email = req.body.email;
  const user = req.body.user;
  individualTrainee.updateEmail(user, email);
  req.session.user.email = email;
  res.send("success!");
});

router.put("/updatePassword", async (req, res) => {
  const password = req.body.password;
  const user = req.body.user;
  individualTrainee.updatePassword(user, password);
  res.send("success!");
});

router.put("/updateBio", async (req, res) => {
  const bio = req.body.bio;
  const user = req.body.user;
  individualTrainee.updateBio(user, bio);
  req.session.user.bio = bio;
  res.send("success!");
});

router.post("/add-user", async (req, res) => {
  var index = req.body.index;
  if (index == 0) adminController.addAdmin(req.body);
  else if (index == 1) adminController.addInstructor(req.body);
  else if (index == 2) adminController.addCorporate(req.body);
});

router.post("/add-course", async (req, res) => {
  instructorController.addCourse(req.body);
  res.send("/instructor");
});

router.put("/add-exam", async (req, res) => {
  instructorController.addExam(req.body);
  instructorController.addQuestionToExam(req.body);
  res.send("/instructor");
});

router.get("/exams", async (req, res) => {
  const allExams = await individualTrainee.getExams();
  res.send(allExams);
});

router.post("/exam-session", async (req, res) => {
  const belongsToCourse = req.body.belongsToCourse;
  const name = req.body.name;
  const ExamQuestions = await individualTrainee.getSpecificExam(
    belongsToCourse,
    name
  );
  res.send(ExamQuestions);
});

router.put("/purchase-course", async (req, res) => {
  const user = req.body.username;
  const title = req.body.title;
  console.log(user + title);
  return await individualTrainee.addPurchasedCourse(user, title);
});

router.put("/add-discount", async (req, res) => {
  const courseName = req.body.courseName;
  const percentage = req.body.discountPercentage;
  console.log(percentage);
  const duration = req.body.discountDuration;
  return await instructorController.addDiscount(
    courseName,
    percentage,
    duration
  );
});

router.get("/getUsername", async (req, res) => {
  res.send(req.session.user.username);
});

router.get("/getEmail", async (req, res) => {
  res.send(req.session.user.email);
});

router.get("/getBio", async (req, res) => {
  res.send(req.session.user.bio);
});

router.get("/getCountry", async (req, res) => {
  if (req.session.user) res.send(req.session.user.country);
  else res.send("United States");
});

router.put("/changePassword/:username", async (req, res) => {
  if (
    req.body.oldPassword == "" ||
    req.body.newPassword1 == "" ||
    req.body.newPassword2 == ""
  )
    res.send({ errors: "All fields must be filled" });
  else {
    await Users.findOne({ username: req.params.username }).then(
      async (user) => {
        let errors = "";
        let match = false;
        match = await bcrypt.compare(req.body.oldPassword, user.password);
        if (match) {
          if (req.body.newPassword1 != req.body.newPassword2)
            errors = "New passwords don't match";
          else if (req.body.newPassword1 == req.body.oldPassword)
            errors = "New password cannot be the same as old password";
          else {
            try {
              const hashedPassword = await bcrypt.hash(
                req.body.newPassword1,
                10
              );
              user.password = hashedPassword;
              user.save();
              errors = "Password changed successfully!";
            } catch {
              res.send("oops");
            }
          }
        } else errors = "Incorrect old password";
        res.send({ errors: errors });
      }
    );
  }
});

module.exports = router;
