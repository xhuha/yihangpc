<template>
  <div class="map-select-container">
    <div class="header">
      <h1>中国农业银行网点查询系统</h1>
      <p>选择地区查看附近网点</p>
    </div>
    
    <div class="container">
      <div class="sidebar">
        <div class="controls">
          <!-- 省市区选择器 -->
          <div id="app">
            <el-cascader
              size="large"
              :options="options"
              v-model="selectedOptions"
              @change="handleChange">
            </el-cascader>
          </div>
          
          <!-- 搜索框 -->
          <div class="search-box">
            <i class="bi bi-search"></i>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索网点名称或地址..."
              @input="onSearch"
            />
          </div>
        </div>
        
        <!-- 网点列表 -->
        <div class="branch-list">
          <div v-if="loading" class="loading">
            <div class="loading-spinner"></div>
            <p>加载中...</p>
          </div>
          
          <div v-else-if="filteredBranches.length === 0" class="no-results">
            <p>暂无网点数据</p>
          </div>
          
          <div
            v-else
            class="branch-item"
            v-for="branch in filteredBranches"
            :key="branch.uid"
            @click="centerMapOnBranch(branch)"
          >
            <div class="branch-header">
              <h3>{{ branch.name }}</h3>
              <span class="branch-type">{{ getBranchType(branch) }}</span>
            </div>
            <p class="branch-address">
              <i class="bi bi-geo-alt"></i> {{ branch.address }}
            </p>
            <p class="branch-phone">
              <i class="bi bi-telephone"></i> {{ branch.phone }}
            </p>
            <p class="branch-hours">
              <i class="bi bi-clock"></i> {{ branch.hours }}
            </p>
          </div>
        </div>
      </div>
      
      <!-- 地图容器 -->
      <div class="map-container">
        <div id="map"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { provinceAndCityData, CodeToText } from 'element-china-area-data'

// 响应式数据
const searchQuery = ref('');
const loading = ref(false);
const map = ref(null);
const markers = ref([]);

// 省市区数据
const provinces = ref([]);
const cities = ref([]);
const districts = ref([]);
const branches = ref([]);

// 选中的地区
const selectedProvince = ref(null);
const selectedCity = ref(null);
const selectedDistrict = ref(null);

// 根据用户需求添加 - 区域选择相关数据
const options = ref(provinceAndCityData);
const selectedOptions = ref([]);

const handleChange = (value) => {
  var loc = "";
  for (let i = 0; i < selectedOptions.length; i++) {
    loc += CodeToText[this.selectedOptions[i]];
  }
  console.log(loc)//打印区域码所对应的属性值即中文地址
}

// 模拟省份数据 - 全国34个省级行政区
const mockProvinces = [
  { uid: '110000', id: '110000', name: '北京市', fullName: '北京市', level: 1 },
  { uid: '120000', id: '120000', name: '天津市', fullName: '天津市', level: 1 },
  { uid: '130000', id: '130000', name: '河北省', fullName: '河北省', level: 1 },
  { uid: '140000', id: '140000', name: '山西省', fullName: '山西省', level: 1 },
  { uid: '150000', id: '150000', name: '内蒙古自治区', fullName: '内蒙古自治区', level: 1 },
  { uid: '210000', id: '210000', name: '辽宁省', fullName: '辽宁省', level: 1 },
  { uid: '220000', id: '220000', name: '吉林省', fullName: '吉林省', level: 1 },
  { uid: '230000', id: '230000', name: '黑龙江省', fullName: '黑龙江省', level: 1 },
  { uid: '310000', id: '310000', name: '上海市', fullName: '上海市', level: 1 },
  { uid: '320000', id: '320000', name: '江苏省', fullName: '江苏省', level: 1 },
  { uid: '330000', id: '330000', name: '浙江省', fullName: '浙江省', level: 1 },
  { uid: '340000', id: '340000', name: '安徽省', fullName: '安徽省', level: 1 },
  { uid: '350000', id: '350000', name: '福建省', fullName: '福建省', level: 1 },
  { uid: '360000', id: '360000', name: '江西省', fullName: '江西省', level: 1 },
  { uid: '370000', id: '370000', name: '山东省', fullName: '山东省', level: 1 },
  { uid: '410000', id: '410000', name: '河南省', fullName: '河南省', level: 1 },
  { uid: '420000', id: '420000', name: '湖北省', fullName: '湖北省', level: 1 },
  { uid: '430000', id: '430000', name: '湖南省', fullName: '湖南省', level: 1 },
  { uid: '440000', id: '440000', name: '广东省', fullName: '广东省', level: 1 },
  { uid: '450000', id: '450000', name: '广西壮族自治区', fullName: '广西壮族自治区', level: 1 },
  { uid: '460000', id: '460000', name: '海南省', fullName: '海南省', level: 1 },
  { uid: '500000', id: '500000', name: '重庆市', fullName: '重庆市', level: 1 },
  { uid: '510000', id: '510000', name: '四川省', fullName: '四川省', level: 1 },
  { uid: '520000', id: '520000', name: '贵州省', fullName: '贵州省', level: 1 },
  { uid: '530000', id: '530000', name: '云南省', fullName: '云南省', level: 1 },
  { uid: '540000', id: '540000', name: '西藏自治区', fullName: '西藏自治区', level: 1 },
  { uid: '610000', id: '610000', name: '陕西省', fullName: '陕西省', level: 1 },
  { uid: '620000', id: '620000', name: '甘肃省', fullName: '甘肃省', level: 1 },
  { uid: '630000', id: '630000', name: '青海省', fullName: '青海省', level: 1 },
  { uid: '640000', id: '640000', name: '宁夏回族自治区', fullName: '宁夏回族自治区', level: 1 },
  { uid: '650000', id: '650000', name: '新疆维吾尔自治区', fullName: '新疆维吾尔自治区', level: 1 },
  { uid: '710000', id: '710000', name: '台湾省', fullName: '台湾省', level: 1 },
  { uid: '810000', id: '810000', name: '香港特别行政区', fullName: '香港特别行政区', level: 1 },
  { uid: '820000', id: '820000', name: '澳门特别行政区', fullName: '澳门特别行政区', level: 1 }
];

