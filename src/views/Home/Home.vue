<template>
  <div class="api-doc">
    <el-container>
      <el-header class="header">
        <h1 class="title">API Document</h1>
        <div class="select-version">
          <el-select v-model="currentVersion" placeholder="请选择">
            <el-option
              v-for="item in versionList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </el-header>
      <el-container>
        <el-aside width="300px">
          <div class="select-api">
            <div class="filter-operation">
              <el-input
                class="filter-input"
                placeholder="输入关键字进行过滤"
                v-model="filterText"
              />
              <el-button type="primary" @click="handleClearFilterText"
                >reset</el-button
              >
            </div>
            <el-tree
              class="filter-tree"
              :data="apiTreeData"
              :props="defaultProps"
              default-expand-all
              @node-click="handleGetApi"
              :filter-node-method="filterNode"
              ref="tree"
            >
              <div class="custom-tree-node" slot-scope="{ data }">
                <span v-if="!data.value">{{ data.label }}</span>
                <a
                  v-else
                  class="child-api"
                  v-html="highlightText(data.label)"
                  :href="`#${data.value}`"
                ></a>
              </div>
            </el-tree>
          </div>
        </el-aside>
        <el-container>
          <el-main>
            <div
              class="api-item"
              v-for="item in apiList"
              :key="item.id"
              :id="item.value"
              v-enter-viewport="item.value"
            >
              <h2 class="item-path">{{ item.value }}</h2>
              <p>这是api文档示例描述信息,这是api文档示例描述信息</p>
              <ApiContent :apiId="item.value" />
            </div>
          </el-main>
          <el-backtop :bottom="10" :right="10">
            <div class="top-icon">UP</div>
          </el-backtop>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ApiContent from "./components/ApiContent.vue";
export default {
  name: "ApiDoc",
  components: { ApiContent },
  data() {
    return {
      filterText: "",
      currentVersion: "",
      versionList: [
        {
          value: "4.5",
          label: "v4.5",
        },
        {
          value: "4.4",
          label: "v4.4",
        },
        {
          value: "4.3",
          label: "v4.3",
        },
      ],
      apiList: [],
      apiTreeData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              value: "/xxxx1-1",
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
              value: "/xxxx2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
              value: "/xxxx2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  created() {
    this.apiList = this.getBottomLevelNodes(this.apiTreeData);
    console.log("api列表为:", this.apiList);
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    getBottomLevelNodes(treeData) {
      const bottomLevelNodes = [];
      function traverse(node) {
        if (!node.children) {
          if (node.value) {
            bottomLevelNodes.push(node);
          }
        } else {
          node.children.forEach((child) => {
            traverse(child);
          });
        }
      }
      treeData.forEach((rootNode) => {
        traverse(rootNode);
      });
      return bottomLevelNodes;
    },
    handleClearFilterText() {
      this.filterText = "";
    },
    handleExampleChange(val) {
      console.log(val);
    },
    handleGetApi(obj, node) {
      if (node.childNodes.length === 0 && obj.value) {
        console.log(obj);
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    highlightText(text) {
      if (this.filterText !== "") {
        const searchValue = this.filterText.trim();
        const reg = new RegExp(`(${searchValue})`, "gi");
        return text.replace(reg, '<span class="high-light">$1</span>');
      } else {
        return text;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  text-align: center;
  line-height: 60px;
  height: 60px;
  background-color: #b3c0d1;
  color: #333;
  position: relative;
  display: flex;
  justify-content: center;

  .title {
    padding: 0;
    margin: 0;
  }

  .select-version {
    position: absolute;
    right: 60px;
    top: 0;
    z-index: 20;
  }
}

.el-aside {
  color: #333;
  text-align: center;
  min-height: 300px;
  padding: 4px;
  position: relative;

  .select-api {
    position: fixed;

    .filter-operation {
      display: flex;

      .filter-input {
        margin-right: 6px;
      }
    }

    .filter-tree {
      .custom-tree-node {
        .child-api {
          background: cyan;

          /deep/ .high-light {
            background: yellow;
          }
        }
      }
    }
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  box-sizing: border-box;
  margin-right: 60px;
  position: relative;

  .api-item {
    margin-bottom: 20px;

    .item-path {
      margin: 0;
    }
  }
}

.top-icon {
  height: 100%;
  width: 100%;
  background-color: #f2f5f6;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  text-align: center;
  line-height: 40px;
  color: #1989fa;
}
</style>
