import { logout } from '/app/(home)/features';
import { Dialog, DialogBody } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

const LogoutModal = ({ logoutModal, setLogoutModal }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Dialog open={logoutModal} size="xs">
      <DialogBody>
        {/* <div className="flex justify-between w-full">
          <div className="">
            Logout Alert
          </div>
          <button
            onClick={() => setLogoutModal(false)}
            className="bg-primary text-white p-2 px-4 flex justify-center items-center rounded-md hover:opacity-90 duration-200 cursor-pointer"
          >
            <FaTimes />
          </button>
        </div> */}
        <div className="flex min-h-full flex-col justify-center py-2 -mt-6">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-6 text-center text-3xl leading-9 tracking-tight text-gray-900">
              Are you sure?
            </h2>
            <p className="text-center p-4 text-lg tracking-wide">
              Please confirm if you want to logout.
            </p>
            <div className="flex justify-center items-center gap-x-3 w-full mt-6">
              <button
                onClick={() => setLogoutModal(false)}
                className="bg-gray-900 px-4 py-1 rounded-md text-white font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(logout());
                  router.push('/login');
                  setLogoutModal(false);
                }}
                className="bg-primary px-4 py-1 rounded-md text-white font-semibold"
              >
                Log me out
              </button>
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default LogoutModal;
