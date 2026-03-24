export type PartnerApprovalStatus = "대기" | "승인" | "반려";
export type PartnerStatus = "활성" | "검토중" | "정지";
export type ProductStatus = "승인 완료" | "검토 중" | "판매 중지";
export type OrderStatus =
  | "주문접수"
  | "처리중"
  | "배송중"
  | "배송완료"
  | "취소";
export type SettlementStatus = "정산완료" | "검토중" | "보류" | "정산대기";
export type MemberRole = "바이어" | "협력사 관리자" | "일반회원";
export type MemberStatus = "활성" | "정지" | "탈퇴";
export type NoticeCategory = "공지" | "점검" | "업데이트" | "이벤트";
export type NoticeTarget = "전체" | "협력사" | "바이어";
export type SuggestionType = "기능건의" | "불편신고" | "서비스문의" | "기타";
export type SuggestionStatus = "미답변" | "검토중" | "답변완료" | "반영예정";
export type ReviewKind = "리뷰" | "Q&A";
export type ReviewStatus = "게시중" | "숨김" | "답변대기" | "답변완료";

export type PartnerApprovalRequest = {
  id: number;
  company: string;
  representative: string;
  businessNo: string;
  category: string;
  appliedAt: string;
  contact: string;
  email: string;
  address: string;
  note: string;
  status: PartnerApprovalStatus;
  documentLabel: string;
};

export const partnerApprovalRequests: PartnerApprovalRequest[] = [
  {
    id: 1,
    company: "에코팜 주식회사",
    representative: "최지은",
    businessNo: "214-88-12004",
    category: "식품/농산물",
    appliedAt: "2026-03-24",
    contact: "010-4423-1180",
    email: "biz@ecofarm.co.kr",
    address: "경기도 광주시 오포로 12",
    note: "친환경 농산물 B2B 납품 경험이 있으며 정기 구독 상품 입점을 희망합니다.",
    status: "대기",
    documentLabel: "사업자등록증, 통신판매업 신고증",
  },
  {
    id: 2,
    company: "서울패션하우스",
    representative: "유승민",
    businessNo: "110-31-82744",
    category: "의류/패션",
    appliedAt: "2026-03-23",
    contact: "010-8820-1188",
    email: "partner@seoulfashion.kr",
    address: "서울특별시 성동구 연무장길 18",
    note: "유니폼, 웰컴키트용 텍스타일 상품을 중심으로 납품하고 있습니다.",
    status: "승인",
    documentLabel: "사업자등록증, 브랜드 소개서",
  },
  {
    id: 3,
    company: "대한물류네트워크",
    representative: "박현수",
    businessNo: "317-86-44090",
    category: "생활/물류",
    appliedAt: "2026-03-22",
    contact: "010-2210-3300",
    email: "hello@dlnetwork.co.kr",
    address: "인천광역시 서구 봉수대로 111",
    note: "배송 포장재와 사무 소모품 영역 입점을 희망합니다.",
    status: "대기",
    documentLabel: "사업자등록증, 물류창고 인증서",
  },
  {
    id: 4,
    company: "그린라이프코퍼레이션",
    representative: "정현우",
    businessNo: "503-81-44192",
    category: "생활용품",
    appliedAt: "2026-03-20",
    contact: "010-3388-9012",
    email: "admin@greenlife.kr",
    address: "대전광역시 유성구 대학로 77",
    note: "세제와 생활용품 카테고리 중심 입점 신청입니다.",
    status: "반려",
    documentLabel: "사업자등록증",
  },
];

export type PartnerCompany = {
  id: number;
  company: string;
  representative: string;
  category: string;
  status: PartnerStatus;
  joinDate: string;
  products: number;
  monthlyRevenue: number;
  settlementScore: string;
  contact: string;
};

