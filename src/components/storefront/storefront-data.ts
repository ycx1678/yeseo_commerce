export type StorefrontCategory = {
  id: string;
  name: string;
  icon: string;
};

export type TierPrice = {
  quantity: number;
  price: number;
};

export type StorefrontProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  categoryId: string;
  sku: string;
  stock: number;
  minOrderQty: number;
  unit: string;
  partnerName: string;
  rating: number;
  reviewCount: number;
  tierPricing?: TierPrice[];
};

export type ProductReview = {
  id: string;
  productId: string;
  author: string;
  company: string;
  rating: number;
  content: string;
  date: string;
  helpful: number;
};

export type ProductQuestion = {
  id: string;
  productId: string;
  author: string;
  question: string;
  answer: string | null;
  date: string;
  answered: boolean;
};

export const storefrontCategories: StorefrontCategory[] = [
  { id: "fashion-beauty", name: "패션잡화/화장품", icon: "💄" },
  { id: "baby-kids", name: "출산/유아동·문구", icon: "🌼" },
  { id: "sports-health", name: "스포츠/건강식품", icon: "💪" },
  { id: "clothing", name: "의류/패션소품", icon: "👗" },
  { id: "furniture-life", name: "가구/생활/취미", icon: "🛋️" },
  { id: "electronics", name: "가전/휴대폰/산업", icon: "📱" },
  { id: "etc", name: "기타", icon: "📦" },
];

export const storefrontCategoryTabs: StorefrontCategory[] = [
  { id: "all", name: "전체", icon: "🛍️" },
  ...storefrontCategories,
];

