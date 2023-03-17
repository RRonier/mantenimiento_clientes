import { useRef, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import { AuthContext } from '../context/auth.context';

function ProfileImage({ width, height }) {
    const inputRef = useRef(null);
    const { profileImage, setProfileImage } = useContext(AuthContext)

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const image = reader.result;
            setProfileImage(image);
            console.log(image)
        };
        reader.readAsDataURL(file);
    };

    const handleClick = () => {
        inputRef.current.click();
    };

    return (
        <>
            <Avatar sx={{
                width: width,
                height: height,
            }} alt="Profile Image" src={profileImage} onClick={handleClick} />
            <input type="file" accept="image/*" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
        </>
    );
}

export default ProfileImage;