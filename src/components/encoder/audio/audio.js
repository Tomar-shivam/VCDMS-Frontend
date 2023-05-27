import React, { useState, useEffect } from 'react'
import './../encoder.css'

let Audio = (props) => {
  const [audio1Source, setAudio1Source] = useState(props.properties1.audio1_source)
  const [audio1SourceIn, setAudio1SourceIn] = useState(props.properties1.audio1_in);
  const [audio1Samplerate, setAudio1Samplerate] = useState(props.properties1.audio1_samplerate)
  const [audio1Channel, setAudio1Channel] = useState(props.properties1.model.includes("RM11") ? props.properties1.audio1_channel : props.properties1.audio1_ch)
  const [audio1Gain, setAudio1Gain] = useState(props.properties1.audio1_gain)
  const [audio1Encoder, setAudio1Encoder] = useState(props.properties1.model.includes("RM11") ? props.properties1.audio1_encoder : props.properties1.audio1_enc)
  const [audio1Bitrate, setAudio1Bitrate] = useState(props.properties1.audio1_bitrate)
  const [audio1Dialnorm, setAudio1Dialnorm] = useState(props.properties1.audio1_dialnorm ? props.properties1.audio1_dialnorm : 31)
  const [dialnormClass1, setDialnormClass1] = useState(((props.properties1.model.includes("RM11") ? props.properties1.audio1_encoder : props.properties1.audio1_enc)) === "AC3" ? "" : "not-visible")
  const [audio2Source, setAudio2Source] = useState(props.properties1.audio2_source)
  const [audio2SourceIn, setAudio2SourceIn] = useState(props.properties1.audio2_in);
  const [audio2Samplerate, setAudio2Samplerate] = useState(props.properties1.audio2_samplerate)
  const [audio2Channel, setAudio2Channel] = useState(props.properties1.model.includes("RM11") ? props.properties1.audio2_channel : props.properties1.audio2_ch)
  const [audio2Gain, setAudio2Gain] = useState(props.properties1.audio2_gain)
  const [audio2Encoder, setAudio2Encoder] = useState(props.properties1.model.includes("RM11") ? props.properties1.audio2_encoder : props.properties1.audio2_enc)
  const [audio2Bitrate, setAudio2Bitrate] = useState(props.properties1.audio2_bitrate)
  const [audio2Dialnorm, setAudio2Dialnorm] = useState(props.properties1.audio2_dialnorm ? props.properties1.audio2_dialnorm : 31)
  const [dialnormClass2, setDialnormClass2] = useState((props.properties1.model.includes("RM11") ? props.properties1.audio2_encoder : props.properties1.audio2_enc) === "AC3" ? "" : "not-visible")
  const [audio3Source, setAudio3Source] = useState(props.properties1.audio3_source)
  const [audio3SourceIn, setAudio3SourceIn] = useState(props.properties1.audio3_in);
  const [audio3Samplerate, setAudio3Samplerate] = useState(props.properties1.audio3_samplerate)
  const [audio3Channel, setAudio3Channel] = useState(props.properties1.model.includes("RM11") ? props.properties1.audio3_channel : props.properties1.audio3_ch)
  const [audio3Gain, setAudio3Gain] = useState(props.properties1.audio3_gain)
  const [audio3Encoder, setAudio3Encoder] = useState(props.properties1.model.includes("RM11") ? props.properties1.audio3_encoder : props.properties1.audio3_enc)
  const [audio3Bitrate, setAudio3Bitrate] = useState(props.properties1.audio3_bitrate)
  const [audio3Dialnorm, setAudio3Dialnorm] = useState(props.properties1.audio3_dialnorm ? props.properties1.audio3_dialnorm : 31)
  const [dialnormClass3, setDialnormClass3] = useState((props.properties1.model.includes("RM11") ? props.properties1.audio3_encoder : props.properties1.audio3_enc) === "AC3" ? "" : "not-visible");

  const [audio4Source, setAudio4Source] = useState(props.properties1.audio4_source)
  const [audio4SourceIn, setAudio4SourceIn] = useState(props.properties1.audio4_in);
  const [audio4Samplerate, setAudio4Samplerate] = useState(props.properties1.audio4_samplerate)
  const [audio4Channel, setAudio4Channel] = useState(props.properties1.model.includes("RM11") ? props.properties1.audio4_channel : props.properties1.audio4_ch)
  const [audio4Gain, setAudio4Gain] = useState(props.properties1.audio4_gain)
  const [audio4Encoder, setAudio4Encoder] = useState(props.properties1.model.includes("RM11") ? props.properties1.audio4_encoder : props.properties1.audio4_enc)
  const [audio4Bitrate, setAudio4Bitrate] = useState(props.properties1.audio4_bitrate)
  const [audio4Dialnorm, setAudio4Dialnorm] = useState(props.properties1.audio4_dialnorm ? props.properties1.audio4_dialnorm : 31)
  const [dialnormClass4, setDialnormClass4] = useState((props.properties1.model.includes("RM11") ? props.properties1.audio4_encoder : props.properties1.audio4_enc) === "AC3" ? "" : "not-visible")

  useEffect(() => {
    setAudio1Source(props.properties1.audio1_source)
    setAudio1Samplerate(props.properties1.audio1_samplerate)
    setAudio1Channel(props.properties1.model.includes("RM11") ? props.properties1.audio1_channel : props.properties1.audio1_ch)
    setAudio1Gain(props.properties1.audio1_gain)
    setAudio1Encoder((props.properties1.model.includes("RM11") ? props.properties1.audio1_encoder : props.properties1.audio1_enc))
    setAudio1Bitrate(props.properties1.audio1_bitrate)
    setAudio1Dialnorm(props.properties1.audio1_dialnorm ? props.properties1.audio1_dialnorm : 31)
    setDialnormClass1((props.properties1.model.includes("RM11") ? props.properties1.audio1_encoder : props.properties1.audio1_enc) === "AC3" ? "" : "not-visible")
    setAudio2Source(props.properties1.audio2_source)
    setAudio2Samplerate(props.properties1.audio2_samplerate)
    setAudio2Channel(props.properties1.model.includes("RM11") ? props.properties1.audio2_channel : props.properties1.audio2_ch)
    setAudio2Gain(props.properties1.audio2_gain)
    setAudio2Encoder((props.properties1.model.includes("RM11") ? props.properties1.audio2_encoder : props.properties1.audio2_enc))
    setAudio2Bitrate(props.properties1.audio2_bitrate)
    setAudio2Dialnorm(props.properties1.audio2_dialnorm ? props.properties1.audio2_dialnorm : 31)
    setDialnormClass2((props.properties1.model.includes("RM11") ? props.properties1.audio2_encoder : props.properties1.audio2_enc) === "AC3" ? "" : "not-visible")
    setAudio3Source(props.properties1.audio3_source)
    setAudio3Samplerate(props.properties1.audio3_samplerate)
    setAudio3Channel(props.properties1.model.includes("RM11") ? props.properties1.audio3_channel : props.properties1.audio3_ch)
    setAudio3Gain(props.properties1.audio3_gain)
    setAudio3Encoder((props.properties1.model.includes("RM11") ? props.properties1.audio3_encoder : props.properties1.audio3_enc))
    setAudio3Bitrate(props.properties1.audio3_bitrate)
    setAudio3Dialnorm(props.properties1.audio3_dialnorm ? props.properties1.audio3_dialnorm : 31)
    setDialnormClass3((props.properties1.model.includes("RM11") ? props.properties1.audio3_encoder : props.properties1.audio3_enc) === "AC3" ? "" : "not-visible")
    setAudio4Source(props.properties1.audio4_source)
    setAudio4Samplerate(props.properties1.audio4_samplerate)
    setAudio4Channel(props.properties1.model.includes("RM11") ? props.properties1.audio4_channel : props.properties1.audio4_ch)
    setAudio4Gain(props.properties1.audio4_gain)
    setAudio4Encoder((props.properties1.model.includes("RM11") ? props.properties1.audio4_encoder : props.properties1.audio4_enc))
    setAudio4Bitrate(props.properties1.audio4_bitrate)
    setAudio4Dialnorm(props.properties1.audio4_dialnorm ? props.properties1.audio4_dialnorm : 31)
    setDialnormClass4((props.properties1.model.includes("RM11") ? props.properties1.audio4_encoder : props.properties1.audio4_enc) === "AC3" ? "" : "not-visible")

    setAudio1SourceIn(props.properties1.audio1_in);
    setAudio2SourceIn(props.properties1.audio2_in);
    setAudio3SourceIn(props.properties1.audio3_in);
    setAudio4SourceIn(props.properties1.audio4_in);
  }, [props.properties1])

  const changeHandler = (event, setContent, type = "") => {
    setContent(event.target.value)
    let sample = { ...props.properties1 }
    sample[type] = event.target.value
    props.setProperties1(sample)
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
                  <select
                    className="form-control"
                    value={props.properties1.model.substring(0, 4) === 'VL45' ? audio1SourceIn : audio1Source}
                    onChange={(event) => {
                      props.properties1.model.substring(0, 4) === 'VL45' ?
                        changeHandler(event, setAudio1SourceIn, "audio1_in")
                        : changeHandler(event, setAudio1Source, "audio1_source")
                    }
                    }
                  >
                    {props.properties1.model.substring(0, 6) === 'VL4522' ?
                      props.inputMode !== "2xHD" ?
                        <option value="1">SDI-1</option> :
                        <>
                          <option value="1">SDI-1</option>
                          <option value="2">SDI-2</option>
                        </>
                      : props.properties1.model === 'VL4510' || props.properties1.model.includes('VL4510C') ?
                        <option value="1">SDI-1</option> :
                        <option value="1">HDMI-1</option>
                    }
                  </select>
                </div>
              </div>

              <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>Sample Rate(Hz):</label>
                  <input
                    type='text'
                    className='form-control'
                    value={audio1Samplerate}
                    readOnly={true}
                  />
                </div>
              </div>

              <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>Channel</label>
                  <select className='form-control' value={audio1Channel} onChange={(event) => changeHandler(event, setAudio1Channel, props.properties1.model.includes("RM11") ? 'audio1_channel':'audio1_ch')}>
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
                    min="-20"
                    max="20"
                    className='form-control'
                    value={audio1Gain}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9-]/)) { return; }

                      if (Number.parseInt(event.target.value) > 20 || Number.parseInt(event.target.value) < -20) return;
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
                    props.properties1.model.includes('RM11') ? (changeHandler(event, setAudio1Encoder, 'audio1_encoder')) : (
                      changeHandler(event, setAudio1Encoder, 'audio1_enc')
                    )
                  }}>
                    {props.properties1.model.includes('RM1121CXF') ?
                      <option value="AAC_LC">AAC_LC</option> :
                      <>
                        <option value="AAC_LC">AAC_LC</option>
                        <option value="AC3">AC3</option>
                        <option value="MP12">MP12</option>
                      </>
                    }


                  </select>
                </div>
              </div>

              <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>Bit Rate(kbps)</label>
                  <select className='form-control' value={audio1Bitrate} onChange={(event) => changeHandler(event, setAudio1Bitrate, 'audio1_bitrate')}>
                    <option value="96000">96</option>
                    <option value="128000">128</option>
                    <option value="192000">192</option>
                    <option value="384000">384</option>
                  </select>
                </div>
              </div>

              <div className={'col-sm-6 ' + dialnormClass1}>
                <div className='form-group'>
                  <label className='form-check-label'>Dialnorm(-dB)</label>
                  <input
                    type='number'
                    className='form-control'
                    value={audio1Dialnorm}
                    min="1"
                    max="31"
                    onChange={(event) => changeHandler(event, setAudio1Dialnorm, 'audio1_dialnorm')}
                  />
                </div>
              </div>
            </div>
            <div className='clear'></div>
          </div>
          <div className='clear'></div>
        </div>
      </div>

      <div className={'pad-15 ' + (props.videoMode !== "1xHD+1xSD" && props.videoMode !== "2xHD" && props.videoMode !== "2xHD+1xSD" && props.videoMode !== "2xHD+2xSD" ? "not-visible" : "")}>
        <div className='form-boxdiv'>
          <div className='form-boxtopline5'>Audio-2 Input</div>
          <div className='form-boxtopcont user-form'>
            <div className='row'>
              <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>Input Source</label>
                  <select
                    className="form-control"
                    value={props.properties1.model.substring(0, 4) === 'VL45' ? audio2SourceIn : audio2Source}
                    onChange={(event) => {
                      props.properties1.model.substring(0, 4) === 'VL45' ?
                        changeHandler(event, setAudio2SourceIn, "audio2_in")
                        : changeHandler(event, setAudio2Source, "audio2_source")
                    }
                    }
                  >
                    {props.properties1.model.substring(0, 6) === 'VL4522' ?
                      props.inputMode !== "2xHD" ?
                        <option value="1">SDI-1</option> :
                        <>
                          <option value="1">SDI-1</option>
                          <option value="2">SDI-2</option>
                        </>
                      : props.properties1.model === 'VL4510' || props.properties1.model.includes('VL4510C') ?
                        <option value="1">SDI-1</option> :
                        <option value="1">HDMI-1</option>
                    }
                  </select>
                </div>
              </div>

              <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>Sample Rate(Hz):</label>
                  <input
                    type='text'
                    className='form-control'
                    value={audio2Samplerate}
                    readOnly={true}
                  />
                </div>
              </div>

              <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>Channel</label>
                  <select className='form-control' value={audio2Channel} onChange={(event) => changeHandler(event, setAudio2Channel, props.properties1.model.includes("RM11") ? 'audio2_channel':'audio2_ch')}>
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
                      if (Number.parseInt(event.target.value) > 20 || Number.parseInt(event.target.value) < -20) return;
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
      <div className={'pad-15 ' + (props.videoMode !== "1xHD+1xSD" && props.videoMode !== "2xHD" && props.videoMode !== "2xHD+1xSD" && props.videoMode !== "2xHD+2xSD" ? "not-visible" : "")}>
        <div className='form-boxdiv'>
          <div className='form-boxtopline5'>Audio-2 Output</div>

          <div className='form-boxtopcont user-form'>
            <div className='row'>
              <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>Codec</label>
                  <select className='form-control' value={audio2Encoder} onChange={(event) => {
                    props.properties1.model.includes('RM11') ? (changeHandler(event, setAudio2Encoder, 'audio2_encoder')) : (
                      changeHandler(event, setAudio2Encoder, 'audio2_enc')
                    )
                  }}>
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
                    <option value="96000">96</option>
                    <option value="128000">128</option>
                    <option value="192000">192</option>
                    <option value="384000">384</option>
                  </select>
                </div>
              </div>

              <div className={'col-sm-6 ' + dialnormClass2}>
                <div className='form-group'>
                  <label className='form-check-label'>Dialnorm(-dB)</label>
                  <input
                    type='number'
                    className='form-control'
                    value={audio2Dialnorm}
                    min="1"
                    max="31"
                    onChange={(event) => changeHandler(event, setAudio2Dialnorm, 'audio2_dialnorm')}
                  />
                </div>
              </div>

            </div>

            <div className='clear'></div>
          </div>
          <div className='clear'></div>
        </div>
      </div>
      <div className={'pad-15 ' + (props.videoMode !== "2xHD+1xSD" && props.videoMode !== "2xHD+2xSD" ? "not-visible" : "")}>
        <div className='form-boxdiv'>
          <div className='form-boxtopline5'>Audio-3 Input</div>
          <div className='form-boxtopcont user-form'>
            <div className='row'>
              <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>Input Source</label>
                  <select
                    className="form-control"
                    value={props.properties1.model.substring(0, 4) === 'VL45' ? audio3SourceIn : audio3Source}
                    onChange={(event) => {
                      props.properties1.model.substring(0, 4) === 'VL45' ?
                        changeHandler(event, setAudio1SourceIn, "audio3_in")
                        : changeHandler(event, setAudio1Source, "audio3_source")
                    }
                    }
                  >
                    {props.properties1.model.substring(0, 6) === 'VL4522' ?
                      props.inputMode !== "2xHD" ?
                        <option value="1">SDI-1</option> :
                        <>
                          <option value="1">SDI-1</option>
                          <option value="2">SDI-2</option>
                        </>
                      : props.properties1.model === 'VL4510' || props.properties1.model.includes('VL4510C') ?
                        <option value="1">SDI-1</option> :
                        <option value="1">HDMI-1</option>
                    }
                  </select>
                </div>
              </div>

              <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>Sample Rate(Hz):</label>
                  <input
                    type='text'
                    className='form-control'
                    value={audio3Samplerate}
                    readOnly={true}
                  />
                </div>
              </div>

              <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>Channel</label>
                  <select className='form-control' value={audio3Channel} onChange={(event) => changeHandler(event, setAudio3Channel, props.properties1.model.includes("RM11") ? 'audio3_channel':'audio3_ch')}>
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
                      if (Number.parseInt(event.target.value) > 20 || Number.parseInt(event.target.value) < -20) return;
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
      <div className={'pad-15 ' + (props.videoMode !== "2xHD+1xSD" && props.videoMode !== "2xHD+2xSD" ? "not-visible" : "")}>
        <div className='form-boxdiv'>
          <div className='form-boxtopline5'>Audio-3 Output</div>

          <div className='form-boxtopcont user-form'>
            <div className='row'>
              <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>Codec</label>
                  <select className='form-control' value={audio3Encoder} onChange={(event) => {
                    props.properties1.model.includes('RM11') ? (changeHandler(event, setAudio3Encoder, 'audio3_encoder')) : (
                      changeHandler(event, setAudio3Encoder, 'audio3_enc')
                    )
                  }
                  }>
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
                    <option value="96000">96</option>
                    <option value="128000">128</option>
                    <option value="192000">192</option>
                    <option value="384000">384</option>
                  </select>
                </div>
              </div>

              <div className={'col-sm-6 ' + dialnormClass3}>
                <div className='form-group'>
                  <label className='form-check-label'>Dialnorm(-dB)</label>
                  <input
                    type='number'
                    className='form-control'
                    value={audio3Dialnorm}
                    min="1"
                    max="31"
                    onChange={(event) => changeHandler(event, setAudio3Dialnorm, 'audio3_dialnorm')}
                  />
                </div>
              </div>

            </div>

            <div className='clear'></div>
          </div>
          <div className='clear'></div>
        </div>
      </div>
      <div className={'pad-15 ' + (props.videoMode !== "2xHD+2xSD" ? "not-visible" : "")}>
        <div className='form-boxdiv'>
          <div className='form-boxtopline5'>Audio-4 Input</div>
          <div className='form-boxtopcont user-form'>
            <div className='row'>
              <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>Input Source</label>
                  <select
                    className="form-control"
                    value={props.properties1.model.substring(0, 4) === 'VL45' ? audio4SourceIn : audio4Source}
                    onChange={(event) => {
                      props.properties1.model.substring(0, 4) === 'VL45' ?
                        changeHandler(event, setAudio4SourceIn, "audio4_in")
                        : changeHandler(event, setAudio4Source, "audio4_source")
                    }
                    }
                  >
                    {props.properties1.model.substring(0, 6) === 'VL4522' ?
                      props.inputMode !== "2xHD" ?
                        <option value="1">SDI-1</option> :
                        <>
                          <option value="1">SDI-1</option>
                          <option value="2">SDI-2</option>
                        </>
                      : props.properties1.model === 'VL4510' || props.properties1.model.includes('VL4510C') ?
                        <option value="1">SDI-1</option> :
                        <option value="1">HDMI-1</option>
                    }
                  </select>
                </div>
              </div>

              <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>Sample Rate(Hz):</label>
                  <input
                    type='text'
                    className='form-control'
                    value={audio4Samplerate}
                    readOnly={true}
                  />
                </div>
              </div>

              <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>Channel</label>
                  <select className='form-control' value={audio4Channel} onChange={(event) => changeHandler(event, setAudio4Channel, props.properties1.model.includes("RM11") ? 'audio4_channel':'audio4_ch')}>
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
                      if (Number.parseInt(event.target.value) > 20 || Number.parseInt(event.target.value) < -20) return;
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
      <div className={'pad-15 ' + (props.videoMode !== "2xHD+2xSD" ? "not-visible" : "")}>
        <div className='form-boxdiv'>
          <div className='form-boxtopline5'>Audio-4 Output</div>

          <div className='form-boxtopcont user-form'>
            <div className='row'>
              <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>Codec</label>
                  <select className='form-control' value={audio4Encoder} onChange={(event) => {
                    props.properties1.model.includes('RM11') ? (changeHandler(event, setAudio4Encoder, 'audio4_encoder')) : (
                      changeHandler(event, setAudio4Encoder, 'audio4_enc')
                    )
                  }}>
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
                    <option value="96000">96</option>
                    <option value="128000">128</option>
                    <option value="192000">192</option>
                    <option value="384000">384</option>
                  </select>
                </div>
              </div>

              <div className={'col-sm-6 ' + dialnormClass4}>
                <div className='form-group'>
                  <label className='form-check-label'>Dialnorm(-dB)</label>
                  <input
                    type='number'
                    className='form-control'
                    value={audio4Dialnorm}
                    min="1"
                    max="31"
                    onChange={(event) => changeHandler(event, setAudio4Dialnorm, 'audio4_dialnorm')}
                  />
                </div>
              </div>

            </div>

            <div className='clear'></div>
          </div>
          <div className='clear'></div>
        </div>
      </div>
    </>
  )
}

export default Audio