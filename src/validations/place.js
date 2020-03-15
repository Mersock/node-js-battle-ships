import { body } from 'express-validator';
import { validatetions } from '../utils/validations';
import Game from '../models/game';
import { getShipByName } from '../utils/ship';

export const validatePlaceShip = validatetions([
  body('xPosition')
    .notEmpty()
    .withMessage('xPosition must be require')
    .isInt({ min: 0, max: 9 })
    .withMessage('xPosition must be numeric between 0-9'),
  body('yPosition')
    .notEmpty()
    .withMessage('yPosition must be require')
    .isInt({ min: 0, max: 9 })
    .withMessage('yPosition must be numeric between 0-9'),
  body('ship')
    .notEmpty()
    .withMessage('ship must be require')
    .isIn(['battleship', 'cruiser', 'submarine', 'destroyer'])
    .withMessage('ship must be  battleship, cruiser, submarine, destroyer')
    .custom(async (value, { req }) => {
      const _id = req.params.id;
      const game = await Game.findById(_id);
      const { count } = getShipByName(value);
      if (parseInt(game[value]) == parseInt(count)) {
        throw `${value} is more than maximum allowed value to placed (${count}).`;
      }
    }),
  body('vertical')
    .optional()
    .isIn([true, false])
    .withMessage('vertical must be true, false')
]);
