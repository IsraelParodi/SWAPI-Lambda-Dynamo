import { DynamoDB } from "aws-sdk";

class DynamoDBConnection {
  private static instance: DynamoDB.DocumentClient;

  private constructor() {}

  static async getInstance() {
    if (this.instance) {
      return Promise.resolve(this.instance);
    }

    this.instance = new DynamoDB.DocumentClient();
    return this.instance;
  }
}

export default DynamoDBConnection;
