import { AnalysisPersistence } from "./AnalysisPersistence";
import { NameAnalysis } from "../../NameAnalysis";
import { Collection, MongoClient } from "mongodb";
import { promisify } from "util";

export type MongoConfig = {
  host: string;
};

export class MongoPersistence implements AnalysisPersistence {
  public readonly name = "MongoDB";
  private readonly client = new MongoClient(this.config.host, {
    useUnifiedTopology: true,
  });
  private readonly db = this.client.connect().then((value) => {
    return value.db("infra-onsite");
  });

  public constructor(private readonly config: MongoConfig) {}

  public async get(key: string): Promise<NameAnalysis | undefined> {
    const collection = await this.getCollection();
    const result = await collection.findOne({
      key,
    });
    if (result) {
      delete result._id;
    }
    return result;
  }

  public async set(analysis: NameAnalysis): Promise<void> {
    const collection = await this.getCollection();
    await collection.save({ ...analysis });
  }

  private async getCollection(): Promise<Collection> {
    const db = await this.db;
    const collections = await db.collections();
    if (collections.length === 0) {
      return await db.createCollection("analyses");
    }
    return (await promisify(db.collection).bind(db)("analyses")) as Collection;
  }
}
