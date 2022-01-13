import { NameAnalysis } from "../../NameAnalysis";

export interface AnalysisPersistence {
  readonly name: string;
  get(key: string): Promise<NameAnalysis | undefined>;
  set(analysis: NameAnalysis): Promise<void>;
}
