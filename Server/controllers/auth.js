const mysql = require("mysql");
const nodemailer = require("nodemailer");
const otpagent = require("otp-agent");
var otp;

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD
    }
});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'vaxxmatter',
    port: process.env.DATABASE_PORT
});

exports.login = (req, res) => {
    console.log(req.body);
    const {email, pass} = req.body;
    try{
        const { email, password } = req.body;

        if(!email || !password){
            console.log("Please Provide Email and Password");
        }

        db.query('SELECT * FROM authentication WHERE username = ?', [email], async(error, results) => {

            console.log(results);
            if(results.length === 0){
                console.log('Email is incorrect');
                res.send({isLogin:"false", id: 0});
            }
            else if(password != results[0].password){
                console.log('Password is incorrect');
                res.send({isLogin:"false", id: 0});
            }
            else
            { //Login Successfull
                if(results[0].token == 0)
                {
                    // send to verify page
                    res.send({isLogin:"hold", id:results[0].v_code});
                }
                else
                {
                    res.send({isLogin:"true", id:results[0].v_code});
                    console.log('Login Successfull');
                    // send to verify page

                }
            }
 
        });

    }
    catch(error){
        console.log(error);
    }
}

exports.otp = (req, res) => {
    const {id} = req.body;
    console.log(id);
    var mail;

    db.query('SELECT * FROM authentication WHERE v_code = ?', [id], async(err, results) => {
        if(err){
            console.log(err);
        }
        else
        {
            mail = results[0].email;
            console.log(mail);
            const otpLength = 6;
            otp = otpagent.generateOTP(otpLength, { numbers: true, alphabets: false, upperCaseAlphabets: false, specialChars: false });
            console.log(otp);
            var mailOptions = {
                from: 'vaxxmatter@gmail.com',
                to: mail,
                subject: 'Sending Email using Node.js',
                text: "Hi " +  results[0].f_name + " "+ results[0].l_name + "," + `\n\n` + "Thankyou for Regestrying with us."+ "\n\n\n" + "Here is your OTP to Confirm Your account  " + otp + "\n\n\nWe recommend you to Book your slots as soon as posible and accordingly to the priority of your age group"
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    });
}

exports.verify = (req, res) => {
    const {id, v_otp} = req.body;
    console.log(otp, id, v_otp);
    console.log(req.body.v_otp);
    if(otp == v_otp)
    {
        console.log("Verified");

        db.query('UPDATE authentication SET token = 1 WHERE v_code =  ?', [id], async(error, results) => { 
            console.log(results);
            res.send({isLogin: "true"});
    });
    }
    else{
        console.log("Not Verified");
        res.send({isLogin: "false"});
    }
}

exports.register = (req,res) => {
    console.log(req.body);
    
    const { fname, lname, username, age, email, ph, gender, pass, cpass} = req.body;

    db.query('SELECT email FROM authentication WHERE email = ?', [email], async(err, results) => {
        if(err){
            console.log(err);
        }
        if(results.length > 0){
            // already a user
        }
        else if( pass !== cpass ){
            // password did not match
        }
             
            db.query('INSERT INTO authentication SET ? ', {f_name: fname, l_name: lname, gender: gender, age: age, email: email, phone: ph, username: username, password: pass}, (error, results) => {
                if(error)
                {
                    console.log("Error");
                }
                else
                {
                    console.log(results);
                    // user registered
                }
            });
    });
}

exports.getdata = (req, res) => {
    console.log("Inside get data");
    const {id} = req.body;
    console.log(id);

    db.query('SELECT * FROM authentication WHERE v_code = ?', [id], async(err, results) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(results.length);
            console.log(results);
            const fname= results[0].f_name;
            const lname = results[0].l_name;
            const gender = results[0].gender;
            const age = results[0].age;
            const email = results[0].email;
            const ph = results[0].phone;
            const username = results[0].username;
            res.send({fname:fname, lname:lname, username:username, age:age, email:email, ph:ph, gender:gender}); 
        } 
    });
}

exports.bookslot = (req, res) => {
    console.log(req.body);
    const {id, name, aadhar, dob, gender, email, ph, address, state, city, pin_code, h_name, h_address, h_center_id, h_fee_type, h_date, h_session_id, h_vaccine, h_min_age_limit} = req.body;
    db.query('INSERT INTO slot_booking SET ? ', {
        v_code: id,
        name: name,
        dob: dob,
        aadhar: aadhar,
        gender: gender,
        email: email,
        ph: ph,
        address: address,
        state: state,
        city: city,
        h_name: h_name,
        h_address: h_address,
        h_center_id: h_center_id,
        h_fee_type: h_fee_type,
        h_date: h_date,
        h_session_id: h_session_id,
        h_vaccine: h_vaccine,
        h_min_age_limit: h_min_age_limit,
        pin: pin_code
    }, (error, results) => {
        if(error)
        {
            console.log(error);
        }
        else
        {
            console.log(results);
            //email bhej ni hai
            var mailOptions = {
                from: 'vaxxmatter@gmail.com',
                to: email,
                subject: 'Sending Email using Node.js',
                text: "Hi " +  name + "," + `\n\n` + "Below is Your Booked Slot Details \n\n"  + "Patient's Information \n\n" + " Name:    " + name + "\n Aadhar Card:    " + aadhar + "\n Date Of Birth:    " + dob + "\n Gender:    " + gender + "\n Email Id:    " + email + "\n Phone Number:    " + ph + "\n Address:    " + address + "\n State:    " + state + "\n City:    " + city + "\n Pin Code:    " + pin_code + "\n\n\n\nVaccination Center Information: " + "\n\n Center Name:    " + h_name + "\n Center's Address:    " + h_address + "\n Center Id:    " + h_center_id + "\n Date of Vaccination:    " + h_date + "\n Vaccine Name:    " + h_vaccine + "\n\n\n\n\n\n\n\n Hope for you and your family wellness \n\n\n Thank You"
                };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    });
}

exports.bookeddata = (req, res) => {
    console.log(req.body);
    const {id} = req.body;
    db.query('SELECT * FROM slot_booking WHERE v_code = ?', [id], async(err, results) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(results)
            console.log(results.length);
            console.log(results);
        } 
    });
}

exports.emailforotp = (req,res) => {
    console.log(req.body);
    const {id} = req.body;
    db.query('SELECT * FROM authentication WHERE v_code = ?', [id], async(err, results) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(results[0].email)
            console.log(results.length);
            console.log(results);
        } 
    });
}