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
const bcrypt = require('bcrypt')
const router = express.Router();

router.get("/getType", async (req, res) => {
    if (req.session.user?.type)
        res.send(req.session.user.type);
    else {
        res.send('/');
    }
});

router.get('/getProfilePic', async (req, res) => {
    res.send(req.session.user.profilePic)
})

router.get("/getInstructorRating", async (req, res) => {
    res.send("" + req.session.user.rating);
});

router.post('/filterCourses', async (req, res) => {
    const { rating, subject, minPrice, maxPrice, searchTerm } = req.body;
    const realRating = [rating, 0];
    const courses = await Courses.find(
        {
            $and: [
                { rating: { $gte: realRating } },
                { subject: { $in: subject } },
                { price: { $gte: minPrice } },
                { price: { $lte: maxPrice } }, {
                    $or: [
                        {title: new RegExp(searchTerm, 'i')},
                        {subject: new RegExp(searchTerm, 'i')},
                        {givenBy: new RegExp(searchTerm, 'i')}
                    ]
                }
            ]
        }).exec().catch(() => res.status(400).send("database exploded"));
    console.log(courses)
    if (courses)
        res.send(courses);
})

router.get('/inbox', async (req, res) => {
    console.log(await guestController.getInbox('admin'))
    res.send(await guestController.getInbox('admin'))
})

router.get("/terms", function (req, res) {
    res.render("terms");
});

router.get("/admin", async (req, res) => {
    const allCourses = await guestController.getCourses();
    res.send(allCourses)
});

router.post("/register", async (req, res) => {
    const input = req.body
    console.log(input)

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
                throw "Username Already Exist. Please Login"
            }

            //Encrypt user password
            encryptedPassword = await bcrypt.hash(password, 10);

            // Create user in our database
            await IndividualTrainee.create({
                username, first_name, last_name, country,
                email: email.toLowerCase(),
                password: encryptedPassword,
                profilePic: 'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
            });
        }

        else if (type == "Admin") {

            const oldUser = await Administrator.findOne({ username });

            if (oldUser) {
                throw "Username Already Exist. Please Login"
            }

            encryptedPassword = await bcrypt.hash(password, 10);

            await Administrator.create({
                username,
                password: encryptedPassword,
                profilePic: 'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg',
            });
        }

        else if (type == "Corporate") {

            const oldUser = await CorporateTrainee.findOne({ username });

            if (oldUser) {
                throw "Username Already Exist. Please Login"
            }

            encryptedPassword = await bcrypt.hash(password, 10);

            await CorporateTrainee.create({
                username,
                password: encryptedPassword,
                profilePic: 'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
            });
        }

        else if (type == "Instructor") {

            const oldUser = await Instructor.findOne({ username });

            if (oldUser) {
                throw "Username Already Exist. Please Login"
            }

            encryptedPassword = await bcrypt.hash(password, 10);

            await Instructor.create({
                username,
                password: encryptedPassword,
                profilePic: 'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
            });
        }

    } catch (err) {
        console.log(err);
    }
});

