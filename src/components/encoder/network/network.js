import { useState, useEffect } from 'react'
import '../encoder.css'

let NetworkSettings = (props) => {

  const [tsMac, setTsMac] = useState(props.properties1.ts_mac)
  const [tsIp, setTsIp] = useState(props.properties1.ts_ip)
  const [tsNetmask, setTsNetmask] = useState(props.properties1.ts_netmask)
  const [tsGateway, setTsGateway] = useState(props.properties1.ts_gateway)

  const [tsIpv6, setTsIpv6] = useState(props.properties1.ts_ipv6)
  const [tsIpv6Gateway, setTsIpv6Gateway] = useState(props.properties1.ts_ipv6_gateway)
  const [tsIpv6PrefixLength, setTsIpv6PrefixLength] = useState(props.properties1.ts_ipv6_prefix_length)
  const [mgmtIpv6, setMgmtIpv6] = useState(props.properties1.mgmt_ipv6)
  const [mgmtIpv6Gateway, setMgmtIpv6Gateway] = useState(props.properties1.mgmt_ipv6_gateway)
  const [mgmtIpv6PrefixLength, setMgmtIpv6PrefixLength] = useState(props.properties1.mgmt_ipv6_prefix_length)
  const [tsVlanID, setTsVlanID] = useState(props.properties1.ts_vlanid)
  const [mgVlanID, setMgVlanID] = useState(props.properties1.mgmt_vlanid)

  const [mgmtMac, setMgmtMac] = useState(props.properties1.mgmt_mac)
  const [mgmtIp, setMgmtIp] = useState(props.properties1.mgmt_ip)
  const [mgmtNetmask, setMgmtNetmask] = useState(props.properties1.mgmt_netmask)
  const [mgmtGateway, setMgmtGateway] = useState(props.properties1.mgmt_gateway)
  const [snmpDestIp, setsnmpDestIp] = useState(props.properties1.snmp_dest_ip)
  const [snmpCommunity, setSnmpCommunity] = useState(props.properties1.snmp_community)


  const [pushURL, setPushURL] = useState(props.properties1.push_url)
  const [pushInterval, setPushInterval] = useState(props.properties1.push_interval_sec)
  // const [pushPassword, setPushPassword] = useState(props.properties1.password)


  useEffect(() => {
    setTsMac(props.properties1.ts_mac);
    setTsIp(props.properties1.ts_ip);
    setTsNetmask(props.properties1.ts_netmask);
    setTsGateway(props.properties1.ts_gateway);
    setMgmtMac(props.properties1.mgmt_mac);
    setMgmtIp(props.properties1.mgmt_ip);
    setMgmtNetmask(props.properties1.mgmt_netmask);
    setMgmtGateway(props.properties1.mgmt_gateway);
    setsnmpDestIp(props.properties1.snmp_dest_ip);
    setSnmpCommunity(props.properties1.snmp_community);
    setTsIpv6PrefixLength(props.properties1.ts_ipv6_prefix_length);
    setTsIpv6Gateway(props.properties1.ts_ipv6_gateway);
    setTsIpv6(props.properties1.ts_ipv6);
    setPushURL(props.properties1.push_url)
    setPushInterval(props.properties1.push_interval_sec)
    // setPushPassword(props.properties1.)

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
          <div className='form-boxtopline5'>{props.enableVlan === 'Y' ?
            props.properties1.enabled_outofbandmanagement === 'Y' ?
              "TS Network Configuration" : "TS VLAN Configuration" :
            props.properties1.enabled_outofbandmanagement === 'Y' ?
              "TS Network Configuration" : "Network Configuration"}</div>
          <div className='form-boxtopcont user-form'>
            <div className='row'>
              <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>Mac Address</label>
                  <input
                    type='text'
                    className='form-control'
                    value={tsMac}
                    onChange={(event) => {
                      if (event.target.value.match(/[^A-Za-z0-9]/)) { return; }
                      changeHandler(event, setTsMac, 'ts_mac')
                    }}
                  />
                </div>
              </div>
              {props.enableVlan === 'Y' && <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>VLAN ID</label>
                  <input
                    type='text'
                    className='form-control'
                    value={tsVlanID}
                    onChange={(event) => {
                      changeHandler(event, setTsVlanID, 'ts_vlanid')
                    }}
                  />
                </div>
              </div>}
              <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>{props.properties1.enabled_outofbandmanagement === 'Y' ? "Static IP Address" : "IP Address"}</label>
                  <input
                    type='text'
                    min='0'
                    className='form-control'
                    value={tsIp}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9.]/)) {
                        return;
                      }
                      changeHandler(event, setTsIp, 'ts_ip')
                    }}
                  />
                </div>
              </div>

              <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>{props.properties1.enabled_outofbandmanagement === 'Y' ? "Static Netmask" : "Netmask"}</label>
                  <input
                    type='text'
                    min='0'
                    className='form-control'
                    value={tsNetmask}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9.]/)) {
                        return;
                      }
                      changeHandler(event, setTsNetmask, 'ts_netmask')
                    }}
                  />
                </div>
              </div>

              <div className='col-sm-6'>
                <div className='form-group'>
                  <label className='form-check-label'>{props.properties1.enabled_outofbandmanagement === 'Y' ? "Static Default Gateway" : "Default Gateway"}</label>
                  <input
                    type='text'
                    min='0'
                    className='form-control'
                    value={tsGateway}
                    onChange={(event) => {
                      if (event.target.value.match(/[^0-9.]/)) {
                        return;
                      }
                      changeHandler(event, setTsGateway, 'ts_gateway')
                    }
                    }
                  />
                </div>
              </div>

              <div className='clear'></div>
            </div>
          </div>
          <div className='clear'></div>
        </div>
      </div>
      {(props.properties1.model.includes("RM1121CXF") || props.properties1.model.includes("VL4510H") || props.properties1.model.includes("VL4522") || props.properties1.model.includes("RM1121XD")) && props.enableIpv6 === "Y" ?
        <div className='pad-15'>
          <div className='form-boxdiv'>
            <div className='form-boxtopline5'>{props.properties1.enabled_outofbandmanagement === 'Y' ? "TS " : ""}IPv6 Network Configuration</div>
            <div className='form-boxtopcont user-form'>
              <div className='row'>
                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>IPv6 Address</label>
                    <input
                      type='text'
                      className='form-control'
                      value={tsIpv6}
                      onChange={(event) => {
                        if (event.target.value.match(/[^A-Za-z0-9]/)) { return; }
                        changeHandler(event, setTsIpv6, 'ts_ipv6')
                      }}
                    />
                  </div>
                </div>

                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>Subnet Prefix Length</label>
                    <input
                      type='number'
                      min='0'
                      className='form-control'
                      value={tsIpv6PrefixLength}
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9.]/)) {
                          return;
                        }
                        changeHandler(event, setTsIpv6PrefixLength, 'ts_ipv6_prefix_length')
                      }}
                    />
                  </div>
                </div>

                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>Default Gateway	</label>
                    <input
                      type='text'
                      min='0'
                      className='form-control'
                      value={tsIpv6Gateway}
                      onChange={(event) => {
                        // if (event.target.value.match(/[^0-9.]/)) {
                        //   return;
                        // }
                        changeHandler(event, setTsIpv6Gateway, 'ts_ipv6_gateway')
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        : <></>}

      {(props.enableVlan === 'Y' || (props.properties1.enabled_outofbandmanagement === 'Y' && props.enableOutOfBondMgmt === 'Y')) && (
        <div className='pad-15'>
          <div className='form-boxdiv'>
            <div className='form-boxtopline5'>{props.enableVlan === 'Y' && props.properties1.enabled_outofbandmanagement !== 'Y' ? "Management VLAN Configuration" : "Management Network Configuration"}</div>
            <div className='form-boxtopcont user-form'>
              <div className='row'>
                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>Mac Address</label>
                    <input
                      type='text'
                      className='form-control'
                      value={mgmtMac}
                      onChange={(event) => {
                        if (event.target.value.match(/[^A-Za-z0-9]/)) { return; }
                        changeHandler(event, setMgmtMac, 'mgmt_mac')
                      }}
                    />
                  </div>
                </div>
                {props.enableVlan === 'Y' && <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>VLAN ID</label>
                    <input
                      type='text'
                      className='form-control'
                      value={mgVlanID}
                      onChange={(event) => {
                        changeHandler(event, setMgVlanID, 'mgmt_vlanid')
                      }}
                    />
                  </div>
                </div>}

                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>IP Address</label>
                    <input
                      type='text'
                      min='0'
                      className='form-control'
                      value={mgmtIp}
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9.]/)) {
                          return;
                        }
                        changeHandler(event, setMgmtIp, 'mgmt_ip')
                      }}
                    />
                  </div>
                </div>

                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>Netmask</label>
                    <input
                      type='text'
                      min='0'
                      className='form-control'
                      value={mgmtNetmask}
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9.]/)) {
                          return;
                        }
                        changeHandler(event, setMgmtNetmask, 'mgmt_netmask')
                      }}
                    />
                  </div>
                </div>

                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>Default Gateway</label>
                    <input
                      type='text'
                      min='0'
                      className='form-control'
                      value={mgmtGateway}
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9.]/)) {
                          return;
                        }
                        changeHandler(event, setTsGateway, 'ts_gateway')
                      }
                      }
                    />
                  </div>
                </div>

                <div className='clear'></div>
              </div>
            </div>
            <div className='clear'></div>
          </div>
        </div>

      )}
      {props.properties1.enabled_outofbandmanagement === 'Y' && props.enableOutOfBondMgmt === 'Y' && (props.properties1.model.includes("RM1121CXF") || props.properties1.model.includes("VL4522") || props.properties1.model.includes("RM1121XD")) && props.enableIpv6 === "Y" ?
        <div className='pad-15'>
          <div className='form-boxdiv'>
            <div className='form-boxtopline5'>Management IPv6 Network Configuration</div>
            <div className='form-boxtopcont user-form'>
              <div className='row'>
                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>IPv6 Address</label>
                    <input
                      type='text'
                      className='form-control'
                      value={mgmtIpv6}
                      onChange={(event) => {
                        if (event.target.value.match(/[^A-Za-z0-9]/)) { return; }
                        changeHandler(event, setMgmtIpv6, 'mgmt_ipv6')
                      }}
                    />
                  </div>
                </div>

                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>Subnet Prefix Length</label>
                    <input
                      type='number'
                      min='0'
                      className='form-control'
                      value={mgmtIpv6PrefixLength}
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9.]/)) {
                          return;
                        }
                        changeHandler(event, setMgmtIpv6PrefixLength, 'mgmt_ipv6_prefix_length')
                      }}
                    />
                  </div>
                </div>

                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>Default Gateway	</label>
                    <input
                      type='text'
                      min='0'
                      className='form-control'
                      value={mgmtIpv6Gateway}
                      onChange={(event) => {
                        changeHandler(event, setMgmtIpv6Gateway, 'mgmt_ipv6_gateway')
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        : <></>}
      {((props.properties1.model.includes("RM1121CXF") && props.enableSnmp === "Y") || (props.properties1.enabled_outofbandmanagement === 'Y' && props.enableSnmp === 'Y')) && (

        <div className='pad-15'>
          <div className='form-boxdiv'>
            <div className='form-boxtopline5'>SNMP Configuration</div>
            <div className='form-boxtopcont user-form'>
              <div className='row'>

                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>Trap Dest. IP</label>
                    <input
                      type='text'
                      className='form-control'
                      value={snmpDestIp}
                      onChange={(event) => {
                        if (event.target.value.match(/[^A-Za-z0-9]/)) { return; }
                        changeHandler(event, setsnmpDestIp, 'snmp_dest_ip')
                      }}
                    />
                  </div>
                </div>

                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>CommunityName</label>
                    <input
                      type='text'
                      min='0'
                      className='form-control'
                      value={snmpCommunity}
                      onChange={(event) => {
                        changeHandler(event, setSnmpCommunity, 'snmp_community')
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {props.enablePush === 'Y' && (//) && props.enableOutOfBondMgmt === 'Y' && (
        <div className='pad-15'>
          <div className='form-boxdiv'>
            <div className='form-boxtopline5'>Push Configuration</div>
            <div className='form-boxtopcont user-form'>
              <div className='row'>

                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>URL</label>
                    <input
                      type='text'
                      className='form-control'
                      value={pushURL}
                      onChange={(event) => {
                        // if (event.target.value.match(/[^A-Za-z0-9]/)) { return; }
                        changeHandler(event, setPushURL, 'push_url')
                      }}
                    />
                  </div>
                </div>

                <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>PUSH interval</label>
                    <input
                      type='text'
                      min='0'
                      className='form-control'
                      value={pushInterval}
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9]/)) {
                          return;
                        }
                        changeHandler(event, setPushInterval, 'push_interval_sec')
                      }}
                    />
                  </div>
                </div>

                {/* <div className='col-sm-6'>
                  <div className='form-group'>
                    <label className='form-check-label'>Password</label>
                    <input
                      type='password'
                      className='form-control'
                      value={mgmtNetmask}
                      onChange={(event) => {
                        if (event.target.value.match(/[^0-9.]/)) {
                          return;
                        }
                        changeHandler(event, setMgmtNetmask, 'mgmt_netmask')
                      }}
                    />
                  </div>
                </div> */}

                <div className='clear'></div>
              </div>
            </div>
            <div className='clear'></div>
          </div>
        </div>

      )}
    </>
  )
}

export default NetworkSettings
