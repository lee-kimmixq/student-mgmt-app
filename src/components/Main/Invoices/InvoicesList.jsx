import React from 'react';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import fetcher from '../../../../utils/fetcher.mjs';
import getLoginTokenCookie from '../../../../utils/getLoginTokenCookie.mjs';

export default function TeachersList() {
  const { data, error } = useSWR(['/api/invoices', { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } }], fetcher);

  if (error) return <div>error</div>;
  if (!data) return <div>loading</div>;

  console.log(data);

  const invoicesList = data.map((invoice) => (
    <li key={invoice.id}>
      {invoice.amountDue}
    </li>
  ));

  return (
    <div>
      <ul>
        {invoicesList}
      </ul>
    </div>
  );
}
