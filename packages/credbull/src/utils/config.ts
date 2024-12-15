import dotenv from 'dotenv';
import path from 'path';

export const loadConfig = () => {
  dotenv.config({
    encoding: 'utf-8',
    path: [
      path.resolve(__dirname, '../../.env'), // sdk
    ],
    override: true,
  });
};
