import JSSHA from 'jssha';
import dotenv from 'dotenv';

dotenv.config();

export default (input) => {
  const shaObj = new JSSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  shaObj.update(`${input}-${process.env.SALT}`);
  return shaObj.getHash('HEX');
};
