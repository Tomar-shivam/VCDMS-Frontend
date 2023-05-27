import http from "../services/http.common";

function fetchToken() {
  return {
    headers: {
      'Authorization': sessionStorage.getItem('token') || '---',
    }
  }
}

class VCDMSService {
  getAll(ApiName) {
    return http.get(ApiName,fetchToken());
  }

  getById(ApiName, id) {
    return http.post(`${ApiName}/${id}`, fetchToken());
  }

  getByBoj(ApiName, data) {
    return http.post(ApiName, data, fetchToken());
  }

  CreateUpdate(ApiName, data) {
    return http.post(ApiName, data, fetchToken());
  }

  update(ApiName, id, data) {
    return http.put(`${ApiName}/${id}`, data, fetchToken());
  }

  getByUsername(ApiName, data) {
    return http.post(ApiName, data, fetchToken());
  }

  updateData(ApiName, data) {
    return http.put(ApiName, data, fetchToken());
  }

  SetPassword(ApiName, data,) {
    return http.put(ApiName, data, fetchToken());
  }

  verifyPassword(ApiName, data) {
    return http.post(ApiName, data, fetchToken());
  }

  deleteByID(ApiName, id) {
    return http.delete(`${ApiName}/${id}`, fetchToken());
  }

  get(ApiName) {
    return http.get(`${ApiName}`, fetchToken());
  }

  uploadFile(ApiName, data) {
    let formdata = new FormData();
    formdata.append("file", data.file);
    formdata.append("ipArray", data.ipArray);
    return http.post(ApiName, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": sessionStorage.getItem('token') || '---',
      },
      processData: false,
      timeout: 300000,
    });
  }

  delete(ApiName, data) {
    return http.post(ApiName, data, fetchToken());
  }

  getLocation(ApiName, data) {
    return http.post(ApiName, data, fetchToken());
  }

  getBackup(ApiName) {
    return http.get(ApiName, {
      responseType: 'blob',
      headers: {
        "Authorization": sessionStorage.getItem('token') || '---',
      }
    });
  }

  uploadBackup(ApiName, data) {
    let formdata = new FormData();
    formdata.append("user", data.user)
    formdata.append("file", data.file);
    return http.post(ApiName, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": sessionStorage.getItem('token') || '---',
      },
      processData: false,
      timeout: 300000,
    })
  }

  updateSingleDevice(ApiName, data) {
    console.log(ApiName, data);
    let formData = new FormData();
    formData.append("file", data.file);
    formData.append("ip", data.ip);
    return http.post(ApiName, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": sessionStorage.getItem('token') || '---',
      },
      processData: false,
      timeout: 300000,
    });
  }

  getFirmwarefiles(ApiName, data,) {
    return http.post(ApiName, data, fetchToken());
  }

  updateFirmwareByUploadedFile(ApiName, data) {
    return http.post(ApiName, data, {
      timeout: 300000,
      headers: {
        "Authorization": sessionStorage.getItem('token') || '---',
      }
    });
  }

  uploadFirmwareFile(ApiName, data) {
    let formdata = new FormData();
    formdata.append("file", data.file);
    formdata.append("devicetype", data.devicetype);
    return http.post(ApiName, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": sessionStorage.getItem('token') || '---',
      },
      processData: false,
      timeout: 300000,
    });
  }

  getPresetfiles(ApiName, data) {
    return http.post(ApiName, data, fetchToken());
  }

  updatePresetByUploadedFile(ApiName, data) {
    return http.post(ApiName, data, {
      timeout: 300000,
      headers: {
        "Authorization": sessionStorage.getItem('token') || '---',
      }
    });
  }

  uploadFileOnDir(ApiName, data) {
    let formdata = new FormData();
    formdata.append("file", data.file);
    if(data.devicetype){
      formdata.append("devicetype", data.devicetype);
    }
    return http.post(ApiName, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": sessionStorage.getItem('token') || '---',
      },
      processData: false,
      timeout: 300000,
    });
  }

}

export default new VCDMSService();
