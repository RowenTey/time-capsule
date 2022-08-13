import jwt_decode from 'jwt-decode';

export const fetchGoogleResponse = async (res) => {
  const decoded = jwt_decode(res.credential);
  
  return decoded;
};