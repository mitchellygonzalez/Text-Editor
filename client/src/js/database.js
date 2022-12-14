import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database. PUT.
const putDb = async (content) => {
  //console.error('putDb not implemented');

  // Create a connection to the database database and version we want to use.
  const jate = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jate.transaction('jate','readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .put() method
  const request = store.put({id: 1, value: content});  //or id:id, value:value?
  
  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
const getDb = async () => {
  //console.error('getDb not implemented');

  // Create a connection to the database database and version we want to use.
  const jate = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jate.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .get() method
  const request = store.getAll();
  
  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
};
initdb();

export {getDb, putDb}