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
const CircularJSON = require('circular-json')
const bcrypt = require('bcrypt')
const router = express.Router();

router.get("/", async (req, res) => {
    if (req.session.user?.type == "admin") {
        res.send("/admin")
    }
    else if (req.session.user?.type == "individual") {
        res.send("/individual")
    }
    else if (req.session.user?.type == "corporate") {
        res.send("/corporateTrainee")
    }
    else if (req.session.user?.type == "instructor") {
        res.send("/instructor")
    }
    else {
        res.send("/")
    }
});

router.get('/getProfilePic', async (req, res) => {
    res.send(req.session.user.profilePic)
})

router.get("/getInstructorRating", async (req, res) => {
    res.send(""+req.session.user.rating);
});

router.post('/filterCourses', async (req, res) => {
    // const str = CircularJSON.stringify(req.body);
    const { rating, subject, minPrice, maxPrice } = req.body;
    const realRating = [rating, 0];
    console.log(req.session);
    const courses = await Courses.find(
        {
            $and: [
                { rating: { $gte: realRating} },
                { subject: { $in: subject } },
                { price: { $gte: minPrice } },
                { price: { $lte: maxPrice } },
            ]
        }).exec().catch(() => res.status(400).send("database exploded"));
    // console.log(courses)
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
    // Our register logic starts here
    try {
        // Get user input

        const { username, password, type } = input;
        if (type == "Individual") {

            const { email, first_name, last_name, country } = input;

            // check if user already exist
            // Validate if user exist in our database

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

            // check if user already exist
            // Validate if user exist in our database

            const oldUser = await Administrator.findOne({ username });

            if (oldUser) {
                throw "Username Already Exist. Please Login"
            }

            //Encrypt user password
            encryptedPassword = await bcrypt.hash(password, 10);

            // Create user in our database
            await Administrator.create({
                username,
                password: encryptedPassword,
                profilePic: 'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg',
            });
        }

        else if (type == "Corporate") {


            // check if user already exist
            // Validate if user exist in our database

            const oldUser = await CorporateTrainee.findOne({ username });

            if (oldUser) {
                throw "Username Already Exist. Please Login"
            }

            //Encrypt user password
            encryptedPassword = await bcrypt.hash(password, 10);

            // Create user in our database
            await CorporateTrainee.create({
                username,
                password: encryptedPassword,
                profilePic: 'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
            });
        }

        else if (type == "Instructor") {


            // check if user already exist
            // Validate if user exist in our database

            const oldUser = await Instructor.findOne({ username });

            if (oldUser) {
                throw "Username Already Exist. Please Login"
            }

            //Encrypt user password
            encryptedPassword = await bcrypt.hash(password, 10);

            // Create user in our database
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

router.post("/sign-up", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = await userModel.create({ name: name, email: email, password: hashedPassword });
        const token = createToken(user.name);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
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
            const payload = { user_id: user._id, username, type: type, rating: rating, profilePic: user.profilePic};
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
    return res.clearCookie("jwt").status(200).json({ message: "Successfully logged out" });
});

router.post("/reset-password", async(req,res) => {
    const str = CircularJSON.stringify(req);
    return await adminController.sendEmail(JSON.parse(str).body.email)
});

router.post("/search", async (req, res) => {
    const user = req.session.user
    const filteredCourses = await guestController.searchFilterCourses(req.body.searchTerm, req.body.rating, req.body.subject, req.body.price);
    if (user == "admin") {
        res.render(user, { data: '', courses: filteredCourses })
    }
    else if (user == "individual") {
        res.render(user, { data: '', courses: filteredCourses })
    }
    else if (user == "corporate") {
        res.render("corporateTrainee", { data: '', courses: filteredCourses })
    }
    else if (user == "instructor") {
        const myFilteredCourses = await instructorController.getMyCourses(filteredCourses, req.session.username);
        if (req.body.showMyCourses)
            //res.render("instructor", {data: '', courses: myFilteredCourses})
            res.send(filteredCourses)
        else
            res.render("instructor", { data: '', courses: filteredCourses })
    }
});

router.post("/add-user", async (req, res) => {
    const str = CircularJSON.stringify(req);
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
    const str = CircularJSON.stringify(req);
    //console.log(JSON.parse(str))
    instructorController.addCourse(JSON.parse(str).body);
    res.send("/instructor")
});

router.post("/add-exam", async (req, res) => {
    const str = CircularJSON.stringify(req);
    console.log(JSON.parse(str))
    instructorController.addExam(JSON.parse(str).body);
    instructorController.addQuestionToExam(JSON.parse(str).body);
    res.send("/instructor")
});

router.get("/exams", async (req, res) => {
    // const allCourses = await guestController.getCourses();
    // res.send(JSON.stringify(allCourses))
    const allExams = await individualTrainee.getExams()
    console.log(JSON.stringify(allExams))
    res.send(JSON.stringify(allExams))
});

router.post("/exam-session", async (req, res) => {
    const str = CircularJSON.stringify(req);
    const belongsToCourse = JSON.parse(JSON.stringify(JSON.parse(str).body)).belongsToCourse;
    const name = JSON.parse(JSON.stringify(JSON.parse(str).body)).name;
    const ExamQuestions = await individualTrainee.getSpecificExam(belongsToCourse, name)
    res.send(JSON.stringify(ExamQuestions))
    //console.log((ExamQuestions))
    //console.log("work****************")
    //res.send(JSON.stringify(ExamQuestions))
});


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