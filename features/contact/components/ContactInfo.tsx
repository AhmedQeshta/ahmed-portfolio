import { BaseInfoResponse } from '@/sanity/lib/types';

interface IContactInfo {
  baseInfo: BaseInfoResponse;
}
export default function ContactInfo({ baseInfo }: IContactInfo) {
  const { email, phone, address } = baseInfo;
  return (
    <>
      <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
      <p className="text-text-secondary mb-2">Phone: {email}</p>
      <p className="text-text-secondary mb-2">Email: {phone}</p>
      <p className="text-text-secondary mb-2">Location: {address}</p>
    </>
  );
}
