export const mockPostedStatus1 = {
    id: 1,
    createdAt: '2021-05-24T17:00:00.000Z',
    location: 'Huyện Lệ Thủy, tỉnh Quảng Bình, Việt Nam',
    content: `
    <h4>Nước lũ dâng cao, nghìn ngôi nhà ngập trong biển nước</h4>
    <p>
      Sáng nay, nhiều nơi ở miền Trung vẫn chìm trong tình trạng ngập lụt, mực nước trên các sông vẫn dâng cao và lũ vẫn đang lên. Người dân dù chủ động nhưng cũng đối phó vất vả bởi nước lên cao, gây nhiều thiệt hại về con người và tài sản. Hiện đã có năm người chết, tám người bị mất tích do lũ.
    </p>
  `,
    mediaFiles: [
        'https://img.nhandan.com.vn/Files/Images/2020/10/09/a1-1602217432771.JPG',
        'https://upload.wikimedia.org/wikipedia/commons/8/83/L%C5%A9_l%E1%BB%A5t_Hu%E1%BA%BF_2020.jpg',
        'https://img.nhandan.com.vn/Files/Images/2020/10/09/0910_huelut-1602247410617.jpg',
        'https://img.nhandan.com.vn/Files/Images/2020/10/09/qt2-1602235421393.jpg',
        'https://img.nhandan.com.vn/Files/Images/2020/10/09/qt3-1602235681339.jpg',
        'https://img.nhandan.com.vn/Files/Images/2020/10/09/a3-1602217529089.jpg',
    ]
};

export const mockPostedStatus2 = {
    ...mockPostedStatus1,
    id: 2,
};

export const mockPostedStatus3 = {
    ...mockPostedStatus1,
    id: 3,
};

export const mockPostedStatusList = [
    mockPostedStatus1,
    mockPostedStatus2,
    mockPostedStatus3,
];