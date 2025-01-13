import { Injectable, Inject } from '@nestjs/common';
import { Session } from 'neo4j-driver';

@Injectable()
export class Neo4jService {
  constructor(@Inject('NEO4J_SESSION') private readonly session: Session) {}

  async create(id: string) {
    try {
      const result = await this.session.run(
        'CREATE (n:Person {id: $id}) RETURN n',
        { id }
      );
      return result.records.map((record) => record.get('n').properties);
    } catch (error) {
      console.error('Error creating node:', error);
      throw error;
    }
  }
}