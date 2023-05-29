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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const db = await openDatabase('jate', 1);

    const transaction = db.transaction('jate', 'readwrite');
    const objectStore = transaction.objectStore('jate');

    const request = objectStore.put({ id: 1, value: content });
    const response = await request;

    request.onsuccess = () => console.log('Content successfully added to database.', response);
    request.onerror = () => console.log('Error adding content to database.');
  } catch (error) {
    console.error('Error accessing the database:', error);
  } 
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const db = await openDatabase('jate', 1);

    const transaction = db.transaction('jate', 'readonly');
    const objectStore = transaction.objectStore('jate');

    const request = objectStore.getAll();
    const response = await request;

    request.onsuccess = (event) => {
      const allContent = event.target.result;
      console.log('All content successfully retrieved from the database.', allContent, response);
    };
    request.onerror = () => console.error('Error retrieving database content.');
  } catch (error) {
    console.error('Error accessing the database:', error);
  }
};

initdb();
