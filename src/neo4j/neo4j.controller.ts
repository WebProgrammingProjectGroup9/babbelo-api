import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';

@Controller('neo4j')
export class Neo4jController {
  constructor(private readonly neo4jService: Neo4jService) {}

  @Get('friend/:id')
  async getFriends(@Param('id') id: number) {
    return this.neo4jService.getFriends(id);
}

  @Get('friendsOfFriends/:id')
    async getFriendsOfFriends(@Param('id') id: number) {
        return this.neo4jService.getFriendsOfFriends(id);
    }

  @Get('request/:id')
    async getRequest(@Param('id') id: number) {
        return this.neo4jService.getRequest(id);
    }

  @Post('create')
  async create(@Body() body: { id: number }) {
    const { id } = body;
    return this.neo4jService.create(id);
  }

  @Post('request')
    async request(@Body() body: { id1: number, id2: number }) {
        const { id1, id2 } = body;
        return this.neo4jService.request(id1, id2);
    }

  @Post('friend')
  async friend(@Body() body: { id1: number, id2: number }) {
    const { id1, id2 } = body;
    return this.neo4jService.friend(id1, id2);
  }

  @Post('deny')
  async deny(@Body() body: { id1: number, id2: number }) {
    const { id1, id2 } = body;
    return this.neo4jService.deny(id1, id2);
  }

  @Delete('unfriend')
  async unfriend(@Body() body: { id1: number, id2: number }) {
    const { id1, id2 } = body;
    return this.neo4jService.unfriend(id1, id2);
  }
}