import { body, param } from 'express-validator';
import { validatetions } from '../utils/validations';

export const validateAttackShip = validatetions([
  param('id')
    .isMongoId()
    .withMessage('ID is in valid.'),
  body('xPosition')
    .notEmpty()
    .withMessage('xPosition must be require')
    .isInt({ min: 0, max: 9 })
    .withMessage('xPosition must be numeric between 0-9'),
  body('yPosition')
    .notEmpty()
    .withMessage('yPosition must be require')
    .isInt({ min: 0, max: 9 })
    .withMessage('yPosition must be numeric between 0-9')
]);
