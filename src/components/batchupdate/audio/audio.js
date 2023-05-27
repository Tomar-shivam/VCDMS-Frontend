import React, { useState, useEffect } from 'react'
import './../batchupdate.css'

let Audio = (props) => {
  const [audio1Source, setAudio1Source] = useState('');
  const [audio1Channel, setAudio1Channel] = useState('');
  const [audio1Gain, setAudio1Gain] = useState('');
  const [audio1Encoder, setAudio1Encoder] = useState('');
  const [audio1Bitrate, setAudio1Bitrate] = useState('');
  const [audio1Dialnom, setAudio1Dialnom] = useState('');
  // const [dialnormClass1, setDialnormClass1] = useState('');
  const [audio2Source, setAudio2Source] = useState('');
  const [audio2Channel, setAudio2Channel] = useState('');
  const [audio2Gain, setAudio2Gain] = useState('');
  const [audio2Encoder, setAudio2Encoder] = useState('');
  const [audio2Bitrate, setAudio2Bitrate] = useState('');
  const [audio2Dialnom, setAudio2Dialnom] = useState('');
  // const [dialnormClass2, setDialnormClass2] = useState('');

  const [audio3Source, setAudio3Source] = useState('');
  const [audio3Channel, setAudio3Channel] = useState('');
  const [audio3Gain, setAudio3Gain] = useState('');
  const [audio3Encoder, setAudio3Encoder] = useState('');
  const [audio3Bitrate, setAudio3Bitrate] = useState('');
  const [audio3Dialnom, setAudio3Dialnom] = useState('');
  // const [dialnormClass3, setDialnormClass3] = useState('');

  const [audio4Source, setAudio4Source] = useState('');

  const [audio4Channel, setAudio4Channel] = useState('');
  const [audio4Gain, setAudio4Gain] = useState('');
  const [audio4Encoder, setAudio4Encoder] = useState('');
  const [audio4Bitrate, setAudio4Bitrate] = useState('');
  const [audio4Dialnom, setAudio4Dialnom] = useState('');
  // const [dialnormClass4, setDialnormClass4] = useState('');

  useEffect(() => {
    setAudio1Source(props.selectedModel.includes("RM11") ? props.properties.audio1_source : props.properties.audio1_in)
    setAudio1Channel(props.selectedModel.includes("RM11") ? props.properties.audio1_channel : props.properties.audio1_ch)
    setAudio1Gain(props.properties.audio1_gain)
    setAudio1Encoder(props.selectedModel.includes("RM11") ? props.properties.audio1_encoder : props.properties.audio1_enc)
    setAudio1Bitrate(props.properties.audio1_bitrate)
    setAudio1Dialnom(props.properties.audio1_dialnom ? props.properties.audio1_dialnom : 31)
    // setDialnormClass1(props.selectedModel.includes("RM11") ? props.properties.audio1_encoder : props.properties.audio1_enc === "AC3" ? "" : "not-visible")

    setAudio2Source(props.selectedModel.includes("RM11") ? props.properties.audio2_source : props.properties.audio2_in)
    setAudio2Channel(props.selectedModel.includes("RM11") ? props.properties.audio2_channel : props.properties.audio2_ch)
    setAudio2Gain(props.properties.audio2_gain)
    setAudio2Encoder(props.selectedModel.includes("RM11") ? props.properties.audio2_encoder : props.properties.audio2_enc)
    setAudio2Bitrate(props.properties.audio2_bitrate)
    setAudio2Dialnom(props.properties.audio2_dialnom ? props.properties.audio2_dialnom : 31)
    // setDialnormClass2(props.selectedModel.includes("RM11") ? props.properties.audio2_encoder : props.properties.audio2_enc === "AC3" ? "" : "not-visible")

    setAudio3Source(props.selectedModel.includes("RM11") ? props.properties.audio3_source : props.properties.audio3_in)
    setAudio3Channel(props.selectedModel.includes("RM11") ? props.properties.audio3_channel : props.properties.audio3_ch)
    setAudio3Gain(props.properties.audio3_gain)
    setAudio3Encoder(props.selectedModel.includes("RM11") ? props.properties.audio3_encoder : props.properties.audio3_enc)
    setAudio3Bitrate(props.properties.audio3_bitrate)
    setAudio3Dialnom(props.properties.audio3_dialnom ? props.properties.audio3_dialnom : 31)
    // setDialnormClass3(props.selectedModel.includes("RM11") ? props.properties.audio3_encoder : props.properties.audio3_enc === "AC3" ? "" : "not-visible")

    setAudio4Source(props.selectedModel.includes("RM11") ? props.properties.audio4_source : props.properties.audio4_in)
    setAudio4Channel(props.selectedModel.includes("RM11") ? props.properties.audio4_channel : props.properties.audio4_ch)
    setAudio4Gain(props.properties.audio4_gain)
    setAudio4Encoder(props.selectedModel.includes("RM11") ? props.properties.audio4_encoder : props.properties.audio4_enc)
    setAudio4Bitrate(props.properties.audio4_bitrate)
    setAudio4Dialnom(props.properties.audio4_dialnom ? props.properties.audio4_dialnom : 31)
    // setDialnormClass4(props.selectedModel.includes("RM11") ? props.properties.audio4_encoder : props.properties.audio4_enc === "AC3" ? "" : "not-visible")
  }, [props.properties])

  const changeHandler = (event, setContent, type = "") => {
    setContent(event.target.value)
    let sample = { ...props.properties }
    sample[type] = event.target.value
    props.setProperties(sample)
  }

  const getInputSource = () => {
    return props.selectedModel.substring(0, 6) === 'VL4522' ?
      props.inputMode !== "2xHD" ?
      <option value="1">SDI-1</option> :
      <>
        <option value="1">SDI-1</option>
        <option value="2">SDI-2</option>
      </>
      : props.selectedModel === 'VL4510' || props.selectedModel.includes('VL4510C') ?
      <option value="1">SDI-1</option> :
      <option value="1">HDMI-1</option>
    
  }

  return (
    <>
      <div className='pad-15'>
        <div className='form-boxdiv'>
          <div className='form-boxtopline5'>Audio-1 Input</div>
          <div className='form-boxtopcont user-form'>
            <div className='row'>
              <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>Input Source</label>
                  <select className='form-control' value={audio1Source} onChange={(event) => { props.selectedModel.includes("RM11") ? changeHandler(event, setAudio1Source, "audio1_source") : changeHandler(event, setAudio1Source, "audio1_in") }} >
                    <option value="">Select One</option>
                    {getInputSource()}
                    {/* {props.selectedModel.includes("RM11") || props.selectedModel.includes("VL4510H") || props.selectedModel.includes("VL4510C") ? <option value="1">HDMI-1</option> :
                      props.selectedModel.includes("VL45") ?
                        (props.videoMode === "1xHD+1xSD" || props.videoMode === "1xHD" ?
                          <option value="1">SDI-1</option> :
                          <>
                            <option value="1">SDI-1</option>
                            <option value="2">SDI-2</option>
                          </>) : ''
                    } */}
                  </select>
                </div>
              </div>

              <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>Channel</label>
                  <select className='form-control' value={audio1Channel} onChange={(event) => changeHandler(event, setAudio1Channel, props.selectedModel.includes("RM11") ? 'audio1_channel' : 'audio1_ch')}>
                    <option value="">Select One</option>
                    <option value="STEREO">STEREO</option>
                    <option value="DUAL_MONO">DUAL MONO</option>
                  </select>
                </div>
              </div>

              <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>Audio Gain(dB):</label>
                  <input
                    type='text'
                    className='form-control'
                    value={audio1Gain}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9-]/)) { return; }
                      if (Number.parseInt(event.target.value) > 20 || Number.parseInt(event.target.value) < -20)
                        return;
                      changeHandler(event, setAudio1Gain, "audio1_gain")
                    }}
                  />
                </div>
              </div>

              <div className='clear'></div>
            </div>
          </div>
          <div className='clear'></div>
        </div>
      </div>
      <div className='pad-15'>
        <div className='form-boxdiv'>
          <div className='form-boxtopline5'>Audio-1 Output</div>

          <div className='form-boxtopcont user-form'>
            <div className='row'>
              <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>Codec</label>
                  <select className='form-control' value={audio1Encoder} onChange={(event) => {
                    props.selectedModel.includes('RM11') ? (changeHandler(event, setAudio1Encoder, 'audio1_encoder')) : (
                      changeHandler(event, setAudio1Encoder, 'audio1_enc')
                    )
                  }
                  }>
                    <option value="">Select One</option>
                    <option value="AAC_LC">AAC_LC</option>
                    {props.selectedModel !== 'RM1121HD/CXF' && <>
                      <option value="AC3">AC3</option>
                      <option value="MP12">MP12</option></>}
                  </select>
                </div>
              </div>

              <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>Bit Rate(kbps)</label>
                  <select className='form-control' value={audio1Bitrate} onChange={(event) => changeHandler(event, setAudio1Bitrate, 'audio1_bitrate')}>
                    <option value="">Select One</option>
                    <option value="96000">96</option>
                    <option value="128000">128</option>
                    <option value="192000">192</option>
                    <option value="384000">384</option>
                  </select>
                </div>
              </div>

              {audio1Encoder === 'AC3' && <div className={'col-sm-6'}>
                <div className='form-group'>
                  <label className='form-check-label'>Dialnorm(-dB)</label>
                  <input
                    type='number'
                    className='form-control'
                    value={audio1Dialnom}
                    min="1"
                    max="31"
                    onChange={(event) => changeHandler(event, setAudio1Dialnom, 'audio1_dialnom')}
                  />
                </div>
              </div>}
            </div>
            <div className='clear'></div>
          </div>
          <div className='clear'></div>
        </div>
      </div>
      {props.selectedModel !== 'RM1121HD/CXF' && <>
        <div className={'pad-15 ' + (props.videoMode === "1xHD+1xSD" || props.videoMode === "2xHD+1xSD" || props.videoMode === "2xHD+2xSD" || props.videoMode === "2xHD" ? "" : "not-visible")}>
          <div className='form-boxdiv'>
            <div className='form-boxtopline5'>Audio-2 Input</div>
            <div className='form-boxtopcont user-form'>
              <div className='row'>
                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>Input Source</label>
                    <select className='form-control' value={audio2Source} onChange={(event) => { props.selectedModel.includes("RM11") ? changeHandler(event, setAudio2Source, "audio2_source") : changeHandler(event, setAudio2Source, "audio2_in") }}>
                      <option value="">Select One</option>
                      {getInputSource()}
                      {/* {props.selectedModel.includes("RM11") ? <option value="1">HDMI-1</option> :
                        props.selectedModel.includes("VL45") ?
                          (props.videoMode === "1xHD+1xSD" || props.videoMode === "1xHD" ?
                            <option value="1">SDI-1</option> :
                            <>
                              <option value="1">SDI-1</option>
                              <option value="2">SDI-2</option>
                            </>) : ''
                      } */}
                    </select>
                  </div>
                </div>

                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>Channel</label>
                    <select className='form-control' value={audio2Channel} onChange={(event) => changeHandler(event, setAudio2Channel, props.selectedModel.includes("RM11") ? 'audio2_channel' : 'audio2_ch')}>
                      <option value="">Select One</option>
                      <option value="STEREO">STEREO</option>
                      <option value="DUAL_MONO">DUAL MONO</option>
                    </select>
                  </div>
                </div>

                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>Audio Gain(dB):</label>
                    <input
                      type='text'
                      className='form-control'
                      value={audio2Gain}
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9-]/)) { return; }
                        if (Number.parseInt(event.target.value) > 20 || Number.parseInt(event.target.value) < -20)
                          return;
                        changeHandler(event, setAudio2Gain, "audio2_gain")
                      }}
                    />
                  </div>
                </div>

                <div className='clear'></div>
              </div>
            </div>
            <div className='clear'></div>
          </div>
        </div>
        <div className={'pad-15 ' + (props.videoMode === "1xHD+1xSD" || props.videoMode === "2xHD+1xSD" || props.videoMode === "2xHD+2xSD" || props.videoMode === "2xHD" ? "" : "not-visible")}>
          <div className='form-boxdiv'>
            <div className='form-boxtopline5'>Audio-2 Output</div>

            <div className='form-boxtopcont user-form'>
              <div className='row'>
                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>Codec</label>
                    <select className='form-control' value={audio2Encoder} onChange={(event) => {
                      props.selectedModel.includes('RM11') ? (changeHandler(event, setAudio2Encoder, 'audio2_encoder')) : (
                        changeHandler(event, setAudio2Encoder, 'audio2_enc')
                      )
                    }
                    }>
                      <option value="">Select One</option>
                      <option value="AAC_LC">AAC_LC</option>
                      <option value="AC3">AC3</option>
                      <option value="MP12">MP12</option>
                    </select>
                  </div>
                </div>

                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>Bit Rate(kbps)</label>
                    <select className='form-control' value={audio2Bitrate} onChange={(event) => changeHandler(event, setAudio2Bitrate, 'audio2_bitrate')}>
                      <option value="">Select One</option>
                      <option value="96000">96</option>
                      <option value="128000">128</option>
                      <option value="192000">192</option>
                      <option value="384000">384</option>
                    </select>
                  </div>
                </div>

                {audio2Encoder === 'AC3' && <div className={'col-sm-6'}>
                  <div className='form-group'>
                    <label className='form-check-label'>Dialnorm(-dB)</label>
                    <input
                      type='number'
                      className='form-control'
                      value={audio2Dialnom}
                      min="1"
                      max="31"
                      onChange={(event) => changeHandler(event, setAudio2Dialnom, 'audio2_dialnom')}
                    />
                  </div>
                </div>}

              </div>

              <div className='clear'></div>
            </div>
            <div className='clear'></div>
          </div>
        </div>

        <div className={'pad-15 ' + (props.videoMode === "2xHD+1xSD" || props.videoMode === "2xHD+2xSD" ? "" : "not-visible")}>
          <div className='form-boxdiv'>
            <div className='form-boxtopline5'>Audio-3 Input</div>
            <div className='form-boxtopcont user-form'>
              <div className='row'>
                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>Input Source</label>
                    <select className='form-control' value={audio3Source} onChange={(event) => { props.selectedModel.includes("RM11") ? changeHandler(event, setAudio3Source, "audio3_source") : changeHandler(event, setAudio3Source, "audio3_in") }}>
                      <option value="">Select One</option>
                      {getInputSource()}
                      {/* {props.selectedModel.includes("RM11") ? <option value="1">HDMI-1</option> :
                        props.selectedModel.includes("VL45") ?
                          (props.videoMode === "1xHD+1xSD" || props.videoMode === "1xHD" ?
                            <option value="1">SDI-1</option> :
                            <>
                              <option value="1">SDI-1</option>
                              <option value="2">SDI-2</option>
                            </>) : ''
                      } */}
                    </select>
                  </div>
                </div>

                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>Channel</label>
                    <select className='form-control' value={audio3Channel} onChange={(event) => changeHandler(event, setAudio3Channel, props.selectedModel.includes("RM11") ? 'audio3_channel' : 'audio3_ch')}>
                      <option value="">Select One</option>
                      <option value="STEREO">STEREO</option>
                      <option value="DUAL_MONO">DUAL MONO</option>
                    </select>
                  </div>
                </div>

                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>Audio Gain(dB):</label>
                    <input
                      type='text'
                      className='form-control'
                      value={audio3Gain}
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9-]/)) { return; }
                        if (Number.parseInt(event.target.value) > 20 || Number.parseInt(event.target.value) < -20)
                          return;
                        changeHandler(event, setAudio3Gain, "audio3_gain")
                      }}
                    />
                  </div>
                </div>

                <div className='clear'></div>
              </div>
            </div>
            <div className='clear'></div>
          </div>
        </div>
        <div className={'pad-15 ' + (props.videoMode === "2xHD+1xSD" || props.videoMode === "2xHD+2xSD" ? "" : "not-visible")}>
          <div className='form-boxdiv'>
            <div className='form-boxtopline5'>Audio-3 Output</div>

            <div className='form-boxtopcont user-form'>
              <div className='row'>
                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>Codec</label>
                    <select className='form-control' value={audio3Encoder} onChange={(event) => {
                      props.selectedModel.includes('RM11') ? (changeHandler(event, setAudio3Encoder, 'audio3_encoder')) : (
                        changeHandler(event, setAudio3Encoder, 'audio3_enc')
                      )
                    }
                    }>
                      <option value="">Select One</option>
                      <option value="AAC_LC">AAC_LC</option>
                      <option value="AC3">AC3</option>
                      <option value="MP12">MP12</option>
                    </select>
                  </div>
                </div>

                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>Bit Rate(kbps)</label>
                    <select className='form-control' value={audio3Bitrate} onChange={(event) => changeHandler(event, setAudio3Bitrate, 'audio3_bitrate')}>
                      <option value="">Select One</option>
                      <option value="96000">96</option>
                      <option value="128000">128</option>
                      <option value="192000">192</option>
                      <option value="384000">384</option>
                    </select>
                  </div>
                </div>

                {audio3Encoder === 'AC3' && <div className={'col-sm-6'}>
                  <div className='form-group'>
                    <label className='form-check-label'>Dialnorm(-dB)</label>
                    <input
                      type='number'
                      className='form-control'
                      value={audio3Dialnom}
                      min="1"
                      max="31"
                      onChange={(event) => changeHandler(event, setAudio3Dialnom, 'audio3_dialnom')}
                    />
                  </div>
                </div>}
              </div>

              <div className='clear'></div>
            </div>
            <div className='clear'></div>
          </div>
        </div>

        <div className={'pad-15 ' + (props.videoMode === "2xHD+2xSD" ? "" : "not-visible")}>
          <div className='form-boxdiv'>
            <div className='form-boxtopline5'>Audio-4 Input</div>
            <div className='form-boxtopcont user-form'>
              <div className='row'>
                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>Input Source</label>
                    <select className='form-control' value={audio4Source} onChange={(event) => { props.selectedModel.includes("RM11") ? changeHandler(event, setAudio4Source, "audio4_source") : changeHandler(event, setAudio4Source, "audio4_in") }}>
                      <option value="">Select One</option>
                      {getInputSource()}
                      {/* {props.selectedModel.includes("RM11") ? <option value="1">HDMI-1</option> :
                        props.selectedModel.includes("VL45") ?
                          (props.videoMode === "1xHD+1xSD" || props.videoMode === "1xHD" ?
                            <option value="1">SDI-1</option> :
                            <>
                              <option value="1">SDI-1</option>
                              <option value="2">SDI-2</option>
                            </>) : ''
                      } */}
                    </select>
                  </div>
                </div>

                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>Channel</label>
                    <select className='form-control' value={audio4Channel} onChange={(event) => changeHandler(event, setAudio4Channel, props.selectedModel.includes("RM11") ? 'audio4_channel' : 'audio4_ch')}>
                      <option value="">Select One</option>
                      <option value="STEREO">STEREO</option>
                      <option value="DUAL_MONO">DUAL MONO</option>
                    </select>
                  </div>
                </div>

                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>Audio Gain(dB):</label>
                    <input
                      type='text'
                      className='form-control'
                      value={audio4Gain}
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9-]/)) { return; }
                        if (Number.parseInt(event.target.value) > 20 || Number.parseInt(event.target.value) < -20)
                          return;
                        changeHandler(event, setAudio4Gain, "audio4_gain")
                      }}
                    />
                  </div>
                </div>

                <div className='clear'></div>
              </div>
            </div>
            <div className='clear'></div>
          </div>
        </div>
        <div className={'pad-15 ' + (props.videoMode === "2xHD+2xSD" ? "" : "not-visible")}>
          <div className='form-boxdiv'>
            <div className='form-boxtopline5'>Audio-4 Output</div>

            <div className='form-boxtopcont user-form'>
              <div className='row'>
                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>Codec</label>
                    <select className='form-control' value={audio4Encoder} onChange={(event) => {
                      props.selectedModel.includes('RM11') ? (changeHandler(event, setAudio4Encoder, 'audio4_encoder')) : (
                        changeHandler(event, setAudio4Encoder, 'audio4_enc')
                      )
                    }
                    }>
                      <option value="">Select One</option>
                      <option value="AAC_LC">AAC_LC</option>
                      <option value="AC3">AC3</option>
                      <option value="MP12">MP12</option>
                    </select>
                  </div>
                </div>

                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>Bit Rate(kbps)</label>
                    <select className='form-control' value={audio4Bitrate} onChange={(event) => changeHandler(event, setAudio4Bitrate, 'audio4_bitrate')}>
                      <option value="">Select One</option>
                      <option value="96000">96</option>
                      <option value="128000">128</option>
                      <option value="192000">192</option>
                      <option value="384000">384</option>
                    </select>
                  </div>
                </div>

                {audio4Encoder === 'AC3' && <div className={'col-sm-6'}>
                  <div className='form-group'>
                    <label className='form-check-label'>Dialnorm(-dB)</label>
                    <input
                      type='number'
                      className='form-control'
                      value={audio4Dialnom}
                      min="1"
                      max="31"
                      onChange={(event) => changeHandler(event, setAudio4Dialnom, 'audio4_dialnom')}
                    />
                  </div>
                </div>}
              </div>
              <div className='clear'></div>
            </div>
            <div className='clear'></div>
          </div>
        </div>
      </>}
    </>
  )
}

export default Audio