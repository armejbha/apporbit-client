import { useState } from "react";
import useAuth from "../../../Hooks/useAuth"
import { FaCamera } from "react-icons/fa";
import Loading from "../../Shared/Loading/Loading";

const AddAppsForm = ({
  tagInput,
  setTagInput,
  tags,
  setTags,
  handleFormSubmit,
  isUploading,
  uploadedImage,
  handleImageUpload,
  imageUploadError,
}) => {
    const {user,theme}=useAuth();
  return (
    <div className={`rounded-md w-full max-w-5xl mx-auto shrink-0 shadow-md border border-gray-200 my-10 py-5 ${theme === "dark" ? 'bg-[#0a0e19]' : 'bg-white'}`}>
  <div className="px-6">
    <h1 className="text-3xl font-bold mt-5">Add A New Apps</h1>
    <p className="mt-2">Fill in the details below to add a new apps to your collection.</p>
  </div>
  <div className="card-body">
    <form onSubmit={handleFormSubmit} className="">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left Section */}
        <div className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="label text-lg font-semibold mb-2">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              className="px-4 py-2  rounded w-full text-lg border-none outline-1 outline-gray-200 focus:outline-primary"
              placeholder="Enter Apps Name"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="label text-lg font-semibold mb-2">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              className="px-4 py-2 rounded w-full text-lg border-none outline-1 outline-gray-200 focus:outline-primary"
              placeholder="Enter Apps Title"
              required
            />
          </div>
          {/* owner photo url  */}
          <div>
            <label htmlFor="owner_photo" className="label text-lg font-semibold mb-2">Owner Photo Url</label>
            <input
              id="owner_photo"
              type="text"
              name="photo"
              defaultValue={user?.photoURL}
              className="px-4 py-2 rounded w-full text-lg border-none outline-1 outline-gray-200 focus:outline-primary"
              readOnly
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="label text-lg font-semibold mb-2">Description</label>
            <textarea
              name="description"
              id="description"
              rows={5}
              className="px-4 py-2  rounded w-full text-lg border-none outline-1 outline-gray-200 focus:outline-primary"
              placeholder="write description as Answer Question use :"
            ></textarea>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-[19px] grid grid-cols-1 md:grid-cols-2">
            <div className="col-span-2">
              <label htmlFor="tags" className="label text-lg font-semibold mb-2">Tags</label>

              <div
                className="flex flex-wrap items-center gap-2 px-3 py-2 w-full border border-gray-300 rounded-md focus-within:outline-primary"
                onClick={() => document.getElementById("tagsInput").focus()}
              >
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => {
                        const newTags = [...tags];
                        newTags.splice(index, 1);
                        setTags(newTags);
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
                      if (!tags.includes(newTag)) {
                        setTags([...tags, newTag]);
                      }
                      setTagInput("");
                    }
                  }}
                  placeholder="Press Enter or Comma"
                  className="flex-grow text-lg outline-none border-none  placeholder-gray-400"
                />
              </div>
            </div>

          {/* website link  */}
          <div className="col-span-2">
            <label htmlFor="website" className="label text-lg font-semibold mb-2">Website</label>
            <input
              id="website"
              type="text"
              name="website"
              className="px-4 py-2  rounded w-full text-lg border-none outline-1 outline-gray-200 focus:outline-primary"
              placeholder="Enter Your Website Link"
              required
            />
          </div>
          <div className="mr-4">
            <label htmlFor="owner_name" className="label text-lg font-semibold mb-2">Owner Name</label>
            <input
              id="owner_name"
              type="text"
              name="ownerName"
              defaultValue={user?.displayName}
              className="px-4 py-2  rounded w-full text-lg border-none outline-1 outline-gray-200 focus:outline-primary"
              readOnly
              required
            />
          </div>
          <div className="ml-4">
            <label htmlFor="owner_email" className="label text-lg font-semibold mb-2">Owner Email</label>
            <input
              id="owner_email"
              type="text"
              name="ownerEmail"
              defaultValue={user?.email}
              className="px-4 py-2  rounded w-full text-lg border-none outline-1 outline-gray-200 focus:outline-primary"
              readOnly
              required
            />
          </div>

          {/* Image Upload */}
          <div className="col-span-2">
            <p className="text-lg font-semibold mb-2 text-gray-400">Select Image</p>
            <label
              htmlFor="image"
              className="border border-gray-200 rounded-lg py-3 px-4 w-full block cursor-pointer h-[158px]"
            >
              {isUploading ? (
                <Loading height={false} />
              ) : uploadedImage ? (
                 <p className={`flex items-center justify-center h-full text-lg  font-semibold ${uploadedImage && 'text-primary'}`}>File Uploaded</p>
              ) : (
                <div className="flex items-center justify-center h-full gap-2 text-gray-600">
                    <FaCamera size={24} />
                  <span className="text-lg font-medium">No File Chosen</span>
                </div>
              )}
              <input
                onChange={handleImageUpload}
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="hidden"
              />
            </label>
            {imageUploadError && <p className="text-red-500 text-sm mt-2">{imageUploadError}</p>}
          </div>

          {/* Submit Button */}
         
        </div>
         
      </div>
      <button
            type="submit"
            className="bg-primary hover:bg-secondary w-full py-3 rounded-lg text-white text-lg font-semibold transition duration-200 mt-10"
          >
            {isUploading ? "Saving..." : "Save"}
          </button>
    </form>
  </div>
</div>

  )
}

export default AddAppsForm