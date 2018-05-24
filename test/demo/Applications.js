// @flow

import React, {Component}           from 'react';
import { connect }                  from 'react-redux';
import _                            from 'lodash';

import { 
  Button, Icon, Tooltip, Popconfirm, message, 
  DatePicker, Cascader, Select, Divider,
  Table, Form, Input,
  Row, Col
} from 'antd';

import { actions as appliactions }  from '../reducers/applications';
import { actions as enttactions }   from '../reducers/entities';
import { actions as mdareaactions } from '../reducers/maindata_area';

import StyleWrapper                 from './Entities.style';
import ApplicationsUpdateForm       from './ApplicationsUpdate.Form';
import AwardApplicationSummary      from '../forms/ApplicationAwardSummary';
import SidePanel                    from '../components/SidePanel';

import { dateFormat }               from '../Lib';

import { noticeTitle }              from '../images';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class Applications extends Component {
  constructor(props) {
    super();
    this.state = {
      // model
      localCategory: '',
      localApplications: [],
      localEntities: [],
      selectedRowKeys: [],
      // view
      selectorItemsName: [],
      cascaderItemsGovernments: [],
      cascadeItemsArea: [],
      columnsToDisplay: [],
      // control
      filterApplicationNameList: [],
      filterEntityNameList: [],
      filterEntityAdminByList: [],
      filterStartDate: null,
      filterEndDate: null,
      // filterTableSearchName: null,
      filterTableSearchTitle: null,
      isDatePickerEndOpen: false,
      isSidePanelUpdateExistCollapsed: true
    }
  }
  componentDidMount () {
    const {toLoad, toLoadEntities, toLoadMainDataArea, area, entities, applications} = this.props;
    if (!applications.length) toLoad();
    if (!entities.length) toLoadEntities();
    if (!area.length) toLoadMainDataArea();
  }

  componentWillReceiveProps(nextProps) {
    // console.log('nextProps: ', nextProps);
    const { match, applications, entities, employer, area } = nextProps;
    const localcategory = match.params.category;
    const { localCategory } = this.state;
    // console.log('category: ', localCategory, localcategory);
    if (localCategory != localcategory) {
      this.setState({
        selectedRowKeys: []
      });
    }
    const selectoritems = [];
    const localentities = [];

    for (let entry of entities) {
      if (entry.category !== localcategory) continue;

      selectoritems.push(
        <Select.Option key={entry.full_path}>{entry.name}</Select.Option>
      );

      let n = Object.assign({}, entry);
      // delete n.children;
      // console.log('local entity: ', n);
      localentities.push(n);
    }

    let rootid;
    let areaitems = [];
    rootid = _.findIndex(area, { 'path': '中国' });
    if (rootid >= 0) {
      areaitems = area[rootid].children;
    }

    for (let element of applications) {
      element.resultTmp = '待审核';
    }

    this.setState({
      localCategory: localcategory,
      localApplications: applications,
      localEntities: localentities,
      cascadeItemsArea: areaitems,
      selectorItemsName: selectoritems,
      cascaderItemsGovernments: _.filter(entities, { 'full_path': employer })
    });
  }

  onStateValueChange = (name, value) => {
    // console.log('onStateValueChange: ', name, value);
    if ( ((name === 'filterStartDate') || (name === 'filterEndDate'))
         && value) {
      const val = {
        'filterStartDate': {'hour': 0,  'minute': 0,  'second': 0,  'millisecond': 0},
        'filterEndDate':   {'hour': 23, 'minute': 59, 'second': 59, 'millisecond': 999}
      };
      value.set(val[name]);
    }
    // console.log('onStateValueChange: ', name, value);
    this.setState({
      [name]: value,
    });
  }
  onFilterReset = () => {
    // console.log('onFilterReset');
    this.setState({
      filterEntityNameList: [],
      filterEntityAdminByList: [],
      filterStartDate: null,
      filterEndDate: null,
      // filterTableSearchName: null
      filterTableSearchTitle: null
    });
  }
  checkFilterCondition = (item) => {
    const { 
      filterEntityNameList, filterEntityAdminByList, filterStartDate, filterEndDate
    } = this.state;
    const createdwhen = new Date(item.created_when).getTime();

    if (filterEntityAdminByList.length > 0) {
      if(filterEntityAdminByList.slice(-1)[0] !== item.admin_path) return false;
    }
    if (filterEntityNameList.length > 0) {
      if (filterEntityNameList.indexOf(item.full_path) < 0) return false;
    }
    if (filterStartDate) {
      const fd = new Date(filterStartDate._d).getTime();
      // console.log('start date: ', fd, createdwhen);
      if (createdwhen < fd) return false;
    }
    if (filterEndDate) {
      const fd = new Date(filterEndDate._d).getTime();
      // console.log('end date: ', fd, createdwhen);
      if (createdwhen > fd) return false;
    }
    // console.log('item: ', item);
    return true;
  }
  disabledStartDate = (startValue) => {
    const { filterEndDate } = this.state;
    if (!startValue || !filterEndDate) {
      return false;
    }
    return startValue.valueOf() > filterEndDate.valueOf();
  }
  disabledEndDate = (endValue) => {
    const { filterStartDate } = this.state;
    if (!endValue || !filterStartDate) {
      return false;
    }
    return endValue.valueOf() <= filterStartDate.valueOf();
  }
  onStartPickerOpenChange = (open) => {
    if (!open) {
      this.setState({ isDatePickerEndOpen: true });
    }
  }
  onEndPickerOpenChange = (open) => {
    this.setState({ isDatePickerEndOpen: open });
  }
  onDeleteConfirmOK = (e) => {
    // console.log('onDeleteConfirmOK: ', e, this.state.selectedRowKeys);
    if (this.state.selectedRowKeys.length === 0) return;
    this.props.toDelete(this.state.selectedRowKeys);
    this.setState({selectedRowKeys: []});
  }
  onDeleteConfirmCancel = (e) => {
    console.log(e);
  }
  closeSidePanelUpdateExist = () => {
    this.setState({isSidePanelUpdateExistCollapsed: true});
  }
  onCreateNewButtonClick = () => {
    this.props.history.push('/home/studio/awards');
  }
  onUpdateExistButtonClick = () => {
    const {selectedRowKeys} = this.state;
    if (!selectedRowKeys.length) {
      message.info("请选项您需要修改的记录！");
      return;
    }
    this.setState({
      isSidePanelUpdateExistCollapsed: false
    });
  }

  submitToUpdateExist = (newvalue) => {
    const { selectedRowKeys, localApplications} = this.state;

    for (let id of selectedRowKeys) {
      const app = _.find(localApplications, {'id': id});
      console.log(id, app);
      const exinfo = Object.assign({}, app._ex_info_, newvalue);
      console.log(exinfo);
      this.props.toUpdate({ 
        idlist: [id], 
        newvalue: {_ex_info_: exinfo}
      });
    }
  }

  // 搜索配置 Start  2018-04-18 15:39:00 16th week Wed
  // onTableSearchNameChange = (e) => {
  onTableSearchTitleChange = (e) => {
      // 防止正则匹配提前结束产生bug
    let val = e.target.value.replace(/[().^$\[\]\\]/ig, '');
    // val未改变返回当前状态
    // if(val === this.state.filterTableSearchName) return null;
    if(val === this.state.filterTableSearchTitle) return null;
    if(val === '') val = null;
    this.setState({
      // filterTableSearchName: val
      filterTableSearchTitle: val
    });
  }
  // onTableSearchNameClear = (e) => { this.setState({ filterTableSearchName: null }); }
  onTableSearchTitleClear = (e) => { this.setState({ filterTableSearchTitle: null }); }
  // onTableSearchNameClick = () => this.setState({ filterDropdownVisible: false })
  onTableSearchTitleClick = () => this.setState({ filterDropdownVisible: false })
  // 搜索配置 End  2018-04-18 15:39:09 16th week Wed

  render() {
    // model
    const { localApplications } = this.state;
    // view
    const { 
      selectorItemsName, cascaderItemsGovernments, cascadeItemsArea, 
      isDatePickerEndOpen, isSidePanelUpdateExistCollapsed, 
      selectedRowKeys, columnsToDisplay
    } = this.state;
    // control
    const { filterEntityNameList, filterEntityAdminByList, filterStartDate, filterEndDate, filterTableSearchTitle } = this.state;
    
    const { match, form } = this.props;
    const { getFieldDecorator } = form;

    const gTableColumnsReserved = [
      {
        title: "标题",
        dataIndex: "title",
        key: "title",
        // sorter: (a, b) => a.label.localeCompare(b.label, 'zh-Hans-CN'),
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              id="table-search-title"
              className="table-search"
              placeholder="Search title"
              value={filterTableSearchTitle}
              onChange={this.onTableSearchTitleChange}
              onPressEnter={this.onTableSearchTitleClick}
            />
            <div className="ant-table-filter-dropdown-btns">
              <a className="ant-table-filter-dropdown-link confirm" onClick={this.onTableSearchTitleClick}>OK</a>
              <a className="ant-table-filter-dropdown-link clear" onClick={this.onTableSearchTitleClear}>Reset</a>
            </div>
          </div>
        ),
        // filterIcon: <Icon type="search" style={{ color: (filterTableSearchName!=null) ? '#108ee9' : '#aaa' }} />,
        filterIcon: <Icon type="search" style={{ color: (filterTableSearchTitle!=null) ? '#108ee9' : '#aaa' }} />,
        filterDropdownVisible: this.state.filterDropdownVisible,
        onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible })
      }, {
        title: "状态",
        dataIndex: "resultTmp",
        key: "resultTmp",
        sorter: (a, b) => a.resultTmp.localeCompare(b.resultTmp, 'zh-Hans-CN')
      }, {
        title: "申请者",
        dataIndex: "submitter_name",
        key: "submitter_name",
        sorter: (a, b) => a.submitter_name.localeCompare(b.submitter_name, 'zh-Hans-CN')
      }, {
        title: "申请单位",
        dataIndex: "employer_name",
        key: "employer_name",
        sorter: (a, b) => a.employer_name.localeCompare(b.employer_name, 'zh-Hans-CN')
      }, {
        title: "联系人",
        dataIndex: "_ex_info_.contact",
        key: "_ex_info_.contact",
        sorter: (a, b) => a._ex_info_.contact.localeCompare(b._ex_info_.contact, 'zh-Hans-CN')
      }, {
        title: "联系方式",
        dataIndex: "_ex_info_.phonenumber",
        key: "_ex_info_.phonenumber",
        sorter: (a, b) => a._ex_info_.phonenumber.localeCompare(b._ex_info_.phonenumber, 'zh-Hans-CN')
      }
    ];

    const gTableColumnsOptional = [
      /*
      {
        title: "全称",
        dataIndex: "full_path",
        key: "full_path",
        sorter: (a, b) => a.full_path.localeCompare(b.full_path, 'zh-Hans-CN')
      }, {
        title: "层级",
        dataIndex: "level",
        key: "level",
        sorter: (a, b) => ((a.level < b.level) ? -1:1),
        filters: [
          { text: '1', value: 1 },
          { text: '2', value: 2 },
          { text: '3', value: 3 },
          { text: '4', value: 4 }
        ],
        onFilter: (value, record) => (record.level == value)
      }, {
        title: "地区",
        dataIndex: "area_path",
        key: "area_path",
        sorter: (a, b) => a.area_path.localeCompare(b.area_path, 'zh-Hans-CN')
      }, */ {
        title: "创建时间",
        dataIndex: "created_when",
        key: "created_when",
        sorter: (a, b) => ((((new Date(a.created_when)).getTime()) < ((new Date(b.created_when)).getTime())) ? -1 : 1),
        render: (text, row, index) => dateFormat(text, 'yyyy-MM-dd hh:mm:ss')
      }, {
        title: "修改时间",
        dataIndex: "updated_when",
        key: "updated_when",
        sorter: (a, b) => ((((new Date(a.updated_when)).getTime()) < ((new Date(b.updated_when)).getTime())) ? -1 : 1),
        render: (text, row, index) => dateFormat(text, 'yyyy-MM-dd hh:mm:ss')
      }, {
        title: "申请目的",
        dataIndex: "application_target",
        key: "application_target",
        sorter: (a, b) => a.application_target.localeCompare(b.application_target, 'zh-Hans-CN')
      }
    ];

    const rowSelection = {
      selectedRowKeys,
      onChange: (keys, rows) => {
        this.setState({ 
          selectedRowKeys: keys,
        });
      }
    };
    const hasTableRowsSelected = selectedRowKeys.length > 0;

    let tablerows = localApplications; // .filter((item) => this.checkFilterCondition(item));
    // if (filterTableSearchName) {
    //   let reg = new RegExp(filterTableSearchName, 'gi');
    //   tablerows = tablerows.map((record) => record.name.toString().match(reg) ? {
    //     ...record,
    //     name: record.name.toString().split(reg).map((text, i) => i > 0 ? [<span key={i} className="highlight">{record.name.toString().match(reg)[0]}</span>, text] : text)
    //   } : null ).filter(record => !!record)
    // }
    // console.log('tablerows: ', tablerows);

    const selectedcols = gTableColumnsOptional.filter((item) => {
      return (columnsToDisplay.indexOf(item.title) > -1);
    });
    const tablecols = [...gTableColumnsReserved, ...selectedcols];

    // 扩展列的实现 Start 2018-04-23 16:44:52 17th week Mon
    const renderRowExpand = (record) => {
      // 存放DOM元素
      // const domArr = [];
      /*
      gTableColumnsOptional.forEach((item, i) => {
        // 判断是否需要格式化
        if (record[item.key] && record[item.key].toString().match(/018-/g)) {
          record[item.key] = dateFormat(record[item.key], 'yyyy-MM-dd hh:mm:ss');
        }
        // 可选项存入DOM数组
        domArr.push(
          <p key={i} className="row-expand">
            <span className="label">{item.title}</span>
            <span className="content">{record[item.key]}</span>
          </p>
        )
      })
      domArr.push(
        <p key={100} className="row-expand">
          <span className="label">当前状态</span>
          <span className="content">待审批</span>
        </p>
      )
      */

      console.log(record);

      const dummy = Object.assign({
        basicInfo: record._ex_info_, 
        journeys: record._ex_info_.journeys,
        tourists: _ex_info_.tourists
      });
     
      // return domArr;

      return AwardApplicationSummary(dummy);
    }
    // 扩展列的实现 End 2018-04-23 16:44:52 17th week Mon

    return(
      <StyleWrapper>
        <span className="noticetitle" ><img src={noticeTitle} alt="Title"/>
          奖励申请
        </span>
        <Row className="filter-row" gutter={6}>
          <Col className="gutter-row" span={6}>
            <DatePicker
              format="YYYY-MM-DD"
              placeholder="日期（起）"
              onChange={(value) => this.onStateValueChange('filterStartDate', value)} value={filterStartDate}
              disabledDate={this.disabledStartDate}
              onOpenChange={this.onStartPickerOpenChange}
            />
            <DatePicker
              format="YYYY-MM-DD"
              placeholder="日期（止）"
              onChange={(value) => this.onStateValueChange('filterEndDate', value)} value={filterEndDate}
              disabledDate={this.disabledEndDate}
              onOpenChange={this.onEndPickerOpenChange}
              open={isDatePickerEndOpen}
            />
          </Col>
          <Col className="gutter-row" span={10}>
            <Cascader onChange={(v) => this.onStateValueChange('filterEntityAdminByList', v)} value={filterEntityAdminByList} changeOnSelect options={cascaderItemsGovernments} placeholder='主管单位' />
          </Col>
          <Col className="gutter-row" span={6}>
            <Select onChange={(v) => this.onStateValueChange('filterEntityNameList', v)}  value={filterEntityNameList} allowClear mode="multiple" placeholder='名称' >
              {selectorItemsName}
            </Select>
          </Col>
          <Col className="gutter-row" span={2}>
            <Tooltip placement="bottom" title="重置过滤条件" >
              <Button className="clear-filter" onClick={this.onFilterReset}><Icon type="close-circle-o" /></Button>
            </Tooltip>
          </Col>
        </Row>
        <Row className="handle-row" gutter={6} >
          <Col className="gutter-row" span={16}>
            <Button.Group>
              <Popconfirm title={`是否确认要删除选中的 ${selectedRowKeys.length} 条记录？`} onConfirm={this.onDeleteConfirmOK} onCancel={this.onDeleteConfirmCancel} okText="是" cancelText="否">
                <Tooltip placement="bottom" title="删除" >
                  <Button><Icon type="delete" /></Button>
                </Tooltip>
              </Popconfirm>
              <Tooltip placement="bottom" title="新增" >
                <Button onClick={this.onCreateNewButtonClick} ><Icon type="file-add" /></Button>
              </Tooltip>
              <Tooltip placement="bottom" title="更新" >
                <Button onClick={this.onUpdateExistButtonClick} ><Icon type="upload" /></Button>
              </Tooltip>
              <Tooltip placement="bottom" title="刷新" >
                <Button loading={this.props.isUpdating} disabled={this.props.isUpdating} onClick={() => this.props.toLoad() }><Icon type="download" /></Button>
              </Tooltip>
            </Button.Group>
          </Col>
          <Col className="gutter-row" span={8}>
            <Select onChange={(v) => this.onStateValueChange('columnsToDisplay', v)}  value={columnsToDisplay} allowClear mode="multiple" placeholder='可选字段' >
              {gTableColumnsOptional.map((item) => {
                return (<Select.Option key={item.title}>{item.title}</Select.Option>);
              })}
            </Select>
          </Col>
        </Row>
        <Row className="select-row" gutter={6}>
          <Col className="gutter-row" span={24}>
            <Divider orientation="left">{hasTableRowsSelected ? ` 已选中 ${selectedRowKeys.length} 项 / 共 ${tablerows.length} 项` : ` 共 ${tablerows.length} 项`} </Divider>
          </Col>
        </Row>
        <Table 
          childrenColumnName={null}
          rowKey='id'
          expandedRowRender={renderRowExpand}
          columns={ tablecols } 
          dataSource={tablerows} 
          loading={this.props.isUpdating} 
          rowSelection={rowSelection}
          footer={() => (
            <span>{hasTableRowsSelected ? ` 已选中 ${selectedRowKeys.length} 项 / 共 ${tablerows.length} 项` : ` 共 ${tablerows.length} 项`} </span>
          )}/>
        <SidePanel collapsed={isSidePanelUpdateExistCollapsed} title="更新" >
          <ApplicationsUpdateForm
            onSubmit={this.submitToUpdateExist}
            onCancel={this.closeSidePanelUpdateExist}
          />
        </SidePanel>
      </StyleWrapper>
    )
  }
}

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    applications: state.applications.applications,
    isUpdating: state.applications.isUpdating,
    entities: state.entities.entities,
    employer: state.currentuser.employer,
    area: state.md_area.area
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    toLoadMainDataArea: () => {
      dispatch(mdareaactions.retrieve());
    },
    toLoadEntities: () => {
      dispatch(enttactions.retrieve());
    },
    toLoad: () => {
        dispatch(appliactions.retrieve());
    },
    toDelete: (list) => {
      dispatch(appliactions.delete(list));
    },
    toUpdate: (list) => {
      dispatch(appliactions.update(list));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Applications));
