<template>
  <div class="map-select-container">
    <!-- 头部保持不变 -->
    <div class="header">
      <h1>中国农业银行网点查询系统</h1>
      <p>快速查询您身边的农业银行网点及ATM</p>
    </div>
    
    <div class="container">
      <div class="sidebar">
        <div class="controls">
          <!-- 修改为省市区三级选择器 -->
          <div class="region-selector">
            <select v-model="selectedProvince" @change="onProvinceChange">
              <option value="">请选择省份</option>
              <option v-for="province in provinces" :key="province.id" :value="province">{{ province.name }}</option>
            </select>
            
            <select v-model="selectedCity" @change="onCityChange" :disabled="!selectedProvince">
              <option value="">请选择城市</option>
              <option v-for="city in cities" :key="city.id" :value="city">{{ city.name }}</option>
            </select>
            
            <select v-model="selectedDistrict" @change="onDistrictChange" :disabled="!selectedCity">
              <option value="">请选择区县</option>
              <option v-for="district in districts" :key="district.id" :value="district">{{ district.name }}</option>
            </select>
          </div>
          
          <!-- 搜索框保持不变 -->
          <div class="search-box">
            <i class="bi bi-search"></i>
            <input
              type="text"
              placeholder="搜索网点名称或地址..."
              v-model="searchQuery"
            >
          </div>
        </div>
        
        <!-- 网点列表保持不变 -->
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
      
      <div class="map-container">
        <div id="map" ref="mapContainer"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

// 响应式数据
const searchQuery = ref('');
const loading = ref(false);
const map = ref(null);
const markers = ref([]);

// 省市区数据
const provinces = ref([
  { id: 11, name: '北京市', center: { lng: 116.404, lat: 39.915 } },
  { id: 31, name: '上海市', center: { lng: 121.4737, lat: 31.2304 } },
  { id: 44, name: '广东省', center: { lng: 113.2644, lat: 23.1291 } },
  { id: 33, name: '浙江省', center: { lng: 120.1535, lat: 30.2875 } },
  { id: 32, name: '江苏省', center: { lng: 118.7674, lat: 32.0415 } },
  { id: 42, name: '湖北省', center: { lng: 114.3055, lat: 30.5928 } },
  { id: 51, name: '四川省', center: { lng: 104.0657, lat: 30.6595 } },
  { id: 43, name: '湖南省', center: { lng: 112.9822, lat: 28.1941 } },
  { id: 35, name: '福建省', center: { lng: 119.3062, lat: 26.0753 } },
  { id: 12, name: '天津市', center: { lng: 117.1901, lat: 39.1255 } },
  // 新增省份数据
  { id: 41, name: '河南省', center: { lng: 113.625, lat: 34.7466 } },
  { id: 37, name: '山东省', center: { lng: 117.0009, lat: 36.6758 } },
  { id: 34, name: '安徽省', center: { lng: 117.283, lat: 31.8612 } },
  { id: 13, name: '河北省', center: { lng: 114.5025, lat: 38.0454 } },
  { id: 61, name: '陕西省', center: { lng: 108.9481, lat: 34.2632 } },
  { id: 14, name: '山西省', center: { lng: 112.5492, lat: 37.857 } },
  { id: 53, name: '云南省', center: { lng: 102.7122, lat: 25.0406 } }
]);

const cities = ref([]);
const districts = ref([]);
// 修改初始值从null改为空字符串，以便正确显示默认选项
const selectedProvince = ref('');
const selectedCity = ref('');
const selectedDistrict = ref('');

// 所有农业银行网点数据
const allBranches = ref([]);

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

// 显示网点信息窗口 - 添加这个缺失的函数
const showInfoWindow = (branch, point) => {
  const infoWindow = new BMap.InfoWindow(`
    <div style="width:250px;padding:10px;">
      <h3 style="margin:0 0 10px 0;font-size:16px;">${branch.name}</h3>
      <p style="margin:5px 0;"><i class="bi bi-geo-alt"></i> ${branch.address}</p>
      <p style="margin:5px 0;"><i class="bi bi-telephone"></i> ${branch.phone}</p>
      <p style="margin:5px 0;"><i class="bi bi-clock"></i> ${branch.hours}</p>
      <p style="margin:5px 0;"><i class="bi bi-tag"></i> ${getBranchType(branch)}</p>
    </div>
  `);
  map.value.openInfoWindow(infoWindow, point);
};

// 地图相关函数
const centerMapOnBranch = (branch) => {
  if (map.value && branch.lng && branch.lat) {
    const point = new BMap.Point(branch.lng, branch.lat);
    map.value.centerAndZoom(point, 15);
    // 现在可以安全调用showInfoWindow函数了
    showInfoWindow(branch, point);
  }
};