export const storefrontProducts: StorefrontProduct[] = [
  {
    id: "1",
    name: "프리미엄 스킨케어 세트",
    description:
      "수분 크림, 에센스, 토너, 선크림이 포함된 올인원 스킨케어 세트입니다. 민감성 피부에도 부담이 적은 성분으로 구성해 기업 사은품과 복지몰 기획전에 활용하기 좋습니다.",
    price: 38000,
    image:
      "https://images.unsplash.com/photo-1622866027662-14e3c5ee67e7?auto=format&fit=crop&w=900&q=80",
    category: "패션잡화/화장품",
    categoryId: "fashion-beauty",
    sku: "SKIN-SET-001",
    stock: 500,
    minOrderQty: 20,
    unit: "세트",
    partnerName: "(주)뷰티코리아",
    rating: 4.5,
    reviewCount: 128,
    tierPricing: [
      { quantity: 20, price: 38000 },
      { quantity: 100, price: 35000 },
      { quantity: 300, price: 32000 },
    ],
  },
  {
    id: "2",
    name: "패션 핸드백 비즈니스 컬렉션",
    description:
      "고급 합성 피혁 소재의 비즈니스 핸드백입니다. 기업 선물, VIP 기프트, 유통 입점용 구성으로 적합하며 다양한 색상 옵션을 제공합니다.",
    price: 55000,
    image:
      "https://images.unsplash.com/photo-1767230523786-c7d924e1dc0e?auto=format&fit=crop&w=900&q=80",
    category: "패션잡화/화장품",
    categoryId: "fashion-beauty",
    sku: "BAG-BIZ-001",
    stock: 300,
    minOrderQty: 10,
    unit: "개",
    partnerName: "(주)뷰티코리아",
    rating: 4.3,
    reviewCount: 76,
    tierPricing: [
      { quantity: 10, price: 55000 },
      { quantity: 50, price: 51000 },
      { quantity: 100, price: 47000 },
    ],
  },
  {
    id: "3",
    name: "유아용 교육 장난감 세트",
    description:
      "3세에서 7세 유아 대상의 교육 완구 세트입니다. 안전 인증을 완료한 소재를 사용했고 어린이집, 유치원, 키즈카페 납품용으로 적합합니다.",
    price: 28000,
    image:
      "https://images.unsplash.com/photo-1685358332341-f1e6d357dfa7?auto=format&fit=crop&w=900&q=80",
    category: "출산/유아동·문구",
    categoryId: "baby-kids",
    sku: "TOY-EDU-001",
    stock: 400,
    minOrderQty: 20,
    unit: "세트",
    partnerName: "(주)뷰티코리아",
    rating: 4.7,
    reviewCount: 203,
    tierPricing: [
      { quantity: 20, price: 28000 },
      { quantity: 100, price: 25000 },
      { quantity: 200, price: 22000 },
    ],
  },
  {
    id: "4",
    name: "프리미엄 문구 세트",
    description:
      "볼펜, 형광펜, 메모지, 포스트잇, 스테이플러를 포함한 사무용 문구 세트입니다. 기업 대량 구매와 입사 웰컴키트 구성에 잘 어울립니다.",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1764025851210-9ad5ed83e01f?auto=format&fit=crop&w=900&q=80",
    category: "출산/유아동·문구",
    categoryId: "baby-kids",
    sku: "STAT-SET-001",
    stock: 1000,
    minOrderQty: 50,
    unit: "세트",
    partnerName: "(주)스포츠월드",
    rating: 4.4,
    reviewCount: 312,
    tierPricing: [
      { quantity: 50, price: 15000 },
      { quantity: 200, price: 13500 },
      { quantity: 500, price: 12000 },
    ],
  },
  {
    id: "5",
    name: "단백질 보충제 1kg",
    description:
      "고품질 WPI 단백질을 기반으로 한 건강식품입니다. 초콜릿, 바닐라, 딸기 맛 중 선택 가능하며 복지몰과 스포츠 센터 납품 비중이 높은 상품입니다.",
    price: 52000,
    image:
      "https://images.unsplash.com/photo-1763757933292-d8290692edde?auto=format&fit=crop&w=900&q=80",
    category: "스포츠/건강식품",
    categoryId: "sports-health",
    sku: "PROTEIN-1KG",
    stock: 600,
    minOrderQty: 20,
    unit: "개",
    partnerName: "(주)스포츠월드",
    rating: 4.6,
    reviewCount: 445,
    tierPricing: [
      { quantity: 20, price: 52000 },
      { quantity: 100, price: 48000 },
      { quantity: 200, price: 44000 },
    ],
  },
  {
    id: "6",
    name: "스포츠 홈트레이닝 세트",
    description:
      "덤벨, 요가매트, 저항 밴드, 폼롤러를 포함한 홈트레이닝 패키지입니다. 기업 건강 캠페인과 피트니스 센터 판촉용으로 선호도가 높습니다.",
    price: 89000,
    image:
      "https://images.unsplash.com/photo-1764184661156-e8803cef9b67?auto=format&fit=crop&w=900&q=80",
    category: "스포츠/건강식품",
    categoryId: "sports-health",
    sku: "SPORT-SET-001",
    stock: 200,
    minOrderQty: 10,
    unit: "세트",
    partnerName: "(주)스포츠월드",
    rating: 4.4,
    reviewCount: 189,
    tierPricing: [
      { quantity: 10, price: 89000 },
      { quantity: 50, price: 82000 },
      { quantity: 100, price: 75000 },
    ],
  },
  {
    id: "7",
    name: "기업 유니폼 상하의 세트",
    description:
      "폴리에스터 혼방 소재로 제작한 기업용 유니폼 세트입니다. 세탁 내구성이 뛰어나고 단체 로고 인쇄를 추가 옵션으로 지원합니다.",
    price: 42000,
    image:
      "https://images.unsplash.com/photo-1600201319331-27d31ecd7850?auto=format&fit=crop&w=900&q=80",
    category: "의류/패션소품",
    categoryId: "clothing",
    sku: "UNIF-SET-001",
    stock: 800,
    minOrderQty: 20,
    unit: "세트",
    partnerName: "(주)뷰티코리아",
    rating: 4.2,
    reviewCount: 234,
    tierPricing: [
      { quantity: 20, price: 42000 },
      { quantity: 100, price: 38000 },
      { quantity: 300, price: 34000 },
    ],
  },
  {
    id: "8",
    name: "아웃도어 기능성 의류 세트",
    description:
      "방수, 투습, 보온 기능을 갖춘 아웃도어 의류 세트입니다. 현장 근무복과 레저 판촉 상품으로 모두 활용 가능한 구성이 특징입니다.",
    price: 67000,
    image:
      "https://images.unsplash.com/photo-1768853990312-0e20e64cf87f?auto=format&fit=crop&w=900&q=80",
    category: "의류/패션소품",
    categoryId: "clothing",
    sku: "OUTDOOR-001",
    stock: 350,
    minOrderQty: 10,
    unit: "세트",
    partnerName: "(주)스포츠월드",
    rating: 4.5,
    reviewCount: 167,
    tierPricing: [
      { quantity: 10, price: 67000 },
      { quantity: 50, price: 61000 },
      { quantity: 100, price: 55000 },
    ],
  },
  {
    id: "9",
    name: "홈 인테리어 소파 3인용",
    description:
      "천연 가죽 감성의 3인용 소파입니다. 사무 공간, 휴게실, 프리미엄 쇼룸 인테리어에 적합한 모델로 법인 대량 계약 비중이 높은 상품입니다.",
    price: 480000,
    image:
      "https://images.unsplash.com/photo-1765766601447-9e11ad2356da?auto=format&fit=crop&w=900&q=80",
    category: "가구/생활/취미",
    categoryId: "furniture-life",
    sku: "SOFA-3P-001",
    stock: 80,
    minOrderQty: 5,
    unit: "개",
    partnerName: "(주)뷰티코리아",
    rating: 4.6,
    reviewCount: 89,
    tierPricing: [
      { quantity: 5, price: 480000 },
      { quantity: 20, price: 450000 },
      { quantity: 50, price: 420000 },
    ],
  },
  {
    id: "10",
    name: "주방 조리 도구 세트 20종",
    description:
      "업소용으로 구성한 주방 도구 세트입니다. 스테인리스 소재 중심의 내구성 좋은 조리 기구로 식당, 카페, 단체 급식 시설에 적합합니다.",
    price: 125000,
    image:
      "https://images.unsplash.com/photo-1758279745446-2e4ba34c7d32?auto=format&fit=crop&w=900&q=80",
    category: "가구/생활/취미",
    categoryId: "furniture-life",
    sku: "KITCHEN-SET-20",
    stock: 250,
    minOrderQty: 10,
    unit: "세트",
    partnerName: "(주)스포츠월드",
    rating: 4.3,
    reviewCount: 156,
    tierPricing: [
      { quantity: 10, price: 125000 },
      { quantity: 50, price: 115000 },
      { quantity: 100, price: 105000 },
    ],
  },
  {
    id: "11",
    name: "스마트폰 액세서리 패키지",
    description:
      "케이스, 강화유리, 고속 충전기, C타입 케이블로 구성한 범용 액세서리 패키지입니다. 판촉 행사와 사내 복지몰 기획전에 많이 쓰입니다.",
    price: 18000,
    image:
      "https://images.unsplash.com/photo-1771324917582-b608bbfd5794?auto=format&fit=crop&w=900&q=80",
    category: "가전/휴대폰/산업",
    categoryId: "electronics",
    sku: "PHONE-ACC-001",
    stock: 1000,
    minOrderQty: 50,
    unit: "세트",
    partnerName: "(주)뷰티코리아",
    rating: 4.1,
    reviewCount: 278,
    tierPricing: [
      { quantity: 50, price: 18000 },
      { quantity: 200, price: 16000 },
      { quantity: 500, price: 14000 },
    ],
  },
  {
    id: "12",
    name: "업무용 노트북 15인치",
    description:
      "Intel i7, 16GB RAM, 512GB SSD 구성을 갖춘 비즈니스 노트북입니다. 법인 구매 전용 A/S 지원과 대량 구매 견적을 제공합니다.",
    price: 1450000,
    image:
      "https://images.unsplash.com/photo-1758519288355-fe5b6fcc9f39?auto=format&fit=crop&w=900&q=80",
    category: "가전/휴대폰/산업",
    categoryId: "electronics",
    sku: "LAPTOP-BIZ-001",
    stock: 80,
    minOrderQty: 5,
    unit: "대",
    partnerName: "(주)스포츠월드",
    rating: 4.7,
    reviewCount: 92,
    tierPricing: [
      { quantity: 5, price: 1450000 },
      { quantity: 20, price: 1380000 },
      { quantity: 50, price: 1320000 },
    ],
  },
  {
    id: "13",
    name: "산업용 안전장비 세트",
    description:
      "헬멧, 안전화, 안전조끼, 방진 마스크, 장갑으로 구성한 현장 안전장비 세트입니다. 제조업, 물류업, 시설관리 업종에서 수요가 많습니다.",
    price: 95000,
    image:
      "https://images.unsplash.com/photo-1718248648359-2a3a5fc579c8?auto=format&fit=crop&w=900&q=80",
    category: "기타",
    categoryId: "etc",
    sku: "SAFETY-SET-001",
    stock: 300,
    minOrderQty: 10,
    unit: "세트",
    partnerName: "(주)스포츠월드",
    rating: 4.5,
    reviewCount: 143,
    tierPricing: [
      { quantity: 10, price: 95000 },
      { quantity: 50, price: 88000 },
      { quantity: 100, price: 80000 },
    ],
  },
  {
    id: "14",
    name: "사무용품 대량 패키지",
    description:
      "A4 용지, 볼펜, 스테이플러, 테이프 등 기본 사무 소모품을 한 번에 구성한 패키지입니다. 신규 사무실 오픈이나 대량 교체 수요에 적합합니다.",
    price: 185000,
    image:
      "https://images.unsplash.com/photo-1610490898684-6e3d5103a7bf?auto=format&fit=crop&w=900&q=80",
    category: "기타",
    categoryId: "etc",
    sku: "OFFICE-PKG-001",
    stock: 600,
    minOrderQty: 5,
    unit: "패키지",
    partnerName: "(주)뷰티코리아",
    rating: 4.3,
    reviewCount: 267,
    tierPricing: [
      { quantity: 5, price: 185000 },
      { quantity: 20, price: 172000 },
      { quantity: 50, price: 160000 },
    ],
  },
];