export const partnerCompanies: PartnerCompany[] = [
  {
    id: 1,
    company: "서울패션하우스",
    representative: "유승민",
    category: "의류/패션",
    status: "활성",
    joinDate: "2025-08-13",
    products: 184,
    monthlyRevenue: 48200000,
    settlementScore: "A",
    contact: "support@seoulfashion.kr",
  },
  {
    id: 2,
    company: "에코팜 주식회사",
    representative: "최지은",
    category: "식품/농산물",
    status: "검토중",
    joinDate: "2026-03-24",
    products: 0,
    monthlyRevenue: 0,
    settlementScore: "-",
    contact: "biz@ecofarm.co.kr",
  },
  {
    id: 3,
    company: "그린라이프코퍼레이션",
    representative: "정현우",
    category: "생활용품",
    status: "활성",
    joinDate: "2025-11-09",
    products: 91,
    monthlyRevenue: 21500000,
    settlementScore: "A-",
    contact: "contact@greenlife.kr",
  },
  {
    id: 4,
    company: "대한물류네트워크",
    representative: "박현수",
    category: "포장/물류",
    status: "활성",
    joinDate: "2025-05-02",
    products: 124,
    monthlyRevenue: 32800000,
    settlementScore: "B+",
    contact: "hello@dlnetwork.co.kr",
  },
  {
    id: 5,
    company: "코리아프린팅솔루션",
    representative: "김서안",
    category: "사무용품",
    status: "정지",
    joinDate: "2024-12-11",
    products: 43,
    monthlyRevenue: 9800000,
    settlementScore: "C",
    contact: "partner@kprinting.kr",
  },
];

export type AdminProduct = {
  id: number;
  name: string;
  partner: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
  rating: number;
  status: ProductStatus;
};

export const adminProducts: AdminProduct[] = [
  {
    id: 1,
    name: "국내산 사과 10kg 박스",
    partner: "에코팜 주식회사",
    category: "식품/농산물",
    price: 59000,
    stock: 184,
    sales: 320,
    rating: 4.8,
    status: "검토 중",
  },
  {
    id: 2,
    name: "오피스 에르고노믹 의자",
    partner: "서울패션하우스",
    category: "가구/인테리어",
    price: 189000,
    stock: 42,
    sales: 88,
    rating: 4.5,
    status: "승인 완료",
  },
  {
    id: 3,
    name: "A4 복사용지 500매",
    partner: "코리아프린팅솔루션",
    category: "사무용품",
    price: 6900,
    stock: 820,
    sales: 611,
    rating: 4.2,
    status: "승인 완료",
  },
  {
    id: 4,
    name: "천연 세면대 청소제 3L",
    partner: "그린라이프코퍼레이션",
    category: "생활용품",
    price: 23000,
    stock: 12,
    sales: 147,
    rating: 4.7,
    status: "검토 중",
  },
  {
    id: 5,
    name: "4K 웹캠 화상회의용",
    partner: "대한물류네트워크",
    category: "전자기기",
    price: 99000,
    stock: 0,
    sales: 52,
    rating: 3.9,
    status: "판매 중지",
  },
];

export type AdminOrder = {
  id: number;
  orderNo: string;
  company: string;
  product: string;
  amount: number;
  createdAt: string;
  status: OrderStatus;
  delivery: string;
};

export const adminOrders: AdminOrder[] = [
  {
    id: 1,
    orderNo: "SA-260324-001",
    company: "LG CNS",
    product: "오피스 에르고노믹 의자",
    amount: 3780000,
    createdAt: "2026-03-24",
    status: "배송중",
    delivery: "한진택배 / 7762-0182",
  },
  {
    id: 2,
    orderNo: "SA-260324-002",
    company: "신라호텔",
    product: "국내산 사과 10kg 박스",
    amount: 1180000,
    createdAt: "2026-03-24",
    status: "주문접수",
    delivery: "출고 대기",
  },
  {
    id: 3,
    orderNo: "SA-260323-014",
    company: "포스코",
    product: "A4 복사용지 500매",
    amount: 690000,
    createdAt: "2026-03-23",
    status: "배송완료",
    delivery: "완료 / 2026-03-24",
  },
  {
    id: 4,
    orderNo: "SA-260323-011",
    company: "롯데마트",
    product: "천연 세면대 청소제 3L",
    amount: 460000,
    createdAt: "2026-03-23",
    status: "처리중",
    delivery: "주문 검수 중",
  },
  {
    id: 5,
    orderNo: "SA-260322-009",
    company: "삼성화재",
    product: "4K 웹캠 화상회의용",
    amount: 990000,
    createdAt: "2026-03-22",
    status: "취소",
    delivery: "결제 취소",
  },
];

