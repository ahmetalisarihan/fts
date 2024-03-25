import UploadButton from '@/components/UploadButton'
import CloudinaryImage from '@/components/cloudinary-image';
import { Cloudinary } from '@cloudinary/url-gen/index';
import cloudinary from 'cloudinary'
import CreateProduct from './create-product';


type SearchResult = {
  public_id: string;
}

const AdminPage = async () => {

  const results = (await cloudinary.v2.search
    .expression('resource_type:image')
    .sort_by('public_id', 'desc')
    .max_results(5)
    .execute() as { resources: SearchResult[] })

  return (
    <div>
      <CreateProduct />
      {/* <UploadButton /> */}
      <div className='grid grid-cols-4 gap-4'>
        {results.resources.map((result) => (
          <CloudinaryImage
            key={result.public_id}
            src={result.public_id}
            width="300"
            height="300"
            crop="fill"
            alt="Description of my image"
          />
        ))}
      </div>
    </div>
  )
}

export default AdminPage