// 模拟获取省份对应的城市数据
const getCitiesByProvince = (provinceId) => {
  // 实际项目中应该从API获取数据
  // 这里为简化示例，返回模拟数据
  const cityData = {
    11: [{ id: 1101, name: '北京市', center: { lng: 116.404, lat: 39.915 } }],
    31: [{ id: 3101, name: '上海市', center: { lng: 121.4737, lat: 31.2304 } }],
    12: [{ id: 1201, name: '天津市', center: { lng: 117.1901, lat: 39.1255 } }],
    44: [
      { id: 4401, name: '广州市', center: { lng: 113.2644, lat: 23.1291 } },
      { id: 4403, name: '深圳市', center: { lng: 114.0579, lat: 22.5431 } },
      { id: 4404, name: '珠海市', center: { lng: 113.5493, lat: 22.1987 } },
      { id: 4405, name: '汕头市', center: { lng: 116.6942, lat: 23.3548 } }
    ],
    33: [
      { id: 3301, name: '杭州市', center: { lng: 120.1535, lat: 30.2875 } },
      { id: 3302, name: '宁波市', center: { lng: 121.5497, lat: 29.8683 } },
      { id: 3303, name: '温州市', center: { lng: 120.6519, lat: 28.0159 } }
    ],
    32: [
      { id: 3201, name: '南京市', center: { lng: 118.7674, lat: 32.0415 } },
      { id: 3202, name: '无锡市', center: { lng: 120.2983, lat: 31.5772 } },
      { id: 3205, name: '苏州市', center: { lng: 120.6195, lat: 31.2989 } }
    ],
    42: [
      { id: 4201, name: '武汉市', center: { lng: 114.3055, lat: 30.5928 } },
      { id: 4202, name: '黄石市', center: { lng: 115.0936, lat: 30.2103 } }
    ],
    51: [
      { id: 5101, name: '成都市', center: { lng: 104.0657, lat: 30.6595 } },
      { id: 5103, name: '自贡市', center: { lng: 104.7746, lat: 29.3572 } }
    ],
    43: [
      { id: 4301, name: '长沙市', center: { lng: 112.9822, lat: 28.1941 } },
      { id: 4302, name: '株洲市', center: { lng: 113.1152, lat: 27.8311 } }
    ],
    35: [
      { id: 3501, name: '福州市', center: { lng: 119.3062, lat: 26.0753 } },
      { id: 3502, name: '厦门市', center: { lng: 118.0894, lat: 24.4798 } }
    ],
    // 新增省份对应的城市数据
    41: [
      { id: 4101, name: 'INTEGRATED', center: { lng: 113.625, lat: 34.7466 } },
      { id: 4102, name: '开封市', center: { lng: 114.3565, lat: 34.7816 } },
      { id: 4103, name: '洛阳市', center: { lng: 112.4344, lat: 34.6631 } }
    ],
    37: [
      { id: 3701, name: '济南市', center: { lng: 117.0009, lat: 36.6758 } },
      { id: 3702, name: '青岛市', center: { lng: 120.3826, lat: 36.1012 } },
      { id: 3703, name: '淄博市', center: { lng: 118.058, lat: 36.7716 } }
    ],
    34: [
      { id: 3401, name: '合肥市', center: { lng: 117.283, lat: 31.8612 } },
      { id: 3402, name: '芜湖市', center: { lng: 118.3755, lat: 31.3436 } },
      { id: 3403, name: '蚌埠市', center: { lng: 117.3818, lat: 32.9369 } }
    ],
    13: [
      { id: 1301, name: '石家庄市', center: { lng: 114.5025, lat: 38.0454 } },
      { id: 1302, name: '唐山市', center: { lng: 118.1757, lat: 39.6286 } },
      { id: 1303, name: '秦皇岛市', center: { lng: 119.5859, lat: 39.9472 } }
    ],
    61: [
      { id: 6101, name: '西安市', center: { lng: 108.9481, lat: 34.2632 } },
      { id: 6102, name: '铜川市', center: { lng: 109.1893, lat: 35.0717 } },
      { id: 6103, name: '宝鸡市', center: { lng: 107.1439, lat: 34.3697 } }
    ],
    14: [
      { id: 1401, name: '太原市', center: { lng: 112.5492, lat: 37.857 } },
      { id: 1402, name: '大同市', center: { lng: 113.3076, lat: 40.1222 } },
      { id: 1403, name: '阳泉市', center: { lng: 113.5763, lat: 37.857 } }
    ],
    53: [
      { id: 5301, name: '昆明市', center: { lng: 102.7122, lat: 25.0406 } },
      { id: 5303, name: '曲靖市', center: { lng: 103.7973, lat: 25.5049 } },
      { id: 5304, name: '玉溪市', center: { lng: 102.5219, lat: 24.3529 } }
    ]
  };
  return cityData[provinceId] || [];
};

