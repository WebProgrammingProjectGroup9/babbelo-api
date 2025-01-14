import { Injectable, Inject } from '@nestjs/common';
import { Session } from 'neo4j-driver';

@Injectable()
export class Neo4jService {
  constructor(@Inject('NEO4J_SESSION') private readonly session: Session) {}

  async create(id: number) {
    try {
      const result = await this.session.run(
        'CREATE (n:Person {id: $id}) RETURN n',
        { id }
      );
      return result;
    } catch (error) {
      console.error('Error creating node:', error);
      throw error;
    }
  }

  async friends(id1: number, id2: number) {
    try {
      const result = await this.session.run(
        `MATCH (a:Person {id: $id1}), (b:Person {id: $id2})
        MERGE (a)-[:FRIENDS]-(b)`,
        { id1, id2 })
        return result;
    } catch (error) {
        console.error('Error creating relationship:', error);
        throw error;
    }
  }
}