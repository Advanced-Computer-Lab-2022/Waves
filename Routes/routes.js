const express = require("express");
const instructorController = require("../controller/InstructorController");
const adminController = require("../controller/AdminController");
const guestController = require("../controller/GuestController");
const individualTrainee = require("../controller/IndividualTraineeController");
const Administrator = require("../models/Users/Administrator");
const CorporateTrainee = require("../models/users/CorporateTrainee");
const IndividualTrainee = require("../models/users/IndividualTrainee");
const Instructor = require("../models/users/Instructor");
const Admin = require("../models/users/Administrator");
const Courses = require("../models/Courses");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const router = express.Router();
const nodemailer = require("nodemailer");
const RefundRequest = require("../models/RefundRequest");
const AccessRequest = require("../models/AccessRequest");

router.get("/getWallet", async (req, res) => {
  const username = req.session.user?.username;
  const type = req.session.user?.type;

  let user = { wallet: 0 };

  if (type == "individualTrainee") {
    user = await IndividualTrainee.findOne(
      { username },
      { _id: 0, wallet: 1 }
    ).exec();
  } else if (type == "corporateTrainee") {
    user = await CorporateTrainee.findOne(
      { username },
      { _id: 0, wallet: 1 }
    ).exec();
  } else if (type == "instructor") {
    user = await Instructor.findOne({ username }, { _id: 0, wallet: 1 }).exec();
  }
  res.send(user?.wallet + "");
});

router.post("/grantAccessRequest", async (req, res) => {
  const { accessRequest } = req.body;
  const courseTitle = accessRequest.courseTitle;
  const username = accessRequest.username;

  const user = await CorporateTrainee.findOne({ username }).exec();
  let done;
  if (user) {
    const course = await Courses.findOne(
      { title: courseTitle },
      { _id: 0, chapters: 1 }
    ).exec();

    const courseChapters = course.chapters;
    const chapters = [];
    courseChapters.forEach((chapter) => {
      chapters.push({ sectionName: chapter.description, done: false });
    });
    await adminController.addCourseToCopTrainee(
      username,
      courseTitle,
      chapters
    );

    await AccessRequest.deleteOne({
      username: username,
      courseTitle: courseTitle,
    });
    res.send("Access Granted!");
  } else {
    res.send("Access Not Granted!");
  }
});

router.post("/denyAccessRequest", async (req, res) => {
  const { accessRequest } = req.body;
  const courseTitle = accessRequest.courseTitle;
  const username = accessRequest.username;
  console.log(username);
  console.log(courseTitle);
  await AccessRequest.deleteOne({
    username: username,
    courseTitle: courseTitle,
  });
  res.send("Access Denied!");
});

router.post("/getAccessRequests", async (req, res) => {
  const { username } = req.body;
  const accessRequests = await AccessRequest.find({
    username: username,
  }).exec();
  res.send(accessRequests);
});

router.post("/requestAccess", async (req, res) => {
  console.log(req.body);
  const { courseTitle, courseImg } = req.body;
  const username = req.session.user?.username;
  const accessRequest = new AccessRequest({
    username,
    courseTitle,
    courseImg,
  });
  await accessRequest.save();
  res.send("Access Request Sent");
});

router.post("/acceptRefundRequest", async (req, res) => {
  const { refundRequest } = req.body;
  const courseTitle = refundRequest.courseTitle;
  const username = refundRequest.username;
  const course = await Courses.findOne(
    { title: courseTitle },
    { price: 1, _id: 0 }
  ).exec();
  console.log(course);
  const price = course.price;
  const user = await IndividualTrainee.findOne({ username }).exec();
  if (user) {
    if (user.wallet) {
      const newWallet = user.wallet + price;
      await IndividualTrainee.updateOne(
        { username },
        { wallet: newWallet }
      ).exec();
    } else {
      await IndividualTrainee.updateOne({ username }, { wallet: price }).exec();
    }
    await IndividualTrainee.updateOne(
      { username },
      { $pull: { courses: { courseTitle: courseTitle } } }
    );
  } else {
    const user = await CorporateTrainee.findOne({ username }).exec();
    if (user) {
      if (user.wallet) {
        const newWallet = user.wallet + price;
        await CorporateTrainee.updateOne(
          { username },
          { wallet: newWallet }
        ).exec();
      } else {
        await CorporateTrainee.updateOne(
          { username },
          { wallet: price }
        ).exec();
      }
      await CorporateTrainee.updateOne(
        { username },
        { $pull: { courses: { courseTitle: courseTitle } } }
      );
    }
  }
  await RefundRequest.deleteOne({
    username: username,
    courseTitle: courseTitle,
  });
  res.send("Refund Accepted!");
});

router.post("/rejectRefundRequest", async (req, res) => {
  const { refundRequest } = req.body;
  const courseTitle = refundRequest.courseTitle;
  const username = refundRequest.username;
  console.log(username);
  console.log(courseTitle);
  await RefundRequest.deleteOne({
    username: username,
    courseTitle: courseTitle,
  });
  res.send("Refund Rejected!");
});

