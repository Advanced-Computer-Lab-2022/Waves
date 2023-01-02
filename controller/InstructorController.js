//const mongoose = require("mongoose");
//var router = express.Router();

const Courses = require("../models/Courses");
const Chapter = require("../models/Chapter");
const Question = require("../models/Question");
const Exam = require("../models/Exam");
const Instructor = require("../models/users/Instructor");
function addCourse(body, username) {
  const newCourse = new Courses({
    title: body.courseTitle,
    subtitles: [
      {
        name: body.courseSubtitles[0],
        exercise: body.examQuestions[0],
        videoLink: body.subtitleVideos[0],
        description: body.subtitleDescriptions[0],
      },
      {
        name: body.courseSubtitles[1],
        exercise: body.examQuestions[1],
        videoLink: body.subtitleVideos[1],
        description: body.subtitleDescriptions[1],
      },
      {
        name: body.courseSubtitles[2],
        exercise: body.examQuestions[2],
        videoLink: body.subtitleVideos[2],
        description: body.subtitleDescriptions[2],
      },
    ],
    price: body.coursePrice,
    img: body.courseImage,
    videoLinks: body.subtitleVideos,
    description: body.courseSummary,
    totalHours: body.courseTotalHours,
    rating: [1.2, 79],
    subject: body.courseSubject,
    videoPreview: body.previewLink,
    givenBy: username,
    chapters: [
      {
        name: body.courseSubtitles[0],
        exercise: body.examQuestions[0],
        videoLink: body.subtitleVideos[0],
        description: body.subtitleDescriptions[0],
      },
      {
        name: body.courseSubtitles[1],
        exercise: body.examQuestions[1],
        videoLink: body.subtitleVideos[1],
        description: body.subtitleDescriptions[1],
      },
      {
        name: body.courseSubtitles[2],
        exercise: body.examQuestions[2],
        videoLink: body.subtitleVideos[2],
        description: body.subtitleDescriptions[2],
      },
    ], //recently added
  });
  newCourse.save();
}

async function getMyCourses(courses, username) {
  return courses.filter((item) => item.givenBy == username);
}

function addExam(body) {
  const newExam = new Exam({
    belongsToCourse: body.belongsToCourse,
    name: body.belongsToExam,
  });
  newExam.save();
}
async function addQuestionToExam(body) {
  const newQuestion = new Question({
    belongsToExam: body.belongsToExam,
    question: body.question,
    c1: body.c1,
    c2: body.c2,
    c3: body.c3,
    c4: body.c4,
    solution: body.solution,
  });
  newQuestion.save();

  await Exam.findOneAndUpdate(
    { belongsToCourse: body.belongsToCourse, name: body.belongsToExam },
    {
      $addToSet: {
        questions: newQuestion,
      },
    }
  );
}
async function getMyRating(name) {
  const thisinstructor = await Instructor.findOne({ username: name }).exec();
  return thisinstructor.rating;
}

async function getinstructorAvgRatings(instructorename) {
  let insInstructor = await Instructor.find({
    username: instructorname,
  }).exec();
  TotalRatings = insInstructor.rating.length;
  sum = 0;

  insInstructor.rating.forEach((instructor) => {
    sum = sum + instructor[1];
  });
  Avgratings = sum / TotalRatings;

  FinalRating = [Avgratings, TotalRatings];

  return FinalRating;
}

async function addDiscount(courseName, amount, duration) {
  await Courses.findOneAndUpdate(
    { title: courseName },
    {
      $set: {
        discountPercentage: amount,
        discountDuration: duration,
      },
    }
  );
}

module.exports = {
  addCourse,
  getMyCourses,
  addExam,
  addQuestionToExam,
  getMyRating,
  getinstructorAvgRatings,
  addDiscount,
};
//res.render("guest");
