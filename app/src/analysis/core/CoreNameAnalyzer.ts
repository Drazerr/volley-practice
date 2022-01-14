import { NameAnalysis } from "../NameAnalysis";
import { NameAnalyzer } from "../NameAnalyzer";
import { NameQuery } from "../NameQuery";
import { AnalysisPersistence } from "./persistence/AnalysisPersistence";
import { hashCode } from "../../util/hashCode";
import { randomFailure } from "../../util/randomFailure";
import { Trait, Traits } from "../../data/Traits";
import fetch from "node-fetch";

export type CoreNameAnalyzerConfig = {
  persistence: AnalysisPersistence;
  randomFailureRate: number;
  sourceDataOrUrl: string | Traits;
};

async function resolveSource(
  sourceDataOrUrl: string | Traits
): Promise<Traits> {
  if (typeof sourceDataOrUrl === "string") {
    const response = await fetch(sourceDataOrUrl);
    sourceDataOrUrl = JSON.parse(await response.text());
  }
  return sourceDataOrUrl as Traits;
}

export class CoreNameAnalyzer implements NameAnalyzer {
  private readonly traits = resolveSource(this.config.sourceDataOrUrl);
  public constructor(private readonly config: CoreNameAnalyzerConfig) {}

  public async analyze(properties: NameQuery): Promise<NameAnalysis> {
    randomFailure(this.config.randomFailureRate);
    const concat = `${properties.name}|${properties.birth}|${properties.gender}`.toLowerCase();
    const hash = Math.abs(hashCode(concat));
    const key = `${hash}`;
    let result = await this.config.persistence.get(key);
    if (!result) {
      result = {
        key,
        createdOn: new Date().toISOString(),
        persistence: this.config.persistence.name,
        phrases: await this.resolveTraits(hash),
      };
      await this.config.persistence.set(result);
    }
    return result;
  }

  private async resolveTraits(hash: number): Promise<string[]> {
    const traits = await this.traits;
    const result: Trait[] = [];
    for (const key of Object.getOwnPropertyNames(traits)) {
      const value = traits[key as keyof Traits];
      if (!Array.isArray(value)) continue;
      const index = hash % value.length;
      result.push(value[index] as Trait);
    }
    return result.map((value) =>
      `You ${value.predicate}. ${value.description}`.trim()
    );
  }
}
