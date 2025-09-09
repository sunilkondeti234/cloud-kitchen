import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

useEffect(() => {
  const fetchPickles = async () => {
    const querySnapshot = await getDocs(collection(db, "pickles"));
    const items = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPickles(items);
  };
  fetchPickles();
}, []);
