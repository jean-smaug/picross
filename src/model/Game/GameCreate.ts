import {SquareState} from '@/model/Square/SquareState';
import {GameModel} from '@/model/Game/GameModel';
import {IGridPosition} from '@/model/Square/IGridPosition';
import {GqlPicross} from '@/api/Picross';

export class GameCreateModel extends GameModel {

  public save() {
    GqlPicross.savePicross(this.gameGrid.export());
  }

  public newGame({cols, rows}: { cols: number, rows: number }) {
    this.gameGrid.reinit(cols, rows, SquareState.Close);
    this.hintsManager.init(this.gameGrid);
    this._loaded = true;
  }

  protected postEachChange(position: IGridPosition) {
    this.hintsManager.initToPosition(position, this.gameGrid);
  }

}
