import { ClientError } from "./util/ClientError";

require("dotenv").config();

import bodyParser from "body-parser";
import compression from "compression";
import express from "express";

import { nameAnalyzer } from "./configure";
import { NameQuery } from "./analysis/NameQuery";

const app = express();
app.use(compression());
app.use(bodyParser.json());

const api = express.Router();

/**
 * The default project exposes a single GET endpoint, which performs name-analysis on 2-3 query params:
 * It will return a payload consisting of some metadata and a list of phrases which best describe you.
 * Through the magic of hashing, we guarantee that each input always returns the same results.
 * Through the magic of caching, we are able to keep that guarantee even if the underlying data source changes.
 *
 * NOTE: 5% of all requests will RANDOMLY FAIL!
 * We'd love for you to set us up with an alerting system to best surface these!
 *
 * @param name: string - your name (required)
 * @param birth: string - your date of birth (required)
 * @param gender: string - your gender (optional)
 *
 * @return an instance of {@see NameAnalysis}
 */
api.get("/", async (req, res) => {
  try {
    const query: NameQuery = {
      name: req.query.name as string,
      birth: req.query.birth as string,
      gender: req.query.gender as string | undefined,
    };
    if (!query.name) throw new ClientError("No name provided");
    if (!query.birth) throw new ClientError("No birthdate provided");
    const analysis = await nameAnalyzer.analyze(query);
    res.status(200).send(JSON.stringify(analysis, null, 2));
  } catch (error: unknown) {
    console.error(`Error:`, error);
    if (error instanceof ClientError) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send("Unknown Error");
    }
  }
});

app.use(api);
app.listen(8080, () => {
  console.log(`Running`);
});
