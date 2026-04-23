export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  image: string;
  video?: string;
  description: string;
  details: string[];
  challenge: string;
  solution: string;
  results: string[];
  gallery: string[];
}

export const projects: Project[] = [
  {
    id: "aeon-beta",
    title: "AEON - BETA CINEMA",
    category: "Retail & Entertainment",
    location: "Hồ Chí Minh, Việt Nam",
    year: "2024",
    image: "/assets/case-studies/AEON-BETA/7517328916682.jpg",
    video: "/assets/case-studies/AEON-BETA/VIDEO/7517328820085.mp4",
    description: "Hệ thống quản lý nội dung tập trung cho toàn bộ cụm rạp Beta Cinema tại AEON Mall.",
    details: [
      "Triển khai hơn 50 màn hình LCD quảng cáo",
      "Hệ thống LED Wall khổ lớn tại sảnh chờ",
      "Tích hợp lịch chiếu phim thời gian thực",
      "Quản lý từ xa 100% qua Cloud"
    ],
    challenge: "Cần một giải pháp đồng bộ hiển thị lịch chiếu phim và trailer từ một trung tâm điều khiển cho hàng chục màn hình khác nhau.",
    solution: "Sử dụng VNSIGN Cloud để đồng bộ hóa dữ liệu lịch chiếu và quản lý phát trailer theo khung giờ tự động.",
    results: [
      "Giảm 90% thời gian cập nhật nội dung",
      "Tăng 30% hiệu quả truyền thông tại điểm bán",
      "Trải nghiệm khách hàng chuyên nghiệp và hiện đại hơn"
    ],
    gallery: [
      "/assets/case-studies/AEON-BETA/7517328820085.jpg",
      "/assets/case-studies/AEON-BETA/7517328935568.jpg",
      "/assets/case-studies/AEON-BETA/7517328953625.jpg"
    ]
  },
  {
    id: "the-view",
    title: "THE VIEW COFFEE",
    category: "F&B Digital Menu",
    location: "Đà Nẵng, Việt Nam",
    year: "2024",
    image: "/assets/case-studies/THE-VIEW/view-1.jpg",
    description: "Giải pháp Menu bảng điện tử thay thế menu truyền thống, tăng khả năng tùy biến món ăn.",
    details: [
      "Màn hình Menu Board chuyên dụng",
      "Cập nhật giá và món mới trong 30 giây",
      "Hiệu ứng chuyển động thu hút khách hàng",
      "Tiết kiệm chi phí in ấn menu giấy"
    ],
    challenge: "Menu thường xuyên thay đổi theo mùa và chương trình khuyến mãi, việc in ấn lại menu gây tốn kém và chậm trễ.",
    solution: "Triển khai hệ thống 3 màn hình LCD ghép tạo thành dải Menu Board sinh động.",
    results: [
      "Loại bỏ hoàn toàn chi phí in ấn menu",
      "Tăng doanh số các món combo nhờ hiệu ứng hình ảnh bắt mắt",
      "Quy trình gọi món nhanh hơn 20%"
    ],
    gallery: [
      "/assets/case-studies/THE-VIEW/view-2.jpg",
      "/assets/case-studies/THE-VIEW/view-3.jpg"
    ]
  }
];
