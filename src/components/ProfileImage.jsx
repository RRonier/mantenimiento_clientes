import { useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';

function ProfileImage(props) {
    const inputRef = useRef(null);
    const [image, setImage] = useState(props.image || null)

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const image = reader.result;
            setImage(image);
            console.log(image)
        };
        reader.readAsDataURL(file);
    };

    const handleClick = () => {
        inputRef.current.click();
    };

    return (
        <>
            <Avatar alt="Profile Image" src={image} onClick={handleClick} />
            <input type="file" accept="image/*" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
        </>
    );
}

export default ProfileImage;