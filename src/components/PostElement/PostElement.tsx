import React, { useState } from 'react';
import './PostElement.scss'; // Import your Sass file
import { postService } from '../../services/PostService';

const PostElement: React.FC = () => {
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [contentUploaded, setContentUploaded] = useState(false);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setPostText(newText);
    setContentUploaded(newText.trim() !== '' || imageUploaded);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      setImageUploaded(true);
      setSelectedImage(files[0]);
      console.log('Image Uploaded:', files[0]);
      setContentUploaded(postText.trim() !== '' || !!files[0]);
    }
  };

  const handlePostClick = async () => {
    try {
      const formData = new FormData();
      formData.append('text', postText);
      formData.append('image', selectedImage || ''); // Ensure 'image' is not undefined

      await postService.createPost(formData);
      // Reset postText and selectedImage if needed
      setPostText('');
      setSelectedImage(null);
      // Reset other state variables
      setContentUploaded(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="post-element">
      <textarea
        placeholder="What's on your mind?"
        value={postText}
        onChange={handleTextChange}
      ></textarea>

      <label className="image-upload-label">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </label>

      <button
        className="post-button"
        disabled={!contentUploaded}
        onClick={handlePostClick}
      >
        Post
      </button>
    </div>
  );
};

export default PostElement;
