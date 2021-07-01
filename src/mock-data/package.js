export const mockPackage1 = {
    id: 1,
    thumbnail: 'https://innbythesea.com/media/6173/gift-certificate-image.jpg',
    title: 'QUÀ TRI ÂN + THƯ CẢM ƠN',
    pricing: 2000000,
    currency: 'VNĐ',
    desc: 'Bạn sẽ nhận được <b>01 thư cảm ơn</b>, <b>01 album ảnh danh lam thắng cảnh xứ Huế chất lượng cao</b> và <b>01 kỷ niệm chương</b>. Sau khi chiến dịch này kết thúc, chúng tôi sẽ sắp xếp gửi các phần quà tri ân đến bạn trong thời gian sớm nhất.',
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