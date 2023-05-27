import './pcVisionSetting.css'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, Card } from "react-bootstrap";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
let PcvisonSetting = (props) => {
  const [collapseIconAdmin, setCollapseIconAdmin] = useState(faPlusCircle);
  const [collapseIconTech, setCollapseIconTech] = useState(faPlusCircle);
  const [collapseIconUser, setCollapseIconUser] = useState(faPlusCircle);
  const [collapseIconInput1, setCollapseIconInput1] = useState(faPlusCircle);
  const [collapseIconInput2, setCollapseIconInput2] = useState(faPlusCircle);
  const [collapseIconInput3, setCollapseIconInput3] = useState(faPlusCircle);
  const [collapseIconInput4, setCollapseIconInput4] = useState(faPlusCircle);
  const [userRole, setUserRole] = useState((props.customerData.Role === "operator") ? true : false);

  const [admin_CanChangeInput, setAdmin_CanChangeInput] = useState('');
  const [admin_CanConfigure, setAdmin_CanConfigure] = useState('');
  const [admin_CanControlIR, setAdmin_CanControlIR] = useState('');
  const [admin_IdleTimeout, setAdmin_IdleTimeout] = useState('');
  const [admin_Pin, setAdmin_Pin] = useState('');

  const [tech_CanChangeInput, setTech_CanChangeInput] = useState('');
  const [tech_CanConfigure, setTech_CanConfigure] = useState('');
  const [tech_CanControlIR, setTech_CanControlIR] = useState('');
  const [tech_IdleTimeout, setTech_IdleTimeout] = useState('');
  const [tech_Pin, setTech_Pin] = useState('');

  const [user_CanChangeInput, setUser_CanChangeInput] = useState('');
  const [user_CanConfigure, setUser_CanConfigure] = useState('');
  const [user_CanControlIR, setUser_CanControlIR] = useState('');
  const [user_IdleTimeout, setUser_IdleTimeout] = useState('');
  const [user_Pin, setUser_Pin] = useState('');

  const [input1_Brightness, setInput1_Brightness] = useState('');
  const [input1_Contrast, setInput1_Contrast] = useState('');
  const [input1_Saturation, setInput1_Saturation] = useState('');
  const [input1_Hue, setInput1_Hue] = useState('');
  const [input1_Name, setInput1_Name] = useState('');
  const [input1_IRLibrary, setInput1_IRLibrary] = useState('');

  const [input2_Brightness, setInput2_Brightness] = useState('');
  const [input2_Contrast, setInput2_Contrast] = useState('');
  const [input2_Saturation, setInput2_Saturation] = useState('');
  const [input2_Hue, setInput2_Hue] = useState('');
  const [input2_Name, setInput2_Name] = useState('');
  const [input2_IRLibrary, setInput2_IRLibrary] = useState('');

  const [input3_Brightness, setInput3_Brightness] = useState('');
  const [input3_Contrast, setInput3_Contrast] = useState('');
  const [input3_Saturation, setInput3_Saturation] = useState('');
  const [input3_Hue, setInput3_Hue] = useState('');
  const [input3_Name, setInput3_Name] = useState('');
  const [input3_IRLibrary, setInput3_IRLibrary] = useState('');
  
  const [input4_Brightness, setInput4_Brightness] = useState('');
  const [input4_Contrast, setInput4_Contrast] = useState('');
  const [input4_Saturation, setInput4_Saturation] = useState('');
  const [input4_Hue, setInput4_Hue] = useState('');
  const [input4_Name, setInput4_Name] = useState('');
  const [input4_IRLibrary, setInput4_IRLibrary] = useState('');
  const [devicename, setDevicename] = useState('');

  useEffect(() => {
    setAdmin_CanChangeInput(props.properties.Admin_CanChangeInput);
    setAdmin_CanConfigure(props.properties.Admin_CanConfigure);
    setAdmin_CanControlIR(props.properties.Admin_CanControlIR);
    setAdmin_IdleTimeout(props.properties.Admin_IdleTimeout);

    setTech_CanChangeInput(props.properties.Tech_CanChangeInput);
    setTech_CanConfigure(props.properties.Tech_CanConfigure);
    setTech_CanControlIR(props.properties.Tech_CanControlIR);
    setTech_IdleTimeout(props.properties.Tech_IdleTimeout);

    setUser_CanChangeInput(props.properties.User_CanChangeInput);
    setUser_CanConfigure(props.properties.User_CanConfigure);
    setUser_CanControlIR(props.properties.User_CanControlIR);
    setUser_IdleTimeout(props.properties.User_IdleTimeout)

    setInput1_Brightness(props.properties.Input1_Brightness);
    setInput1_Contrast(props.properties.Input1_Contrast);
    setInput1_Saturation(props.properties.Input1_Saturation);
    setInput1_Hue(props.properties.Input1_Hue);
    setInput1_Name(props.properties.Input1_Name);

    setInput2_Brightness(props.properties.Input2_Brightness);
    setInput2_Contrast(props.properties.Input2_Contrast);
    setInput2_Saturation(props.properties.Input2_Saturation);
    setInput2_Hue(props.properties.Input2_Hue);
    setInput2_Name(props.properties.Input2_Name);

    setInput3_Brightness(props.properties.Input3_Brightness);
    setInput3_Contrast(props.properties.Input3_Contrast);
    setInput3_Saturation(props.properties.Input3_Saturation);
    setInput3_Hue(props.properties.Input3_Hue);
    setInput3_Name(props.properties.Input3_Name);

    setInput4_Brightness(props.properties.Input4_Brightness);
    setInput4_Contrast(props.properties.Input4_Contrast);
    setInput4_Saturation(props.properties.Input4_Saturatio);
    setInput4_Hue(props.properties.Input4_Hue);
    setInput4_Name(props.properties.Input4_Name);
 
    setInput1_IRLibrary(props.properties.Input1_IRLibrary)
    setInput2_IRLibrary(props.properties.Input2_IRLibrary)
    setInput3_IRLibrary(props.properties.Input3_IRLibrary)
    setInput4_IRLibrary(props.properties.Input4_IRLibrary)

    setDevicename(props.properties.devicename);
    setAdmin_Pin(props.setProperties1.Admin_Pin);
    setTech_Pin(props.setProperties1.Tech_Pin);
    setUser_Pin(props.setProperties1.User_Pin)
    setUserRole((props.customerData.Role === "operator" || props.customerData.Role === "Technician/Engineer") ? true : false)
  }, [props.properties])

  const iconClickHandler = (event, key) => {
    event.preventDefault()
    setCollapseIconAdmin(key === "1" ? (collapseIconAdmin === faPlusCircle ? faMinusCircle : faPlusCircle) : faPlusCircle)
    setCollapseIconTech(key === "2" ? (collapseIconTech === faPlusCircle ? faMinusCircle : faPlusCircle) : faPlusCircle)
    setCollapseIconUser(key === "3" ? (collapseIconUser === faPlusCircle ? faMinusCircle : faPlusCircle) : faPlusCircle)
    setCollapseIconInput1(key === "4" ? (collapseIconInput1 === faPlusCircle ? faMinusCircle : faPlusCircle) : faPlusCircle)
    setCollapseIconInput2(key === "5" ? (collapseIconInput2 === faPlusCircle ? faMinusCircle : faPlusCircle) : faPlusCircle)
    setCollapseIconInput3(key === "6" ? (collapseIconInput3 === faPlusCircle ? faMinusCircle : faPlusCircle) : faPlusCircle)
    setCollapseIconInput4(key === "7" ? (collapseIconInput4 === faPlusCircle ? faMinusCircle : faPlusCircle) : faPlusCircle)
    
    // if (key === "1") {
    //   if (collapseIconAdmin === faPlusCircle) {
    //     setCollapseIconAdmin(faMinusCircle)
    //     setCollapseIconTech(faPlusCircle)
    //     setCollapseIconUser(faPlusCircle)
    //     setCollapseIconInput1(faPlusCircle)
    //     setCollapseIconInput2(faPlusCircle)
    //     setCollapseIconInput3(faPlusCircle)
    //     setCollapseIconInput4(faPlusCircle)
    //   } else {
    //     setCollapseIconAdmin(faPlusCircle)
    //     setCollapseIconTech(faPlusCircle)
    //     setCollapseIconUser(faPlusCircle)
    //     setCollapseIconInput1(faPlusCircle)
    //     setCollapseIconInput2(faPlusCircle)
    //     setCollapseIconInput3(faPlusCircle)
    //     setCollapseIconInput4(faPlusCircle)
    //   }
    // }
    // else if (key === "2") {
    //   if (collapseIconTech === faPlusCircle) {
    //     setCollapseIconAdmin(faPlusCircle)
    //     setCollapseIconTech(faMinusCircle)
    //     setCollapseIconUser(faPlusCircle)
    //     setCollapseIconInput1(faPlusCircle)
    //     setCollapseIconInput2(faPlusCircle)
    //     setCollapseIconInput3(faPlusCircle)
    //     setCollapseIconInput4(faPlusCircle)
    //   } else {
    //     setCollapseIconAdmin(faPlusCircle)
    //     setCollapseIconTech(faPlusCircle)
    //     setCollapseIconUser(faPlusCircle)
    //     setCollapseIconInput1(faPlusCircle)
    //     setCollapseIconInput2(faPlusCircle)
    //     setCollapseIconInput3(faPlusCircle)
    //     setCollapseIconInput4(faPlusCircle)
    //   }
    // }
    // else if (key === "3") {
    //   if (collapseIconUser === faPlusCircle) {
    //     setCollapseIconAdmin(faPlusCircle)
    //     setCollapseIconTech(faPlusCircle)
    //     setCollapseIconUser(faMinusCircle)
    //     setCollapseIconInput1(faPlusCircle)
    //     setCollapseIconInput2(faPlusCircle)
    //     setCollapseIconInput3(faPlusCircle)
    //     setCollapseIconInput4(faPlusCircle)
    //   } else {
    //     setCollapseIconAdmin(faPlusCircle)
    //     setCollapseIconTech(faPlusCircle)
    //     setCollapseIconUser(faPlusCircle)
    //     setCollapseIconInput1(faPlusCircle)
    //     setCollapseIconInput2(faPlusCircle)
    //     setCollapseIconInput3(faPlusCircle)
    //     setCollapseIconInput4(faPlusCircle)
    //   }
    // }
    // else if (key === "4") {
    //   if (collapseIconInput1 === faPlusCircle) {
    //     setCollapseIconAdmin(faPlusCircle)
    //     setCollapseIconTech(faPlusCircle)
    //     setCollapseIconUser(faPlusCircle)
    //     setCollapseIconInput1(faMinusCircle)
    //     setCollapseIconInput2(faPlusCircle)
    //     setCollapseIconInput3(faPlusCircle)
    //     setCollapseIconInput4(faPlusCircle)
    //   } else {
    //     setCollapseIconAdmin(faPlusCircle)
    //     setCollapseIconTech(faPlusCircle)
    //     setCollapseIconUser(faPlusCircle)
    //     setCollapseIconInput1(faPlusCircle)
    //     setCollapseIconInput2(faPlusCircle)
    //     setCollapseIconInput3(faPlusCircle)
    //     setCollapseIconInput4(faPlusCircle)
    //   }
    // }
    // else if (key === '5') {
    //   if (collapseIconInput2 === faPlusCircle) {
    //     setCollapseIconAdmin(faPlusCircle)
    //     setCollapseIconTech(faPlusCircle)
    //     setCollapseIconUser(faPlusCircle)
    //     setCollapseIconInput1(faPlusCircle)
    //     setCollapseIconInput2(faMinusCircle)
    //     setCollapseIconInput3(faPlusCircle)
    //     setCollapseIconInput4(faPlusCircle)
    //   } else {
    //     setCollapseIconAdmin(faPlusCircle)
    //     setCollapseIconTech(faPlusCircle)
    //     setCollapseIconUser(faPlusCircle)
    //     setCollapseIconInput1(faPlusCircle)
    //     setCollapseIconInput2(faPlusCircle)
    //     setCollapseIconInput3(faPlusCircle)
    //     setCollapseIconInput4(faPlusCircle)
    //   }
    // }
    // else if (key === "6") {
    //   if (collapseIconInput3 === faPlusCircle) {
    //     setCollapseIconAdmin(faPlusCircle)
    //     setCollapseIconTech(faPlusCircle)
    //     setCollapseIconUser(faPlusCircle)
    //     setCollapseIconInput1(faPlusCircle)
    //     setCollapseIconInput2(faPlusCircle)
    //     setCollapseIconInput3(faMinusCircle)
    //     setCollapseIconInput4(faPlusCircle)
    //   } else {
    //     setCollapseIconAdmin(faPlusCircle)
    //     setCollapseIconTech(faPlusCircle)
    //     setCollapseIconUser(faPlusCircle)
    //     setCollapseIconInput1(faPlusCircle)
    //     setCollapseIconInput2(faPlusCircle)
    //     setCollapseIconInput3(faPlusCircle)
    //     setCollapseIconInput4(faPlusCircle)
    //   }
    // }
    // else {
    //   if (collapseIconInput4 === faPlusCircle) {
    //     setCollapseIconAdmin(faPlusCircle)
    //     setCollapseIconTech(faPlusCircle)
    //     setCollapseIconUser(faPlusCircle)
    //     setCollapseIconInput1(faPlusCircle)
    //     setCollapseIconInput2(faPlusCircle)
    //     setCollapseIconInput3(faPlusCircle)
    //     setCollapseIconInput4(faMinusCircle)
    //   } else {
    //     setCollapseIconAdmin(faPlusCircle)
    //     setCollapseIconTech(faPlusCircle)
    //     setCollapseIconUser(faPlusCircle)
    //     setCollapseIconInput1(faPlusCircle)
    //     setCollapseIconInput2(faPlusCircle)
    //     setCollapseIconInput3(faPlusCircle)
    //     setCollapseIconInput4(faPlusCircle)
    //   }
    // }
  }

  const changeHandler = (event, setContent, type) => {
    setContent(event.target.value);
    let sample = { ...props.properties };
    sample[type] = event.target.value;
    props.setProperties1(sample)
  }
const IRLibraryValidation = (string) => {
    // let string = event.target.value;
    if (string.length > 12) return true;
    if (string.match(/[^0-9#-]/)) {
      return true;
    }
    if (string.length > 5 && string.charAt(5) !== '-') return true;
    else if (string.length <= 5 && isNaN(string)) return true;
    let x = string.split("-");
    if (x.length === 2) {
      if (x[1].length > 2 && x[1].charAt(2) !== '#') return true;
      let y = x[1].split('#');
      if (y.length > 2) return true;
      if (y.length == 2 && y[0].length !== 2) return true;
      for (let i = 0; i < y.length; i++)
        if (isNaN(y[i])) return true;
    }
    else if (x.length === 3) return true;
    return false;
  }
  return (
    <>
      <div className='pad-15'>
        <div className='form-boxdiv'>
          <div className='form-boxtopline5'>Public PCVision Settings</div>
          <div className='form-boxtopcont user-form'>
            <Accordion className='customAccordion' defaultActiveKey="0">
              <Card>
                <Accordion.Toggle onClick={(event) => { iconClickHandler(event, "1") }} eventKey="1">
                  <span>Admin</span>
                  <FontAwesomeIcon icon={collapseIconAdmin} />
                </Accordion.Toggle>
                <div className='icon-pos'>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      <div className='row'>
                        <div className='form-group col-md-6'>
                          <label className="form-check-label">Change Input</label>
                          <select className='form-control' value={admin_CanChangeInput}
                            disabled={userRole}
                            onChange={(event) => changeHandler(event, setAdmin_CanChangeInput, "Admin_CanChangeInput")}>
                            <option value='true' >True</option>
                            <option value='false' >False</option>
                          </select>
                        </div>
                        <div className='form-group col-md-6'>
                          <label className="form-check-label">Configure Unit</label>
                          <select className='form-control' value={admin_CanConfigure}
                            disabled={userRole}
                            onChange={(event) => changeHandler(event, setAdmin_CanConfigure, "Admin_CanConfigure")}>
                            <option value='true'>True</option>
                            <option value='false' >False</option>
                          </select>
                        </div>

                        <div className='form-group col-md-6'>
                          <label className="form-check-label">Control IR port</label>
                          <select className='form-control' value={admin_CanControlIR}
                            disabled={userRole}
                            onChange={(event) => changeHandler(event, setAdmin_CanControlIR, "Admin_CanControlIR")}>
                            <option value='true'>True</option>
                            <option value='false'>False</option>
                          </select>
                        </div>

                        <div className='form-group col-md-6'>
                          <label className="form-check-label">Timeout <em>(in seconds)</em></label>
                          <input type='number' placeholder='0' min={0} className='form-control' value={admin_IdleTimeout}
                            disabled={userRole}
                            onChange={(event) => changeHandler(event, setAdmin_IdleTimeout, "Admin_IdleTimeout ")} />
                          <i className='text-primary mt-1 d-block'>
                            NOTE: Use 0 for no Timeout
                          </i>
                        </div>

                        <div className='form-group col-md-6'>
                          <label className="form-check-label">Admin Pin</label>
                          <input type='number' placeholder='Please Enter 4-Digit Admin PIN' min={0} value={admin_Pin} className='form-control hide-num-arrow'
                            disabled={userRole}
                            onChange={(event) => {
                              if (event.target.value.length > 4 || event.target.value.match(/[^0-9-]/)) return
                              changeHandler(event, setAdmin_Pin, "Admin_Pin ")
                            }
                            } />
                        </div>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </div>
              </Card>
              <Card>
                <Accordion.Toggle onClick={(event) => { iconClickHandler(event, "2") }} eventKey="2">
                  <span>Tech</span>
                  <FontAwesomeIcon icon={collapseIconTech} />
                </Accordion.Toggle>
                <div className='icon-pos'>
                  <Accordion.Collapse eventKey="2">
                    <Card.Body>
                      <div className='row'>
                        <div className='form-group col-md-6'>
                          <label className="form-check-label">Change Input</label>
                          <select className='form-control' value={tech_CanChangeInput}
                            disabled={userRole}
                            onChange={(event) => changeHandler(event, setTech_CanChangeInput, "Tech_CanChangeInput")}>
                            <option value='true'>True</option>
                            <option value='false'>False</option>
                          </select>
                        </div>

                        <div className='form-group col-md-6'>
                          <label className="form-check-label">Configure Unit</label>
                          <select className='form-control' value={tech_CanConfigure}
                            disabled={userRole}
                            onChange={(event) => changeHandler(event, setTech_CanConfigure, "Tech_CanConfigure")}>
                            <option value="true">True</option>
                            <option value="false" >False</option>
                          </select>
                        </div>

                        <div className='form-group col-md-6'>
                          <label className="form-check-label">Control IR port</label>
                          <select className='form-control' value={tech_CanControlIR}
                            disabled={userRole}
                            onChange={(event) => changeHandler(event, setTech_CanControlIR, "Tech_CanControlIR")}>
                            <option value="true">True</option>
                            <option value="false" >False</option>
                          </select>
                        </div>

                        <div className='form-group col-md-6'>
                          <label className="form-check-label">Timeout <em>(in seconds)</em></label>
                          <input type='number' placeholder='0' min={0} value={tech_IdleTimeout} className='form-control'
                            disabled={userRole}
                            onChange={(event) => changeHandler(event, setTech_IdleTimeout, "Tech_IdleTimeout")} />
                          <i className='text-primary mt-1 d-block'>
                            NOTE: Use 0 for no Timeout
                          </i>
                        </div>
                        <div className='form-group col-md-6'>
                          <label className="form-check-label">Tech Pin</label>
                          <input type='number' placeholder='Please Enter 4-Digit Tech PIN' min={0} value={tech_Pin} className='form-control hide-num-arrow'
                            disabled={userRole}
                            onChange={(event) => {
                              if (event.target.value.length > 4 || event.target.value.match(/[^0-9-]/)) return;
                              changeHandler(event, setTech_Pin, "Tech_Pin ")
                            }} />
                        </div>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>

                </div>
              </Card>
              <Card>
                <Accordion.Toggle onClick={(event) => { iconClickHandler(event, "3") }} eventKey="3">
                  <span>User</span>
                  <FontAwesomeIcon icon={collapseIconUser} />
                </Accordion.Toggle>
                <div className='icon-pos'>
                  <Accordion.Collapse eventKey="3">
                    <Card.Body>
                      <div className='row'>
                        <div className='form-group col-md-6'>
                          <label className="form-check-label">Change Input</label>
                          <select className='form-control' value={user_CanChangeInput}
                            disabled={userRole}
                            onChange={(event) => changeHandler(event, setUser_CanChangeInput, "User_CanChangeInput")}>
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </select>
                        </div>

                        <div className='form-group col-md-6'>
                          <label className="form-check-label">Configure Unit</label>
                          <select className='form-control' value={user_CanConfigure}
                            disabled={userRole}
                            onChange={(event) => changeHandler(event, setUser_CanConfigure, "User_CanConfigure")}>
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </select>
                        </div>

                        <div className='form-group col-md-6'>
                          <label className="form-check-label">Control IR port</label>
                          <select className='form-control' value={user_CanControlIR}
                            disabled={userRole}
                            onChange={(event) => changeHandler(event, setUser_CanControlIR, "User_CanControlIR")}>
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </select>
                        </div>

                        <div className='form-group col-md-6'>
                          <label className="form-check-label">Timeout <em>(in seconds)</em></label>
                          <input type='number' placeholder='0' min={0} className='form-control' value={user_IdleTimeout}
                            disabled={userRole}
                            onChange={(event) => changeHandler(event, setUser_IdleTimeout, "User_IdleTimeout")} />
                          <i className='text-primary mt-1 d-block'>
                            NOTE: Use 0 for no Timeout
                          </i>
                        </div>
                        <div className='form-group col-md-6'>
                          <label className="form-check-label">User Pin</label>
                          <input type='number' placeholder='Please Enter 4-Digit User PIN' min={0} value={user_Pin} className='form-control hide-num-arrow'
                            disabled={userRole}
                            onChange={(event) => {
                              if (event.target.value.length > 4 || event.target.value.match(/[^0-9-]/)) return;
                              changeHandler(event, setUser_Pin, "User_Pin")
                            }} />
                        </div>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </div>
              </Card>

              <Card>
                <Accordion.Toggle onClick={(event) => { iconClickHandler(event, "4") }} eventKey="4">
                  <span>Input 1</span>
                  <FontAwesomeIcon icon={collapseIconInput1} />
                </Accordion.Toggle>
                <div className='icon-pos'>
                  <Accordion.Collapse eventKey="4">
                    <Card.Body>
                      <div className='row mt-3'>
                        <div className='form-group col-md-6'>
                          <label className='form-check-label'>Brightness for HDMI Input 1</label>
                          <input type='number' min={0} value={input1_Brightness} className='form-control'
                            disabled={userRole}
                            onChange={(event) => {
                              if (event.target.value.match(/[^0-9-]/)) { return; }
                              if (Number.parseInt(event.target.value) > 255 || Number.parseInt(event.target.value) < 0) return;
                              changeHandler(event, setInput1_Brightness, "Input1_Brightness")
                            }} />
                        </div>
                        <div className='form-group col-md-6'>
                          <label className='form-check-label'>Contrast for HDMI Input 1</label>
                          <input type='number' min={0} value={input1_Contrast} className='form-control'
                            disabled={userRole}
                            onChange={(event) => {
                              if (event.target.value.match(/[^0-9-]/)) { return; }
                              if (Number.parseInt(event.target.value) > 255 || Number.parseInt(event.target.value) < 0) return;
                              changeHandler(event, setInput1_Contrast, "Input1_Contrast")
                            }} />
                        </div>
                        <div className='form-group col-md-6'>
                          <label className='form-check-label'>Saturation for HDMI Input 1</label>
                          <input type='number' min={0} value={input1_Saturation} className='form-control'
                            disabled={userRole}
                            onChange={(event) => {
                              if (event.target.value.match(/[^0-9-]/)) { return; }
                              if (Number.parseInt(event.target.value) > 255 || Number.parseInt(event.target.value) < 0) return;
                              changeHandler(event, setInput1_Saturation, "Input1_Saturation")

                            }} />
                        </div>
                        <div className='form-group col-md-6'>
                          <label className='form-check-label'>Hue for HDMI Input 1</label>
                          <input type='number' min={0} className='form-control' value={input1_Hue}
                            disabled={userRole}
                            onChange={(event) => {
                              if (event.target.value.match(/[^0-9-]/)) { return; }
                              if (Number.parseInt(event.target.value) > 180 || Number.parseInt(event.target.value) < -180) return;
                              changeHandler(event, setInput1_Hue, "Input1_Hue")
                            }} />
                        </div>
                        <div className='form-group col-md-6'>
                          <label className='form-check-label'>HDMI Input 1 Name</label>
                          <input type='text' className='form-control' value={input1_Name}
                            disabled={userRole}
                            onChange={(event) => {
                              if (event.target.value.match(/[^a-zA-Z0-9_-]/)) { return; }
                              changeHandler(event, setInput1_Name, "input1_Name")
                            }} />
                        </div>
                        <div className='form-group col-md-6'>
                          <label className='form-check-label'>IR-Library Input1</label>
                          <input type='text' className='form-control' value={input1_IRLibrary}
                            disabled={userRole}
                            onChange={(event) => {
                              if(IRLibraryValidation(event.target.value)){return}
                              // if (event.target.value.match(/[^a-zA-Z0-9_.-]/)) { return; }
                              changeHandler(event, setInput1_IRLibrary, "Input1_IRLibrary")
                            }} />
                        </div>

                        
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </div>
              </Card>

              <Card>
                <Accordion.Toggle onClick={(event) => { iconClickHandler(event, "5") }} eventKey="5">
                  <span>Input 2</span>
                  <FontAwesomeIcon icon={collapseIconInput2} />
                </Accordion.Toggle>
                <div className='icon-pos'>
                  <Accordion.Collapse eventKey="5">
                    <Card.Body>
                      <div className='row mt-3'>
                        <div className='form-group col-md-6'>
                          <label className='form-check-label'>Brightness for HDMI Input 2</label>
                          <input type='number' min={0} value={input2_Brightness} className='form-control'
                            disabled={userRole}
                            onChange={(event) => {
                              if (event.target.value.match(/[^0-9-]/)) { return; }
                              if (Number.parseInt(event.target.value) > 255 || Number.parseInt(event.target.value) < 0) return;
                              changeHandler(event, setInput2_Brightness, "Input2_Brightness")
                            }} />
                        </div>
                        <div className='form-group col-md-6'>
                          <label className='form-check-label'>Contrast for HDMI Input 2</label>
                          <input type='number' min={0} value={input2_Contrast} className='form-control'
                            disabled={userRole}
                            onChange={(event) => {
                              if (event.target.value.match(/[^0-9-]/)) { return; }
                              if (Number.parseInt(event.target.value) > 255 || Number.parseInt(event.target.value) < 0) return;
                              changeHandler(event, setInput2_Contrast, "Input2_Contrast")
                            }} />
                        </div>
                        <div className='form-group col-md-6'>
                          <label className='form-check-label'>Saturation for HDMI Input 2</label>
                          <input type='number' min={0} value={input2_Saturation} className='form-control'
                            disabled={userRole}
                            onChange={(event) => {
                              if (event.target.value.match(/[^0-9-]/)) { return; }
                              if (Number.parseInt(event.target.value) > 255 || Number.parseInt(event.target.value) < 0) return;
                              changeHandler(event, setInput2_Saturation, "Input2_Saturation")

                            }} />
                        </div>
                        <div className='form-group col-md-6'>
                          <label className='form-check-label'>Hue for HDMI Input 2</label>
                          <input type='number' min={0} className='form-control' value={input2_Hue}
                            disabled={userRole}
                            onChange={(event) => {
                              if (event.target.value.match(/[^0-9-]/)) { return; }
                              if (Number.parseInt(event.target.value) > 180 || Number.parseInt(event.target.value) < -180) return;
                              changeHandler(event, setInput2_Hue, "Input2_Hue")
                            }} />
                        </div>
                        <div className='form-group col-md-6'>
                          <label className='form-check-label'>HDMI Input 2 Name</label>
                          <input type='text' className='form-control' value={input2_Name}
                            disabled={userRole}
                            onChange={(event) => {
                              if (event.target.value.match(/[^a-zA-Z0-9_-]/)) { return; }
                              changeHandler(event, setInput2_Name, "input2_Name")
                            }} />
                        </div>
                        <div className='form-group col-md-6'>
                          <label className='form-check-label'>IR-Library Input2</label>
                          <input type='text' className='form-control' value={input2_IRLibrary}
                            disabled={userRole}
                            onChange={(event) => {
                              if(IRLibraryValidation(event.target.value)){return}
                              // if (event.target.value.match(/[^a-zA-Z0-9_.-]/)) { return; }
                              changeHandler(event, setInput2_IRLibrary, "Input2_IRLibrary")
                            }} />
                        </div>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </div>
              </Card>

              <Card>
                <Accordion.Toggle onClick={(event) => { iconClickHandler(event, "6") }} eventKey="6">
                  <span>Input 3</span>
                  <FontAwesomeIcon icon={collapseIconInput3} />
                </Accordion.Toggle>
                <div className='icon-pos'>
                  <Accordion.Collapse eventKey="6">
                    <Card.Body>
                      <div className='row mt-3'>
                        <div className='form-group col-md-6'>
                          <label className='form-check-label'>Brightness for HDMI Input 3</label>
                          <input type='number' min={0} value={input3_Brightness} className='form-control'
                            disabled={userRole}
                            onChange={(event) => {
                              if (event.target.value.match(/[^0-9-]/)) { return; }
                              if (Number.parseInt(event.target.value) > 255 || Number.parseInt(event.target.value) < 0) return;
                              changeHandler(event, setInput3_Brightness, "Input3_Brightness")
                            }} />
                        </div>
                        <div className='form-group col-md-6'>
                          <label className='form-check-label'>Contrast for HDMI Input 3</label>
                          <input type='number' min={0} value={input3_Contrast} className='form-control'
                            disabled={userRole}
                            onChange={(event) => {
                              if (event.target.value.match(/[^0-9-]/)) { return; }
                              if (Number.parseInt(event.target.value) > 255 || Number.parseInt(event.target.value) < 0) return;
                              changeHandler(event, setInput3_Contrast, "Input3_Contrast")
                            }} />
                        </div>
                        <div className='form-group col-md-6'>
                          <label className='form-check-label'>Saturation for HDMI Input 3</label>
                          <input type='number' min={0} value={input3_Saturation} className='form-control'
                            disabled={userRole}
                            onChange={(event) => {
                              if (event.target.value.match(/[^0-9-]/)) { return; }
                              if (Number.parseInt(event.target.value) > 255 || Number.parseInt(event.target.value) < 0) return;
                              changeHandler(event, setInput3_Saturation, "Input3_Saturation")

                            }} />
                        </div>
                        <div className='form-group col-md-6'>
                          <label className='form-check-label'>Hue for HDMI Input 3</label>
                          <input type='number' min={0} className='form-control' value={input3_Hue}
                            disabled={userRole}
                            onChange={(event) => {
                              if (event.target.value.match(/[^0-9-]/)) { return; }
                              if (Number.parseInt(event.target.value) > 180 || Number.parseInt(event.target.value) < -180) return;
                              changeHandler(event, setInput3_Hue, "Input3_Hue")
                            }} />
                        </div>
                        <div className='form-group col-md-6'>
                          <label className='form-check-label'>HDMI Input 3 Name</label>
                          <input type='text' className='form-control' value={input3_Name}
                            disabled={userRole}
                            onChange={(event) => {
                              if (event.target.value.match(/[^a-zA-Z0-9_-]/)) { return; }
                              changeHandler(event, setInput3_Name, "input3_Name")
                            }} />
                        </div>
                        <div className='form-group col-md-6'>
                          <label className='form-check-label'>IR-Library Input3</label>
                          <input type='text' className='form-control' value={input3_IRLibrary}
                            disabled={userRole}
                            onChange={(event) => {
                              if(IRLibraryValidation(event.target.value)){return}
                              // if (event.target.value.match(/[^a-zA-Z0-9_.-]/)) { return; }
                              changeHandler(event, setInput3_IRLibrary, "Input3_IRLibrary")
                            }} />
                        </div>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </div>
              </Card>

              <Card>
                <Accordion.Toggle onClick={(event) => { iconClickHandler(event, "7") }} eventKey="7">
                  <span>Input 4</span>
                  <FontAwesomeIcon icon={collapseIconInput4} />
                </Accordion.Toggle>
                <div className='icon-pos'>
                  <Accordion.Collapse eventKey="7">
                    <Card.Body>
                      <div className='row mt-3'>
                        <div className='form-group col-md-6'>
                          <label className='form-check-label'>Brightness for HDMI Input 4</label>
                          <input type='number' min={0} value={input4_Brightness} className='form-control'
                            disabled={userRole}
                            onChange={(event) => {
                              if (event.target.value.match(/[^0-9-]/)) { return; }
                              if (Number.parseInt(event.target.value) > 255 || Number.parseInt(event.target.value) < 0) return;
                              changeHandler(event, setInput4_Brightness, "Input4_Brightness")
                            }} />
                        </div>
                        <div className='form-group col-md-6'>
                          <label className='form-check-label'>Contrast for HDMI Input 4</label>
                          <input type='number' min={0} value={input4_Contrast} className='form-control'
                            disabled={userRole}
                            onChange={(event) => {
                              if (event.target.value.match(/[^0-9-]/)) { return; }
                              if (Number.parseInt(event.target.value) > 255 || Number.parseInt(event.target.value) < 0) return;
                              changeHandler(event, setInput4_Contrast, "Input4_Contrast")
                            }} />
                        </div>
                        <div className='form-group col-md-6'>
                          <label className='form-check-label'>Saturation for HDMI Input 4</label>
                          <input type='number' min={0} value={input4_Saturation} className='form-control'
                            disabled={userRole}
                            onChange={(event) => {
                              if (event.target.value.match(/[^0-9-]/)) { return; }
                              if (Number.parseInt(event.target.value) > 255 || Number.parseInt(event.target.value) < 0) return;
                              changeHandler(event, setInput4_Saturation, "Input4_Saturation")

                            }} />
                        </div>
                        <div className='form-group col-md-6'>
                          <label className='form-check-label'>Hue for HDMI Input 4</label>
                          <input type='number' min={0} className='form-control' value={input4_Hue}
                            disabled={userRole}
                            onChange={(event) => {
                              if (event.target.value.match(/[^0-9-]/)) { return; }
                              if (Number.parseInt(event.target.value) > 180 || Number.parseInt(event.target.value) < -180) return;
                              changeHandler(event, setInput4_Hue, "Input4_Hue")
                            }} />
                        </div>
                        <div className='form-group col-md-6'>
                          <label className='form-check-label'>HDMI Input 4 Name</label>
                          <input type='text' className='form-control' value={input4_Name}
                            disabled={userRole}
                            onChange={(event) => {
                              if (event.target.value.match(/[^a-zA-Z0-9_-]/)) { return; }
                              changeHandler(event, setInput4_Name, "input4_Name")
                            }} />
                        </div>
                        <div className='form-group col-md-6'>
                          <label className='form-check-label'>IR-Library Input4</label>
                          <input type='text' className='form-control' value={input4_IRLibrary}
                            disabled={userRole}
                            onChange={(event) => {
                              if(IRLibraryValidation(event.target.value)){return}
                              // if (event.target.value.match(/[^a-zA-Z0-9_.-]/)) { return; }
                              changeHandler(event, setInput4_IRLibrary, "Input4_IRLibrary")
                            }} />
                        </div>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </div>
              </Card>
            </Accordion>

            {/* <div className='row mt-3'>
              <div className='form-group col-md-6'>
                <label className='form-check-label'>Brightness for HDMI Input 1</label>
                <input type='number' min={0} value={input1_Brightness} className='form-control'
                  disabled={userRole}
                  onChange={(event) => {
                    if (event.target.value.match(/[^0-9-]/)) { return; }
                    if (Number.parseInt(event.target.value) > 255 || Number.parseInt(event.target.value) < 0) return;
                    changeHandler(event, setInput1_Brightness, "Input1_Brightness")
                  }} />
              </div>
              <div className='form-group col-md-6'>
                <label className='form-check-label'>Contrast for HDMI Input 1</label>
                <input type='number' min={0} value={input1_Contrast} className='form-control'
                  disabled={userRole}
                  onChange={(event) => {
                    if (event.target.value.match(/[^0-9-]/)) { return; }
                    if (Number.parseInt(event.target.value) > 255 || Number.parseInt(event.target.value) < 0) return;
                    changeHandler(event, setInput1_Contrast, "Input1_Contrast")
                  }} />
              </div>
              <div className='form-group col-md-6'>
                <label className='form-check-label'>Saturation for HDMI Input 1</label>
                <input type='number' min={0} value={input1_Saturation} className='form-control'
                  disabled={userRole}
                  onChange={(event) => {
                    if (event.target.value.match(/[^0-9-]/)) { return; }
                    if (Number.parseInt(event.target.value) > 255 || Number.parseInt(event.target.value) < 0) return;
                    changeHandler(event, setInput1_Saturation, "Input1_Saturation")

                  }} />
              </div>
              <div className='form-group col-md-6'>
                <label className='form-check-label'>Hue for HDMI Input 1</label>
                <input type='number' min={0} className='form-control' value={input1_Hue}
                  disabled={userRole}
                  onChange={(event) => {
                    if (event.target.value.match(/[^0-9-]/)) { return; }
                    if (Number.parseInt(event.target.value) > 180 || Number.parseInt(event.target.value) < -180) return;
                    changeHandler(event, setInput1_Hue, "Input1_Hue")
                  }} />
              </div>
              <div className='form-group col-md-6'>
                <label className='form-check-label'>HDMI Input 1 Name</label>
                <input type='text' className='form-control' value={input1_Name}
                  disabled={userRole}
                  onChange={(event) => {
                    if (event.target.value.match(/[^a-zA-Z0-9_.-]/)) { return; }
                    changeHandler(event, setInput1_Name, "input1_Name")
                  }} />
              </div>
            </div> */}

            <div className='form-group col-md-6'>
              <label className='form-check-label'>Device Name</label>
              <input type='text' className='form-control' value={devicename}
                disabled={userRole}
                onChange={(event) => {
                  if (event.target.value.match(/[^a-zA-Z0-9_-]/)) { return; }
                  changeHandler(event, setDevicename, "devicename")
                }} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PcvisonSetting
