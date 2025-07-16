
import { MdOutlineFeaturedPlayList, MdPreview, MdReport } from 'react-icons/md'
import MenuItem from './MenuItem'
const ModeratorMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdPreview}
        label='Review Submission'
        address='/dashboard/review-submission'
      />
      <MenuItem icon={MdReport} label='Reported Products' address='/dashboard/reported-products' />
    </>
  )
}

export default ModeratorMenu