export type Settlement = {
  id: number;
  company: string;
  period: string;
  grossAmount: number;
  fee: number;
  payable: number;
  status: SettlementStatus;
  payoutDate: string;
};

export const settlements: Settlement[] = [
  {
    id: 1,
    company: "서울패션하우스",
    period: "2026.03",
    grossAmount: 48200000,
    fee: 5784000,
    payable: 42416000,
    status: "검토중",
    payoutDate: "2026-03-31",
  },
  {
    id: 2,
    company: "그린라이프코퍼레이션",
    period: "2026.03",
    grossAmount: 21500000,
    fee: 2580000,
    payable: 18920000,
    status: "정산대기",
    payoutDate: "2026-03-31",
  },
  {
    id: 3,
    company: "대한물류네트워크",
    period: "2026.03",
    grossAmount: 32800000,
    fee: 3936000,
    payable: 28864000,
    status: "정산완료",
    payoutDate: "2026-03-25",
  },
  {
    id: 4,
    company: "코리아프린팅솔루션",
    period: "2026.03",
    grossAmount: 9800000,
    fee: 1176000,
    payable: 8624000,
    status: "보류",
    payoutDate: "미정",
  },
];

export const settlementTrend = [
  { label: "10월", value: 26800 },
  { label: "11월", value: 30100 },
  { label: "12월", value: 33800 },
  { label: "1월", value: 35200 },
  { label: "2월", value: 38900 },
  { label: "3월", value: 41400 },
] as const;

export type AdminMember = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: MemberRole;
  status: MemberStatus;
  joinDate: string;
  lastLogin: string;
  orders: number;
};

export const adminMembers: AdminMember[] = [
  {
    id: 1,
    name: "김민준",
    email: "minjun.kim@shinlahotel.co.kr",
    phone: "010-1111-2222",
    company: "신라호텔",
    role: "바이어",
    status: "활성",
    joinDate: "2025-01-10",
    lastLogin: "2026-03-24",
    orders: 24,
  },
  {
    id: 2,
    name: "이서연",
    email: "seoyeon.lee@samsungfire.co.kr",
    phone: "010-2222-3333",
    company: "삼성화재",
    role: "바이어",
    status: "활성",
    joinDate: "2025-02-15",
    lastLogin: "2026-03-23",
    orders: 18,
  },
  {
    id: 3,
    name: "박정호",
    email: "jungho.park@lgcns.co.kr",
    phone: "010-3333-4444",
    company: "LG CNS",
    role: "바이어",
    status: "활성",
    joinDate: "2024-11-08",
    lastLogin: "2026-03-22",
    orders: 47,
  },
  {
    id: 4,
    name: "최지은",
    email: "jieun.choi@ecofarm.kr",
    phone: "010-4444-5555",
    company: "에코팜 주식회사",
    role: "협력사 관리자",
    status: "활성",
    joinDate: "2025-09-14",
    lastLogin: "2026-03-24",
    orders: 0,
  },
  {
    id: 5,
    name: "임소현",
    email: "sohyun.lim@individual.com",
    phone: "010-8888-9999",
    company: "개인",
    role: "일반회원",
    status: "탈퇴",
    joinDate: "2026-01-05",
    lastLogin: "2026-01-15",
    orders: 3,
  },
];

export type CategoryItem = {
  id: number;
  name: string;
  icon: string;
  color: string;
  productCount: number;
  isActive: boolean;
  children?: {
    id: number;
    name: string;
    productCount: number;
    isActive: boolean;
  }[];
};

export const categoryTree: CategoryItem[] = [
  {
    id: 1,
    name: "식품/농산물",
    icon: "🥬",
    color: "bg-green-100",
    productCount: 342,
    isActive: true,
    children: [
      { id: 11, name: "신선 채소", productCount: 120, isActive: true },
      { id: 12, name: "과일류", productCount: 98, isActive: true },
      { id: 13, name: "수산물", productCount: 64, isActive: true },
    ],
  },
  {
    id: 2,
    name: "생활용품",
    icon: "🧴",
    color: "bg-blue-100",
    productCount: 198,
    isActive: true,
    children: [
      { id: 21, name: "세제/청소용품", productCount: 87, isActive: true },
      { id: 22, name: "욕실용품", productCount: 56, isActive: true },
      { id: 23, name: "방향/공기청정", productCount: 55, isActive: true },
    ],
  },
  {
    id: 3,
    name: "사무용품",
    icon: "📎",
    color: "bg-yellow-100",
    productCount: 156,
    isActive: true,
    children: [
      { id: 31, name: "필기/잉크", productCount: 72, isActive: true },
      { id: 32, name: "종이류", productCount: 48, isActive: true },
      { id: 33, name: "파일/바인더", productCount: 36, isActive: true },
    ],
  },
];

