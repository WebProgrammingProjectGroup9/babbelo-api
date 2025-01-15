import { Injectable, Inject, Logger } from '@nestjs/common';
import { Session } from 'neo4j-driver';

@Injectable()
export class Neo4jService {
  constructor(@Inject('NEO4J_SESSION') private readonly session: Session) {}

  async getFriends(id: number) {
    try {
        const results = await this.session.run(
            `MATCH (a:Person {id: $id})-[:FRIEND]-(b:Person) RETURN b.id AS friendId`,
            { id: Number(id) }
        );
        return results.records.map((record) => record.get(0) as number);
    } catch (error) {
        console.error('Error getting friends:', error);
        throw error;
    }
}


async getFriendsOfFriends(id: number) {
    try {
        const results = await this.session.run(
            `MATCH (a:Person {id: $id})-[:FRIEND]-(b:Person)-[:FRIEND]-(c:Person) 
             RETURN c.id AS friendOfFriendId`,
            { id: Number(id) }
        );
        return results.records.map((record) => record.get(0) as number);
    } catch (error) {
        console.error('Error getting friends of friends:', error);
        throw error;
    }
}


async getRequest(id: number) {
    try {
        const results = await this.session.run(
            `MATCH (a:Person {id: $id})<-[:REQUEST]-(b:Person)
             RETURN b.id`,
            { id: Number(id) }
        );
        return results.records.map((record) => record.get(0) as number);
    } catch (error) {
        console.error('Error getting requests:', error);
        throw error;
    }
}


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

    async request(id1: number, id2: number) {
        try {
        const result = await this.session.run(
            `MATCH (a:Person {id: $id1}), (b:Person {id: $id2})
            MERGE (a)-[:REQUEST]->(b)`,
            { id1, id2 })
            return result;
        } catch (error) {
            console.error('Error creating relationship:', error);
            throw error;
        }
    }

  async friend(id1: number, id2: number) {
    try {
        const result = await this.session.run(
            `MATCH (a:Person {id: $id1})-[r:REQUEST]->(b:Person {id: $id2})
             DELETE r
             MERGE (a)-[:FRIEND]-(b)`,
            { id1, id2 }
        );
        return result;
    } catch (error) {
        console.error('Error creating friendship:', error);
        throw error;
    }
}
}