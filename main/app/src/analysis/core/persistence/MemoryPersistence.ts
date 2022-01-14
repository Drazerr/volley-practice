import { AnalysisPersistence } from "./AnalysisPersistence";
import { NameAnalysis } from "../../NameAnalysis";

export class MemoryPersistence implements AnalysisPersistence {
  public readonly name = "Memory";
  private readonly map = new Map<string, NameAnalysis>();

  public async get(key: string): Promise<NameAnalysis | undefined> {
    return this.map.get(key);
  }

  public async set(analysis: NameAnalysis): Promise<void> {
    this.map.set(analysis.key, analysis);
  }
}
