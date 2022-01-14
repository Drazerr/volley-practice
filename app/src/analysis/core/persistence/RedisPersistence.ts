import { AnalysisPersistence } from "./AnalysisPersistence";
import { NameAnalysis } from "../../NameAnalysis";
import { RedisClient } from "redis";
import { promisify } from "util";

export type RedisConfig = {
  host: string;
};

export class RedisPersistence implements AnalysisPersistence {
  public readonly name = "Redis";
  private readonly redis = new RedisClient({
    host: this.config.host,
    no_ready_check: true,
  });

  public constructor(private readonly config: RedisConfig) {}

  public async get(key: string): Promise<NameAnalysis | undefined> {
    const result = await promisify(this.redis.get.bind(this.redis))(key);
    if (!result?.length) {
      return undefined;
    }
    return JSON.parse(result);
  }

  public async set(analysis: NameAnalysis): Promise<void> {
    await promisify(this.redis.set.bind(this.redis))(
      analysis.key,
      JSON.stringify(analysis)
    );
  }
}