// 模拟获取城市对应的区县数据
const getDistrictsByCity = (cityId) => {
  // 实际项目中应该从API获取数据
  // 这里为简化示例，返回模拟数据
  const districtData = {
    1101: [
    { id: 110101, name: '东城区', center: { lng: 116.422, lat: 39.927 } },
    { id: 110102, name: '西城区', center: { lng: 116.367, lat: 39.927 } },
    { id: 110105, name: '朝阳区', center: { lng: 116.486, lat: 39.929 } },
    { id: 110106, name: '海淀区', center: { lng: 116.314, lat: 39.959 } },
    { id: 110107, name: '丰台区', center: { lng: 116.281, lat: 39.865 } }
  ],
  3101: [
    { id: 310101, name: '黄浦区', center: { lng: 121.480, lat: 31.238 } },
    { id: 310104, name: '徐汇区', center: { lng: 121.438, lat: 31.191 } },
    { id: 310105, name: '长宁区', center: { lng: 121.426, lat: 31.213 } },
    { id: 310106, name: '静安区', center: { lng: 121.464, lat: 31.227 } },
    { id: 310115, name: '浦东新区', center: { lng: 121.535, lat: 31.211 } }
  ],
  4401: [
    { id: 440103, name: '荔湾区', center: { lng: 113.228, lat: 23.125 } },
    { id: 440104, name: '越秀区', center: { lng: 113.265, lat: 23.138 } },
    { id: 440105, name: '海珠区', center: { lng: 113.314, lat: 23.089 } },
    { id: 440111, name: '白云区', center: { lng: 113.215, lat: 23.251 } },
    { id: 440112, name: '黄埔区', center: { lng: 113.457, lat: 23.102 } }
  ],
  3301: [
    { id: 330102, name: '上城区', center: { lng: 120.167, lat: 30.267 } },
    { id: 330103, name: '下城区', center: { lng: 120.153, lat: 30.286 } },
    { id: 330104, name: '江干区', center: { lng: 120.209, lat: 30.274 } },
    { id: 330105, name: '拱墅区', center: { lng: 120.142, lat: 30.293 } }
  ],
  3201: [
    { id: 320102, name: '玄武区', center: { lng: 118.782, lat: 32.064 } },
    { id: 320104, name: '秦淮区', center: { lng: 118.791, lat: 32.035 } },
    { id: 320105, name: '建邺区', center: { lng: 118.728, lat: 32.013 } },
    { id: 320106, name: '鼓楼区', center: { lng: 118.767, lat: 32.061 } }
  ]
  };
  return districtData[cityId] || [];
};

// 省份选择变化
const onProvinceChange = () => {
  selectedCity.value = null;
  selectedDistrict.value = null;
  districts.value = [];
  
  if (selectedProvince.value) {
    cities.value = getCitiesByProvince(selectedProvince.value.id);
    // 自动加载该省份的所有网点
    loadBranchData(selectedProvince.value.id, null, null);
  }
};

// 城市选择变化
const onCityChange = () => {
  selectedDistrict.value = null;
  
  if (selectedCity.value) {
    districts.value = getDistrictsByCity(selectedCity.value.id);
    // 自动加载该城市的所有网点
    loadBranchData(selectedProvince.value.id, selectedCity.value.id, null);
  }
};

// 区县选择变化
const onDistrictChange = () => {
  if (selectedDistrict.value) {
    // 自动加载该区县的所有网点
    loadBranchData(selectedProvince.value.id, selectedCity.value.id, selectedDistrict.value.id);
  }
};

// 加载网点数据
const loadBranchData = (provinceId, cityId, districtId) => {
  loading.value = true;
  
  // 实际项目中应该从API获取数据
  // 这里为简化示例，模拟API调用
  setTimeout(() => {
    // 模拟获取所有农业银行网点数据
    // 实际项目中，这里应该是API请求获取真实数据
    allBranches.value = generateMockBranchData(provinceId, cityId, districtId);
    
    // 更新地图中心
    updateMapCenter();
    
    // 更新标记
    addBranchMarkers();
    
    loading.value = false;
  }, 1000);
};

