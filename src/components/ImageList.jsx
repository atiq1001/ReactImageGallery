import './ImageList.css';

const ImageList = ({ images }) => {

  return (
    <div className="image-list">
      {images.length == 0 ? <h2>Upload images to see here</h2> : images.map((image, index) => (
        <img key={index} src={image} alt='image' />
      ))}
    </div>
  );
};

export default ImageList;
