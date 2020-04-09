// This file is part of Stupid Tris.

// Stupid Tris is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Stupid Tris is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Stupid Tris.  If not, see <http://www.gnu.org/licenses/>.

// Copyright 2020 Riccardo Giovarelli <riccardo.giovarelli@gmail.com>

import * as TrisLib from './trisLib';
import StupidTris from './stupidTris';

/**
* Class ScoreManager
* Provides tools for the management of the score
*
* @author  Riccardo Giovarelli
*/
export default class ScoreManager extends StupidTris {
  /**
  * Method saveScore
  *
  * Update the score on cookie
  *
  * @param who Who gained the point
  */
  saveScore(who) {
    const currentSituation = this.readScore();
    const currentRound = +currentSituation.round + +1;
    const currentAiScore = +currentSituation.aiScore + +1;
    const currentPlayScore = +currentSituation.playerScore + +1;

    switch (who) {
      case 'ai':
        document.cookie = `${this.roundCookieName}=${currentRound}`;
        document.cookie = `${this.aiCookieName}=${currentAiScore}`;
        break;
      case 'player':
        document.cookie = `${this.roundCookieName}=${currentRound}`;
        document.cookie = `${this.playerCookieName}=${currentPlayScore}`;
        break;
      case 'nobody':
        document.cookie = `${this.roundCookieName}=${currentRound}`;
        break;
      default:
        break;
    }
  }


  /**
   * Method resetScore
   *
   * Reset score table
   */
  resetScore() {
    document.cookie = `${this.roundCookieName}=0`;
    document.cookie = `${this.playerCookieName}=0`;
    document.cookie = `${this.aiCookieName}=0`;
  }


  /**
   * Method readScore
   *
   * Read score table
   */
  readScore() {
    const toReturn = {};

    toReturn.round = TrisLib.getCookie(this.roundCookieName);
    toReturn.aiScore = TrisLib.getCookie(this.aiCookieName);
    toReturn.playerScore = TrisLib.getCookie(this.playerCookieName);

    toReturn.round = ((toReturn.round === undefined) || (toReturn.round === 'NaN')) ? 0 : toReturn.round;
    toReturn.aiScore = ((toReturn.aiScore === undefined) || (toReturn.aiScore === 'NaN')) ? 0 : toReturn.aiScore;
    toReturn.playerScore = ((toReturn.playerScore === undefined) || (toReturn.playerScore === 'NaN')) ? 0 : toReturn.playerScore;

    return toReturn;
  }
}
