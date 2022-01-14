import { AnalysisPersistence } from "./analysis/core/persistence/AnalysisPersistence";
import { DynamoPersistence } from "./analysis/core/persistence/DynamoPersistence";
import { RedisPersistence } from "./analysis/core/persistence/RedisPersistence";
import { MemoryPersistence } from "./analysis/core/persistence/MemoryPersistence";
import { NameAnalyzer } from "./analysis/NameAnalyzer";
import { CoreNameAnalyzer } from "./analysis/core/CoreNameAnalyzer";
import { MongoPersistence } from "./analysis/core/persistence/MongoPersistence";
import DEFAULT_TRAITS from "./data/Traits";

/**
 * While technically not necessary for reproducibility in most cases,
 * we want to guard against the situation where the corpus changes-- thus destabilizing our modulo lookup.
 *
 * The goal is to check the persistence layer first, and then generate something new if nothing is found.
 */
let persistence: AnalysisPersistence;
const type = process.env.PERSISTENCE as "mongo" | "redis" | "dynamo" | "memory";
switch (type) {
  case "mongo":
    persistence = new MongoPersistence({
      host: process.env.MONGO_HOST!,
    });
    break;

  case "dynamo":
    persistence = new DynamoPersistence({
      table: process.env.DYNAMO!,
    });
    break;

  case "redis":
    persistence = new RedisPersistence({
      host: process.env.REDIS_HOST!,
    });
    break;

  default:
    persistence = new MemoryPersistence();
    break;
}

// We share a single analyzer instance across all calls.
export const nameAnalyzer: NameAnalyzer = new CoreNameAnalyzer({
  persistence,
  sourceDataOrUrl: DEFAULT_TRAITS,
  randomFailureRate: 0.05,
});
