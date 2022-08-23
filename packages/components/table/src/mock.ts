import {ColumnOptions, TableData} from "./types";

export function genTableData(count = 10): TableData[] {
  return Array(count).fill('').map((item, index) => ({
    id: index,
    name: '张三' + index,
    age: 18,
    address: 'New York No. 1 Lake Park',
    province: 'America',
    city: 'New York',
    zip: 100000
  }));
}

export function genColumns():ColumnOptions[] {
  return [
    {
      title: 'Name',
      key: 'name',
      width: 100,
      fixed: 'left'
      // renderHeader({ col, index }) {
      //   return <b>姓名--{ index }</b>;
      // }
    },
    {
      title: 'Age',
      key: 'age',
      width: 100,
      fixed: 'left'
    },
    {
      title: 'Province',
      key: 'province',
      width: 200
    },
    {
      title: 'City',
      key: 'city',
      width: 200,
      slot: 'city'
    },
    {
      title: 'Address',
      key: 'address',
      minWidth: 180
    },
    {
      title: 'Postcode',
      key: 'zip',
      width: 100,
      fixed: 'right'
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      fixed: 'right',
      // render() {
      //   return (
      //     <div>
      //       <a>启用</a>
      //       <a style="color: red; margin-left: 8px;">禁用</a>
      //     </div>
      //   )
      // }
    }
  ]
}