export const storefrontReviews: ProductReview[] = [
  {
    id: "review-1",
    productId: "1",
    author: "김○○",
    company: "(주)리테일마트",
    rating: 5,
    content:
      "대량 주문했는데 패키지 상태와 제품 구성이 모두 만족스러웠습니다. 사은품 행사에 바로 적용했고 재구매 의사가 있습니다.",
    date: "2026-03-10",
    helpful: 24,
  },
  {
    id: "review-2",
    productId: "1",
    author: "이○○",
    company: "(주)헬스앤뷰티",
    rating: 4,
    content:
      "배송 일정이 빠르고 낱개 포장 상태가 깔끔했습니다. 시즌 행사 패키지로 쓰기 좋았습니다.",
    date: "2026-03-05",
    helpful: 18,
  },
  {
    id: "review-3",
    productId: "5",
    author: "장○○",
    company: "(주)피트웰",
    rating: 5,
    content:
      "헬스장 회원권 번들 상품으로 판매 중인데 반응이 좋아서 추가 발주를 검토하고 있습니다.",
    date: "2026-03-11",
    helpful: 31,
  },
  {
    id: "review-4",
    productId: "12",
    author: "박○○",
    company: "(주)오피스랩",
    rating: 5,
    content:
      "입사자 지급용으로 20대 구매했는데 성능과 납기 모두 안정적이었습니다. 법인 대응도 매끄러웠습니다.",
    date: "2026-03-18",
    helpful: 12,
  },
];

