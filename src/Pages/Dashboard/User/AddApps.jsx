
import axios from 'axios'
import useAuth from '../../../Hooks/useAuth'
import { useState } from 'react'
import { imageUpload } from '../../../Api/Utilities'
import AddAppsForm from '../../../Components/Dashboard/Form/AddAppsForm'
import toast from 'react-hot-toast'
import { axiosSecure } from '../../../Hooks/useAxiosSecure'
import { useNavigate } from 'react-router'


const AddPlant = () => {
  const { user } = useAuth()
  const navigate=useNavigate();
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [imageUploadError, setImageUploadError] = useState(false)
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState([]);
    console.log(tags);
  const handleFormSubmit = async e => {
    e.preventDefault()
    setIsUploading(true)
    const form = e.target
    const name = form?.name?.value
    const title = form?.title?.value
    const description = form?.description?.value
    const website=form?.website?.value
    const image=form?.photo.value
    const ownerName=form?.ownerName.value
    const ownerEmail=form?.ownerEmail.value

    try {
      const appsData = {
        name,
        title,
        website,
        description,
        tags,
        createdAt: new Date().toISOString(),
        image: uploadedImage,
        upvotes:0,
        owner: {
          name: ownerName,
          email: ownerEmail,
          image
        },
      }
      const { data } = await axiosSecure.post('/add-apps',
        appsData
      )
      if(data.insertedId){
        toast.success('Apps Data Added Successfully')
        form.reset()
        navigate('/dashboard/my-apps')
      }
      
    } catch (err) {
      console.log(err)
    } finally {
      setIsUploading(false)
    }
  }

  const handleImageUpload = async e => {
    e.preventDefault()
    setIsUploading(true)
    const image = e.target.files[0]
    try {
      // image url response from imgbb
      const imageUrl = await imageUpload(image)
      setUploadedImage(imageUrl)
      setIsUploading(false)
    } catch (err) {
      setImageUploadError('Image Upload Failed')
      console.log(err)
    }
  }
  return (
    <div>
      {/* Form */}
      <AddAppsForm
      tagInput={tagInput}
      setTagInput={setTagInput}
      tags={tags}
      setTags={setTags}
        handleFormSubmit={handleFormSubmit}
        isUploading={isUploading}
        uploadedImage={uploadedImage}
        handleImageUpload={handleImageUpload}
        imageUploadError={imageUploadError}
      />
    </div>
  )
}

export default AddPlant
