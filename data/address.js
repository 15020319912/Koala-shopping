// 地址数组(包含所有用户关联的配送地址信息，一个用户可以同时包含多个送货地址，多个地址中可能最多有一个是默认地址,isDefault标识每个地址是否是默认地址)
// var address = [
// 	{ id: 1, uName: 'user1', receiveName: '李四', receiveTel: '13777777777', receiveRegion: '山东省 青岛市 李沧区 虎山路', receiveAddress: '蓝山湾三期1号楼1单元1号', isDefault: false }, 
// 	{ id: 2, uName: 'user1', receiveName: '王五', receiveTel: '13788888888', receiveRegion: '山东省 济南市', receiveAddress: '某某地址', isDefault: true },
// 	{ id: 3, uName: '13999999999', receiveName: '马六', receiveTel: '13999999999', receiveRegion: '北京市 朝阳区', receiveAddress: '西三旗', isDefault: true }
// ];
// 
var address = [{
		id: 1,
		uName: 'user1',
		receiveName: '程秀娇',
		receiveTel: '13400000000',
		receiveRegion: '北京市 市辖区 东城区 东华门街道',
		receiveAddress: '姜庄小区1号楼1单元1号',
		isDefault: true
	},
	{
		id: 2,
		uName: 'user1',
		receiveName: '海绵宝宝',
		receiveTel: '18900000000',
		receiveRegion: '吉林省 松原市 宁江区 雅达虹工业集中区',
		receiveAddress: '海底世界1号楼1单元1号',
		isDefault: false
	},
	{
		id: 3,
		uName: 'user2',
		receiveName: '段连新',
		receiveTel: '13700000000',
		receiveRegion: '天津市 市辖区 和平区 劝业场街道',
		receiveAddress: '劝业场三期1号楼1单元1号',
		isDefault: true
	},
	{
		id: 4,
		uName: 'user2',
		receiveName: '派大星',
		receiveTel: '18900000000',
		receiveRegion: '天津市 市辖区 河东区 大直沽街道',
		receiveAddress: '贝壳小区1号楼1单元1号',
		isDefault: false
	},
	{
		id: 5,
		uName: 'user3',
		receiveName: '葛文烁',
		receiveTel: '12300000000',
		receiveRegion: '北京市 市辖区 通州区 漷县镇',
		receiveAddress: '蓝山湾三期1号楼1单元1号',
		isDefault: true
	},
	{
		id: 6,
		uName: 'user3',
		receiveName: '美少女',
		receiveTel: '19900000000',
		receiveRegion: '新疆维吾尔自治区 塔城地区 和布克赛尔蒙古自治县 和布克赛尔镇',
		receiveAddress: '和布克1号楼1单元1号',
		isDefault: false
	},
	{
		id: 7,
		uName: 'user4',
		receiveName: '张克强',
		receiveTel: '19700000000',
		receiveRegion: '江西省 吉安市 泰和县 塘洲镇',
		receiveAddress: '塘洲小区1号楼1单元1号',
		isDefault: true
	},
	{
		id: 8,
		uName: 'user4',
		receiveName: '蜡笔小新',
		receiveTel: '13700000000',
		receiveRegion: '河北省 秦皇岛市 北戴河区 牛头崖镇',
		receiveAddress: '东景小区1号楼1单元1号',
		isDefault: false
	}
];