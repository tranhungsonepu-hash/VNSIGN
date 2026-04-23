export interface Product {
  id: string;
  name: string;
  category: 'lcd' | 'led';
  description: string;
  specs: {
    label: string;
    value: string;
  }[];
  features: string[];
  image: string;
  price: string;
}

export const products: Product[] = [
  {
    id: 'lcd-wall-mount-43',
    name: 'Màn hình LCD Treo tường 43"',
    category: 'lcd',
    description: 'Dòng màn hình chuyên dụng cho quảng cáo với thiết kế siêu mỏng, hoạt động 24/7.',
    specs: [
      { label: 'Kích thước', value: '43 inch' },
      { label: 'Độ phân giải', value: '4K Ultra HD' },
      { label: 'Độ sáng', value: '500 cd/m2' },
      { label: 'Hệ điều hành', value: 'Android 11' }
    ],
    features: [
      'Tấm nền LG/Samsung chính hãng',
      'Kính cường lực bảo vệ',
      'Kết nối Wifi/Ethernet',
      'Hỗ trợ quản lý từ xa qua Cloud'
    ],
    image: '/assets/products/lcd-43.jpg',
    price: 'Liên hệ'
  },
  {
    id: 'led-p2-indoor',
    name: 'Màn hình LED P2 Indoor',
    category: 'led',
    description: 'Giải pháp hiển thị khổ lớn trong nhà với độ phân giải siêu cao và màu sắc rực rỡ.',
    specs: [
      { label: 'Khoảng cách điểm ảnh', value: '2.0 mm' },
      { label: 'Tần số quét', value: '3840 Hz' },
      { label: 'Độ sáng', value: '800 cd/m2' },
      { label: 'Tuổi thọ', value: '100,000 giờ' }
    ],
    features: [
      'Góc nhìn rộng 160 độ',
      'Ghép nối không viền',
      'Tiết kiệm điện năng',
      'Bảo hành chính hãng 24 tháng'
    ],
    image: '/assets/products/led-p2.jpg',
    price: 'Liên hệ'
  }
];
