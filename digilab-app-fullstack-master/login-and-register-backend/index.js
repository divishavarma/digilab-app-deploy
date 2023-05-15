import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static("login-and-register-backend/uploads"));
mongoose.connect("mongodb://127.0.0.1:27017/adminRegisterDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, () => {
  console.log("DB connected");
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);


const adminUploadSchema = new mongoose.Schema({
  email: String,
  image: String, // Store the file path or URL as a string
  text: String,
});

const AdminUpload = mongoose.model("AdminUpload", adminUploadSchema);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Specify the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName); // Set the filename for the uploaded file
  },
});
const upload = multer({ storage: storage });

// Routes

app.get("/latest-text", (req, res) => {
  AdminUpload.findOne({}, {}, { sort: { _id: -1 } }, (err, adminUpload) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ text: adminUpload.text });
    }
  });
});

app.get("/latest-image-url", (req, res) => {
  AdminUpload.findOne({}, {}, { sort: { _id: -1 } }, (err, adminUpload) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const imageURL = adminUpload.image ? `.${adminUpload.image}` : "";
      res.json({ image: imageURL }); // Change 'imageURL' to 'image'
    }
  });
});



app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successful", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already registered" });
    } else {
      const user = new User({
        name,
        email,
        password,
        image: "",
        text: "",
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({
            message: "Successfully Registered, Please login now.",
          });
        }
      });
    }
  });
});

app.post("/update", upload.single("image"), (req, res) => {
  const { email, text } = req.body;

  let image = "";
  if (req.file) {
    image = `/uploads/${req.file.filename}`; // Save the file path or URL
  }

  const adminUpload = new AdminUpload({
    email: email,
    image: image,
    text: text,
  });

  adminUpload.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ message: "Update Successful", adminUpload: adminUpload });
    }
  });
});

app.listen(9002, () => {
  console.log("BE started at port 9002");
});