// 生成模拟网点数据
const generateMockBranchData = (provinceId, cityId, districtId) => {
  // 实际项目中应该从API获取数据
  // 这里为简化示例，生成模拟数据
  const mockBranches = [];
  
  // 根据筛选条件决定生成多少个网点
  let count = 50; // 默认生成50个网点
  if (districtId) count = 15; // 选择区县时生成15个
  else if (cityId) count = 30; // 选择城市时生成30个
  
  let centerLng = 116.404;
  let centerLat = 39.915;
  
  // 根据选择的地区设置中心点
  if (selectedDistrict.value) {
    centerLng = selectedDistrict.value.center.lng;
    centerLat = selectedDistrict.value.center.lat;
  } else if (selectedCity.value) {
    centerLng = selectedCity.value.center.lng;
    centerLat = selectedCity.value.center.lat;
  } else if (selectedProvince.value) {
    centerLng = selectedProvince.value.center.lng;
    centerLat = selectedProvince.value.center.lat;
  }
  
  // 农业银行网点类型，所有类型都确保包含'农业'二字
  const branchTypes = [
    { name: 'ATM', weight: 2 },
    { name: '自助银行', weight: 1 },
    { name: '分行', weight: 2 },
    { name: '支行', weight: 6 },
    { name: '储蓄所', weight: 1 },
    { name: '理财中心', weight: 1 },
    { name: '营业室', weight: 1 },
    { name: '金融超市', weight: 1 }
  ];
  
  // 计算权重总和
  const totalWeight = branchTypes.reduce((sum, type) => sum + type.weight, 0);
  
  // 生成模拟网点
  for (let i = 0; i < count; i++) {
    // 随机偏移，生成周围的网点
    const offsetLng = (Math.random() - 0.5) * 0.1;
    const offsetLat = (Math.random() - 0.5) * 0.1;
    
    // 随机选择网点类型（基于权重）
    let random = Math.random() * totalWeight;
    let selectedType = '网点';
    
    for (const type of branchTypes) {
      random -= type.weight;
      if (random <= 0) {
        selectedType = type.name;
        break;
      }
    }
    
    // 确保名称包含'农业'二字，使用'中国农业银行'作为统一前缀
    let branchName = '中国农业银行';
    if (selectedType === '分行' || selectedType === '支行') {
      branchName += `${districtId ? '支行' : '分行'}${i + 1}`;
    } else {
      branchName += `${districtId ? '支行' : '分行'}${i + 1}${selectedType}`;
    }
    
    // 生成符合实际的地址，包含所在地区信息
    let address = '';
    if (selectedDistrict.value && selectedCity.value && selectedProvince.value) {
      address = `${selectedProvince.value.name}${selectedCity.value.name}${selectedDistrict.value.name}${i + 1}号路${i + 100}号`;
    } else if (selectedCity.value && selectedProvince.value) {
      address = `${selectedProvince.value.name}${selectedCity.value.name}${i + 1}号路${i + 100}号`;
    } else if (selectedProvince.value) {
      address = `${selectedProvince.value.name}${i + 1}号路${i + 100}号`;
    } else {
      address = `${districtId ? '某区县' : '某城市'}${i + 1}号路${i + 100}号`;
    }
    
    mockBranches.push({
      id: `branch_${Date.now()}_${i}`,
      name: branchName,  // 确保名称包含'农业'二字
      address: address,
      phone: `010-123456${i.toString().padStart(2, '0')}`,
      hours: '09:00-17:00',
      type: selectedType,
      lng: centerLng + offsetLng,
      lat: centerLat + offsetLat,
      provinceId,
      cityId,
      districtId
    });
  }
  
  return mockBranches;
};

// 更新地图中心
const updateMapCenter = () => {
  if (!map.value) return;
  
  let center;
  if (selectedDistrict.value) {
    center = new BMap.Point(selectedDistrict.value.center.lng, selectedDistrict.value.center.lat);
    map.value.setZoom(14);
  } else if (selectedCity.value) {
    center = new BMap.Point(selectedCity.value.center.lng, selectedCity.value.center.lat);
    map.value.setZoom(12);
  } else if (selectedProvince.value) {
    center = new BMap.Point(selectedProvince.value.center.lng, selectedProvince.value.center.lat);
    map.value.setZoom(10);
  }
  
  if (center) {
    map.value.centerAndZoom(center, map.value.getZoom());
  }
};

// 计算筛选后的网点
const filteredBranches = computed(() => {
  let filtered = allBranches.value;
  
  // 根据搜索关键词筛选
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(branch => 
      branch.name.toLowerCase().includes(query) || 
      branch.address.toLowerCase().includes(query)
    );
  }
  
  return filtered;
});

