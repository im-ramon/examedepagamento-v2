import PocketBase from 'pocketbase';

// Install dot.env after to fix it
// Development:
const pb = new PocketBase('http://localhost:8090');

// Production:
//  const pb = new PocketBase('http://app');

export { pb };

