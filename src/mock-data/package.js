export const mockPackage1 = {
    id: 1,
    thumbnail: 'https://innbythesea.com/media/6173/gift-certificate-image.jpg',
    title: 'QUÀ TRI ÂN + THƯ CẢM ƠN',
    pricing: 2000000,
    currency: 'VNĐ',
    desc: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.. praesentium.',
};

export const mockPackage2 = {
    ...mockPackage1,
    id: 2,
    pricing: 1000000,
}

export const mockPackage3 = {
    ...mockPackage1,
    id: 3,
    pricing: 500000,
}

export const mockPackage4 = {
    ...mockPackage1,
    id: 4,
    pricing: 250000,
}

export const mockPackageList = [
    mockPackage1,
    mockPackage2,
    mockPackage3,
    mockPackage4,
];