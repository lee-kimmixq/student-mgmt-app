const getLoginTokenCookie = (cookies) => {
  const value = `; ${cookies}`;
  const parts = value.split('; loginToken=');
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export default getLoginTokenCookie;
