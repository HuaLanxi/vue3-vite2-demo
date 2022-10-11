<template>
  <div class="table-box">
    <!-- 标题 -->
    <div class="title">
      <h2>CRUD Demo</h2>
    </div>
    <!-- query -->
    <div class="query-box">
      <el-input class="query-input" v-model="queryInput" placeholder="请输入姓名搜索" @input="handleQueryInput"/>
      <div class="btn-list">
        <el-button type="primary" @click="handleTableAdd">添加</el-button>
        <el-button type="danger" @click="handleDeleteList" v-if="multipleSelection.length > 0">删除选中</el-button>
      </div>
    </div>
    <!-- table -->
    <el-table ref="multipleTableRef"
              :data="tableData"
              style="width: 100%"
              @selection-change="handleSelectionChange"
              border>
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="name" label="姓名" width="120"/>
      <el-table-column prop="email" label="邮箱" width="120"/>
      <el-table-column prop="phone" label="手机" width="120"/>
      <el-table-column prop="status" label="状态" width="120"/>
      <el-table-column prop="address" label="地址" width="200"/>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click.prevent="handleDeleteRow(scope.$index)"
                     style="color: #F56C6C">删除
          </el-button>
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- dialog -->
    <el-dialog v-model="dialogFormVisible" :title="dialogType">
      <el-form :model="tableForm">
        <el-form-item label="姓名" :label-width="100">
          <el-input v-model="tableForm.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="100">
          <el-input v-model="tableForm.email" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="手机" :label-width="100">
          <el-input v-model="tableForm.phone" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="状态" :label-width="100">
          <el-input v-model="tableForm.status" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="地址" :label-width="100">
          <el-input v-model="tableForm.address" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleDialogConform">确认</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

/*** 数据 ***/
interface User {
  id: number
  name: string
  email: string
  phone: string
  status: string
  address: string
}

/* 响应性变量 */
let queryInput = ref("");
let tableData = ref([
  {
    id: 1,
    name: 'Tom1',
    email: '123@qq.com',
    phone: '123123123',
    status: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 2,
    name: 'Tom2',
    email: '123@qq.com',
    phone: '123123123',
    status: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    name: 'Tom3',
    email: '123@qq.com',
    phone: '123123123',
    status: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 4,
    name: 'Tom4',
    email: '123@qq.com',
    phone: '123123123',
    status: 'California',
    address: 'No. 189, Grove St, Los Angeles',
  },
]);
let multipleSelection = ref<number[]>([]);
let dialogFormVisible = ref(false);
let tableForm = ref<User>({
  id: 0,
  name: '',
  email: '',
  phone: '',
  status: '',
  address: ''
});
let dialogType = ref('');

/* 普通常量 */
const add = '添加';
const edit = '编辑';

/* 普通变量 */
let idCount = 4;
let tableDataCopy = Object.assign(tableData.value);

/*** 响应函数 ***/
/* 输入框：查群 */
const handleQueryInput = (val: any) => {
  val = val.toLowerCase();
  tableData.value = tableDataCopy.filter((item: { name: string; }) => item.name.toLowerCase().match(val));
}
/* 表格：编辑一行 */
const handleEdit = (row: User) => {
  dialogFormVisible.value = true;
  dialogType.value = edit;
  tableForm.value = {...row};
}

/* 表格：删除多行 */
const handleDeleteList = () => {
  multipleSelection.value.sort();
  const length = multipleSelection.value.length;
  for (let i = length - 1; i >= 0; i--) {
    let index = multipleSelection.value[i];
    handleDeleteRow(index);
  }
  multipleSelection.value = [];
}
/* 表格：删除一行 */
const handleDeleteRow = (index: number) => {
  tableData.value.splice(index, 1);
}

/* 表格：选中多行 */
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = [];
  val.forEach(item => {
    let index = tableData.value.findIndex(user => user.id === item.id);
    multipleSelection.value.push(index);
  });
  console.log(multipleSelection.value);
}

/* 表格：添加一行 */
const handleTableAdd = () => {
  dialogFormVisible.value = true;
  dialogType.value = add;
  tableForm.value = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    status: '',
    address: ''
  };
}

/* 对话框：确认 */
const handleDialogConform = () => {
  dialogFormVisible.value = false;

  if (dialogType.value === add) {
    tableForm.value.id = ++idCount;
    tableData.value.push({
      ...tableForm.value
    });
    tableDataCopy = Object.assign(tableData.value);
  }

  if (dialogType.value === edit) {
    let index = tableData.value.findIndex(row => row.id === tableForm.value.id);
    tableData.value[index] = tableForm.value;
    tableDataCopy = Object.assign(tableData.value);
  }
}
</script>

<style scoped>
.table-box {
  width: 855px;
  margin: 200px auto;
}

.title {
  text-align: center;
}

.query-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.query-input {
  width: 200px;
}
</style>
