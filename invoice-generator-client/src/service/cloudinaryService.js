import axios from "axios";

export const uploadInvoiceThumbnail = async (imageData) => {
  const formData = new FormData();
  formData.append('file', imageData);
  formData.append('upload_preset', 'test_invoice');
  formData.append('cloud_name', "dsq9zvzbd");

  const response = await axios.post(
    'https://api.cloudinary.com/v1_1/dsq9zvzbd/image/upload',
    formData
  );

  return response.data.secure_url;
};
