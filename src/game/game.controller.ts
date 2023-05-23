import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'game_progress',
  version: '1',
})
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('known')
  async markWordAsKnown(@Req() req, @Body() body) {
    const userId = req.user.id;
    const wordId = body.wordId;
    console.log(userId, wordId);

    return await this.gameService.markWordAsKnown(userId, wordId);
  }

  @Get('well_known')
  async getWellKnownWords(@Req() req) {
    const userId = req.user.id;
    return await this.gameService.getWellKnownWords(userId);
  }

  @Get('learned')
  async getLearnedWords(@Req() req) {
    const userId = req.user.id;
    return await this.gameService.getLearnedWords(userId);
  }
}