export type AdminNotice = {
  id: number;
  title: string;
  content: string;
  category: NoticeCategory;
  target: NoticeTarget;
  isPinned: boolean;
  isPublished: boolean;
  author: string;
  createdAt: string;
  views: number;
};

export const adminNotices: AdminNotice[] = [
  {
    id: 1,
    title: "[필독] 2026년 1분기 정산 일정 안내",
    content:
      "2026년 1분기 정산은 3월 31일 일괄 처리 예정입니다. 협력사 계좌와 세금계산서 정보를 사전 확인해 주세요.",
    category: "공지",
    target: "협력사",
    isPinned: true,
    isPublished: true,
    author: "최고관리자",
    createdAt: "2026-03-20",
    views: 342,
  },
  {
    id: 2,
    title: "시스템 정기 점검 안내 (3/28 새벽 2시~4시)",
    content:
      "서비스 안정화를 위한 정기 점검이 예정되어 있습니다. 점검 시간 동안 일부 기능 사용이 제한될 수 있습니다.",
    category: "점검",
    target: "전체",
    isPinned: true,
    isPublished: true,
    author: "최고관리자",
    createdAt: "2026-03-18",
    views: 581,
  },
  {
    id: 3,
    title: "상품 등록 가이드라인 업데이트 안내",
    content:
      "상품 등록 시 필수 기재 항목이 변경되었습니다. 신규 상품 승인 전에 이미지 규격과 배송 정보 입력을 다시 확인해 주세요.",
    category: "업데이트",
    target: "협력사",
    isPinned: false,
    isPublished: true,
    author: "최고관리자",
    createdAt: "2026-03-15",
    views: 198,
  },
];

export type AdminSuggestion = {
  id: number;
  title: string;
  content: string;
  author: string;
  company: string;
  type: SuggestionType;
  status: SuggestionStatus;
  createdAt: string;
  reply?: string;
  repliedAt?: string;
};

export const adminSuggestions: AdminSuggestion[] = [
  {
    id: 1,
    title: "상품 대량 등록 기능 추가 요청",
    content:
      "엑셀 파일 업로드로 상품을 한 번에 등록할 수 있으면 협력사 운영 효율이 크게 높아질 것 같습니다.",
    author: "김민준",
    company: "에코팜 주식회사",
    type: "기능건의",
    status: "검토중",
    createdAt: "2026-03-22",
  },
  {
    id: 2,
    title: "정산 내역 PDF 다운로드 기능 요청",
    content:
      "세무 처리용으로 월별 정산 내역을 PDF로 저장할 수 있는 기능이 필요합니다.",
    author: "이서연",
    company: "그린라이프코퍼레이션",
    type: "기능건의",
    status: "반영예정",
    createdAt: "2026-03-20",
    reply:
      "4월 업데이트에 PDF 정산 명세서 다운로드 기능이 포함될 예정입니다. 조금만 기다려 주세요.",
    repliedAt: "2026-03-21",
  },
  {
    id: 3,
    title: "주문 알림 이메일 도착 지연",
    content:
      "신규 주문이 들어온 뒤 이메일 알림이 1시간 이상 지연되는 경우가 있습니다. 즉시 알림이 필요합니다.",
    author: "최지은",
    company: "서울패션하우스",
    type: "불편신고",
    status: "미답변",
    createdAt: "2026-03-24",
  },
];

