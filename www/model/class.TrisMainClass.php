<?php


/**
* <h1>Triss Main Class</h1>
*
* @author  Riccardo Giovarelli
* @version 1.0 
*/
class TrissMainClass {
	
    protected $db_host = 'localhost';
    protected $db_user = 'root';
    protected $db_password = 'mysql';
    protected $db_name = 'StupidTris';

	/**
	 * Returns the next move for IA basing on current 
	 * grid situation and IA logic
	 *
	 * @param	current_grid	current grid situation
	 * @return	string			next move
	 */
    public function getNextMove($current_grid) {

        //Variables
        $result = array();
        $position = 0;
        $free_count = 0;

        //Array of grid
        $my_grid = explode(',', $current_grid);

        //Number of moves
        $number_of_move = 0;
        foreach ($my_grid as $value) {
            if ($value != 0) $number_of_move++;
        }
        $number_of_move = 9 - $number_of_move;

        //Generate move
        $move = (rand(1, $number_of_move) - 1);
        
        //Find my move on grid
        while (!count($result)) {
            switch (true) {
                case ($my_grid[$position] == 0 and $free_count == $move):
                    $result[0] = floor($position / 3);
                    $result[1] = ($position % 3);
                    break;
                case ($my_grid[$position] == 0 and $free_count != $move):
                    $free_count++;
                    $position++;
                    break;
                case ($my_grid[$position] != 0):
                    $position++;
                    break;
            }
        }
        
        //Return move
        if (count($result)) echo json_encode($result, true);
        return;
    }
}
