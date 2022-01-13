import { NameQuery } from "./NameQuery";
import { NameAnalysis } from "./NameAnalysis";

export interface NameAnalyzer {
  analyze(properties: NameQuery): Promise<NameAnalysis>;
}