router.get("/getRefundRequests", async (req, res) => {
  const refundRequests = await RefundRequest.find({}).exec();
  res.send(refundRequests);
});

router.post("/requestRefund", async (req, res) => {
  console.log(req.body);
  const { courseTitle, courseImg } = req.body;
  const username = req.session.user?.username;
  const refundRequest = new RefundRequest({
    courseTitle,
    username,
    courseImg,
  });
  await refundRequest.save();
  res.send("Refund Request Sent");
});

router.post("/checkPurchasedCourse", async (req, res) => {
  const { courseTitle } = req.body;
  if (!req.session.user || req.session.user?.type == "admin") res.send(false);

  const user = await (() => {
    if (req.session.user?.type == "individualTrainee")
      return IndividualTrainee.findOne({
        username: req.session.user.username,
      });

    if (req.session.user?.type == "corporateTrainee")
      return CorporateTrainee.findOne({
        username: req.session.user.username,
      });

    // if (req.session.user?.type == "instructor")
    //   return Instructor.findOne({ username: req.session.user.username });
  })();
  if (user)
    res.send(user.courses.some((course) => course.courseTitle === courseTitle));
});

router.get("/getCorporateTrainees", async (req, res) => {
  const corporateTrainees = await CorporateTrainee.find({}).exec();
  res.send(corporateTrainees);
});
router.get("/getInstructors", async (req, res) => {
  const Instructors = await Instructor.find({}).exec();
  res.send(Instructors);
});
router.get("/getAdmins", async (req, res) => {
  const Admins = await Admin.find({}).exec();
  res.send(Admins);
});
router.get("/getIndividualTrainees", async (req, res) => {
  const trainee = await IndividualTrainee.find({}).exec();
  res.send(trainee);
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

router.get("/getMyRating", async (req, res) => {
  instructorController.getMyRating(req.session.user.username);
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

router.post("/getProgresses", async (req, res) => {
  const { courseTitle } = req.body;
  const user = await (() => {
    if (req.session.user?.type == "individualTrainee")
      return IndividualTrainee.findOne({
        username: req.session.user.username,
      });

    if (req.session.user?.type == "corporateTrainee")
      return CorporateTrainee.findOne({
        username: req.session.user.username,
      });
  })();

  if (user) {
    const userProgresses = [];
    const course = user.courses.find(
      (course) => course.courseTitle == courseTitle
    );

    course.chapters.forEach((chapter) => {
      userProgresses.push(chapter.done);
    });
    if (course) {
      res.send(userProgresses);
    } else {
      res.send(false);
    }
  } else {
    res.send(false);
  }
});

async function getCourseProgress(username, type, courseTitle) {
  let done = 0;

  let course;

  if (type == "individualTrainee") {
    course = await IndividualTrainee.findOne(
      { username, courses: { $elemMatch: { courseTitle: courseTitle } } },
      { _id: 0, courses: 1 }
    );
  } else if (type == "corporateTrainee") {
    course = await CorporateTrainee.findOne(
      { username, courses: { $elemMatch: { courseTitle: courseTitle } } },
      { _id: 0, courses: 1 }
    );
  } else {
    return "0";
  }
  if (course) {
    const correctCourse = course.courses.find(
      (course) => course.courseTitle == courseTitle
    );
    correctCourse.chapters.forEach((chapter) => {
      if (chapter.done) done++;
    });
    return (done / course.courses[0].chapters.length) * 100;
  }

  return "0";
}

async function sendEmail(email, courseName, username) {
  // Step 1
  let transporter = nodemailer.createTransport({
    service: "gmail",
    user: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "login",
      user: "alienlearning8@gmail.com",
      pass: "gzwqfqhlcodrldze",
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
  // Step 2
  let mailOptions = {
    from: "alienlearning8@gmail.com",
    to: email,
    subject: "Course Completion",
    //text: 'Click the following link to reset your password',
    html:
      "Congratulations " +
      username +
      "! You have completed the course " +
      courseName +
      " and your certificate is attached to this email.",
  };

  // Step 3
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("ErrorOccurs: ", err);
    } else {
      console.log("Email sent!!!!");
    }
  });
}

router.post("/sendMail", async (req, res) => {
  const { courseName } = req.body;
  const username = req.session.user?.username;
  const type = req.session.user?.type;
  let course;
  if (type == "individualTrainee") {
    course = await IndividualTrainee.findOne(
      { username, "courses.courseTitle": courseName },
      { _id: 0, "courses.certificateSent": 1, "courses.courseTitle": 1 }
    );
  } else if (type == "corporateTrainee") {
    course = await CorporateTrainee.findOne(
      { username, "courses.courseTitle": courseName },
      { _id: 0, "courses.certificateSent": 1, "courses.courseTitle": 1 }
    );
  }
  console.log(
    course.courses.find((course) => course.courseTitle == courseName)
      .certificateSent
  );
  if (
    !course.courses.find((course) => course.courseTitle == courseName)
      .certificateSent
  ) {
    if (type == "individualTrainee") {
      sendEmail(req.session.user.email, courseName, username);
      await IndividualTrainee.updateOne(
        { username, "courses.courseTitle": courseName },
        {
          $set: {
            "courses.$.certificateSent": true,
          },
        }
      );
    } else if (type == "corporateTrainee") {
      sendEmail(req.session.user.email, courseName, username);
      await IndividualTrainee.updateOne(
        { username, "courses.courseTitle": courseName },
        {
          $set: {
            "courses.$.certificateSent": true,
          },
        }
      );
    } else {
      res.send("already sent");
    }
  }
  console.log(course);
});

router.post("/getProgress", async (req, res) => {
  const { courseName } = req.body;
  const username = req.session.user?.username;
  const type = req.session.user?.type;
  const progress = await getCourseProgress(username, type, courseName);
  if (progress) {
    res.send(progress + "");
  } else {
    res.send("0");
  }
});

router.post("/addProgress", async (req, res) => {
  const section = req.body.section;
  const courseTitle = req.body.courseTitle;

  let updated;

  const username = req.session.user.username;

  const filter = {
    username,
  };
  const update = {
    $set: {
      "courses.$[c].chapters.$[s].done": true,
    },
  };
  const options = {
    arrayFilters: [
      { "c.courseTitle": courseTitle },
      { "s.sectionName": section },
    ],
  };

  if (req.session.user?.type == "individualTrainee") {
    updated = await IndividualTrainee.updateOne(filter, update, options);
    if (updated) {
      const courseProgress = await getCourseProgress(
        req.session.user.username,
        req.session.user?.type,
        courseTitle
      );
      if (courseProgress) {
        await IndividualTrainee.updateOne(
          { username, "courses.courseTitle": courseTitle },
          {
            $set: {
              "courses.$.progress": courseProgress,
            },
          }
        );
      }

      res.send(courseProgress + "");
    } else {
      res.send(false);
    }
  } else if (req.session.user?.type == "corporateTrainee") {
    updated = await CorporateTrainee.updateOne(filter, update, options);

    if (updated) {
      const courseProgress = await getCourseProgress(
        req.session.user.username,
        req.session.user?.type,
        courseTitle
      );
      if (courseProgress) {
        await CorporateTrainee.updateOne(
          { username, "courses.courseTitle": courseTitle },
          {
            $set: {
              "courses.$.progress": courseProgress,
            },
          }
        );
      }
    } else {
      res.send(false);
    }
  } else {
    res.send(false);
  }
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

router.post("/addAdmin", async (req, res) => {
  await adminController.addAdmin(req.body);
});
router.post("/addInstructor", async (req, res) => {
  await adminController.addInstructor(req.body);
});
router.post("/addCopTrainee", async (req, res) => {
  await adminController.addCorporate(req.body);
});

router.put("/addCourseToCopTrainee", async (req, res) => {
  const user = req.body.username;
  const title = req.body.title;
  const course = await Courses.findOne(
    { title: title },
    { _id: 0, chapters: 1 }
  ).exec();

  const courseChapters = course.chapters;
  const chapters = [];
  courseChapters.forEach((chapter) => {
    chapters.push({ sectionName: chapter.description, done: false });
  });
  return await adminController.addCourseToCopTrainee(user, title, chapters);
});

router.put("/rateCourse", async (req, res) => {
  const courseName = req.body.courseName;
  const courseRating = req.body.courseRating;
  individualTrainee.adjustRating(courseName, courseRating);
  res.send("success!");
});
router.put("/rateInstructor", async (req, res) => {
  const name = req.body.name;
  const rating = req.body.rating;
  individualTrainee.adjustRating2(name, rating);
  res.send("success!");
});

// router.post("/add-course", async (req, res) => {
//   instructorController.addCourse(req.body);
//   res.send("/instructor");
// });

router.post("/addCourse", async (req, res) => {
  instructorController.addCourse(req.body, req.session.user?.username);
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
  const courseChapters = req.body.courseChapters;
  const chapters = [];
  courseChapters.forEach((chapter) => {
    chapters.push({ sectionName: chapter.description, done: false });
  });
  const instructor = req.body.courseInstructor;
  const coursePrice = req.body.coursePrice;

  const userInstructor = await Instructor.findOne(
    { instructor },
    { _id: 0, wallet: 1 }
  ).exec();

  let wallet = 0;
  if (userInstructor.wallet) wallet = userInstructor.wallet;

  await Instructor.updateOne(
    { instructor },
    { wallet: wallet + +coursePrice.slice(1, coursePrice.length - 1) }
  ).exec();

  return await individualTrainee.addPurchasedCourse(user, title, chapters);
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
  res.send(req.session.user?.username);
});

router.get("/getEmail", async (req, res) => {
  res.send(req.session.user?.email);
});

router.get("/getBio", async (req, res) => {
  res.send(req.session.user?.bio);
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
