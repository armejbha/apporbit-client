import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { FaCamera } from 'react-icons/fa';
import Loading from '../../../Components/Shared/Loading/Loading';
import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { imageUpload } from '../../../Api/Utilities';
import toast from 'react-hot-toast';

const UpdateAppsData = ({ isOpen, close, app }) => {
    const {theme}=useAuth()
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhoto: '',
    website: '',
    description: '',
    tags: [],
    image: ''
  });

  const [tagInput, setTagInput] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
   const [imageUploadError, setImageUploadError] = useState(false)
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  console.log(app);
  useEffect(() => {
    if (app) {
      setFormData({
        name: app.name || '',
        title: app.title || '',
        ownerName: app.owner?.name || '',
        ownerEmail: app.owner?.email || '',
        ownerPhoto: app.owner?.image || '',
        website: app.website || '',
        description: app.description || '',
        tags: app.tags || [],
        image: app.image || ''
      });
      setUploadedImage(app.image || null);
    }
  }, [app]);

  console.log(formData);

    const updateMutation = useMutation({
      mutationFn: async (updatedData) => {
        const res = await axiosSecure.patch(`/apps/${app._id}`, updatedData);
        return res.data;
      },
      onSuccess: () => {
    toast.success('App updated successfully!');
    queryClient.invalidateQueries(['userApps']);
    close();
  },
  onError: () => {
    toast.error('Failed to update app. Please try again.');
  }
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImage = async (event) => {
    const image = event.target.files[0];
    try {
      setIsUploading(true);
      const imgUrl = await imageUpload(image);
      setUploadedImage(imgUrl);
    } catch (error) {
      setImageUploadError('Image Upload Failed')
      toast.error('Image upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  return (
    <Dialog open={isOpen} as="div" className="relative z-100 h-[70vh]" onClose={close}>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4 overflow-y-auto">
        <DialogPanel className={`w-full max-w-4xl h-[90vh] overflow-y-auto rounded-xl p-6 shadow-lg ${theme === "dark" ? 'bg-[#0a0e19]' : 'bg-white'}`}>
          <DialogTitle className="text-2xl font-bold mb-6">
            Update App
          </DialogTitle>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['name', 'title', 'ownerName', 'ownerEmail', 'ownerPhoto', 'website'].map(field => (
              <div key={field} className={field === 'ownerPhoto' || field === 'website' ? 'md:col-span-2' : ''}>
                <label htmlFor={field} className="block text-sm font-medium mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  name={field}
                  id={field}
                  defaultValue={formData[field]}
                  onChange={handleInputChange}
                  readOnly={['ownerName', 'ownerEmail', 'ownerPhoto'].includes(field)}
                  required={['name', 'title', 'website'].includes(field)}
                  className={`w-full border rounded-md px-4 py-2 ${['ownerName', 'ownerEmail', 'ownerPhoto'].includes(field) ? 'bg-gray-100' : 'focus:outline-none focus:ring focus:ring-primary/50'}`}
                />
              </div>
            ))}

            {/* Tags */}
            <div className="md:col-span-2">
              <label htmlFor="tags" className="block text-sm font-medium mb-1">Tags</label>
              <div
                className="flex flex-wrap items-center gap-2 px-3 py-2 border rounded-md"
                onClick={() => document.getElementById("tagsInput").focus()}
              >
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => {
                        const newTags = [...formData.tags];
                        newTags.splice(index, 1);
                        setFormData(prev => ({ ...prev, tags: newTags }));
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  id="tagsInput"
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
                      e.preventDefault();
                      const newTag = tagInput.trim();
                      if (!formData.tags.includes(newTag)) {
                        setFormData(prev => ({ ...prev, tags: [...formData.tags, newTag] }));
                      }
                      setTagInput("");
                    }
                  }}
                  placeholder="Press Enter or Comma"
                  className="flex-grow text-sm outline-none border-none placeholder-gray-400"
                />
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                id="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-primary/50"
                placeholder="write description as Answer Question use :"
              ></textarea>
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-800 mb-2">Select Image</p>
              <label htmlFor="image" className="border border-gray-200 rounded-lg py-3 px-4 w-full block cursor-pointer h-[158px]">
                {isUploading ? (
                  <Loading height={false} />
                ) : uploadedImage ? (
                  <p className="flex items-center justify-center h-full text-primary font-medium">File Uploaded</p>
                ) : (
                  <div className="flex items-center justify-center h-full gap-2 text-gray-600">
                    <FaCamera size={24} />
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
              {imageUploadError && <p className="text-red-500 text-sm mt-2">{imageUploadError}</p>}
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={close}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90"
              >
                {isUploading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UpdateAppsData;
