import { useEffect, useState, useRef } from "react";
import { auth, database, storage } from "../firebase";
import { ref as databaseRef, off, onValue } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import ImageList from './ImageList';
import { useAuth } from "../contexts/AuthContext";

function Gallery() {

  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);


  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef();


  const handleClickLogOut = async () => {
    await logout()
      .then(() => {
        window.localStorage.removeItem('token');
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleFileInputChange(event) {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      const imageRef = storageRef(storage, `${currentUser.uid}/images/${selectedImage.name}`);

      uploadBytes(imageRef, selectedImage)
        .then(() => getDownloadURL(imageRef))
        .then((url) => {
          setImageUrls((prev) => [...prev, url]);
          console.log("Image Uploaded");
        })
        .catch((error) => {
          console.error('Error uploading image:', error.message);
        });
    }
  }

  useEffect(() => {

    const imagesListRef = storageRef(storage, `${currentUser.uid}/images/`);
    listAll(imagesListRef)
      .then((response) => Promise.all(response.items.map(item => getDownloadURL(item))))
      .then((urls) => {
        setImageUrls(urls);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching image URLs:', error.message);
        setLoading(false);
      });
  }, []);


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <button type="button" onClick={handleClickLogOut} style={{ padding: '8px', marginRight: '8px' }}>
            Logout
          </button>
        </div>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
          />
          <button
            type="button"
            style={{ padding: '8px', marginLeft: '8px', cursor: 'pointer' }}
            onClick={() => fileInputRef.current.click()}>
            Upload Image
          </button>
        </div>
      </div>

      <div>
        <h1>Your Image Gallery</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ImageList images={imageUrls} />
        )}
      </div>
    </>
  );
}

export default Gallery;
