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
    const start_date = req.body.start;
    const end_date = req.body.end.length === 0 ? start_date : req.body.end;
    console.log(start_date, end_date);
    

    const result = await axios.get("https://api.nasa.gov/planetary/apod", {
      params: {
        api_key: api_key,
        start_date: start_date, 
        end_date: end_date,
        hd: false,
      },
    });

    res.render("apod.ejs", {
      apods: result.data,
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

    const dates = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/manifests/${roverName}`,
      {
        params: {
          api_key: api_key,
        },
      }
    );

    const availableDates = dates.data.photo_manifest.photos;

    const datesList = availableDates
      .map((date) => date.earth_date) // extract earth_date string directly
      .slice(0, 60); // limit to first 60 dates

    res.render("mars-rover.ejs", {
      photos: result.data.photos,
      date: selectedDate,
      name: roverName,
      dates: datesList,
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

app.post("/nasa-library", async (req, res) => {
  try {
    const baseUrl = "https://images-api.nasa.gov/search";
    const start = req.body.start.length === 0 ? "1900" : req.body.start;
    const end = req.body.end.length === 0 ? "2025" : req.body.end;

    const result = await axios.get(baseUrl, {
      params: {
        q: req.body.search,
        media_type: "image",
        year_start: start,
        year_end: end,
      },
    });

    const items = result.data.collection.items;

    const mediumImages = items
      .flatMap((item) =>
        item.links
          .filter((link) => link.href.includes("~medium.jpg"))
          .map((link) => link.href)
      )
      .slice(0, 60);

    res.render("nasa-library.ejs", {
      photos: mediumImages,
      start: start,
      end: end,
      search: req.body.search,
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
