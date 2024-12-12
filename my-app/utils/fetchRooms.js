import { ref, onValue } from 'firebase/database';
import { database } from '../fireBaseConfig';

const fetchRooms = (onDataChange) => {
  const roomsRef = ref(database, 'rooms/');

  const unsubscribe = onValue(roomsRef, (snapshot) => {
    const data = snapshot.val();

    if (data) {
      const roomList = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      onDataChange(roomList); 
    } else {
      onDataChange([]); 
    }
  });

  return unsubscribe; 
};

export default fetchRooms;
