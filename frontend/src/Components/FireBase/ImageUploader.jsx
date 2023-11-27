import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCwuSQk9Pp6KmrnBCmRdSMNmVaDV6baru0",
    authDomain: "dbms-project-cd015.firebaseapp.com",
    projectId: "dbms-project-cd015",
    storageBucket: "dbms-project-cd015.appspot.com",
    messagingSenderId: "756344039724",
    appId: "1:756344039724:web:f6383f34d095d7bc7d6489",
    measurementId: "G-7NFRGPC18W"
};

const firebaseApp = initializeApp(firebaseConfig);

const uploadImageToFirebase = async (file, filePath, fileName) => {
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, `${filePath}/${fileName}`);

    try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        console.log('Image uploaded. Download URL:', url);
        return url;
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
};

export  {uploadImageToFirebase};
