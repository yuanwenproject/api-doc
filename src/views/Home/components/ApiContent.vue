<template>
  <div class="apiContent">
    <div class="tag">
      <span class="tag-item rpc">RPC</span>
      <span class="tag-item authentication">Authentication.true</span>
    </div>
    <div class="parameters">
      <h3 class="param-title">parameter definition</h3>
      <div class="param-input">
        <el-input
          placeholder="请输入内容"
          v-model="params.url"
          :readonly="true"
        >
          <template slot="prepend">
            <span class="label">URL</span>
          </template>
        </el-input>
        <el-input
          placeholder="请输入内容"
          v-model="params.sid"
          :readonly="true"
        >
          <template slot="prepend">
            <span class="label">SID</span>
          </template>
        </el-input>
      </div>
    </div>
    <el-button class="generate-button" type="primary"
      >Generate shell commands</el-button
    >
    <div class="json-example">
      <el-collapse v-model="activeExample" @change="handleExampleChange">
        <el-collapse-item name="1">
          <template slot="title">
            <span class="json-title">Explore Request Example</span>
          </template>
          <json-viewer
            :value="requestExample"
            :expand-depth="5"
            :copyable="copyOptions"
          ></json-viewer>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <span class="json-title">Explore Response Example</span>
          </template>
          <json-viewer
            :value="responseExample"
            :expand-depth="5"
            :copyable="copyOptions"
          ></json-viewer>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="params-description">
      <div class="description">
        <h3 class="desc-title">Request Params</h3>
        <el-table :data="reqParamsData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </div>
      <div class="description">
        <h3 class="desc-title">Response Params</h3>
        <el-table :data="respParamsTableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "ApiContent",
  props: {
    apiId: String,
  },
  data() {
    return {
      requestFlag: false,
      copyOptions: { copyText: "复制", copiedText: "复制完成" },
      reqParamsData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      respParamsTableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      requestExample: {
        total: 25,
        limit: 10,
        skip: 0,
        links: {
          previous: undefined,
          next: function () {},
        },
      },
      responseExample: {
        data: [
          {
            id: "5968fcad629fa84ab65a5247",
            firstname: "Ada",
            lastname: "Lovelace",
            awards: null,
            known: ["mathematics", "computing"],
            position: {
              lat: 44.563836,
              lng: 6.495139,
            },
          },
        ],
      },
      activeExample: [""],
      params: {
        url: "http://xxxxxxxx",
        sid: "xxxxxxxxxx12zzzz",
      },
    };
  },
  computed: {
    ...mapGetters({
      getViewApiId: "home/getViewApiId",
    }),
  },
  watch: {
    getViewApiId: {
      handler(newVal) {
        if (newVal === this.apiId) {
          console.log("调接口", newVal, this.apiId);
        }
      },
      immediate: true,
    },
    requestFlag: {
      handler(newVal, oldValue) {
        console.log(newVal, oldValue);
      },
      immediate: true,
    },
  },
  methods: {
    handleExampleChange(val) {
      console.log(val);
    },
  },
};
</script>
<style lang="less">
.apiContent {
  .tag {
    width: 100%;
    box-sizing: border-box;
    padding: 4px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 16px;

    .tag-item {
      height: 30px;
      line-height: 30px;
      color: white;
      border-radius: 15px;
      margin-right: 6px;
      text-align: center;
      padding: 0 4px;
    }

    .rpc {
      background: rgb(40, 223, 40);
    }

    .authentication {
      background: rgb(40, 196, 223);
    }
  }

  .parameters {
    margin-bottom: 16px;

    .param-title {
      margin: 6px 0;
    }

    .param-input {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .label {
        width: 100px;
        display: inline-block;
        text-align: center;
      }
    }
  }

  .generate-button {
    padding: 8px;
    margin-bottom: 16px;
  }

  .json-example {
    margin-bottom: 16px;

    .json-title {
      padding: 8px;
      font-weight: bold;
    }
  }

  .params-description {
    .description {
      .desc-title {
        padding: 8px;
        margin: 6px 0;
      }
    }
  }
}
</style>
