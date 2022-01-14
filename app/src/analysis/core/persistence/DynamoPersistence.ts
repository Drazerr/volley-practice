import { AnalysisPersistence } from "./AnalysisPersistence";
import { NameAnalysis } from "../../NameAnalysis";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import _ from "lodash";

export type DynamoConfig = {
  table: string;
  region?: string;
};

export class DynamoPersistence implements AnalysisPersistence {
  public readonly name = "DynamoDb";

  private readonly db: DocumentClient;

  public constructor(private readonly config: DynamoConfig) {
    config.region = config.region ?? "us-east-1";
    this.db = new DocumentClient({
      region: this.config.region,
    });
  }

  public async get(key: string): Promise<NameAnalysis | undefined> {
    const query = await this.db
      .get({
        TableName: this.config.table,
        Key: {
          key,
        },
      })
      .promise();
    if (!query.Item || _.isEmpty(query.Item)) {
      return undefined;
    }
    return query.Item as NameAnalysis;
  }

  public async set(analysis: NameAnalysis): Promise<void> {
    await this.db
      .put({
        TableName: this.config.table,
        Item: analysis,
      })
      .promise();
  }
}
