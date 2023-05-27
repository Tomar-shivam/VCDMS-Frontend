class CommonUtils {
  getDeviceTypeByModel(model) {
    var deviceType = "";
    if (model.includes("VL45")) { deviceType = "VL4500" }
    else if (model.includes("RM11")) { deviceType = "RM1100" }
    return deviceType;
  }

  getDeviceTypeByModelArray(modelArray) {
    var deviceTypeArray = [];
    for (var i = 0; i < modelArray.length; i++) {
      deviceTypeArray.push(modelArray[i]);
    }
    return deviceTypeArray;
  }

  IPValidation(string) {
    // let string = e.target.value;
    if (string.match(/[^0-9.]/)) {
      return true;
    }
    let count = 0;
    for (let i = 0; i < string.length; i++) {
      if (string.charAt(i) === ".") {
        count++;
      }
    }
    if (count > 3) {
      return true;
    }
    let x = string.split(".");
    for (let i = 0; i < x.length; i++) {
      if (x[i].length > 3) {
        return true;
      }
      if ((i>0 && x[i-1] === '') || Number.parseInt(x[i]) > 255) {
        return true;
      }
    }
    return false;
  }

  IPValidationWithPort(string) {
    let array = string.split(':');
    if(array.length>2) return true;
    
    let ip = array[0];
    if (ip.match(/[^0-9.]/)) {
      return true;
    }
    let count = 0;
    for (let i = 0; i < ip.length; i++) {
      if (ip.charAt(i) === ".") {
        count++;
      }
    }
    if (count > 3) {
      return true;
    }
    let x = ip.split(".");
    for (let i = 0; i < x.length; i++) {
      if (x[i].length > 3) {
        return true;
      }
      if ((i>0 && x[i-1] === '') || Number.parseInt(x[i]) > 255) {
        return true;
      }
    }
    if(array.length === 2){
      if(array[0].split('.').length === 4 && array[0].split('.')[3] === '') return true
      if(array[0].split('.').length != 4) return true;
    let port = array[1];
    if(port &&( isNaN(port) || (!isNaN(port) && (port<=0 || port>65535)))) return true;
    }
    return false;
  }

  DeviceModelCondition = (deviceModel)=>{
    return deviceModel.includes('RM11') || deviceModel.includes('VL4510H') || deviceModel.includes('VL4510C')
  }
  
}
export const deviceTypeForAddDevice = ["ELLVIS9000V3", "LEGACY", "RM1121HD/CXF", "RM1121XD", "VL4510", "VL4510C", "VL4510H", "VL4522", "VL4522Q"];
export const deviceTypesnames = ["ELLVIS9000V3", "RM1121HD/CXF", "RM1121XD", "VL4510", "VL4510C", "VL4510H", "VL4522", "VL4522Q"];

export default new CommonUtils();
