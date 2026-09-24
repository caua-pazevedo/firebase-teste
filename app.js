const firebaseConfig = {
  apiKey: "AIzaSyAu0x3UTKelZ8tXCjNbfafkUK_MwrIfeqs",
  authDomain: "senai-teste-bd9f7.firebaseapp.com",
  projectId: "senai-teste-bd9f7",
  storageBucket: "senai-teste-bd9f7.firebasestorage.app",
  messagingSenderId: "359707622409",
  appId: "1:359707622409:web:abd706ca84d647a0270cd8"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ experimentalForceLongPolling: true });

async function addData() {
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;

  try {
    const docRef = await db.collection('users').add({
      name: name,
      age: Number.parseInt(age, 10)
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}

async function getData() {
  try {
    const querySnapshot = await db.collection('users').get();
    const dataList = document.getElementById('data-list');
    dataList.innerHTML = '';

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const listItem = document.createElement('li');
      listItem.textContent = `${data.name}, ${data.age}`;
      dataList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
}

window.addData = addData;
window.getData = getData;
