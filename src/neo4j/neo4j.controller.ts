import { Controller, Get, Post, Body } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';

@Controller('neo4j')
export class Neo4jController {
  constructor(private readonly neo4jService: Neo4jService) {}

  @Post('create')
  async create(@Body() body: { id: number }) {
    const { id } = body;
    return this.neo4jService.create(id);
  }
}