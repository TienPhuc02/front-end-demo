import axios from "axios";

export const callUploadAvatarImg = (fileImg: File) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileName", fileImg);
  return axios({
    method: "post",
    url: "http://localhost:8083/api/v1/files/upload",
    data: bodyFormData,
    headers: {
      "Content-Type":
        "multipart/form-data; boundary=<calculated when request is sent>",
      folder_type: "avatar",
    },
  });
};

// export const callCreateAuthor =