const express = require("express")
const parser = require("body-parser")
const mongoose = require("mongoose")
const path = require("path")

const app = express()

app.use(parser.json())
app.use(express.static(path.join(__dirname, "/client/dist")))

mongoose.connect("mongodb://localhost/pets")

const PetSchema = mongoose.Schema({
    name: { type: String, required: [true, "Name is required"], minlength: [3, "Name must be at least 3 characters"], unique: [true, "Name must be unique"] },
    type: { type: String, required: [true, "Type is required"], minlength: [3, "Type must be at least 3 characters"] },
    description: { type: String, required: [true, "Description is required"], minlength: [3, "Description must be at least 3 characters"] },
    skill1: { type: String, default: "" },
    skill2: { type: String, default: "" },
    skill3: { type: String, default: "" },
    likes: { type: Number, default: 0 }
})

const Pet = mongoose.model("Pet", PetSchema)

const validatePet = (pet) => {
    const errors = []
    if (!pet["name"]) errors.push("Name is required")
    else if (pet["name"].length < 3) errors.push("Name must be at least 3 characters")
    if (!pet["type"]) errors.push("Type is required")
    else if (pet["type"].length < 3) errors.push("Type must be at least 3 characters")
    if (!pet["description"]) errors.push("Description is required")
    else if (pet["description"].length < 3) errors.push("Description must be at least 3 characters")
    return errors
}

app.get("/pets", (req, res) => {
    Pet.find({}, (err, data) => {
        if (err) res.json({ message: "fail", error: err })
        else res.json({ message: "success", data: data })
    })
})

app.get("/pets/:id", (req, res) => {
    Pet.findById(req.params.id, (err, data) => {
        if (err) res.json({ message: "fail", error: err })
        else res.json({ message: "success", data: data })
    })
})

app.post("/pets", (req, res) => {
    Pet.create(req.body, (err, data) => {
        if (err) {
            let errors = []
            if (err.code == 11000) errors.push("Name must be unique.")
            for (let error in err.errors) errors.push(err.errors[error].message)
            res.json({ message: "fail", error: errors })
        }
        else res.json({ message: "success", data: data })
    })
})

app.put("/pets/:id", (req, res) => {
    const errors = validatePet(req.body)
    if (errors.length > 0) res.json({ message: "fail", error: errors })
    else {
        Pet.findByIdAndUpdate(req.params.id, 
            {$set: { 
                name: req.body.name, 
                type: req.body.type, 
                description: req.body.description, 
                skill1: req.body.skill1, 
                skill2: req.body.skill2, 
                skill3: req.body.skill3,
                likes: req.body.likes
            }}, 
            {new: true}, (err, data) => {
            if (err) {
                let errors = []
                if (err.code == 11000) errors.push("Name must be unique.")
                for (let error in err.errors) errors.push(err.errors[error].message)
                res.json({ message: "fail", error: errors, err: err })
            }
            else res.json({ message: "success", data: data })
        })
    }
})

app.delete("/pets/:id", (req, res) => {
    Pet.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) res.json({ message: "fail", error: errors })
        else res.json({ message: "success", data: data })
    })
})

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./client/dist/index.html"))
})

app.listen(8000)