import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import { FiCamera } from 'react-icons/fi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { imageUpload } from '../../../Api/Utilities';
import Loading from '../Loading/Loading';


const UpdateUserInfo = ({ isOpen, close }) => {
  const { user, updateUserProfile,refreshUser,loading,toggleTheme,theme } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  //  React Query mutation for updating MongoDB
  const { mutateAsync: updateUser } = useMutation({
    mutationFn: async (userData) => {
      const res = await axiosSecure.patch(`/users/${userData.email}`, userData);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Profile updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['userProfile'] }); 
    },
    onError: () => {
      toast.error('Failed to update user info in database');
    }
  });

  //  Handle image upload
  const handleImage = async (event) => {
    const image = event.target.files[0];
    try {
      setUploading(true);
      const imgUrl = await imageUpload(image);
      setImageUrl(imgUrl);
    } catch (error) {
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  //  Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(name, imageUrl);
      
    // Toggle theme
    toggleTheme();

    // Delay to let Firebase profile/theme update propagate
    setTimeout(() => {
      refreshUser(); // Ensure latest data is reloaded
    }, 1000);

      const userData = {
        name,
        email: user?.email,
        image: imageUrl
      };

      await updateUser(userData); 
      close();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile');
    }
  };
  if(loading) return <Loading height={true}/>
  return (
    <Dialog open={isOpen} as="div" className="relative z-10" onClose={close}>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
          <DialogTitle className="text-xl font-semibold text-gray-800 mb-4">
            Update User Info
          </DialogTitle>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none text-gray-800 focus:ring focus:ring-primary/50"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Image Upload Field */}
            <div>
              <p className="text-lg font-semibold text-gray-800 mb-2">Select Image</p>
              <label
                htmlFor="image"
                className="relative border border-gray-200 rounded-lg py-3 px-4 w-full block cursor-pointer"
              >
                {uploading ? (
                  <Loading height={false} />
                ) : imageUrl ? (
                  <p className="text-lg text-center font-semibold text-primary">File Uploaded</p>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <FiCamera className="w-6 h-6" />
                    <span className="text-lg">No File Chosen</span>
                  </div>
                )}
                <input
                  onChange={handleImage}
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={close}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 hover:cursor-pointer"
              >
                Confirm Update
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UpdateUserInfo;
