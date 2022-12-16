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

router.get('/getCorporateTrainees', async (req, res) => {
    const corporateTrainees = await CorporateTrainee.find({}).exec();
    res.send(corporateTrainees);
})

router.get('/getCourses', async (req, res) => {
    const allCourses = await guestController.getCourses();
    res.send(allCourses)
})

router.get('/getMyCourses', async (req, res) => {
    const userCourses = await (() => {
        if (req.session.user?.type == 'individualTrainee') return IndividualTrainee.findOne({ username: req.session.user.username })

        if (req.session.user?.type == 'corporateTrainee') return CorporateTrainee.findOne({ username: req.session.user.username })

        throw "";
    })().catch(() => null);

    if (!userCourses) return res.status(400).send("database exploded");

    res.send(userCourses.courses);
})

router.get("/getType", async (req, res) => {
    if (req.session.user?.type)
        res.send(req.session.user.type);
    else {
        res.send('/');
    }
});

router.get('/getProfilePic', async (req, res) => {
    if (req.session.user?.profilePic)
        res.send(req.session.user.profilePic);
    else {
        res.send('https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg');
    }
})

router.get("/getInstructorRating", async (req, res) => {
    if (req.session.user?.rating)
        res.send("" + req.session.user.rating);
    else {
        res.send("" + 0);
    }
});

router.post('/filterCourses', async (req, res) => {
    const { rating, subject, minPrice, maxPrice, searchTerm, username, type, courseTitles } = req.body;
    const realRating = [rating, 0];
    let courses;
    if (type == 'instructor') {
        courses = await Courses.find(
            {
                $and: [
                    { givenBy: new RegExp("^" + username, "i") },
                    { rating: { $gte: realRating } },
                    { subject: { $in: subject } },
                    { price: { $gte: minPrice } },
                    { price: { $lte: maxPrice } }, {
                        $or: [
                            { title: new RegExp(searchTerm, 'i') },
                            { subject: new RegExp(searchTerm, 'i') },
                            { givenBy: new RegExp(searchTerm, 'i') }
                        ]
                    }
                ]
            }).exec().catch(() => res.status(400).send("database exploded"));
    }

    else if (type == 'corporateTrainee' || type == 'individualTrainee') {
        courses = await Courses.find(
            {
                $and: [
                    { title: { $in: courseTitles } },
                    { rating: { $gte: realRating } },
                    { subject: { $in: subject } },
                    { price: { $gte: minPrice } },
                    { price: { $lte: maxPrice } }, {
                        $or: [
                            { title: new RegExp(searchTerm, 'i') },
                            { subject: new RegExp(searchTerm, 'i') },
                            { givenBy: new RegExp(searchTerm, 'i') }
                        ]
                    }
                ]
            }).exec().catch(() => res.status(400).send("database exploded"));
    }

    else {

        courses = await Courses.find(
            {
                $and: [
                    { rating: { $gte: realRating } },
                    { subject: { $in: subject } },
                    { price: { $gte: minPrice } },
                    { price: { $lte: maxPrice } }, {
                        $or: [
                            { title: new RegExp(searchTerm, 'i') },
                            { subject: new RegExp(searchTerm, 'i') },
                            { givenBy: new RegExp(searchTerm, 'i') }
                        ]
                    }
                ]
            }).exec().catch(() => res.status(400).send("database exploded"));
    }
    if (courses) {
        res.send(courses);
    }
})

router.get('/inbox', async (req, res) => {
    console.log(await guestController.getInbox('admin'))
    res.send(await guestController.getInbox('admin'))
})

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
        const { username, password } = req.body;

        if (!(username && password)) {
            return res.status(400).send("All input is required");
        }
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
            const payload = { user_id: user._id, username, type: type, rating: rating, profilePic: user.profilePic };
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
    return await adminController.sendEmail(req.body.email)
});

router.post("/add-user", async (req, res) => {
    var index = req.body.index
    if (index == 0) adminController.addAdmin(req.body);
    else if (index == 1) adminController.addInstructor(req.body);
    else if (index == 2) adminController.addCorporate(req.body);
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
    res.send(allExams)
});

router.post("/exam-session", async (req, res) => {
    const belongsToCourse = req.body.belongsToCourse;
    const name = req.body.name;
    const ExamQuestions = await individualTrainee.getSpecificExam(belongsToCourse, name)
    res.send(ExamQuestions)
});

router.get("/getUsername", async (req, res) => {
    res.send(req.session.user.username);
})


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