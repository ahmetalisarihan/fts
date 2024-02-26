import {Cloudinary} from "@cloudinary/url-gen";

const cloudinary = () => {
  const cld = new Cloudinary({cloud: {cloudName: 'dwr8tmpss'}});
};

export default cloudinary;