// 生成模拟城市数据
const generateMockCities = (provinceCode) => {
  const cityNames = [
    '市辖区', '区', '市', '地区', '自治州', '盟', '省直辖县级行政区划',
    '东城区', '西城区', '朝阳区', '丰台区', '石景山区', '海淀区',
    '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区',
    '怀柔区', '平谷区', '密云区', '延庆区'
  ];
  
  const cityCount = Math.floor(Math.random() * 5) + 3; // 3-7个城市
  const province = mockProvinces.find(p => p.uid === provinceCode || p.id === provinceCode);
  const provinceName = province ? province.name : '某省';
  
  return Array.from({ length: cityCount }, (_, i) => {
    const cityName = i === 0 ? `${provinceName.replace(/[省市区]/g, '')}市` : cityNames[i % cityNames.length];
    return {
      uid: `${provinceCode.substring(0, 2)}${String(i + 1).padStart(4, '0')}`,
      id: `${provinceCode.substring(0, 2)}${String(i + 1).padStart(4, '0')}`,
      name: cityName,
      fullName: `${provinceName}${cityName}`,
      level: 2
    };
  });
};

// 生成模拟区县数据
const generateMockDistricts = (cityCode) => {
  const districtNames = [
    '东城区', '西城区', '朝阳区', '丰台区', '石景山区', '海淀区',
    '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区',
    '怀柔区', '平谷区', '密云区', '延庆区', '城厢镇', '新桥镇',
    '南桥镇', '奉城镇', '金汇镇', '青村镇', '柘林镇', '海湾镇',
    '庄行镇', '四团镇', '泥城镇', '书院镇', '万祥镇', '大团镇',
    '惠南镇', '周浦镇', '新场镇', '大团镇', '宣桥镇', '航头镇',
    '康桥镇', '祝桥镇', '泥城镇', '书院镇', '万祥镇', '老港镇'
  ];
  
  const districtCount = Math.floor(Math.random() * 8) + 4; // 4-11个区县
  
  return Array.from({ length: districtCount }, (_, i) => {
    return {
      uid: `${cityCode.substring(0, 4)}${String(i + 1).padStart(2, '0')}`,
      id: `${cityCode.substring(0, 4)}${String(i + 1).padStart(2, '0')}`,
      name: districtNames[i % districtNames.length],
      fullName: `某市${districtNames[i % districtNames.length]}`,
      level: 3
    };
  });
};

// 生成模拟网点数据
const generateMockBranches = (districtName) => {
  const branchTypes = ['支行', '分行', '储蓄所', 'ATM', '自助银行', '理财中心'];
  const roadNames = ['建国路', '长安街', '中关村大街', '金融街', '国贸中心', '科技园路', 
                     '西湖路', '珠江路', '天河路', '南京东路', '外滩', '中山路'];
  
  const branchCount = Math.floor(Math.random() * 15) + 5; // 生成5-19个网点
  return Array.from({ length: branchCount }, (_, i) => {
    const type = branchTypes[i % branchTypes.length];
    const road = roadNames[i % roadNames.length];
    const number = Math.floor(Math.random() * 999) + 1;
    const isMainBranch = i === 0;
    
    return {
      uid: `branch_${Date.now()}_${i}`,
      name: `中国农业银行${isMainBranch ? '总行' : `${districtName}${road}${type}`}`,
      address: `${districtName}${road}${number}号`,
      phone: `010-${Math.floor(Math.random() * 90000000) + 10000000}`,
      hours: '09:00-17:00',
      location: {
        lng: 116.2 + Math.random() * 2,
        lat: 39.8 + Math.random() * 2
      },
      type: isMainBranch ? '总行' : type
    };
  });
};

// 重置下级选择的实用函数
const resetChildSelections = () => {
  selectedCity.value = null;
  selectedDistrict.value = null;
  cities.value = [];
  districts.value = [];
  branches.value = [];
};

const resetDistrictSelection = () => {
  selectedDistrict.value = null;
  districts.value = [];
  branches.value = [];
};

