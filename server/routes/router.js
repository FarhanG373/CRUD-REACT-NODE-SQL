const express = require('express');
const router = new express.Router();
const con = require('../databaseConfig/config');
const multer = require('multer');
const moment = require('moment');

//Image storage configuration

const imgConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./images")
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}-${file.originalname}`)
    }
})


//Image filter
const imgFilter = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true)
    } else {
        callback(null, error)
    }
}

//Upload config
const upload = multer({
    storage: imgConfig,
    fileFilter: imgFilter
})


//Add data in DB
router.post('/AddData', upload.single('image'), (req, res) => {
    const { name, email, phone } = req.body;
    const { filename } = req.file;
    if (!name || !email || !phone || !filename) {
        return res.status(422).json({ status: 422, message: 'Fill the data' })
    }
    try {
        let date = moment(new Date()).format('YYY-MM-DD HH:MM:SS');
        con.query(`INSERT INTO crud_table SET?`, {
            //DB Fileld name : form field name
            name: name,
            email: email,
            contact: phone,
            image: filename,
            date: date,
        }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                return res.status(201).json({ status: 201, data: req.body })
            }
        })
    } catch (error) {
        return res.status(422).json({ status: 422, error })
    }

})

//Get data
router.get('/getData', (req, res) => {
    try {
        con.query(`SELECT * FROM crud_table`, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                return res.status(201).json({ status: 201, data: result })
            }
        })
    } catch (error) {
        return res.status(422).json({ status: 422, error })

    }
})

//Delete user
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    try {
        con.query(`DELETE FROM crud_table WHERE id='${id}'`, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Data deleted");
                return res.status(201).json({ status: 201, data: result })
            }
        })
    } catch (error) {
        return res.status(422).json({ status: 422, error })

    }
})


//Update data

router.get('/getData/:id', (req, res) => {
    const { id } = req.params;
    try {
        con.query(`SELECT * FROM crud_table WHERE id= '${id}'`, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                return res.status(201).json({ status: 201, data: result })
            }
        })
    } catch (error) {
        return res.status(422).json({ status: 422, error })

    }
})


router.put('/editData/:id', upload.single('image'), (req, res) => {
    console.log('Farhan Put');
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const { filename } = req.file;
    if (!name || !email || !phone || !filename) {
        return res.status(422).json({ status: 422, message: 'Fill the data' })
    } else {
        console.log(filename);
    }
    try {
        let date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        con.query(`UPDATE crud_table SET name="${name}", email="${email}", contact="${phone}", image="${filename}", date="${date}" WHERE id='${id}'`, (err, result) => {
            if (err) {
                throw (err);
            } else {
                console.log("Data Added");
                return res.status(201).json({ status: 201, data: req.body })
            }
        })
    } catch (error) {
        return res.status(422).json({ status: 422, error })

    }
})
module.exports = router;