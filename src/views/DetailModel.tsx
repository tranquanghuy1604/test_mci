'use client';

import { formatDate } from '@/utils/fortmatDate';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Form, Input, Menu, Modal, Radio, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';

const { Option } = Select;

const cities = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng'];
const hanoidDistricts = ['Đống Đa', 'Ba Đình', 'Hoàn Kiếm', 'Hai Bà Trưng'];
const dongDaWards = ['Láng Thượng', 'Ô Chợ Dừa', 'Quốc Tử Giám', 'Văn Miếu'];

interface DetailModelProps {
  open: boolean;
  onCancel: () => void;
  item: any;
}

function DetailModel({ open, onCancel, item }: DetailModelProps) {
  const [form] = Form.useForm();
  const [value, setValue] = useState('');
  const [districts, setDistricts] = useState<string[]>([]);
  const [wards, setWards] = useState<string[]>([]);

  const [gender, setGender] = useState('male');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<any>([]);
  const [inputValue, setInputValue] = useState('');

  console.log(item);

  return (
    <Modal open={open} onCancel={onCancel} width={1100} footer={null} centered closable={false} style={{ padding: 0 }}>
      <div className='px-[20px] flex justify-between items-center h-[56px] bg-[#BD8306E5]'>
        <h2 className='text-[16px] font-[600] leading-[22px] text-white'>Tạo khách hàng</h2>
        <img onClick={onCancel} src='/ic-close.svg' alt='ic-close' className='w-[30px] h-[30px]' />
      </div>
      <div className='p-[20px]'>
        <Form
          layout='vertical'
          form={form}
          initialValues={{
            gender: item?.gender,
            source: item?.source?.title,
            social_media: item?.social_media.title,
            status: item?.status.title,
            full_name: item?.full_name,
            email: item?.email,
            phone_number: item?.phone_number,
            district: item?.district,
            date_of_birth: new Date(item?.date_of_birth),
            city: item?.city,
            address: item?.address,
            ward: item?.ward,
            notes: item?.notes,
          }}
        >
          <div className='flex justify-between items-center'>
            <FormItem
              className='w-[30%]'
              name='full_name'
              label='Họ tên khách hàng*'
              rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
            >
              <Input className='bg-[#EDF9F6]' />
            </FormItem>

            <FormItem label name='gender' layout='vertical'>
              <Radio.Group className='ml-[10px]' value={gender} onChange={(e) => setGender(e.target.value)}>
                <Radio value='Nam'>Nam</Radio>
                <Radio value='Nữ'>Nữ</Radio>
                <Radio value='Khác'>Khác</Radio>
              </Radio.Group>
            </FormItem>

            <FormItem className='w-[30%]' name='date_of_birth' label='Ngày sinh'>
              <Input
                type='date'
                value={formatDate(item?.date_of_birth)}
                className='w-full max-w-[337px] bg-[#EDF9F6]'
              />
            </FormItem>
          </div>
          <div className='flex justify-between w-[30%]'>
            <FormItem className='w-[48%]' name='source' label='Nguồn khách hàng*'>
              <Dropdown
                overlay={
                  <DynamicDropdown items={item?.source} value={title} onChange={setTitle} label='Nguồn khách hàng' />
                }
                trigger={['click']}
              >
                <Button>
                  {item?.source.title}
                  <DownOutlined />
                </Button>
              </Dropdown>
            </FormItem>
            <FormItem className='w-[48%]' name='status' label='Trạng thái*'>
              <Dropdown
                overlay={<DynamicDropdown items={item?.status} value={title} onChange={setTitle} label='Trạng thái' />}
                trigger={['click']}
              >
                <Button>
                  {item?.status.title}
                  <DownOutlined />
                </Button>
              </Dropdown>
            </FormItem>
          </div>
          <h1>Thông tin liên hệ</h1>
          <div className='flex justify-between items-start mt-[30px]'>
            <div className='w-[30%]'>
              <FormItem
                className=''
                name='phone_number'
                label='Số điện thoại*'
                rules={[{ required: true, message: 'Vui lòng nhập Số điên thoại' }]}
              >
                <Input type='number' className='w-full max-w-[346px] bg-[#EDF9F6]' />
              </FormItem>
              <div className=''>
                <h1 className='text-[#000000] text-[16px] font-[600]'>Thông tin liên hệ</h1>
                <FormItem className='mt-4' name='services' label='Sản phẩm quan tâm*'>
                  <div className='flex flex-wrap gap-2 p-2 bg-white border rounded-md'>
                    {tags.map((tag: any, index: any) => (
                      <div
                        key={index}
                        className='flex items-center gap-1 px-3 py-1 text-white text-sm rounded-full bg-[#BD8306]'
                      >
                        <span>{tag}</span>
                      </div>
                    ))}
                    <Input
                      type='text'
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className='flex-grow min-w-[120px] border-none focus:ring-0'
                      placeholder={tags.length === 0 ? 'Nhập và nhấn Enter để thêm tag' : ''}
                    />
                  </div>
                </FormItem>
              </div>

              <FormItem className='mt-[10px]' name='notes' label='Ghi chú'>
                <TextArea
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder='Controlled autosize'
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  className='bg-[#EDF9F6]'
                />
              </FormItem>
            </div>
            <div className='w-[30%]'>
              <Form.Item
                name='email'
                label='Email'
                rules={[
                  { required: true, message: 'Vui lòng nhập email' },
                  { type: 'email', message: 'Email không hợp lệ' },
                ]}
              >
                <Input className='w-full bg-[#EDF9F6]' />
              </Form.Item>

              <Form.Item
                name='city'
                label='Địa chỉ liên hệ'
                rules={[{ required: true, message: 'Vui lòng chọn thành phố' }]}
              >
                <Select className='w-full bg-[#EDF9F6]'>
                  {cities.map((city) => (
                    <Option key={city} value={city}>
                      {city}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name='district' rules={[{ required: true, message: 'Vui lòng chọn quận/huyện' }]}>
                <Select className='w-full bg-[#EDF9F6]' placeholder='Chọn quận/huyện'>
                  {districts.map((district) => (
                    <Option key={district} value={district}>
                      {district}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name='ward' rules={[{ required: true, message: 'Vui lòng chọn phường/xã' }]}>
                <Select className='w-full bg-[#EDF9F6]' placeholder='Chọn phường/xã'>
                  {wards.map((ward) => (
                    <Option key={ward} value={ward}>
                      {ward}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name='address' rules={[{ required: true, message: 'Vui lòng nhập địa chỉ chi tiết' }]}>
                <Input className='w-full px-3 py-2 bg-[#EDF9F6]' placeholder='Nhập địa chỉ chi tiết' />
              </Form.Item>
            </div>
            <div className='w-[30%] '>
              <div className='flex items-center gap-[10px]'>
                <FormItem className='w-full max-w-[112px]' name='social_media' label='Mạng xã hội*'>
                  <Dropdown
                    overlay={
                      <DynamicDropdown
                        items={item?.social_media}
                        value={title}
                        onChange={setTitle}
                        label='Mạng xã hội'
                      />
                    }
                    trigger={['click']}
                  >
                    <Button>
                      {item?.social_media.title}
                      <DownOutlined />
                    </Button>
                  </Dropdown>
                </FormItem>
                <FormItem name='detailed_info' className='flex-1 mt-[5px]'>
                  <Input type='text' className='bg-[#EDF9F6]' />
                </FormItem>
              </div>
            </div>
          </div>
          <div className='w-full h-[2px] bg-[#DBDBDB]'></div>
          <div>
            <h1 className='my-[20px]'>Thông tin chăm sóc khách hàng</h1>
            <div className='w-full'>
              <div className='rounded-md border'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b bg-muted/50'>
                      <th className='p-2 text-center text-sm'>Lần</th>
                      <th className='p-2 text-center text-sm'>Ngày</th>
                      <th className='p-2 text-center text-sm'>Kết quả chăm sóc</th>
                      <th className='p-2 text-center text-sm'>Cập nhật trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item?.comment.map((comment: any, index: any) => (
                      <tr key={index} className='border-b'>
                        <td className='p-2 text-center text-sm'>{index + 1}</td>
                        <td className='p-2 text-center text-sm'>
                          <input type='date' className='w-40' value={formatDate(comment.time)} />
                        </td>
                        <td className='p-2 text-sm'>
                          <Input
                            type='text'
                            className='w-full'
                            value={comment.title}
                            placeholder='Nhập kết quả chăm sóc'
                          />
                        </td>
                        <td className='p-2 text-center text-sm'>
                          <select className='w-full max-w-xs p-2 border rounded' value={comment.status_id}>
                            <option key={item.id} value={item.id}>
                              {comment.title}
                            </option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className='mt-[20px] border-dashed border-[1px] w-full py-[10px] border-[#828282] flex justify-center items-center gap-[10px] text-[16px] text-[#BD8306] font-[400]'>
                <img src='/ic-create.svg' alt='' /> Thêm
              </button>
            </div>
          </div>

          <div className='mt-[20px] bg-[#FAFAFA] py-[10px] flex justify-end gap-[20px] items-center pr-[50px]'>
            <button onClick={onCancel} className='text-[#BD8306] text-[14px]'>
              Hủy
            </button>
            <button type='submit' className='text-white py-[5px] px-[30px] bg-[#BD8306] rounded-[6px]'>
              Xác nhận
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}

export default DetailModel;

function DynamicDropdown({ items, value, onChange, onAdd, label }: any) {
  return (
    <Menu>
      {items?.map((item: any) => (
        <Menu.Item key={item?.id}>{item?.title} </Menu.Item>
      ))}
      <Menu.Divider />
      <div className='flex'>
        <input
          type='text'
          placeholder={`Nhập dữ liệu`}
          className='w-full max-w-[100px] px-[10px]'
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button onClick={() => onAdd(value)}>+ Thêm</button>
      </div>
    </Menu>
  );
}
