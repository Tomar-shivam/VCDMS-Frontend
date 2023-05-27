import { useState, useEffect } from 'react'
import '../encoder.css'
import './preset.css'
import VCDMSService from '../../../services/http.service'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorMessage from "../../../common/errorMsg";
let Preset = (props) => {

  const [newButtonDisabled, setNewButtonDisabled] = useState(false)
  const [renameButtonDisabled, setRenameButtonDisabled] = useState(true)
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true)
  const [exportButtonDisabled, setExportButtonDisabled] = useState(false)
  const [importButtonDisabled, setImportButtonDisabled] = useState(true)
  const [deleteButtonText, setDeleteButtonText] = useState("Delete")
  const [labels, setLabels] = useState(["encoder factory default"])
  const [counter, setCounter] = useState({ count: 0 })
  const [checkedThingBoolean, setCheckedThingBoolean] = useState([false])
  const [firstRun, setFirstRun] = useState(true)
  const [newPresetValue, setNewPresetValue] = useState('')
  const [visible, setVisible] = useState('not-visible')
  const [okButtonDisabled, setOkDisabled] = useState(false)
  const [okButtonText, setOkButtonText] = useState('Ok')
  const [renameText, setRenameText] = useState('Ok')
  const [renamePresetValue, setRenamePresetValue] = useState('')
  const [renameVisible, setRenameVisible] = useState('not-visible')
  const [renameOkClickDisable, setRenameOkClickDisable] = useState(false)
  useEffect(() => {
    getPresets()
  }, [firstRun])

  const newClickHandler = () => {
    setVisible('')
  }

  const deleteClickHandler = async (event) => {
    event.preventDefault()
    setDeleteButtonDisabled(true)
    setDeleteButtonText(
      <>
        <span
          className='spinner-border spinner-border-sm mr-1'
          role='status'
          aria-hidden='true'
        ></span>
        Delete
      </>
    )
    let set = [...checkedThingBoolean]
    let pre = [...labels]
    let count = 0
    for (let i = 0; i < labels.length; i++) {
      if (set[i]) {
        pre[i] = ""
        set[i] = false
        count++
      }
    }
    let data = {
      presets: pre.slice(1),
      ip: props.peerip
    }
    let res = await VCDMSService.getByBoj('updatepresets', data).then(res => res.data).catch(err => { return })

    if (res) {
      if (res.status === "success") {
        let property = { ...props.properties }
        let i = 1
        for (var key in property) {
          if (key.startsWith('preset')) {
            property[key] = pre[i]
            i++
          }
        }
        props.setProperties(property)
        let c = { ...counter }
        c.count = c.count - count
        setCounter(c)
        setCheckedThingBoolean(set)
        setLabels(pre)
        setDeleteButtonText("Delete")
        setDeleteButtonDisabled(false)
        setDefault()
      }
      else {
        ErrorMessage("Error Occured!!!");
      }
    }
    else {
      ErrorMessage("Error Occured!!!");
      setDeleteButtonDisabled(false)
      setDeleteButtonText("Delete")
    }

  }

  const renameOkClickHandler = async (event) => {
    event.preventDefault();
    for (let i = 1; i < 9; i++) {
      if (props.properties) {
        let encoder_preset = props.properties[`preset${i}`];
        if (encoder_preset === renamePresetValue) {
          ErrorMessage("This preset name is already exist. Please try with another name");
          return;
        }
      }
    }
    setRenameOkClickDisable(true)
    setRenameText(
      <>
        <span
          className='spinner-border spinner-border-sm mr-1'
          role='status'
          aria-hidden='true'
        ></span>
        Ok
      </>
    )
    let set = [...checkedThingBoolean]
    let pre = [...labels]
    for (let i = 0; i < labels.length; i++) {
      if (set[i]) {
        pre[i] = renamePresetValue
        break
      }
    }
    let data = {
      presets: pre.slice(1),
      ip: props.peerip
    }
    let res = await VCDMSService.getByBoj('updatepresets', data).then(res => res.data).catch(err => { return })

    if (res) {
      if (res.status === "success") {
        let property = { ...props.properties }
        let i = 1
        for (var key in property) {
          if (key.startsWith('preset')) {
            property[key] = pre[i]
            i++
          }
        }
        props.setProperties(property)
        setLabels(pre)
        setRenameText("Ok")
        setRenameOkClickDisable(false)
        setDefault()
        setRenameOkClickDisable("")
        setRenameVisible("not-visible")
      }
      else {
        ErrorMessage("Error Occured!!!");
      }
    }
    else {
      ErrorMessage("Error Occured!!!");
      setDeleteButtonDisabled(false)
      setDeleteButtonText("Delete")
    }
  }

  const renameClickHandler = (event) => {
    event.preventDefault()
    setRenameVisible('')
  }

  const okClickHandler = async (event) => {
    event.preventDefault()
    for (let i = 1; i < 9; i++) {
      if (props.properties) {
        let encoder_preset = props.properties[`preset${i}`];
        if (encoder_preset === newPresetValue) {
          ErrorMessage("This preset name is already exist. Please try with another name");
          return;
        }
      }
    }
    setOkDisabled(true)
    setOkButtonText(<>
      <span
        className='spinner-border spinner-border-sm mr-1'
        role='status'
        aria-hidden='true'
      ></span>
      Ok
    </>)
    let pre = [...labels]
    let set = [...checkedThingBoolean]
    for (let i = 0; i < pre.length; i++) {
      if (pre[i] === "") {
        pre[i] = newPresetValue
        set[i] = false
        break;
      }
    }
    let data = {
      presets: pre.slice(1),
      ip: props.peerip
    }

    let res = await VCDMSService.CreateUpdate('updatepresets', data).then(res => res.data).catch(err => { return })
    if (res) {
      if (res.status === 'success') {
        let property = { ...props.properties }
        for (var key in property) {
          if (key.startsWith('preset') && property[key] === "") {
            property[key] = newPresetValue
            break;
          }
        }
        props.setProperties(property)
        setOkDisabled(false)
        setOkButtonText("Ok")
        setNewPresetValue('')
        setLabels(pre)
        setCheckedThingBoolean(set)
        setVisible("not-visible")
      }
    }
  }

  const handleEncoderFactoryDefaultSelect = (value, index) => {

    if (value === true) {
      let c = { ...counter }
      let l = [...checkedThingBoolean]
      c.count++;
      setCounter(c)
      l[index] = true
      setCheckedThingBoolean(l)
      setExportButtonDisabled(false)
      setNewButtonDisabled(true)
      setRenameButtonDisabled(true)
      setDeleteButtonDisabled(true)
      setImportButtonDisabled(true)
    }
    else {
      let c = { ...counter }
      let l = [...checkedThingBoolean]
      l[index] = false
      c.count--
      setCounter(c)
      setCheckedThingBoolean(l)
      if (c.count > 1) {
        resetAll()
        setExportButtonDisabled(false)
      }
      else if (c.count > 0) {
        resetAllReverse()
        setNewButtonDisabled(true)
        setImportButtonDisabled(true)
      }
      else {
        resetAll()
        setNewButtonDisabled(false)
        setExportButtonDisabled(false)
      }
    }
  }

  const checkHandler = (value, index) => {
    if (value) {
      let l = [...checkedThingBoolean]
      l[index] = true
      let c = { ...counter }
      c.count++
      setCounter(c)
      setCheckedThingBoolean(l)
      if (c.count > 1) {
        resetAll()
        setExportButtonDisabled(false)
        setDeleteButtonDisabled(false)
      }
      else if (c.count > 0) {
        resetAllReverse()
        setNewButtonDisabled(true)
        setImportButtonDisabled(true)
      }
      else {
        resetAll()
        setNewButtonDisabled(false)
        setExportButtonDisabled(false)
      }
    }
    else {
      let l = [...checkedThingBoolean]
      l[index] = false
      let c = { ...counter }
      c.count--
      setCounter(c)
      setCheckedThingBoolean(l)
      if (c.count > 1) {
        resetAll()
        setExportButtonDisabled(false)
        setDeleteButtonDisabled(false)
      }
      else if (c.count > 0) {
        resetAllReverse()
        setNewButtonDisabled(true)
        setImportButtonDisabled(true)
      }
      else {
        resetAll()
        setNewButtonDisabled(false)
        setExportButtonDisabled(false)
      }
    }

  }
  const resetAll = () => {
    if (!newButtonDisabled)
      setNewButtonDisabled(true)
    if (!renameButtonDisabled)
      setRenameButtonDisabled(true)
    if (!deleteButtonDisabled)
      setDeleteButtonDisabled(true)
    if (!exportButtonDisabled)
      setExportButtonDisabled(true)
    if (!importButtonDisabled)
      setImportButtonDisabled(true)
  }

  const resetAllReverse = () => {
    if (newButtonDisabled)
      setNewButtonDisabled(false)
    if (renameButtonDisabled)
      setRenameButtonDisabled(false)
    if (deleteButtonDisabled)
      setDeleteButtonDisabled(false)
    if (exportButtonDisabled)
      setExportButtonDisabled(false)
    if (importButtonDisabled)
      setImportButtonDisabled(false)
  }

  const setDefault = () => {
    setNewButtonDisabled(false)
    setRenameButtonDisabled(true)
    setDeleteButtonDisabled(true)
    setExportButtonDisabled(false)
    setImportButtonDisabled(true)
  }

  const getPresets = () => {

    if (firstRun && props.properties) {
      let l = [...labels]
      let c = [...checkedThingBoolean]
      if (l.length >= 9) {
        setFirstRun(false)
        return
      }
      for (var key in props.properties) {
        if (key.startsWith('preset')) {
          l.push(props.properties[key])
          c.push(false)
        }
      }
      setLabels(l)
      setCheckedThingBoolean(c)
      setFirstRun(false)
    }
  }
  return (
    <>
      <div className='pad-15'>
        <div className='form-boxdiv'>
          <div className='form-boxtopline5'>User Preset Management</div>
          <div className='form-boxtopcont user-form'>
            <div className='row'>
              {labels.map((value, index) => {
                if (value === "") {
                  return (<></>)
                }
                return (

                  <div key={index} className='col-sm-6'>
                    <div className='form-group'>
                      <label className='form-check-label enc-status' for="firstAttribute">
                        {value}
                      </label>
                      {value.localeCompare("encoder factory default") === 0 ? <input type='checkbox' disabled={props.customerData.Role === "Operator" ? true : false} className='enc-checkbox' id="firstAttribute" onClick={(event) => handleEncoderFactoryDefaultSelect(event.target.checked, index)} /> : <input type='checkbox' disabled={props.customerData.Role === "Operator" ? true : false} className='enc-checkbox' id="firstAttribute" onClick={(event) => checkHandler(event.target.checked, index)} />}
                    </div>
                  </div>
                )
              })
              }
              <div className='clear'></div>
            </div>
            {props.customerData.Role === "Operator" ? <></> : <div className='col-12 p-0'>
              <div className='form-group spacing'>
                <button className='btn btn-primary' disabled={newButtonDisabled} onClick={newClickHandler}>New</button>
                <button className='btn btn-primary' disabled={renameButtonDisabled} onClick={(event) => renameClickHandler(event)}>Rename</button>
                <button className='btn btn-primary' disabled={deleteButtonDisabled} onClick={(event) => deleteClickHandler(event)}>{deleteButtonText}</button>
                <button className='btn btn-primary' disabled={exportButtonDisabled}>Export</button>
                <button className='btn btn-primary' disabled={importButtonDisabled}>Import</button>
              </div>
            </div>}
            <div className={'col-sm-6 ' + visible}>
              <div className='form-group'>
                <label className='form-check-label'>TS ID</label>
                <input
                  type='text'
                  className='form-control'
                  value={newPresetValue}
                  onChange={(event) => setNewPresetValue(event.target.value)}
                />
                <div className="m-3"></div>
                <button className='btn btn-dark mr-2' onClick={(event) => okClickHandler(event)} disabled={okButtonDisabled}>{okButtonText}</button>
                <button className="btn btn-dark" onClick={() => setVisible('not-visible')}>Cancel</button>
              </div>
            </div>

            <div className={'col-sm-6 ' + (renameButtonDisabled ? "not-visible" : renameVisible)}>
              <div className='form-group'>
                <label className='form-check-label'>Enter Name</label>
                <input
                  type='text'
                  className='form-control'
                  value={renamePresetValue}
                  onChange={(event) => setRenamePresetValue(event.target.value)}
                />
                <div className="m-3"></div>
                <button className='btn btn-dark mr-2' onClick={(event) => renameOkClickHandler(event)} disabled={renameOkClickDisable}>{renameText}</button>
                <button className="btn btn-dark" onClick={() => setRenameVisible('not-visible')}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Preset;