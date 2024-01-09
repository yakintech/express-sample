const { WebUser } = require("../models/WebUser")




const webUserController = {
    getAll: (req, res) => {
        WebUser.find()
            .then((webusers) => {
                return res.json(webusers);
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    },
    getById: (req, res) => {
        const id = req.params.id;
    WebUser.findById(id)
        .then((webuser) => {
            return res.json(webuser);
        })
        .catch((err) => {
            return res.status(500).json(err);
        })
    },
    create: (req, res) => {
        const newWebUser = new WebUser({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
    
        newWebUser.save()
            .then((webuser) => {
                return res.status(201).json(webuser);
            })
            .catch((err) => {
                return res.status(500).json(err);
            })
    },
    delete: (req, res) => {
        const id = req.params.id;
    WebUser.findByIdAndDelete(id)
        .then((webuser) => {
            return res.json(webuser);
        })
        .catch((err) => {
            return res.status(500).json(err);
        })
    }
}

module.exports = {
    webUserController
}