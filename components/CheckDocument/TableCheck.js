import React, { Component } from 'react';
import { Table, Input, Checkbox } from 'antd';
import CamperService from '../../service/CamperService'
import AuthService from '../../service/PermissionService'
import styled from 'styled-components'

const Link = styled.a`
  a .TableCheck__Link-sc-1uoh4lk-0 .dbjGPO {
    color: ${props => props.color};
    text-decoration: none;
}
`
const P = styled.p`
  opacity: 0.7;
`
class TableCheck extends Component {
  state = {
    permission: [],
    selectedRowKeys: [],
    loading: false,
    registrants: [],
    url: null,
    note: '',
    columns: [{
      title: 'ตรวจแล้ว',
      dataIndex: 'checked',
      render: (boolean, profile) => {
        return (
          boolean == 'checked' ?
            <Checkbox defaultChecked={true} onChange={(e) => this.handleCheckStatus(profile.wip_id, e)} /> :
            <Checkbox defaultChecked={false} onChange={(e) => this.handleCheckStatus(profile.wip_id, e)} />
        )
      }
    }, {
      title: 'WIP ID',
      dataIndex: 'wip_id',
      key: 'wip_id'
    }, {
      title: 'ชื่อ-สกุล',
      dataIndex: 'name',
    }, {
      title: 'Transcript',
      dataIndex: 'transcript',
      render: (link) => {
        return (
          link != null ?
          <Link color="#1aa1f4" onClick={() => this.getDocument(link)}>ตรวจเอกสาร</Link>:
          <P>ยังไม่อัพโหลด</P>
        )
      }
    }, {
      title: 'ใบขออนุญาต ผปค.',
      dataIndex: 'confrim',
      render: (link) => {
        return (
          link != null ?
          <Link onClick={() => this.getDocument(link)}>ตรวจเอกสาร</Link>:
          <P>ยังไม่อัพโหลด</P>
        )
      }
    }, , {
      title: 'Receipt',
      dataIndex: 'receipt',
      render: (link) => {
        return (
          link != null ?
          <Link onClick={() => this.getDocument(link)}>ตรวจเอกสาร</Link>:
          <P>ยังไม่อัพโหลด</P>
        )
      }
    }]
  }

  componentDidMount = async () => {
    this.getPermission()
  }

  getPermission = async () => {
    let data = await AuthService.getPermission()
    let permission = []
    permission = data.permission
    this.setState({
      permission: permission
    })
    this.checkPermission(permission)
  }

  checkPermission = async () => {
    if (this.state.permission.find(permissionId => permissionId.permission_id == 10)) {
      let registrants = await CamperService.getCamper()
      this.getCamper(registrants.data)
      return true
    }
  }

  getCamper = async camper => {
    let data = [];
    for (let index = 0; index < camper.length; index++) {
      data.push({
        key: index,
        wip_id: camper[index].wip_id,
        checked: camper[index].reason,
        name: `${camper[index].firstname_th} ${camper[index].lastname_th}`,
        transcript: camper[index].transcript,
        confrim: camper[index].confrim,
        receipt: camper[index].receipt,
      })
    }
    this.setState({
      registrants: data
    })
  }

  handleCheckStatus = (wip_id, e) => {
    if (e.target.checked) {
      CamperService.updateCheckDoc({ wipId: wip_id, reason: 'checked' })
    } else {
      CamperService.updateCheckDoc({ wipId: wip_id, reason: null })
    }
  }

  getDocument = async (link) => {
    let wipId = link.substring(5, 11)
    let typePath = link.substring(19)
    let res = await CamperService.getDocuments({ wipId: wipId, type_path: typePath })
    this.setState({
      url: res.data
    })
    window.open(this.state.url,'_blank')
  }


  render() {
    return (
      <React.Fragment>
        <Table columns={this.state.columns} dataSource={this.state.registrants} />
      </React.Fragment>
    );
  }
}

export default TableCheck;