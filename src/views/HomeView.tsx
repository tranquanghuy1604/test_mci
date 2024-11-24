'use client';

import { useGetListCustomer } from '@/api/createApi';
import { Button, Space } from 'antd';
import { useState } from 'react';
import CreateUserModel from './CreateUserModel';
import DetailModel from './DetailModel';
import { formatDate } from '@/utils/fortmatDate';

export default function HomeView() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [selectItem, setSelectItem] = useState();

  const handleSelectItem = (id: any) => {
    setSelectItem(listCustomer?.results.find((item: any) => item.id === id));
  };

  const onCancel = () => {
    setIsOpen(false);
  };
  const onCancelDetail = () => {
    setIsOpenDetail(false);
  };
  const { data } = useGetListCustomer();
  const listCustomer = data as any;
  return (
    <>
      <div className='flex justify-between w-full'>
        <div className='w-[30%]'>
          <div className='flex items-center gap-2'>
            <div className='p-2 rounded-full bg-primary/10'>
              <img src='/icon-KH.svg' className='w-[35px] h-[35px]' />
            </div>
            <h1 className='text-[28px] leading-[16px] font-[600]'>Quản lý khách hàng</h1>
          </div>
          <div className='mb-6 flex items-center gap-[20px]'>
            <input
              type='text'
              className='border-[#828282] border-[1px] rounded-[4px] h-[40px] pl-[20px] w-full max-w-[348px]'
              placeholder='Tên, SĐT, Email'
            />
            <img src='/ic-search.svg' alt='' />
          </div>
        </div>

        <div className=''>
          <div className='flex items-center gap-[10px]'>
            <div className='text-right text-[14px] font-[600] leading-[16px] text-[#181B22]'>
              <p>MRs Conan</p>
              <p>Nhan vien kinh doanh</p>
            </div>
            <img src='/avatar.jpg' alt='' className='w-[40px] h-[40px] rounded-full' />
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className='bg-[#B78514] hover:bg-[#B78514]/90 text-white text-[14px] font-[600] w-full max-w-[161px] text-center h-[36px] rounded-[8px]'
          >
            Thêm khách hàng
          </button>
        </div>
      </div>

      {/* Table */}
      <div className='border rounded-lg'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-[#F2F2F2]'>
              <tr className='border-b border-[#BDBDBD]'>
                <th className='py-3 px-4 text-left font-medium'>#</th>
                <th className='py-3 px-4 text-left font-medium'>Mã KH</th>
                <th className='py-3 px-4 text-left font-medium'>Họ và tên</th>
                <th className='py-3 px-4 text-left font-medium'>SĐT</th>
                <th className='py-3 px-4 text-left font-medium'>Email</th>
                {/* <th className='py-3 px-4 text-left font-medium'>Người tiếp thị</th> */}
                <th className='py-3 px-4 text-left font-medium'>Nguồn</th>
                <th className='py-3 px-4 text-left font-medium'>Ghi chú</th>
                <th className='py-3 px-4 text-left font-medium'>Ngày tạo</th>
                <th className='py-3 px-4 text-left font-medium'>Trạng thái</th>
                <th className='py-3 px-4 text-left font-medium'>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {listCustomer?.results.map((customer: any, index: any) => (
                <tr key={index} className='border-b border-[#BDBDBD]'>
                  <td className='py-3 px-4'>{index + 1}</td>
                  <td className='py-3 px-4'>{customer.id}</td>
                  <td className='py-3 px-4'>{customer.full_name}</td>
                  <td className='py-3 px-4'>{customer.phone_number}</td>
                  <td className='py-3 px-4'>{customer.email}</td>
                  <td className='py-3 px-4'>{customer.source.title}</td>
                  {/* <td className='py-3 px-4'>{customer.source}</td> */}
                  <td className='py-3 px-4'>{customer.notes}</td>
                  <td className='py-3 px-4'>{formatDate(customer.created_at)}</td>
                  <td className='py-3 px-4'>{customer.status.title}</td>
                  <td className='py-3 px-4'>
                    <Space size='middle'>
                      <Button
                        type='primary'
                        onClick={() => {
                          setIsOpenDetail(true);
                          handleSelectItem(customer?.id);
                        }}
                      >
                        Chi tiết
                      </Button>
                    </Space>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-between mt-4'>
        <div className='text-[16px] leading-[16px] font-[400]'>Hiển thị 1-50/3459 hợp đồng</div>
        <div className='flex items-center gap-[10px]'>
          <select className='w-full max-w-[111px] rounded-[39px] border-[1px] border-[#BDBDBDBD] px-[10px] py-[5px]'>
            <option>20/Trang</option>
          </select>
          <button>
            <img src='/ic-prev.svg' className='w-[36px] h-[36px]' />
          </button>
          <button className='w-[39px] h-[36px] rounded-full border-[1px] border-[#BDBDBDBD]'>1</button>
          <button className='w-[39px] h-[36px] rounded-full border-[1px] border-[#BDBDBDBD]'>2</button>
          <button className='w-[39px] h-[36px] rounded-full border-[1px] border-[#BDBDBDBD]'>3</button>
          <button className='w-[39px] h-[36px] rounded-full border-[1px] border-[#BDBDBDBD]'>4</button>
          <button disabled>...</button>
          <button className='w-[39px] h-[36px] rounded-full border-[1px] border-[#BDBDBDBD]'>6</button>
          <button>
            <img src='/ic-next.svg' className='w-[36px] h-[36px]' />
          </button>
        </div>
      </div>

      {isOpen && <CreateUserModel open={isOpen} onCancel={onCancel} />}
      {isOpenDetail && <DetailModel item={selectItem} open={isOpenDetail} onCancel={onCancelDetail} />}
    </>
  );
}