// 省份选择变化
const onProvinceChange = async () => {
  resetChildSelections();
  if (selectedProvince.value) {
    cities.value = generateMockCities(selectedProvince.value.uid || selectedProvince.value.id);
    console.log('使用模拟城市数据:', cities.value.length);
  }
};

// 城市选择变化
const onCityChange = async () => {
  resetDistrictSelection();
  if (selectedCity.value) {
    districts.value = generateMockDistricts(selectedCity.value.uid || selectedCity.value.id);
    console.log('使用模拟区县数据:', districts.value.length);
  }
};

// 区县选择变化
const onDistrictChange = async () => {
  if (selectedDistrict.value) {
    loading.value = true;
    // 模拟加载延迟
    setTimeout(() => {
      branches.value = generateMockBranches(selectedDistrict.value.name);
      console.log('使用模拟网点数据:', branches.value.length);
      
      // 如果有网点数据，则更新地图
      if (branches.value.length > 0) {
        addBranchMarkers();
        updateMapCenter();
      }
      loading.value = false;
    }, 500);
  }
};

// 搜索网点
const onSearch = () => {
  // 搜索逻辑由computed自动处理
};

// 筛选网点
const filteredBranches = computed(() => {
  if (!searchQuery.value) {
    return branches.value;
  }
  const query = searchQuery.value.toLowerCase();
  return branches.value.filter(branch => 
    branch.name.toLowerCase().includes(query) || 
    branch.address.toLowerCase().includes(query)
  );
});

// 获取网点类型
const getBranchType = (branch) => {
  if (branch.name.includes('ATM') || branch.type === 'ATM') return 'ATM';
  if (branch.name.includes('自助') || branch.type === '自助银行') return '自助银行';
  if (branch.name.includes('分行')) return '分行';
  if (branch.name.includes('支行')) return '支行';
  if (branch.name.includes('储蓄')) return '储蓄所';
  if (branch.name.includes('理财')) return '理财中心';
  return '网点';
};

// 地图相关函数
const centerMapOnBranch = (branch) => {
  if (map.value && branch.location) {
    map.value.centerAndZoom(new BMap.Point(branch.location.lng, branch.location.lat), 15);
  }
};

// 添加网点标记
const addBranchMarkers = () => {
  if (!map.value) return;
  
  // 清除现有标记
  markers.value.forEach(marker => {
    map.value.removeOverlay(marker);
  });
  markers.value = [];
  
  // 添加新标记
  branches.value.forEach(branch => {
    if (!branch.location || !branch.location.lng || !branch.location.lat) return;
    
    const point = new BMap.Point(branch.location.lng, branch.location.lat);
    const marker = new BMap.Marker(point);
    
    // 设置信息窗口
    const infoWindow = new BMap.InfoWindow(`
      <div class="info-window">
        <h3>${branch.name}</h3>
        <p><i class="bi bi-geo-alt"></i> ${branch.address}</p>
        <p><i class="bi bi-telephone"></i> ${branch.phone}</p>
        <p><i class="bi bi-clock"></i> ${branch.hours}</p>
      </div>
    `);
    
    marker.addEventListener('click', () => {
      marker.openInfoWindow(infoWindow);
    });
    
    map.value.addOverlay(marker);
    markers.value.push(marker);
  });
};

// 更新地图中心点
const updateMapCenter = () => {
  if (!map.value || branches.value.length === 0) return;
  
  // 找到第一个有坐标的网点
  const firstBranch = branches.value.find(branch => 
    branch.location && branch.location.lng && branch.location.lat
  );
  
  if (firstBranch) {
    map.value.centerAndZoom(
      new BMap.Point(firstBranch.location.lng, firstBranch.location.lat), 
      13
    );
  }
};

// 确保地图API正确加载
const ensureBMapAPILoaded = () => {
  if (!window.BMap) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://api.map.baidu.com/api?v=3.0&ak=x5NcWy9apcpSxrkrWyoD2PzYq064kppu&callback=onBMapCallback`;
      script.onerror = () => {
        reject(new Error('百度地图API加载失败'));
      };
      document.head.appendChild(script);
      
      window.onBMapCallback = () => {   
        resolve(window.BMap);
      };
    });
  }
  return Promise.resolve(window.BMap);
};

// 初始化地图
const initMap = async () => {
  try {
    await ensureBMapAPILoaded();
    
    // 创建地图实例
    map.value = new BMap.Map('map');
    
    // 设置地图中心点和缩放级别
    const point = new BMap.Point(116.404, 39.915);
    map.value.centerAndZoom(point, 12);
    
    // 添加地图控件
    map.value.addControl(new BMap.NavigationControl());
    map.value.addControl(new BMap.ScaleControl());
    map.value.addControl(new BMap.OverviewMapControl());
    
    // 启用滚轮缩放
    map.value.enableScrollWheelZoom(true);
    
    // 加载省份数据
    provinces.value = mockProvinces;
    console.log('使用模拟省份数据:', provinces.value.length);
    
  } catch (error) {
    console.error('地图初始化失败:', error);
    // 即使地图初始化失败，也要加载省份数据
    provinces.value = mockProvinces;
    console.log