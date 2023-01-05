## Project Title

Online Learning System

## About The Project

This project is for a university course, alongside this what motivated us to put effort in it is that it enhanced our skills and made us more aware of github and the usage of MERN STACK.
## Course 

Advanced Computer Lab (CSEN 704) , Winter 2022.
## Theme 

The theme of the project, is to create a complete Online Learning System, through our website a user can enroll in a course and see his/her progression and take exercises related to the course.
## Overview 

We implement this project following the Agile methodology, as the project is divided into 3 sprints. Each sprint has a specific deadline and a specific amount of time. Through this period , we should deliver fully functioning code with specific System requirements which were function and non-functional.
## Objectives

• Learn how to properly use the Agile Methodology to plan out a project and develop
the software.

• Learn the process of following a given set of System Requirements to develop a
software.

• Learn to research and master the use of the MERN Stack.

• Learn how to work together as a team on GitHub.

## Build status

The project currently has some minor issues:

• The add discount feature is not working as intended

• "Change payment method" button in purchase course page is not assigned a function

• UI/UX needs improvement in some of the pages

• Different country selection needs to be handeled

## Code Style

The code style is enforced using 'eslint'

## Screenshots

[HomePage]:

![homepage](https://user-images.githubusercontent.com/108385626/210191112-7ae69402-8ea8-4b10-bb8f-5295b96aa337.png)

[Login]:

![login](https://user-images.githubusercontent.com/108385626/210191204-b6dcd5eb-b876-47b3-a704-bfb2276b6495.png)

[SignUp]:

![signup](https://user-images.githubusercontent.com/108385626/210191208-4fcbed55-fda8-4ad4-93cd-174438e1ad4d.png)

[ViewCourse]:

![c1](https://user-images.githubusercontent.com/108385626/210191231-0fe691bb-cee2-43a0-96e9-cbe9128ef05f.png)
![c2](https://user-images.githubusercontent.com/108385626/210191251-788b4126-4466-4a56-8d3c-229a3f200365.png)
![c3](https://user-images.githubusercontent.com/108385626/210191245-b57d1728-80cb-4bc0-a8d1-71b496e7e0c9.png)




## Features

The system serves different types of users (Admin, Instructor , Individual Trainee, Corporate Trainee, and Guest)

### As an Admin I could

• view reported problems

• mark reported problems as "resolved" or "pending"

• refund an amount to a trainee to their wallet

• add another administrator with a set username and password

• add instructors and create their usernames and passwords

• add corporate trainees and create their usernames and passwords

• view course requests from corporate trainees

• grant corporate trainees access to specific courses

• set a promotion (% sale) for specific courses, several courses or all courses

### As an Instructor I could

• view and accept the contract which includes all the rights to the posted videos and materials as well as the % taken by the company on each video per registered trainee

• view all the titles of the courses given by him/her

• filter the courses given by him/her based on a subject or price

• search for a course given by him/her based on course title or subject or instructor

• view the ratings and reviews on all his/her courses

• view the amount of money owed per month

• create a new course and fill in all its details inclding title, subtitles, price and short summary about the entire course

• upload a video link from YouTube under each subtitle and enter a short description of the video

• upload a video link from YouTube as a preview to the course

• create a multiple choice exam with 4 choices per question

• set the answers (not visible for the trainee) for multiple choice exercises

• view his/her rating and reviews as an instructor

• edit his/her mini biography or email

• define a promotion for the course (% discount) and for how long

### As an Individual Trainee I could

• request a refund only if less than 50% of the course has been attended

• view the amount available in their wallet from refunded courses

### As an Corporate Trainee I could

• request access to a specific course they do not have access to

### As an Guest I could

• sign up for an account as an individual trainee using a username, email, password, first name, last name and gender

### As an Instructor/individual Trainee/Corporate Trainee I could

• log in using a username and password

• log out

• change his/her password

• receive an email to change a forgotten password

• report a problem with a course. The problem can be "technical", "financial" or "other"

• see all previously repoted problems and their statuses

• follow up on an unresolved problem

### As an individual Trainee/Corporate Trainee I could

• open all the items inside a course he/she is registered for including videos and excercises

• rate an instructor 

• rate a course

• solve a multiple choice exercise by choosing the correct answer

• submit the answers to the exercise after completing it

• view his/her grade from the exercise

• view the questions with the correct solution to view the incorrect answers

• watch a video from a course he/she is registered for

• see his/her progress in the course as a percentage of how much of the course has been completed so far

• receive a certificate as a PDF after completing the course via email

• download the certificate as a PDF from the website

• write notes while watching the video

• download the notes as a PDF

• see a list of all the courses he/she is enrolled in on their profile

### As an Guest/Instructor/individual Trainee/Corporate Trainee I could

• select their country 

• view all the titles of the courses available including the total hours of the course and course rating

• filter the courses based on a subject and/or rating

• search for a course based on course title or subject or instructor

• view a preview video of the course and the course outline before registering for it

• view the most viewed/ most popular courses

### As an Guest/Instructor/individual Trainee I could

• view and accept the website/ company refund/ payment policy while signing up

• view the price of each course

• filter the courses based on price (price can be FREE)

• choose a course from the results and view (but not open) its details including course subtitles, excercises , total hours of each subtitle, total hours of the course and price (including % discount if applicable) according to the country selected

## Installation

Run the following in the root folder of the project and in the Frontend folder to install needed packages
```command line
npm i
```

## How to use

Run the following command in the root folder of the project 
```command line
npm start
```
Run the following commands in the Frontend folder in a seperate termianl window
```command line
cd frontend
```
```command line
npm start
```

## Tools and Frameworks

We use MERN Stack (MongoDB, Express, React, Node) to implement our Website.

Frontend :

#### React.js : 
React is a front-end JavaScript library for creating user interfaces using UI components that is free and open-source. Meta and a community of individual developers and businesses support it. React can be used to create single-page or mobile applications as a foundation.

#### Bootstrap : 
Bootstrap is a free and open-source CSS framework for front-end web development that is responsive and mobile-first. It includes design templates for typography, forms, buttons, navigation, and other interface elements that are based on CSS and JavaScript.

#### MUI : 
MUI is a React User Interface Library. MUI is a comprehensive, flexible, and easily available library of foundational and advanced components that allows you to create your own design system and construct React apps more quickly.

Backend and Database:

#### Node.js : 
Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.

#### Express.js: 
Express.js or simply Express, is a back end web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.

#### MongoDB: 
MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License.
## Usage

#### HomePage 
This is the first page the user encounters when he/she opens the website. It shows all the available courses and 2 options to login or sign up

#### Login
This is a login form for users

#### SignUp 
For guest users this is a form to fill his/her information and be a user

#### ViewCourse
Shows all the details regarding a specific course and renders differently whether the user purchased the course or not

#### PurchaseCourse
Shows purchase details regarding a course which include the name of the course, its price, discount, and total payment

#### Account
Shows user information and option to update any of his/her information

#### AddCourse
Contains form to add a new course with exercises

#### ViewReports
 allows an admin to view all reports regarding courses

#### ViewUsers
 different pages that show all corporate trainess, instructors, and admins

#### ExerciseSession
 page where the user can solve an exercise 

## API Reference

```javascript
router.get("/getWallet", async (req, res)) 
router.post("/grantAccessRequest", async (req, res))
router.post("/denyAccessRequest", async (req, res)) 
router.post("/getAccessRequests", async (req, res)) 
router.post("/requestAccess", async (req, res))
router.post("/acceptRefundRequest", async (req, res)) 
router.post("/rejectRefundRequest", async (req, res)) 
router.get("/getRefundRequests", async (req, res)) 
router.post("/requestRefund", async (req, res)) 
router.post("/checkPurchasedCourse", async (req, res)) 
router.get("/getCorporateTrainees", async (req, res)) 
router.get("/getInstructors", async (req, res))
router.get("/getAdmins", async (req, res))
router.get("/getIndividualTrainees", async (req, res)) 
router.get("/getCourses", async (req, res)) 
router.get("/getType", async (req, res)) 
router.get("/getMyRating", async (req, res)) 
router.get("/getProfilePic", async (req, res))
router.get("/getInstructorRating", async (req, res))
router.post("/updateReportStatus", async (req, res))
router.post("/getProgresses", async (req, res))
router.post("/sendMail", async (req, res))
router.post("/getProgress", async (req, res)) 
router.post("/addProgress", async (req, res)) 
router.post("/updateReportSeen", async (req, res)) 
router.post("/filterCourses", async (req, res))
router.get("/getReports", async (req, res))
router.post("/register", async (req, res))
router.post("/login", async (req, res))
router.get("/logout", async (req, res))
router.post("/reset-password", async (req, res))
router.put("/addReview", async (req, res))
router.put("/addReport", async (req, res))
router.put("/updateEmail", async (req, res)) 
router.put("/updatePassword", async (req, res))
router.put("/updateBio", async (req, res)) 
router.post("/add-user", async (req, res))
router.post("/addAdmin", async (req, res))
router.post("/addInstructor", async (req, res)) 
router.post("/addCopTrainee", async (req, res))
router.put("/addCourseToCopTrainee", async (req, res)) 
router.put("/rateCourse", async (req, res)) 
router.put("/rateInstructor", async (req, res))
router.post("/addCourse", async (req, res))
router.put("/add-exam", async (req, res))
router.get("/exams", async (req, res))
router.post("/exam-session", async (req, res))
router.put("/purchase-course", async (req, res))
router.put("/add-discount", async (req, res))
router.get("/getUsername", async (req, res))
router.get("/getEmail", async (req, res))
router.get("/getBio", async (req, res))
router.get("/getCountry", async (req, res))
router.put("/changePassword/:username", async (req, res))
module.exports = router;
```

## Code Examples

### Admin Model
```javascript
var mongoose = require("mongoose");
var AdministratorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  inbox: {
    type: Array,
    require: false
  },
  token: {
    type: String
  },
  profilePic:{
    type: String,
  },
  country: {
    type:String
  },
  bio:{
    type: String
  }
});

function loadModel(modelName, modelSchema) {
    return mongoose.models[modelName] // Check if the model exists
      ? mongoose.model(modelName) // If true, only retrieve it
      : mongoose.model(modelName, modelSchema) // If false, define it
}
var Administrator = loadModel("Administrators", AdministratorSchema);
module.exports = Administrator
```
### MyCourses Page
```javascript
useEffect(() => {

        axios.get('http://localhost:3001/getUsername', { withCredentials: true }).then(response => {
            setUsername(response.data);
        })

        axios.get('http://localhost:3001/getMyCourses', { withCredentials: true }).then(response => {
            setCourseTitles(response.data);
        })

        axios.get('http://localhost:3001/getType', { withCredentials: true }).then(response => {

            if (response.data == 'admin') {
                setPages(adminPages);
                setIsNotLoggedIn(false);
            }

            else if (response.data == 'instructor') {
                setPages(instructorPages);
                setIsNotLoggedIn(false);
            }

            else if (response.data == 'individualTrainee') {
                setPages(individualPages);
                setIsNotLoggedIn(false);
            }

            else if (response.data == 'corporateTrainee') {
                setPages(corporatePages);
                setIsNotLoggedIn(false);
            }

            else {
                setPages(guestPages);
                setIsNotLoggedIn(true);
            }
            setType(response.data)
        })
    }, []);

```
### Add Exam Function in the Instructor Controller
```javascript
function addExam(body) {
  const newExam = new Exam({
    belongsToCourse: body.belongsToCourse,
    name: body.belongsToExam,
  });
  newExam.save();
}
```

## Tests

We used to run the backend API endpoints on Postman to test 

## Contribution

You can contribute to the website using the following link : 

https://github.com/Advanced-Computer-Lab-2022/Waves

## License

The software is open source under the ISC License.

https://opensource.org/licenses/ISC

## Credits

https://mui.com/ 

https://stackoverflow.com 

https://www.geeksforgeeks.org

## Contact

People responsible for the project: 

Adam Samy --> Email:(adam.abouelmagd@student.guc.edu.eg)

Zeyad Ayman --> Email:(zeyad.elsayed@student.guc.edu.eg) 

Omar Samy--> Email:(omar.ghoniem@student.guc.edu.eg) 

Rola Rafik --> Email:(rola.gergis@student.guc.edu.eg)

Mostafa Moharram--> Email:(Mostafa.Moharram@student.guc.edu.eg)

Project Link: https://github.com/Advanced-Computer-Lab-2022/Waves