router.post("/login", async (req, res) => {

    try {
        // Get user input
        const { username, password } = req.body;

        // Validate user input
        if (!(username && password)) {
            return res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const admin = await Administrator.findOne({ username });
        const instructor = await Instructor.findOne({ username });
        const corporateTrainee = await CorporateTrainee.findOne({ username });
        const individualTrainee = await IndividualTrainee.findOne({ username });

        const user = admin || instructor || corporateTrainee || individualTrainee;

        let type = "NoOne"
        let rating = 0

        if (admin) {
            type = "admin"
        }
        else if (instructor) {
            type = "instructor"
            instructor.rating.forEach(element => {
                rating += element;
            });
            rating /= instructor.rating.length;
        }
        else if (corporateTrainee) {
            type = "corporateTrainee"
        }
        else if (individualTrainee) {
            type = "individualTrainee"
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const payload = { user_id: user._id, username, type: type, rating: rating, profilePic: user.profilePic };
            // auth.createAndSendToken(res, payload);
            req.session.user = payload;

            res.send(type);
        }
        else {
            res.send("Invalid Credentials");
        }
    } catch (err) {
        console.log(err);
    }
});

router.get("/logout", async (req, res) => {
    req.session.user = null;
    res.send('success')
});

router.post("/reset-password", async (req, res) => {
    const str = req;
    return await adminController.sendEmail(JSON.parse(str).body.email)
});

router.post("/add-user", async (req, res) => {
    const str = req;
    //console.log(JSON.parse(str).body.index)
    var index = JSON.parse(str).body.index
    if (index == 0) adminController.addAdmin(JSON.parse(str).body);
    else if (index == 1) adminController.addInstructor(JSON.parse(str).body);
    else if (index == 2) adminController.addCorporate(JSON.parse(str).body);
    //adminController.addAdmin(JSON.parse(str).body);
    //res.send("/admin")
});

router.get("/instructor", async (req, res) => {
    const allCourses = await guestController.getCourses();
    res.send(allCourses);
});

router.get("/individual", async (req, res) => {
    if (!req.session.isLoggedIn)
        res.redirect('./login')
    else {
        const allCourses = await guestController.getCourses();
        res.render("individualTrainee", { data: '', courses: allCourses })
    }
});

router.get("/corporateTrainee", async (req, res) => {
    if (!req.session.isLoggedIn)
        res.redirect('./login')
    else {
        const allCourses = await guestController.getCourses();
        res.render("corporateTrainee", { data: '', courses: allCourses })
    }
});

router.post("/add-course", async (req, res) => {
    instructorController.addCourse(req.body);
    res.send("/instructor")
});

router.post("/add-exam", async (req, res) => {
    instructorController.addExam(req.body);
    instructorController.addQuestionToExam(req.body);
    res.send("/instructor")
});

router.get("/exams", async (req, res) => {
    const allExams = await individualTrainee.getExams()
    res.send(JSON.stringify(allExams))
});

router.post("/exam-session", async (req, res) => {
    const belongsToCourse = req.body.belongsToCourse;
    const name = req.body.name;
    const ExamQuestions = await individualTrainee.getSpecificExam(belongsToCourse, name)
    res.send(JSON.stringify(ExamQuestions))
    //console.log((ExamQuestions))
    //console.log("work****************")
    //res.send(JSON.stringify(ExamQuestions))
});


router.get("/getUsername", async (req, res) => {
    res.send(req.session.user);
})

router.get("/view-rating", async (req, res) => {
    // if(!req.session.isLoggedIn)
    //     res.redirect('./login')
    // else {
    const instructorRating = await instructorController.getMyRating("Instructor"); //should be updated with different instructors
    //console.log(instructorRating)
    res.send(JSON.stringify(instructorRating))
    //}
});
router.get("/view-instructorcourserating", async (req, res) => {
    // if(!req.session.isLoggedIn)
    //     res.redirect('./login')
    // else {
    const instructorCourseRating = await instructorController.getMyCoursesratings("Omar Ghoniem"); //should be updated with different instructors
    console.log(instructorCourseRating)
    res.send(JSON.stringify(instructorCourseRating))
    //}
});

// router.post("/add-question", async(req,res) => {
//     instructorController.addQuestionToExam(req.body);
//     res.render("instructor", {data: 'question added successfully'})
// });


router.put('/changePassword/:username', async (req, res) => {
    if (req.body.oldPassword == "" || req.body.newPassword1 == "" || req.body.newPassword2 == "")
        res.send({ errors: "All fields must be filled" })
    else {
        await Users.findOne({ username: req.params.username }).then(async (user) => {
            var errors = "";
            var match = false;
            match = await bcrypt.compare(req.body.oldPassword, user.password);
            if (match) {
                if (req.body.newPassword1 != req.body.newPassword2)
                    errors = "New passwords don't match";
                else if (req.body.newPassword1 == req.body.oldPassword)
                    errors = "New password cannot be the same as old password"
                else {
                    try {
                        const hashedPassword = await bcrypt.hash(req.body.newPassword1, 10);
                        user.password = hashedPassword;
                        user.save();
                        errors = "Password changed successfully!";
                    }
                    catch {
                        res.send("oops")
                    }
                }
            }
            else
                errors = "Incorrect old password";
            res.send({ errors: errors });
        })
    }
})

module.exports = router