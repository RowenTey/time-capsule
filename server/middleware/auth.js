import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = '790180615424-vj0onnbe5rshfijrirdck31qclkcef2u.apps.googleusercontent.com';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const isCustomAuth = token.length < 500;
    
    let decodedData;
    
    if (token && !isCustomAuth) {
      decodedData = jwt.verify(token, 'test');
      console.log('decodedData ' + decodedData);
      
      req.userId = decodedData?.id;
    } else { 
      const client = new OAuth2Client(CLIENT_ID);
      async function verify() {
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,
        });
        decodedData = ticket.getPayload();
        console.log('decodedData ' + decodedData);
        // decodedData = payload['sub'];
      }
      verify()
        .then(() => {
          req.userId = decodedData?.sub;
        })
        .catch(console.error);
      
    }
    
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;