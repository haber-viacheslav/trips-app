import { database } from './initFirebase';
import {
  ref,
  set,
  get,
  push,
  DataSnapshot,
  DatabaseReference,
  Query,
} from 'firebase/database';
import { Trip } from '@/App';

export const addNewUser = async (
  uid: string,
  displayName: string | null,
  email: string | null,
  photoUrl: string | null
): Promise<void> => {
  try {
    const userRef: DatabaseReference = ref(database, `users/${uid}/trips`);
    const snapshot: DataSnapshot = await get(userRef);
    if (snapshot.exists()) {
      return;
    }
    await set(ref(database, `users/${uid}`), {
      uid,
      displayName,
      email,
      photoUrl,
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const addNewTrip = async (uid: string, newTrip: Trip): Promise<void> => {
  try {
    const postListRef: DatabaseReference = ref(database, `users/${uid}/trips`);
    const newPostRef: DatabaseReference = push(postListRef);
    await set(newPostRef, newTrip);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const getUserTrips = async (uid: string): Promise<Trip[]> => {
  try {
    const tripsRef: Query = ref(database, `users/${uid}/trips`);
    const snapshot: DataSnapshot = await get(tripsRef);
    if (snapshot.exists()) {
      const tripsArray: Trip[] = Object.values(snapshot.val()) as Trip[];
      tripsArray.sort((a, b) => {
        if (a.startTime && b.startTime) {
          return +a.startTime - +b.startTime;
        }
        return 0;
      });
      return tripsArray;
    } else {
      return [];
    }
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