export const storefrontQuestions: ProductQuestion[] = [
  {
    id: "qna-1",
    productId: "1",
    author: "박○○",
    question: "500세트 이상 주문 시 추가 협의가 가능한가요?",
    answer:
      "500세트 이상 주문 시 별도 견적과 패키지 커스터마이징이 가능합니다. 파트너 센터 문의 또는 대표번호로 연락 부탁드립니다.",
    date: "2026-03-08",
    answered: true,
  },
  {
    id: "qna-2",
    productId: "1",
    author: "최○○",
    question: "행사용 스티커를 부착한 상태로 납품받을 수 있나요?",
    answer: null,
    date: "2026-03-15",
    answered: false,
  },
  {
    id: "qna-3",
    productId: "12",
    author: "정○○",
    question: "운영체제 세팅과 자산 태깅을 포함한 납품이 가능한지 궁금합니다.",
    answer:
      "가능합니다. 수량과 납기 기준에 따라 초기 세팅 비용이 달라지므로 주문 전 별도 상담을 권장드립니다.",
    date: "2026-03-17",
    answered: true,
  },
];

export const storefrontFeaturedIds = ["1", "5", "9", "12"] as const;

export function findStorefrontProduct(productId: string) {
  return storefrontProducts.find((product) => product.id === productId);
}

export function getStorefrontReviews(productId: string) {
  return storefrontReviews.filter((review) => review.productId === productId);
}

export function getStorefrontQuestions(productId: string) {
  return storefrontQuestions.filter((question) => question.productId === productId);
}

export function getRelatedProducts(productId: string) {
  const currentProduct = findStorefrontProduct(productId);

  if (!currentProduct) {
    return [];
  }

  return storefrontProducts
    .filter(
      (product) =>
        product.id !== productId && product.categoryId === currentProduct.categoryId,
    )
    .slice(0, 4);
}
