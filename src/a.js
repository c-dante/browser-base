const pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const poolSize = pool.length;

export const genList = (n = Math.round(Math.random()*10) + 1) =>
	Array(n+1).join().split(',').map(() => pool.charAt(Math.floor(Math.random() * poolSize)) );
