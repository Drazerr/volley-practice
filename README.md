## Volley Name Analysis API:
This project exposes a single GET endpoint, which performs name-analysis based on 2-3 query params. It will return a payload consisting of some metadata and a list of phrases which best describe you. Through the magic of hashing, we guarantee that each input always returns the same results. Through the magic of caching, we are able to keep that guarantee even if the underlying data source changes..

```ts
name: string - your name (required)
birth: string - your date of birth (required)
gender: string - your gender (optional)
```

The endpoint should return an instance of [NameAnalysis](src/analysis/NameAnalysis.ts).

### Example
```bash
$ curl "http://localhost:8080?name=aaron&birth=1984&gender=male"
{
  "key": "272664742",
  "createdOn": "2021-02-17T21:48:38.840Z",
  "persistence": "MongoDB",
  "phrases": [
    "You lean on the cautious side. But you lean only a little. You wouldn't wan't to lose your balance.",
    "You like to stay organized. You never understood what the big deal was with Marie Kondo.",
    "You find it easy to make new friends. Scientists are still waiting on you to share the design of your synthetic womb.",
    "You like to help people when you can, sometimes to your own despair. On an unrelated note, do you have a few dollars to spare?",
    "You could be a little sensitive sometimes. I'm sorry for saying that. Please don't be mad."
  ]
}
```

### Database Integrations
This project is set up with all sorts of different persistence layers, from a simple Hash Map, to MongoDB, to DynamoDB. You can switch between them `.env` file. How many of these can you get supported in your provisioning layer? Any caveats or security implications?

### Random Crashes
We have set it up so that 5% of all requests will result in a thrown error. This was done intentionally to give you an opportunity to set up and demonstrate an alerting system. You can [turn it off here](src/configure.ts#L46).

## Code Structure Overview
The project is a standard Express api, written in Typescript, with a good dose of object-oriented principles applied. Below are some of the important parts to check out to get started:

* If you want to see the routing logic, check out [index.ts#L33](src/index.ts#L33)
* The core types are [NameQuery.ts](src/analysis/NameQuery.ts) and [NameAnalysis.ts](src/analysis/NameAnalysis.ts). 
* The core logic occurs in [CoreNameAnalyzer](src/analysis/core/CoreNameAnalyzer.ts)