export type SubscriptionPlan = {
  id: number;
  name: string;
  description: string;
  price: number;
  billingCycle: "월간" | "연간";
  features: string[];
  maxProducts: number;
  commissionRate: number;
  subscriberCount: number;
  isActive: boolean;
  isRecommended: boolean;
};

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 1,
    name: "스타터",
    description: "소규모 협력사를 위한 기본 플랜",
    price: 29000,
    billingCycle: "월간",
    features: ["상품 등록 최대 50개", "기본 주문 관리", "이메일 지원", "기본 통계"],
    maxProducts: 50,
    commissionRate: 15,
    subscriberCount: 48,
    isActive: true,
    isRecommended: false,
  },
  {
    id: 2,
    name: "비즈니스",
    description: "성장형 협력사 대상 표준 플랜",
    price: 79000,
    billingCycle: "월간",
    features: [
      "상품 등록 최대 300개",
      "고급 주문 관리",
      "우선 이메일/채팅 지원",
      "상세 매출 통계",
      "재고 알림",
    ],
    maxProducts: 300,
    commissionRate: 12,
    subscriberCount: 132,
    isActive: true,
    isRecommended: true,
  },
  {
    id: 3,
    name: "엔터프라이즈",
    description: "대형 협력사를 위한 프리미엄 플랜",
    price: 199000,
    billingCycle: "월간",
    features: [
      "상품 등록 무제한",
      "전담 어카운트 매니저",
      "24/7 전화 지원",
      "맞춤 보고서",
      "API 연동",
    ],
    maxProducts: 999,
    commissionRate: 10,
    subscriberCount: 67,
    isActive: true,
    isRecommended: false,
  },
];

export type Subscriber = {
  id: number;
  company: string;
  plan: string;
  startDate: string;
  nextBillingDate: string;
  status: "활성" | "만료예정" | "해지";
  amount: number;
};

export const subscribers: Subscriber[] = [
  {
    id: 1,
    company: "서울패션하우스",
    plan: "엔터프라이즈",
    startDate: "2025-01-01",
    nextBillingDate: "2026-04-01",
    status: "활성",
    amount: 199000,
  },
  {
    id: 2,
    company: "에코팜 주식회사",
    plan: "비즈니스",
    startDate: "2025-06-15",
    nextBillingDate: "2026-04-15",
    status: "활성",
    amount: 79000,
  },
  {
    id: 3,
    company: "그린라이프코퍼레이션",
    plan: "비즈니스",
    startDate: "2024-03-10",
    nextBillingDate: "2026-03-31",
    status: "만료예정",
    amount: 79000,
  },
  {
    id: 4,
    company: "코리아프린팅솔루션",
    plan: "스타터",
    startDate: "2024-11-20",
    nextBillingDate: "-",
    status: "해지",
    amount: 0,
  },
];

export type ReviewItem = {
  id: number;
  type: ReviewKind;
  productName: string;
  author: string;
  company: string;
  rating?: number;
  content: string;
  reply?: string;
  status: ReviewStatus;
  createdAt: string;
  isReported: boolean;
};

export const reviewItems: ReviewItem[] = [
  {
    id: 1,
    type: "리뷰",
    productName: "국내산 사과 10kg 박스",
    author: "김민준",
    company: "신라호텔",
    rating: 5,
    content:
      "품질이 좋고 과일 크기가 균일해 직원 복지용으로 재구매 예정입니다.",
    status: "게시중",
    createdAt: "2026-03-23",
    isReported: false,
  },
  {
    id: 2,
    type: "Q&A",
    productName: "오피스 에르고노믹 의자",
    author: "박정호",
    company: "LG CNS",
    content: "50개 이상 대량 구매 시 추가 할인 적용이 가능한가요?",
    status: "답변대기",
    createdAt: "2026-03-24",
    isReported: false,
  },
  {
    id: 3,
    type: "리뷰",
    productName: "캐시미어 겨울 머플러",
    author: "최지은",
    company: "포스코",
    rating: 2,
    content: "상품 색상이 상세 페이지와 많이 달라 반품 요청했습니다.",
    status: "게시중",
    createdAt: "2026-03-21",
    isReported: true,
  },
  {
    id: 4,
    type: "Q&A",
    productName: "국내산 한우 등심 1kg",
    author: "윤승민",
    company: "롯데마트",
    content: "원산지 증명서 발급이 가능한가요?",
    reply: "구매 후 요청 시 영업일 기준 2일 내 발급 가능합니다.",
    status: "답변완료",
    createdAt: "2026-03-20",
    isReported: false,
  },
];
