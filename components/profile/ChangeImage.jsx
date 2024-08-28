'use client';

import { authAxios } from '/app/(home)/axious-config';
import { setUser } from '/app/(home)/features';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react';
import 'cropperjs/dist/cropper.css';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Cropper from 'react-cropper';
import { useDispatch, useSelector } from 'react-redux';

const ChangeImage = () => {
  const [choosenFile, setChoosenFile] = useState(null);
  const [fileName, setFileName] = useState('No Selected File');
  const [isOpen, setIsOpen] = useState(false);
  const authData = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [file, setFile] = useState('');
  const cropper = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [binary, setBinary] = useState(false);

  const _imgCrop = () => {
    const _imageElement = cropper?.current;
    const _cropper = _imageElement?.cropper;

    const croppedImgData = _cropper
      .getCroppedCanvas({
        width: 160,
        height: 160,
        minWidth: 750,
        minHeight: 750,
        maxWidth: 4096,
        maxHeight: 4096,
        fillColor: '#fff',
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
      })
      .toDataURL();

    setBinary(croppedImgData);
  };

  const _handleSubmit = () => {
    if (binary) {
      fetch(binary)
        .then((response) => response.blob())
        .then((data) => {
          const _fileName =
            'user-' + Math.floor(Math.random() * 10000) + '.jpg';

          var _makeFile = new File([data], _fileName, { type: 'image/jpg' });

          if (_makeFile) {
            setIsLoading(true);

            const formData = new FormData();
            formData.append('photo', _makeFile);

            const user = authData?.user;
            const access_token = authData?.token;

            authAxios
              .post('/users/upload-profile-photo', formData)
              .then((res) => {
                dispatch(
                  setUser({
                    ...authData,
                    user: {
                      ...user,
                      profile_photo: res.data.profile_photo,
                    },
                    access_token,
                  })
                );
                setIsOpen(false);
                setIsLoading(false);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
    }
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <Image
        src={authData?.user?.profile_photo ?? ''}
        alt="profile_photo"
        height={80}
        width={80}
        className="w-40 h-40 rounded-full object-cover mx-auto"
      />
      <div className="absolute bottom-4 -right-4">
        <input
          type="file"
          accept="image/*"
          className="file_upload_input"
          hidden
          onChange={({ target: { files } }) => {
            files[0] && setFileName(files[0].name);
            if (files) {
              setChoosenFile(URL.createObjectURL(files[0]));
              setIsOpen(true);
            }
          }}
        />
        <button
          className="bg-primary text-[12px] text-white font-bold hover:bg-opacity-90 py-1 px-2.5 rounded duration-300"
          onClick={() => document.querySelector('.file_upload_input').click()}
        >
          Edit Image
        </button>
      </div>
      {isOpen && (
        <Dialog open={isOpen} size="xs" handler={handleOpen}>
          <DialogHeader>Crop your new profile picture.</DialogHeader>
          <DialogBody>
            <Cropper
              ref={cropper}
              src={choosenFile}
              aspectRatio={16 / 16}
              crop={_imgCrop}
            />
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={() => handleOpen(false)}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>

            <button
              onClick={_handleSubmit}
              disabled={isLoading}
              className="bg-primary p-2 text-white rounded-md font-bold cursor-pointer disabled:opacity-60 hover:opacity-70"
            >
              Set Your Picture
            </button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
};

export default ChangeImage;
