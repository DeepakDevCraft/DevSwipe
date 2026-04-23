const express = require("express");
const app = express();
const { connectDB } = require("./config/db");
const USER = require("./models/user");
const port = process.env.port || 3000;
app.use(express.json());

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  console.log("i am line 8", req.body);

  try {
    if (!firstName || !email || !lastName) {
      throw new Error("firstName and email is required");
    }

    const user = new USER({ firstName, lastName, email });

    await user.save();

    return res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server Error" });
  }
});

app.get("/user", async (req, res) => {
  const response = await USER.find({});

  return res.status(200).json({ response: response });
});

app.use("/", (req, res) => {
  res.send("Hello from the server");
});

connectDB()
  .then(() => {
    console.log("connected successfully to the db");
    app.listen(port, () => {
      console.log(`Server running at port- ${port}`);
    });
  })
  .catch(() => {
    console.log("Error while connecting to db");
  });