// 初始化地图
const initMap = () => {
  // 检查百度地图API是否加载
  if (typeof BMap === 'undefined') {
    console.error('百度地图API未加载');
    return;
  }
  
  // 默认中心点（北京）
  const defaultPoint = new BMap.Point(116.404, 39.915);
  map.value = new BMap.Map('map');
  map.value.centerAndZoom(defaultPoint, 5); // 初始缩放级别设为5，显示全国范围
  map.value.enableScrollWheelZoom(true);
  
  // 添加控件
  map.value.addControl(new BMap.NavigationControl());
  map.value.addControl(new BMap.ScaleControl());
  map.value.addControl(new BMap.OverviewMapControl());
};

// 添加网点标记
const addBranchMarkers = () => {
  // 清除现有标记
  markers.value.forEach(marker => map.value.removeOverlay(marker));
  markers.value = [];
  
  // 添加新标记
  filteredBranches.value.forEach(branch => {
    const point = new BMap.Point(branch.lng, branch.lat);
    const marker = new BMap.Marker(point);
    
    // 使用农业银行特色图标
    const icon = new BMap.Icon(
      'https://api.map.baidu.com/images/marker_red_sprite.png', // 实际项目中应使用农业银行logo
      new BMap.Size(30, 40),
      { anchor: new BMap.Size(15, 40) }
    );
    marker.setIcon(icon);
    
    // 添加点击事件
    marker.addEventListener('click', () => {
      showInfoWindow(branch, point);
    });
    
    map.value.addOverlay(marker);
    markers.value.push(marker);
  });
};

onMounted(() => {
  // 初始化地图
  const script = document.createElement('script');
  script.src = 'https://api.map.baidu.com/api?v=3.0&ak=Geo7Th7pDyI6IcG3sOC85YJltVQbtZPm&callback=initMap';
  document.body.appendChild(script);
  
  // 全局函数，用于百度地图API回调
  window.initMap = initMap;
});

onBeforeUnmount(() => {
  // 清理地图实例和全局函数
  if (map.value) {
    map.value = null;
  }
  if (window.initMap) {
    delete window.initMap;
  }
});
</script>

<style scoped>
.map-select-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.header {
  background-color: #68B984;
  color: white;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.header p {
  margin: 5px 0 0;
  font-size: 14px;
  opacity: 0.9;
}

.container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.sidebar {
  width: 400px;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e0e0e0;
}

.controls {
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.search-box {
  margin-top: 20px;
  position: relative;
}

.search-box i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.search-box input {
  width: 100%;
  padding: 12px 40px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.search-box input:focus {
  outline: none;
  border-color: #68B984;
}

.branch-list {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #68B984;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-results {
  text-align: center;
  padding: 40px;
  color: #999;
}

.branch-item {
  padding: 15px;
  border-radius: 4px;
  background-color: #f9f9f9;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid transparent;
}

.branch-item:hover {
  background-color: #f0f9f4;
  border-color: #68B984;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(104, 185, 132, 0.1);
}

.branch-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.branch-header h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.branch-type {
  background-color: #68B984;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.branch-address,
.branch-phone,
.branch-hours {
  margin: 5px 0;
  font-size: 13px;
  color: #666;
}

.branch-address i,
.branch-phone i,
.branch-hours i {
  margin-right: 5px;
  color: #999;
}

.map-container {
  flex: 1;
  position: relative;
  background-color: #f0f0f0;
}

#map {
  width: 100%;
  height: 100%;
}

.info-window h3 {
  margin: 0 0 10px;
  color: #68B984;
  font-size: 16px;
}

.info-window p {
  margin: 5px 0;
  font-size: 13px;
  color: #666;
}

.info-window i {
  margin-right: 5px;
  color: #999;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    height: 40%;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .map-container {
    height: 60%;
  }
  
  .header h1 {
    font-size: 20px;
  }
}
</style>

/* 原有样式保持不变 */

/* 添加省市区选择器样式 */
.region-selector {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.region-selector select {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  background-color: #f8f9fa;
  transition: all 0.3s;
}

.region-selector select:focus {
  border-color: #68B984;
  box-shadow: 0 0 0 2px rgba(104, 185, 132, 0.2);
}

.region-selector select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 其他原有样式保持不变 */
<style scoped>
.region-selector {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.region-selector select {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  background-color: #f8f9fa;
  transition: all 0.3s;
}

.region-selector select:focus {
  border-color: #68B984;
  box-shadow: 0 0 0 2px rgba(104, 185, 132, 0.2);
}

.region-selector select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
