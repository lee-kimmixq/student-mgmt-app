import JSSHA from 'jssha';

const getHash = (input) => {
  const shaObj = new JSSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  shaObj.update(`${input}-${process.env.SALT}`);
  return shaObj.getHash('HEX');
};

export default getHash;
