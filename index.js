import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import axios from "axios";

const app = express();
const port = 3000;

const api_key = process.env.API_KEY;

app.use(express.static("public"));
app.use("/partials", express.static("views/partials"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/apod", (req, res) => {
  res.render("apod.ejs");
});

app.get("/mars-rover", (req, res) => {
  res.render("mars-rover.ejs");
});

app.get("/nasa-library", (req, res) =>{
  res.render("nasa-library.ejs")
})

app.post("/apod-picture", async (req, res) => {
  try {
    const selectedDate = req.body.selectedDate;
    const [year, month, day] = selectedDate.split("-");
    console.log(
      `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${selectedDate}`
    );

    const result = await axios.get("https://api.nasa.gov/planetary/apod", {
      params: {
        api_key: api_key,
        date: selectedDate,
        hd: false,
      },
    });

    // Specific Date: https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2023-12-05
    // Random Count: https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5
    // Date Range: https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=2023-01-01&end_date=2023-01-05
    // GEMINI: https://gemini.google.com/app/ec7ac7f3cee02dd2

    res.render("apod.ejs", {
      date: result.data.date,
      text: result.data.explanation,
      title: result.data.title,
      image: result.data.hdurl,
      name: result.data.copyright.trim() || "NASA",
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

app.post("/mars-rover", async (req, res) => {
  try {
    const selectedDate = req.body.selectedDate;
    const roverName = req.body.rover;

    const result = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos`,
      {
        params: {
          earth_date: selectedDate,
          api_key: api_key,
        },
      }
    );

    console.log(result.data.photos);

    res.render("mars-rover.ejs", {
      photos: result.data.photos,
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

app.post("/nasa-library", async (req, res) => {
  try {
    const selectedDate = req.body.selectedDate;
    const roverName = req.body.rover;

    const result = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos`,
      {
        params: {
          earth_date: selectedDate,
          api_key: api_key,
        },
      }
    );

    console.log(result.data.photos);

    res.render("mars-rover.ejs", {
      photos: result.data.photos,
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
