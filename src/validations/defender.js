import { body } from 'express-validator';
import { validatetions } from '../utils/validations';

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
]);
